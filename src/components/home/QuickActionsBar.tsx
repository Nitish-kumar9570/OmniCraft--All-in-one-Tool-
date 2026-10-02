"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileCode,
  Braces,
  Image as ImageIcon,
  Zap,
  Layers,
  ArrowRight,
  Clipboard,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function QuickActionsBar() {
  const router = useRouter();
  const { info, success } = useToast();

  const handlePasteClipboard = async (targetType: "text" | "json") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (targetType === "json") {
            try {
              JSON.parse(text);
              sessionStorage.setItem("omni_pending_input", JSON.stringify({ type: "json", text }));
              success("Pasted JSON from clipboard");
              router.push("/tools/json-formatter");
              return;
            } catch {
              info("Clipboard content is not valid JSON. Opening formatter anyway.");
              sessionStorage.setItem("omni_pending_input", JSON.stringify({ type: "text", text }));
              router.push("/tools/json-formatter");
              return;
            }
          } else {
            sessionStorage.setItem("omni_pending_input", JSON.stringify({ type: "text", text }));
            success("Pasted text from clipboard");
            router.push("/tools/text-cleaner");
            return;
          }
        }
      }
    } catch {
      // Fallback
    }

    if (targetType === "json") {
      router.push("/tools/json-formatter");
    } else {
      router.push("/tools/text-cleaner");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 pt-4">
      <div className="p-3 sm:p-4 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-2xl shadow-lg flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 pl-2 shrink-0 hidden md:inline-flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Quick Launch:
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          {/* Upload File */}
          <Link
            href="/#universal-drop"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-white/[0.06] text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-white/[0.1] border border-indigo-200/80 dark:border-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Drop File</span>
          </Link>

          {/* Paste JSON */}
          <button
            type="button"
            onClick={() => handlePasteClipboard("json")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-50 dark:bg-white/[0.06] text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-white/[0.1] border border-cyan-200/80 dark:border-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <Braces className="w-3.5 h-3.5" />
            <span>Paste JSON</span>
          </button>

          {/* Paste Text */}
          <button
            type="button"
            onClick={() => handlePasteClipboard("text")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-white/[0.06] text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-white/[0.1] border border-emerald-200/80 dark:border-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste Text</span>
          </button>

          {/* Compress Image */}
          <Link
            href="/tools/image-compressor"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-purple-50 dark:bg-white/[0.06] text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-white/[0.1] border border-purple-200/80 dark:border-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Compress Image</span>
          </Link>

          {/* Workspace */}
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-sm shadow-indigo-500/20 shrink-0"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Workspace</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
