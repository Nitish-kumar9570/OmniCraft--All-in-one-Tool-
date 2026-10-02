"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChatMessage, ModelId } from "@/types/chat";
import { ChatMode, Citation, DeepResearchStep } from "@/types/research";

interface UseChatProps {
  conversationId?: string;
  initialMessages?: ChatMessage[];
  onConversationCreated?: (newId: string) => void;
  initialDocId?: string;
}

export function useChat({
  conversationId,
  initialMessages = [],
  onConversationCreated,
  initialDocId,
}: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelId>("nova-pro");
  const [mode, setMode] = useState<ChatMode>(initialDocId ? "docs" : "quick");
  const [webSearch, setWebSearch] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(initialDocId ? [initialDocId] : []);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (initialDocId && !selectedDocIds.includes(initialDocId)) {
      setSelectedDocIds([initialDocId]);
      setMode("docs");
    }
  }, [initialDocId]);

  const stopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
    );
  }, []);

  const sendMessage = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText || input).trim();
      if (!text || isGenerating) return;

      setError(null);
      setInput("");

      // User Message
      const userMessageId = "usr_" + Math.random().toString(36).substring(2, 9);
      const userMessage: ChatMessage = {
        id: userMessageId,
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
        status: "sent",
        selectedDocIds: selectedDocIds.length > 0 ? selectedDocIds : undefined,
      };

      // Assistant Message Placeholder
      const assistantMessageId = "ast_" + Math.random().toString(36).substring(2, 9);
      const assistantPlaceholder: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        isStreaming: true,
        modelUsed: selectedModel,
        researchSteps: [],
        citations: [],
      };

      const updatedHistory = [...messages, userMessage];
      setMessages([...updatedHistory, assistantPlaceholder]);
      setIsGenerating(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedHistory.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            conversationId: conversationId || undefined,
            model: selectedModel,
            mode,
            webSearch: webSearch || mode === "web" || mode === "research",
            selectedDocIds: selectedDocIds.length > 0 ? selectedDocIds : undefined,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error("No response stream received from AI API");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let accumulatedCitations: Citation[] = [];
        let accumulatedSteps: DeepResearchStep[] = [];
        let accumulatedContextType: any = "general";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunkText = decoder.decode(value, { stream: true });
          const lines = chunkText.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(line.slice(6));

                if (parsed.delta) {
                  accumulatedText += parsed.delta;
                }
                if (parsed.citations) {
                  accumulatedCitations = parsed.citations;
                }
                if (parsed.researchStep) {
                  accumulatedSteps.push(parsed.researchStep);
                }
                if (parsed.contextType) {
                  accumulatedContextType = parsed.contextType;
                }

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? {
                          ...msg,
                          content: accumulatedText,
                          citations: accumulatedCitations,
                          researchSteps: accumulatedSteps,
                          contextType: accumulatedContextType,
                          isGrounded: accumulatedCitations.length > 0,
                        }
                      : msg
                  )
                );
              } catch {
                // Ignore parse fragments
              }
            }
          }
        }

        // Finalize streaming
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: accumulatedText,
                  citations: accumulatedCitations,
                  researchSteps: accumulatedSteps,
                  contextType: accumulatedContextType,
                  isGrounded: accumulatedCitations.length > 0,
                  isStreaming: false,
                }
              : msg
          )
        );
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("AI Generation aborted by user.");
        } else {
          console.error("Chat error:", err);
          setError(err.message || "Failed to generate AI response");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      msg.content ||
                      "⚠️ Sorry, I encountered an issue connecting to the AI engine. Please check your connection and try again.",
                    isStreaming: false,
                  }
                : msg
            )
          );
        }
      } finally {
        setIsGenerating(false);
        abortControllerRef.current = null;
      }
    },
    [input, isGenerating, messages, conversationId, selectedModel, mode, webSearch, selectedDocIds]
  );

  const regenerateResponse = useCallback(() => {
    if (isGenerating || messages.length === 0) return;

    const lastUserIndex = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIndex === -1) return;

    const actualIndex = messages.length - 1 - lastUserIndex;
    const lastUserMessage = messages[actualIndex];

    const pruned = messages.slice(0, actualIndex);
    setMessages(pruned);
    sendMessage(lastUserMessage.content);
  }, [isGenerating, messages, sendMessage]);

  return {
    messages,
    input,
    setInput,
    isGenerating,
    error,
    selectedModel,
    setSelectedModel,
    mode,
    setMode,
    webSearch,
    setWebSearch,
    selectedDocIds,
    setSelectedDocIds,
    sendMessage,
    stopGenerating,
    regenerateResponse,
  };
}
