"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Code2,
  Terminal,
  Database,
  Key,
  Shield,
  Zap,
  Globe,
  Sliders,
  Table,
  User,
  Layers,
  FileCode,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. JSON to CSV & CSV to JSON Converter
// ==========================================
export function JsonToCsvTool() {
  const [json, setJson] = useState(`[\n  {"id": 1, "name": "Alice", "role": "Engineer"},\n  {"id": 2, "name": "Bob", "role": "Designer"}\n]`);
  const [csv, setCsv] = useState("");
  const { success, error } = useToast();

  const handleConvert = () => {
    try {
      const arr = JSON.parse(json);
      if (!Array.isArray(arr) || arr.length === 0) {
        error("JSON must be an array of objects");
        return;
      }
      const headers = Object.keys(arr[0]);
      const rows = arr.map((item) => headers.map((h) => `"${item[h] ?? ""}"`).join(","));
      const result = [headers.join(","), ...rows].join("\n");
      setCsv(result);
      success("Converted JSON to CSV!");
    } catch {
      error("Invalid JSON input");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">JSON Array</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">CSV Output</label>
            {csv && <button onClick={() => copyToClipboard(csv)} className="text-xs text-cyan-600 font-bold">Copy</button>}
          </div>
          <textarea
            value={csv}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Convert JSON to CSV
      </button>
    </div>
  );
}

// ==========================================
// 2. HTML Minifier & Cleaner Tool
// ==========================================
export function HtmlMinifierTool() {
  const [html, setHtml] = useState(`<!DOCTYPE html>\n<html>\n  <head>\n    <title>Test</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`);
  const [minified, setMinified] = useState("");
  const { success } = useToast();

  const handleMinify = () => {
    const clean = html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
    setMinified(clean);
    success("HTML minified!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Formatted HTML</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Minified HTML</label>
            {minified && <button onClick={() => copyToClipboard(minified)} className="text-xs text-cyan-600 font-bold">Copy</button>}
          </div>
          <textarea
            value={minified}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs break-all"
          />
        </div>
      </div>
      <button
        onClick={handleMinify}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Minify HTML
      </button>
    </div>
  );
}

// ==========================================
// 3. CSS Specificity Calculator
// ==========================================
export function CssSpecificityCalculatorTool() {
  const [selector, setSelector] = useState("nav.main-menu ul li#active a:hover");
  const { success } = useToast();

  const calculateSpecificity = (sel: string) => {
    const ids = (sel.match(/#[a-zA-Z0-9_-]+/g) || []).length;
    const classes = (sel.match(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|:[a-zA-Z0-9_-]+/g) || []).length;
    const elements = (sel.match(/(^[a-zA-Z0-9_-]+|\s[a-zA-Z0-9_-]+)/g) || []).length;
    return { ids, classes, elements, score: `(${ids}, ${classes}, ${elements})` };
  };

  const spec = calculateSpecificity(selector);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">CSS Selector</label>
        <input
          type="text"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-cyan-600 dark:text-cyan-400"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">IDs (a)</span>
          <span className="text-2xl font-extrabold text-indigo-600">{spec.ids}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Classes & Pseudo (b)</span>
          <span className="text-2xl font-extrabold text-cyan-600">{spec.classes}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Elements (c)</span>
          <span className="text-2xl font-extrabold text-emerald-600">{spec.elements}</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-center text-sm font-bold">
        Specificity Vector: {spec.score}
      </div>
    </div>
  );
}

// ==========================================
// 4. API Key & High-Entropy Secret Generator
// ==========================================
export function ApiKeyGeneratorTool() {
  const [prefix, setPrefix] = useState("api_key_");
  const [length, setLength] = useState(32);
  const [apiKey, setApiKey] = useState("");
  const { success } = useToast();

  const handleGenerate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let rand = "";
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      rand += chars[bytes[i] % chars.length];
    }
    setApiKey(`${prefix}${rand}`);
    success("Secure API Key Generated!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Key Prefix (e.g. api_key_, token_)</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Random Characters Length</label>
          <input
            type="number"
            min={16}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10) || 32)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Generate Cryptographically Secure API Key
      </button>

      {apiKey && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">API Key</span>
            <button onClick={() => copyToClipboard(apiKey)} className="text-xs text-cyan-600 font-bold">Copy</button>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs break-all">
            {apiKey}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. Gitignore File Generator Tool
// ==========================================
export function GitignoreGeneratorTool() {
  const [template, setTemplate] = useState<"node" | "python" | "go" | "rust">("node");
  const { success } = useToast();

  const getGitignore = () => {
    if (template === "node") {
      return `node_modules/\n.next/\nbuild/\ndist/\n.env\n.env.local\n*.log\nnpm-debug.log*\n.DS_Store`;
    }
    if (template === "python") {
      return `__pycache__/\n*.py[cod]\n*$py.class\nvenv/\n.env\n.pytest_cache/\n.coverage\nbuild/\ndist/`;
    }
    if (template === "go") {
      return `bin/\n*.exe\n*.test\n*.out\nvendor/\n.env`;
    }
    return `target/\nCargo.lock\n**/*.rs.bk\n.env`;
  };

  const gitignore = getGitignore();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Project Stack Template</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["node", "python", "go", "rust"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`p-2.5 rounded-xl border text-xs font-bold uppercase ${
                template === t ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600" : "border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">.gitignore Content</span>
          <button
            onClick={() => {
              copyToClipboard(gitignore);
              success(".gitignore copied!");
            }}
            className="text-xs text-cyan-600 font-bold"
          >
            Copy
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs">
          {gitignore}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 6. Mock JSON API Generator Tool
// ==========================================
export function MockJsonApiGeneratorTool() {
  const [count, setCount] = useState(3);
  const [mockData, setMockData] = useState("");
  const { success } = useToast();

  const handleGenerate = () => {
    const users = Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      name: ["Sarah Connor", "John Wick", "Alex Mercer", "Diana Prince"][i % 4],
      email: `user_${i + 1}@example.com`,
      role: i === 0 ? "admin" : "member",
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
    }));
    setMockData(JSON.stringify(users, null, 2));
    success("Mock JSON dataset created!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold block mb-1">Number of Mock Records</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="mt-5 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
        >
          Generate Mock API JSON
        </button>
      </div>

      {mockData && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">Generated Mock API Response</span>
            <button onClick={() => copyToClipboard(mockData)} className="text-xs text-cyan-600 font-bold">Copy</button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto">
            {mockData}
          </pre>
        </div>
      )}
    </div>
  );
}
