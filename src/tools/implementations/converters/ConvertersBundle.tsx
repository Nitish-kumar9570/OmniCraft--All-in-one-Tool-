"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Copy, Check, Hash, Thermometer, Database, Clock } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Number Base Converter Tool
// ==========================================
export function NumberBaseTool() {
  const [dec, setDec] = useState<string>("255");
  const [copied, setCopied] = useState<string | null>(null);
  const { success } = useToast();

  const parseDec = parseInt(dec, 10);
  const isValid = !isNaN(parseDec) && parseDec >= 0;

  const bin = isValid ? parseDec.toString(2) : "";
  const oct = isValid ? parseDec.toString(8) : "";
  const hex = isValid ? parseDec.toString(16).toUpperCase() : "";

  const handleCopy = async (val: string, key: string) => {
    if (!val) return;
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopied(key);
      success("Copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
          Decimal Number (Base 10)
        </label>
        <input
          type="number"
          value={dec}
          onChange={(e) => setDec(e.target.value)}
          placeholder="Enter a decimal number..."
          className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Binary (Base 2)</span>
            <button type="button" onClick={() => handleCopy(bin, "bin")} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
              {copied === "bin" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 font-mono text-sm text-indigo-600 dark:text-indigo-400 break-all select-all font-bold">
            {bin || "0"}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Hexadecimal (Base 16)</span>
            <button type="button" onClick={() => handleCopy(hex, "hex")} className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer">
              {copied === "hex" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 font-mono text-sm text-purple-600 dark:text-purple-400 break-all select-all font-bold">
            {hex || "0"}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Octal (Base 8)</span>
            <button type="button" onClick={() => handleCopy(oct, "oct")} className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer">
              {copied === "oct" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 font-mono text-sm text-emerald-600 dark:text-emerald-400 break-all select-all font-bold">
            {oct || "0"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Roman Numeral Converter Tool
// ==========================================
export function RomanNumeralTool() {
  const [num, setNum] = useState<number>(2026);
  const [romanInput, setRomanInput] = useState<string>("MMXXVI");

  const toRoman = (n: number): string => {
    if (n <= 0 || n > 3999) return "Enter 1 - 3999";
    const lookup: Record<string, number> = {
      M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
      L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    let str = "";
    for (const i in lookup) {
      while (n >= lookup[i]) {
        str += i;
        n -= lookup[i];
      }
    }
    return str;
  };

  const fromRoman = (str: string): number => {
    const lookup: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let sum = 0;
    const clean = str.toUpperCase().trim();
    for (let i = 0; i < clean.length; i++) {
      const cur = lookup[clean[i]] || 0;
      const next = lookup[clean[i + 1]] || 0;
      if (cur < next) {
        sum -= cur;
      } else {
        sum += cur;
      }
    }
    return sum;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Number to Roman</label>
          <input
            type="number"
            min="1"
            max="3999"
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
          />
          <div className="text-xs text-slate-500">Result:</div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">
            {toRoman(num)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Roman to Number</label>
          <input
            type="text"
            value={romanInput}
            onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
            placeholder="e.g. MCMLXXXIV"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
          />
          <div className="text-xs text-slate-500">Result:</div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">
            {fromRoman(romanInput)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Digital Storage Converter Tool
// ==========================================
export function DataStorageTool() {
  const [val, setVal] = useState<number>(1);
  const [unit, setUnit] = useState<"GB" | "MB" | "TB" | "KB" | "B">("GB");

  const toBytes = (v: number, u: string): number => {
    switch (u) {
      case "B": return v;
      case "KB": return v * 1024;
      case "MB": return v * 1024 * 1024;
      case "GB": return v * 1024 * 1024 * 1024;
      case "TB": return v * 1024 * 1024 * 1024 * 1024;
      default: return v;
    }
  };

  const bytes = toBytes(val, unit);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Value</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Unit</label>
          <select
            value={unit}
            onChange={(e: any) => setUnit(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          >
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="MB">Megabytes (MB)</option>
            <option value="GB">Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div className="text-[10px] text-slate-500 font-sans">Bytes</div>
          <div className="text-xs font-bold truncate mt-0.5">{bytes.toLocaleString()} B</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div className="text-[10px] text-slate-500 font-sans">Megabytes</div>
          <div className="text-xs font-bold truncate mt-0.5">{(bytes / (1024 * 1024)).toLocaleString()} MB</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div className="text-[10px] text-slate-500 font-sans">Gigabytes</div>
          <div className="text-xs font-bold truncate mt-0.5 text-indigo-600 dark:text-indigo-400">
            {(bytes / (1024 * 1024 * 1024)).toLocaleString()} GB
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div className="text-[10px] text-slate-500 font-sans">Terabytes</div>
          <div className="text-xs font-bold truncate mt-0.5">
            {(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(4)} TB
          </div>
        </div>
      </div>
    </div>
  );
}
