"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Code,
  Repeat,
  Sparkles,
  Shuffle,
  FileCode,
  Hash,
  Type,
  AlignLeft,
  ListOrdered,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Binary to Plain Text Converter
// ==========================================
export function BinaryToTextTool() {
  const [binary, setBinary] = useState("01001111 01101101 01101110 01101001 01000011 01110010 01100001 01100110 01110100");
  const [text, setText] = useState("");
  const { success, error } = useToast();

  const handleConvert = () => {
    try {
      const clean = binary.trim().split(/\s+/);
      const str = clean.map((b) => String.fromCharCode(parseInt(b, 2))).join("");
      setText(str);
      success("Binary decoded!");
    } catch {
      error("Invalid binary string");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">8-Bit Binary Sequence (e.g. 01001000 01101001)</label>
        <textarea
          value={binary}
          onChange={(e) => setBinary(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Decode Binary to Text
      </button>

      {text && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">Decoded Text</span>
            <button onClick={() => copyToClipboard(text)} className="text-xs text-indigo-600 font-bold">Copy</button>
          </div>
          <p className="text-sm font-semibold">{text}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. ROT13 & Caesar Cipher Tool
// ==========================================
export function Rot13Tool() {
  const [text, setText] = useState("Why did the developer cross the road? Gb trg gb gur bgure fvqr!");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const output = rot13(text);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold">ROT13 Cipher Output</label>
            <button
              onClick={() => {
                copyToClipboard(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                success("Copied!");
              }}
              className="text-xs text-indigo-600 font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. LeetSpeak (1337 5P34K) Generator
// ==========================================
export function LeetSpeakTool() {
  const [text, setText] = useState("OmniCraft is the ultimate developer toolbox for elite hackers");
  const { success } = useToast();

  const toLeet = (str: string) => {
    return str
      .replace(/a/gi, "4")
      .replace(/e/gi, "3")
      .replace(/i/gi, "1")
      .replace(/o/gi, "0")
      .replace(/t/gi, "7")
      .replace(/s/gi, "5");
  };

  const output = toLeet(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Normal Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">1337 Output</span>
          <button onClick={() => copyToClipboard(output)} className="text-xs text-indigo-600 font-bold">Copy</button>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm font-bold">
          {output}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Text to Hex & Hex to Text Converter
// ==========================================
export function HexToTextTool() {
  const [input, setInput] = useState("4f 6d 6e 69 43 72 61 66 74");
  const [isDecode, setIsDecode] = useState(true);
  const [output, setOutput] = useState("");
  const { success } = useToast();

  const handleConvert = () => {
    if (isDecode) {
      const clean = input.replace(/0x|\s+/g, "");
      let res = "";
      for (let i = 0; i < clean.length; i += 2) {
        res += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
      }
      setOutput(res);
    } else {
      let res = "";
      for (let i = 0; i < input.length; i++) {
        res += input.charCodeAt(i).toString(16).padStart(2, "0") + " ";
      }
      setOutput(res.trim());
    }
    success("Converted!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setIsDecode(true)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${isDecode ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200"}`}
        >
          Hex → Text
        </button>
        <button
          onClick={() => setIsDecode(false)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${!isDecode ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200"}`}
        >
          Text → Hex
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
      />

      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Convert
      </button>

      {output && (
        <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs break-all">
          {output}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. Prefix / Suffix Every Line Tool
// ==========================================
export function PrefixSuffixTool() {
  const [text, setText] = useState("item_one\nitem_two\nitem_three");
  const [prefix, setPrefix] = useState("const ");
  const [suffix, setSuffix] = useState(" = true;");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const transformed = text
    .split("\n")
    .map((l) => `${prefix}${l}${suffix}`)
    .join("\n");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Line Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Line Suffix</label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Input Lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold">Prefixed/Suffixed Output</label>
            <button
              onClick={() => {
                copyToClipboard(transformed);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                success("Copied!");
              }}
              className="text-xs text-indigo-600 font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={transformed}
            readOnly
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Text Repeater Tool
// ==========================================
export function TextRepeaterTool() {
  const [text, setText] = useState("OmniCraft ");
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState("\n");
  const [result, setResult] = useState("");
  const { success } = useToast();

  const handleRepeat = () => {
    const arr = new Array(Math.min(1000, count)).fill(text);
    setResult(arr.join(separator));
    success(`Repeated ${count} times!`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="text-xs font-bold block mb-1">Text String</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Repeat Count</label>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <button
        onClick={handleRepeat}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Repeat String
      </button>

      {result && (
        <textarea
          value={result}
          readOnly
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
        />
      )}
    </div>
  );
}
