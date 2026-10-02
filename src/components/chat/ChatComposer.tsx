"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  Square,
  Paperclip,
  Globe,
  Mic,
  MicOff,
  X,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Lock,
  Compass,
  Layers,
  UploadCloud,
} from "lucide-react";
import { ModelSelector } from "./ModelSelector";
import { DocumentUploader } from "@/components/documents/DocumentUploader";
import { DocumentSelector } from "@/components/documents/DocumentSelector";
import { ModelId } from "@/types/chat";
import { ChatMode } from "@/types/research";
import { DocumentItem } from "@/types/documents";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  onSend: () => void;
  isGenerating: boolean;
  onStop: () => void;
  selectedModel: ModelId;
  onSelectModel: (model: ModelId) => void;
  mode: ChatMode;
  setMode: (mode: ChatMode) => void;
  webSearch: boolean;
  setWebSearch: (enabled: boolean) => void;
  documents?: DocumentItem[];
  selectedDocIds: string[];
  setSelectedDocIds: (ids: string[]) => void;
  disabled?: boolean;
}

export function ChatComposer({
  input,
  setInput,
  onSend,
  isGenerating,
  onStop,
  selectedModel,
  onSelectModel,
  mode,
  setMode,
  webSearch,
  setWebSearch,
  documents = [],
  selectedDocIds,
  setSelectedDocIds,
  disabled = false,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [showDocSelector, setShowDocSelector] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { info, warning } = useToast();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 220)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isGenerating && !disabled) {
        onSend();
      }
    }
  };

  const toggleSpeechRecognition = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      warning("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
        info("Listening... Speak now");
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (typeof setInput === "function") {
          const currentInput = input ? `${input} ${transcript}` : transcript;
          setInput(currentInput);
        }
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const hasContent = Boolean(input.trim());

  const chatModes = [
    { id: "quick", label: "Quick Answer", icon: Sparkles },
    { id: "private", label: "Private Knowledge", icon: Lock },
    { id: "web", label: "Web Search", icon: Globe },
    { id: "research", label: "Deep Research", icon: Compass },
    { id: "docs", label: "Doc Research", icon: Layers },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-3 sm:pb-6 pb-safe space-y-2">

      {/* Target Document Selector Drawer */}
      {mode === "docs" && showDocSelector && (
        <DocumentSelector
          documents={documents}
          selectedDocIds={selectedDocIds}
          onToggleSelect={(id) => {
            setSelectedDocIds(
              selectedDocIds.includes(id)
                ? selectedDocIds.filter((item) => item !== id)
                : [...selectedDocIds, id]
            );
          }}
          onClear={() => setSelectedDocIds([])}
        />
      )}

      {/* Main Composer Box */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl backdrop-blur-md transition-all duration-200 focus-within:border-indigo-500/60 dark:focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20">
        {/* Mode Selector Header Bar */}
        <div className="flex items-center gap-1 px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 overflow-x-auto select-none">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Mode:
          </span>
          {chatModes.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                type="button"
                key={m.id}
                onClick={() => {
                  setMode(m.id as ChatMode);
                  if (m.id === "docs") setShowDocSelector(true);
                }}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer",
                  isSelected
                    ? "bg-indigo-600 text-white font-semibold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="w-3 h-3" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Target Documents Chips */}
        {selectedDocIds.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/30 text-xs">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Targeted:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {selectedDocIds.map((id) => {
                const doc = documents.find((d) => d.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[11px]"
                  >
                    <FileText className="w-3 h-3" />
                    <span className="max-w-[120px] truncate">{doc?.filename || "Document"}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedDocIds(selectedDocIds.filter((dId) => dId !== id))}
                      className="hover:text-rose-500 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isGenerating}
          placeholder={
            mode === "docs"
              ? "Ask OmniCraft anything about your targeted document(s)..."
              : mode === "research"
              ? "Ask OmniCraft to conduct multi-source deep research..."
              : "Ask OmniCraft your private personal partner anything..."
          }
          rows={1}
          className="w-full px-4 pt-3.5 pb-2 max-h-[220px] bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base resize-none focus:outline-none disabled:opacity-50"
        />

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Left tools: Model Selector, Document Upload, Mic */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ModelSelector selectedModel={selectedModel} onSelectModel={onSelectModel} />

            {/* Document Upload Button */}
            <button
              type="button"
              onClick={() => setIsUploaderOpen(true)}
              title="Upload private documents (PDF, Image, Notes)"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-750 transition-colors cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Attach / Upload</span>
            </button>

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={isRecording ? "Stop voice dictation" : "Voice input"}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                isRecording
                  ? "bg-rose-500/15 text-rose-500 animate-pulse"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {isRecording ? <MicOff className="w-4 h-4 text-rose-500" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Right Action: Send / Stop Generating */}
          <div className="flex items-center gap-2">
            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold transition-all duration-150 shadow-sm cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onSend}
                disabled={!hasContent || disabled}
                className={cn(
                  "p-2 rounded-xl text-white transition-all duration-200 select-none",
                  hasContent && !disabled
                    ? "bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-md shadow-indigo-500/25 scale-100 cursor-pointer active:scale-95"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

      </div>

      <div className="text-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          OmniCraft AI — Your private personal partner. Guarded by PostgreSQL Row Level Security.
        </p>
      </div>

      {/* Upload Modal */}
      <DocumentUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onSuccess={(doc) => {
          setSelectedDocIds([...selectedDocIds, doc.id]);
          setMode("docs");
        }}
      />
    </div>
  );
}
