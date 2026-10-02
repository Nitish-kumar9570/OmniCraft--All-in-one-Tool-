"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Type,
  AlignLeft,
  Scissors,
  Repeat,
  FileText,
  Hash,
  Sparkles,
  Search,
  ListOrdered,
  Shuffle,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Reverse Text Tool (Chars, Words, Lines)
// ==========================================
export function ReverseTextTool() {
  const [text, setText] = useState("OmniCraft All-In-One Developer Platform");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getReversed = () => {
    if (mode === "chars") return text.split("").reverse().join("");
    if (mode === "words") return text.split(/\s+/).reverse().join(" ");
    return text.split("\n").reverse().join("\n");
  };

  const reversed = getReversed();

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["chars", "words", "lines"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize ${
              mode === m ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" : "border-slate-200 dark:border-white/10"
            }`}
          >
            Reverse {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold">Reversed Output</label>
            <button
              onClick={() => {
                copyToClipboard(reversed);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                success("Reversed text copied!");
              }}
              className="text-xs text-indigo-600 font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={reversed}
            readOnly
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

import { ToolResult } from "@/components/tools/ToolResult";
import { getToolBySlug } from "@/tools/registry";

// ==========================================
// 2. Clean Whitespace & Linebreaks Tool
// ==========================================
export function CleanWhitespaceTool() {
  const currentTool = getToolBySlug("clean-whitespace") || getToolBySlug("text-cleaner");
  const [text, setText] = useState("   Hello    world!   \n\n\n  This   is    OmniCraft.  ");
  const [originalText, setOriginalText] = useState("");
  const [result, setResult] = useState("");
  const { success, info } = useToast();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("omni_pending_input");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.text) {
          setText(parsed.text);
          setOriginalText(parsed.text);
          info(`Loaded text from ${parsed.sourceToolName || "previous tool"}`);
          sessionStorage.removeItem("omni_pending_input");
        }
      }
    } catch {}
  }, [info]);

  const handleClean = () => {
    const cleaned = text
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter((line) => line.length > 0)
      .join("\n");
    setOriginalText(text);
    setResult(cleaned);
    success("Whitespace cleaned!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Input Text with Messy Spaces</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleClean}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm cursor-pointer shadow-md shadow-indigo-500/20"
      >
        Strip Excess Spaces &amp; Empty Lines
      </button>

      {result && (
        <ToolResult
          title="Text Cleaned Successfully"
          copyText={result}
          currentTool={currentTool}
          outputType="text"
          originalText={originalText}
          modifiedText={result}
          summaryData={{
            type: "text",
            wordCount: result.trim().split(/\s+/).filter(Boolean).length,
            charCount: result.length,
            lineCount: result.split("\n").length,
          }}
        />
      )}
    </div>
  );
}

// ==========================================
// 3. Add Line Numbers Tool
// ==========================================
export function AddLineNumbersTool() {
  const [text, setText] = useState("Apple\nBanana\nOrange\nMango\nPineapple");
  const [startNum, setStartNum] = useState(1);
  const [separator, setSeparator] = useState(". ");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getNumbered = () => {
    const lines = text.split("\n");
    return lines.map((l, idx) => `${idx + startNum}${separator}${l}`).join("\n");
  };

  const numbered = getNumbered();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Start Number</label>
          <input
            type="number"
            value={startNum}
            onChange={(e) => setStartNum(parseInt(e.target.value, 10) || 1)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Number Separator (e.g. '. ', ') ', ': ')</label>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Plain Lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold">Numbered Lines</label>
            <button
              onClick={() => {
                copyToClipboard(numbered);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                success("Numbered list copied!");
              }}
              className="text-xs text-indigo-600 font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={numbered}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Morse Code Encoder & Decoder
// ==========================================
export function MorseCodeTool() {
  const [input, setInput] = useState("HELLO WORLD");
  const [isMorse, setIsMorse] = useState(false);
  const [output, setOutput] = useState("");
  const { success } = useToast();

  const morseMap: Record<string, string> = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
    "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    " ": "/",
  };

  const reverseMorse: Record<string, string> = Object.entries(morseMap).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {} as Record<string, string>);

  const handleConvert = () => {
    if (!isMorse) {
      // Text to Morse
      const res = input
        .toUpperCase()
        .split("")
        .map((c) => morseMap[c] || c)
        .join(" ");
      setOutput(res);
    } else {
      // Morse to Text
      const tokens = input.trim().split(/\s+/);
      const res = tokens.map((t) => reverseMorse[t] || t).join("");
      setOutput(res);
    }
    success("Morse code converted!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setIsMorse(false)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${!isMorse ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200"}`}
        >
          Text → Morse Code
        </button>
        <button
          onClick={() => setIsMorse(true)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${isMorse ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200"}`}
        >
          Morse Code → Plain Text
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder={isMorse ? "Enter morse code (... --- ...)" : "Enter plain text"}
        className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
      />

      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Convert Morse Code
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
// 5. Extract URLs & Hyperlinks Tool
// ==========================================
export function ExtractUrlsTool() {
  const [text, setText] = useState(
    "Check out https://omnicraft.dev/tools and documentation at https://github.com/omnicraft/docs. Contact us at http://support.company.org"
  );
  const [urls, setUrls] = useState<string[]>([]);
  const { success } = useToast();

  const handleExtract = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex) || [];
    const unique = Array.from(new Set(matches));
    setUrls(unique);
    success(`Extracted ${unique.length} URLs!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Source Text / Log / Document</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>

      <button
        onClick={handleExtract}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Extract All Web URLs
      </button>

      {urls.length > 0 && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
          <h3 className="font-bold text-sm">Extracted URLs ({urls.length})</h3>
          <div className="space-y-1.5">
            {urls.map((u, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 font-mono text-xs flex justify-between items-center">
                <span className="truncate">{u}</span>
                <button onClick={() => copyToClipboard(u)} className="text-indigo-600 font-bold text-[10px] ml-2">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. Extract Email Addresses Tool
// ==========================================
export function ExtractEmailsTool() {
  const [text, setText] = useState(
    "Contact alex.smith@enterprise.org, support@omnicraft.dev or sales-team@startup.io for inquiries."
  );
  const [emails, setEmails] = useState<string[]>([]);
  const { success } = useToast();

  const handleExtract = () => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const matches = text.match(emailRegex) || [];
    const unique = Array.from(new Set(matches));
    setEmails(unique);
    success(`Extracted ${unique.length} email addresses!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Source Text / Email Body / Document</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>

      <button
        onClick={handleExtract}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Extract Email Addresses
      </button>

      {emails.length > 0 && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
          <h3 className="font-bold text-sm">Extracted Emails ({emails.length})</h3>
          <div className="space-y-1.5">
            {emails.map((em, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 font-mono text-xs flex justify-between items-center">
                <span className="truncate">{em}</span>
                <button onClick={() => copyToClipboard(em)} className="text-indigo-600 font-bold text-[10px] ml-2">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. NATO Phonetic Alphabet Converter
// ==========================================
export function NatoPhoneticTool() {
  const [text, setText] = useState("OMNICRAFT");
  const nato: Record<string, string> = {
    A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot",
    G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima",
    M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo",
    S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray",
    Y: "Yankee", Z: "Zulu", "0": "Zero", "1": "One", "2": "Two", "3": "Three",
    "4": "Four", "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
  };

  const converted = text
    .toUpperCase()
    .split("")
    .map((char) => nato[char] || char)
    .join(" ");

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Text or Call Sign</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs uppercase"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <span className="text-xs font-bold">NATO Phonetic Spelling</span>
        <div className="p-4 rounded-xl bg-slate-900 text-indigo-300 font-mono text-sm leading-relaxed">
          {converted}
        </div>
      </div>
    </div>
  );
}
