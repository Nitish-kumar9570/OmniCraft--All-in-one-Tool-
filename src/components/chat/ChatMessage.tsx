"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";
import { Avatar } from "@/components/ui/Avatar";
import { CodeBlock } from "./CodeBlock";
import { MessageActions } from "./MessageActions";
import { SourceList } from "./SourceList";
import { ResearchProgress } from "./ResearchProgress";
import { ContextIndicator } from "./ContextIndicator";
import { formatTime } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  onRegenerate?: () => void;
  isLastAssistant?: boolean;
}

export function ChatMessage({
  message,
  onRegenerate,
  isLastAssistant = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`group w-full py-5 px-4 sm:px-6 transition-colors ${
        isUser
          ? "bg-transparent"
          : "bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-850/60"
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-start gap-3.5 sm:gap-4.5">
        {/* Avatar */}
        <div className="shrink-0 pt-0.5 select-none">
          {isUser ? (
            <Avatar
              name="User"
              size="sm"
              className="ring-1 ring-slate-300 dark:ring-slate-700"
            />
          ) : (
            <OmniCraftLogo size="sm" showText={false} animated={message.isStreaming} />
          )}
        </div>

        {/* Content Container */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 select-none flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {isUser ? "You" : "OmniCraft AI"}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {formatTime(message.createdAt)}
              </span>
              {message.modelUsed && !isUser && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-750">
                  {message.modelUsed}
                </span>
              )}
            </div>

            {/* Context Badge */}
            {!isUser && (
              <ContextIndicator
                contextType={message.contextType}
                isGrounded={message.isGrounded}
              />
            )}
          </div>

          {/* Deep Research Steps */}
          {!isUser && message.researchSteps && message.researchSteps.length > 0 && (
            <ResearchProgress
              steps={message.researchSteps}
              isGenerating={message.isStreaming}
            />
          )}

          {/* Body */}
          {isUser ? (
            <div className="text-sm sm:text-base text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          ) : (
            <div className="prose-nova text-sm sm:text-[15px] text-slate-800 dark:text-slate-200 break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    return !inline && match ? (
                      <CodeBlock language={match[1]} value={codeString} />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }: any) {
                    return (
                      <div className="overflow-x-auto my-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        <table>{children}</table>
                      </div>
                    );
                  },
                  a({ href, children }: any) {
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>

              {/* Expandable Citations & Sources */}
              {message.citations && message.citations.length > 0 && (
                <SourceList citations={message.citations} />
              )}

              {/* Message Actions */}
              {!message.isStreaming && message.content && (
                <MessageActions
                  content={message.content}
                  onRegenerate={onRegenerate}
                  showRegenerate={isLastAssistant}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
