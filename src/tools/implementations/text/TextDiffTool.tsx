"use client";

import React, { useState } from "react";
import * as diff from "diff";

export function TextDiffTool() {
  const [textA, setTextA] = useState<string>("Hello world\nThis is the original text\nLine three is here");
  const [textB, setTextB] = useState<string>("Hello world\nThis is the updated modified text\nLine three is here\nNew line four added");

  const diffResult = diff.diffLines(textA, textB);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">Original Text</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">Modified Text</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner"
          />
        </div>
      </div>

      {/* Diff Result Inspector */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto space-y-1 shadow-inner">
        {diffResult.map((part, index) => {
          const color = part.added
            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-l-2 border-emerald-500"
            : part.removed
            ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-l-2 border-rose-500 line-through"
            : "text-slate-700 dark:text-slate-300";

          return (
            <div key={index} className={`p-1.5 rounded ${color} whitespace-pre-wrap`}>
              {part.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
