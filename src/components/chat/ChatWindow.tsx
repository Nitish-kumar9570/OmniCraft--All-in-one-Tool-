"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";
import { PromptSuggestions } from "./PromptSuggestions";
import { TypingIndicator } from "./TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { useDocuments } from "@/hooks/useDocuments";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { AlertCircle } from "lucide-react";

interface ChatWindowProps {
  conversationId?: string;
  initialMessages?: ChatMessageType[];
  onConversationCreated?: (newId: string) => void;
  initialDocId?: string;
}

export function ChatWindow({
  conversationId,
  initialMessages = [],
  onConversationCreated,
  initialDocId,
}: ChatWindowProps) {
  const {
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
  } = useChat({
    conversationId,
    initialMessages,
    onConversationCreated,
    initialDocId,
  });

  const { documents } = useDocuments();
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

  const handleSelectPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const isLastAssistant = (index: number) => {
    return (
      index === messages.length - 1 &&
      messages[index].role === "assistant" &&
      !messages[index].isStreaming
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50/30 dark:bg-[#090d16] relative overflow-hidden">
      {/* Scrollable Message List / Welcome Area */}
      <div className="flex-1 overflow-y-auto w-full">
        {messages.length === 0 ? (
          <div className="min-h-full flex flex-col justify-center py-6 sm:py-12">
            <PromptSuggestions onSelectPrompt={handleSelectPrompt} />
          </div>
        ) : (
          <div className="flex flex-col py-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id || index}
                message={msg}
                isLastAssistant={isLastAssistant(index)}
                onRegenerate={regenerateResponse}
              />
            ))}

            {isGenerating && messages[messages.length - 1]?.role === "user" && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
                <TypingIndicator />
              </div>
            )}

            <div ref={scrollAnchorRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Inline Error Notice */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 w-full mb-2">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        </div>
      )}

      {/* Enhanced Floating / Sticky Composer */}
      <ChatComposer
        input={input}
        setInput={setInput}
        onSend={() => sendMessage()}
        isGenerating={isGenerating}
        onStop={stopGenerating}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        mode={mode}
        setMode={setMode}
        webSearch={webSearch}
        setWebSearch={setWebSearch}
        documents={documents}
        selectedDocIds={selectedDocIds}
        setSelectedDocIds={setSelectedDocIds}
      />
    </div>
  );
}
