"use client";

import React from "react";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-4 py-4 animate-in fade-in duration-300">
      <div className="shrink-0 mt-0.5">
        <OmniCraftLogo size="sm" showText={false} animated={true} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            OmniCraft AI is thinking
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
