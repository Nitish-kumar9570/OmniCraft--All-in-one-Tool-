"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

interface CodeBlockProps {
  language?: string;
  value: string;
  className?: string;
}

export function CodeBlock({ language = "typescript", value, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  const cleanLang = (language || "code").toLowerCase();

  return (
    <div
      className={cn(
        "my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0c1222] shadow-xl text-slate-100 font-mono text-xs sm:text-sm",
        className
      )}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#131b2e] border-b border-slate-800/80 select-none">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-sans font-medium uppercase tracking-wider text-[11px]">
            {cleanLang}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="m-0 leading-relaxed font-mono">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  );
}
