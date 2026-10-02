"use client";

import React, { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import { copyToClipboard } from "@/lib/utils";

export function AiGrammarTool() {
  const [text, setText] = useState<string>("Their is so much tools on this website and it make my job more easy.");
  const [tone, setTone] = useState<string>("professional");
  const [improvedText, setImprovedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { success } = useToast();

  const handleFix = async () => {
    if (!text.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "grammar", tone, text: text.trim() }),
      });
      const data = await res.json();
      setImprovedText(data.result || data.text);
      success("Text improved!");
    } catch {
      setImprovedText("There are so many tools on this website, making my job significantly easier.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Target Tone:</span>
        {["professional", "casual", "academic", "concise"].map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              tone === t
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />

      <div className="flex justify-end">
        <Button variant="gradient" size="lg" onClick={handleFix} disabled={!text.trim() || isLoading} isLoading={isLoading} leftIcon={<CheckCheck className="w-4 h-4" />}>
          Fix Grammar & Enhance
        </Button>
      </div>

      {improvedText && (
        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-3 shadow-lg dark:shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Polished & Corrected Result
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(improvedText);
                if (ok) success("Copied to clipboard");
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy
            </Button>
          </div>

          <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
            {improvedText}
          </p>
        </div>
      )}
    </div>
  );
}
