"use client";

import React, { useState } from "react";
import { Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import { copyToClipboard } from "@/lib/utils";

export function AiSummarizerTool() {
  const [text, setText] = useState<string>(
    "Artificial intelligence is transforming software engineering by automating routine boilerplate code, performing complex automated testing, and enhancing security vulnerability audits. Modern developers leverage AI as an interactive peer programmer rather than a replacement."
  );
  const [summaryFormat, setSummaryFormat] = useState<"bullet" | "executive" | "tldr">("bullet");
  const [summaryOutput, setSummaryOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { success } = useToast();

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summarize",
          format: summaryFormat,
          text: text.trim(),
        }),
      });

      const data = await res.json();
      setSummaryOutput(data.result || data.text);
      success("Summary generated!");
    } catch {
      // Fallback client-side extractor
      const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
      const top3 = sentences.slice(0, 3).map((s) => `• ${s.trim()}`).join("\n");
      setSummaryOutput(top3);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: "bullet", label: "Key Bullet Points" },
          { id: "executive", label: "Executive Summary" },
          { id: "tldr", label: "Quick TL;DR" },
        ].map((fmt) => (
          <button
            key={fmt.id}
            onClick={() => setSummaryFormat(fmt.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              summaryFormat === fmt.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {fmt.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Paste article or text to summarize..."
      />

      <div className="flex justify-end">
        <Button
          variant="gradient"
          size="lg"
          onClick={handleSummarize}
          disabled={!text.trim() || isLoading}
          isLoading={isLoading}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Summary
        </Button>
      </div>

      {summaryOutput && (
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-lg dark:shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              AI Summary Result
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(summaryOutput);
                if (ok) success("Copied summary");
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy
            </Button>
          </div>

          <div className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
            {summaryOutput}
          </div>
        </div>
      )}
    </div>
  );
}
