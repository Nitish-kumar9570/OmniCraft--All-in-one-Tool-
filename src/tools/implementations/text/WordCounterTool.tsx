"use client";

import React, { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function WordCounterTool() {
  const [text, setText] = useState<string>(
    "OmniCraft is your all-in-one productivity platform. It provides high-speed, client-side tools designed for everyday digital workflows."
  );
  const { success } = useToast();

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, "").length;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1 : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;

  // Reading time (average 225 wpm)
  const readingTimeMin = Math.ceil(words / 225);
  const speakingTimeMin = Math.ceil(words / 130);

  // Keyword density top words
  const getTopKeywords = () => {
    if (!text.trim()) return [];
    const tokens = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const counts: Record<string, number> = {};
    tokens.forEach((w) => { counts[w] = (counts[w] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topKeywords = getTopKeywords();

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4.5 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 border border-slate-200/90 dark:border-white/[0.08] text-center shadow-xs backdrop-blur-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Words</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">{words}</p>
        </div>
        <div className="p-4.5 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 border border-slate-200/90 dark:border-white/[0.08] text-center shadow-xs backdrop-blur-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Characters</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1">{characters}</p>
        </div>
        <div className="p-4.5 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 border border-slate-200/90 dark:border-white/[0.08] text-center shadow-xs backdrop-blur-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sentences</span>
          <p className="text-2xl font-black text-pink-600 dark:text-pink-400 font-mono mt-1">{sentences}</p>
        </div>
        <div className="p-4.5 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 border border-slate-200/90 dark:border-white/[0.08] text-center shadow-xs backdrop-blur-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Paragraphs</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">{paragraphs}</p>
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs dark:shadow-inner"
          placeholder="Type or paste your text here to count words and characters..."
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Char (no spaces): <strong className="text-slate-900 dark:text-slate-200">{charactersNoSpaces}</strong> • Reading: ~<strong className="text-slate-900 dark:text-slate-200">{readingTimeMin}</strong> min • Speaking: ~<strong className="text-slate-900 dark:text-slate-200">{speakingTimeMin}</strong> min
          </span>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(text);
                if (ok) success("Text copied!");
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setText("")}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Keyword Density */}
      {topKeywords.length > 0 && (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 border border-slate-200/90 dark:border-white/[0.08] space-y-2.5 shadow-xs backdrop-blur-xl">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Top Keyword Density:
          </span>
          <div className="flex flex-wrap gap-2">
            {topKeywords.map(([kw, cnt]) => (
              <span key={kw} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
                <strong className="text-indigo-600 dark:text-indigo-400">{kw}</strong> ({cnt}x • {Math.round((cnt / (words || 1)) * 100)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
