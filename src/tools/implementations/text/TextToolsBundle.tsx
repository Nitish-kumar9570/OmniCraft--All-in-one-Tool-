"use client";

import React, { useState } from "react";
import { Copy, Download, RotateCcw, ArrowUpDown, Search, RefreshCw, Check, Code, FileText } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Sort Lines Tool
// ==========================================
export function SortLinesTool() {
  const [text, setText] = useState("Orange\nApple\nBanana\nMango\nGrape\napple\nPineapple");
  const [order, setOrder] = useState<"asc" | "desc" | "length" | "natural">("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [deduplicate, setDeduplicate] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getSorted = () => {
    let lines = text.split("\n");
    if (deduplicate) {
      lines = Array.from(new Set(lines));
    }

    lines.sort((a, b) => {
      if (order === "length") {
        return a.length - b.length || a.localeCompare(b);
      }
      if (!caseSensitive) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    });

    return lines.join("\n");
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getSorted());
    if (ok) {
      setCopied(true);
      success("Sorted lines copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(["asc", "desc", "length", "natural"] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrder(o)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                order === o ? "bg-indigo-600 text-white shadow-xs" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {o === "asc" ? "A → Z" : o === "desc" ? "Z → A" : o === "length" ? "By Length" : "Natural"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded text-indigo-600" />
            <span>Case Sensitive</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={deduplicate} onChange={(e) => setDeduplicate(e.target.checked)} className="rounded text-indigo-600" />
            <span>Deduplicate</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Input Text Lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sorted Output</label>
            <button type="button" onClick={handleCopy} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={getSorted()}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Find and Replace Tool
// ==========================================
export function FindReplaceTool() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The fox is fast and the dog is sleepy.");
  const [find, setFind] = useState("fox");
  const [replaceWith, setReplaceWith] = useState("cat");
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const getResult = () => {
    if (!find) return text;
    try {
      if (useRegex) {
        const regex = new RegExp(find, matchCase ? "g" : "gi");
        return text.replace(regex, replaceWith);
      } else {
        if (!matchCase) {
          const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
          return text.replace(regex, replaceWith);
        }
        return text.replaceAll(find, replaceWith);
      }
    } catch {
      return text;
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getResult());
    if (ok) {
      setCopied(true);
      success("Replaced text copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Find String / Pattern</label>
          <input
            type="text"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="Text to find..."
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Replace With</label>
          <input
            type="text"
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            placeholder="Replacement text..."
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} className="rounded text-indigo-600" />
          <span>Match Case</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded text-indigo-600" />
          <span>Regular Expression (RegEx)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Replaced Result</label>
            <button type="button" onClick={handleCopy} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={getResult()}
            rows={8}
            className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 text-xs focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Text to Binary & Hex Tool
// ==========================================
export function TextToBinaryTool() {
  const [text, setText] = useState("OmniCraft");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const toBinary = () => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const toHex = () => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase())
      .join(" ");
  };

  const handleCopy = async (val: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopied(true);
      success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter Plain Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-medium"
        />
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Binary (8-bit ASCII)</span>
            <button type="button" onClick={() => handleCopy(toBinary())} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
              Copy Binary
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-xs font-mono text-indigo-600 dark:text-indigo-400 break-all select-all">
            {toBinary() || "00000000"}
          </pre>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Hexadecimal</span>
            <button type="button" onClick={() => handleCopy(toHex())} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
              Copy Hex
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-xs font-mono text-purple-600 dark:text-purple-400 break-all select-all">
            {toHex() || "00"}
          </pre>
        </div>
      </div>
    </div>
  );
}
