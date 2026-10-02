"use client";

import React, { useState, useEffect } from "react";
import { Globe, Copy, Check, Search, Laptop, Code2, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. URL & Query String Parser Tool
// ==========================================
export function UrlParserTool() {
  const [urlInput, setUrlInput] = useState(
    "https://omnicraft.dev:8080/tools/pdf-compress?ref=google&utm_source=twitter&tab=settings#features"
  );
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const parseUrl = () => {
    try {
      const parsed = new URL(urlInput);
      const params: Record<string, string> = {};
      parsed.searchParams.forEach((v, k) => {
        params[k] = v;
      });

      return {
        isValid: true,
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || "(default)",
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        origin: parsed.origin,
        params,
      };
    } catch {
      return { isValid: false };
    }
  };

  const parsed = parseUrl();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter URL to Parse</label>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/path?key=value#hash"
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-semibold"
        />
      </div>

      {parsed.isValid ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Protocol</span>
              <div className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">{parsed.protocol}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Hostname</span>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white truncate">{parsed.hostname}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Port</span>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">{parsed.port}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Pathname</span>
              <div className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 truncate">{parsed.pathname}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Hash / Anchor</span>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">{parsed.hash || "(none)"}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="text-[10px] text-slate-500 font-sans">Origin</span>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white truncate">{parsed.origin}</div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Query Parameters ({Object.keys(parsed.params || {}).length})
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5 font-mono text-xs">
              {Object.keys(parsed.params || {}).length === 0 ? (
                <div className="text-slate-400 text-xs">No query parameters found in URL.</div>
              ) : (
                Object.entries(parsed.params || {}).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#0c1322] border border-slate-200/60 dark:border-white/5">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{k}</span>
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-xs">{v}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 text-xs font-medium">
          Invalid URL format. Please include protocol (e.g. https://).
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. HTML Entity Encoder & Decoder
// ==========================================
export function HtmlEntityEncoderTool() {
  const [text, setText] = useState('<div class="tool-card">© 2026 "OmniCraft" & \'Friends\'</div>');
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const processHtml = () => {
    if (mode === "encode") {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/©/g, "&copy;");
    } else {
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.documentElement.textContent || "";
    }
  };

  const output = processHtml();

  const handleCopy = async () => {
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      success("Result copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] max-w-xs">
        <button
          type="button"
          onClick={() => setMode("encode")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === "encode" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Encode Entities
        </button>
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            mode === "decode" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Decode Entities
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Input Text / HTML
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 font-mono text-xs text-indigo-600 dark:text-indigo-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
