"use client";

import React, { useState } from "react";
import { Copy, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function RemoveDuplicateLinesTool() {
  const [text, setText] = useState<string>("apple\nbanana\norange\napple\nbanana\ngrapes");
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [sortAlpha, setSortAlpha] = useState<boolean>(false);
  const { success } = useToast();

  const handleDeduplicate = () => {
    const rawLines = text.split("\n");
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    rawLines.forEach((line) => {
      const key = caseSensitive ? line.trim() : line.trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line.trim());
      }
    });

    if (sortAlpha) {
      uniqueLines.sort((a, b) => a.localeCompare(b));
    }

    setText(uniqueLines.join("\n"));
    success(`Deduplicated: ${rawLines.length} → ${uniqueLines.length} lines`);
  };

  const lineCount = text.split("\n").filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Current Lines: <strong className="text-slate-900 dark:text-white">{lineCount}</strong>
        </span>
        <div className="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Case Sensitive</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Sort A to Z</span>
          </label>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Paste lines to deduplicate..."
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="md"
          onClick={async () => {
            const ok = await copyToClipboard(text);
            if (ok) success("Copied to clipboard");
          }}
          leftIcon={<Copy className="w-4 h-4" />}
        >
          Copy
        </Button>

        <Button
          variant="gradient"
          size="md"
          onClick={handleDeduplicate}
          leftIcon={<ListFilter className="w-4 h-4" />}
        >
          Remove Duplicates
        </Button>
      </div>
    </div>
  );
}
