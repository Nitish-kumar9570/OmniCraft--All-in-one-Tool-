"use client";

import React, { useState } from "react";
import { Copy, Download, Code, Play, Check, Terminal, FileCode, CheckCircle2, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. Regex Tester & Matcher Tool
// ==========================================
export function RegexTesterTool() {
  const [pattern, setPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState<string>("g");
  const [testText, setTestText] = useState<string>(
    "Contact our team at support@omnicraft.dev or sales.dept@enterprise-company.org for inquiries. Invalid: test@.com"
  );
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const getMatches = () => {
    if (!pattern.trim()) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const matches: Array<{ match: string; index: number; groups?: string[] }> = [];
      let m;
      if (flags.includes("g")) {
        while ((m = regex.exec(testText)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) break; // avoid infinite loop on empty match
        }
      } else {
        m = regex.exec(testText);
        if (m) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        }
      }
      return matches;
    } catch {
      return [];
    }
  };

  const matches = getMatches();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Regular Expression Pattern</label>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] px-3">
            <span className="text-slate-400 font-mono text-xs">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b"
              className="w-full p-2.5 bg-transparent font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <span className="text-slate-400 font-mono text-xs">/</span>
          </div>
        </div>

        <div className="w-full sm:w-36">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Flags (e.g. g, i, m)</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Test String Content</label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Matches Found ({matches.length})
            </label>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
              {matches.length > 0 ? "Pattern Valid" : "No Matches"}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 h-[190px] overflow-y-auto space-y-1.5 font-mono text-xs">
            {matches.length === 0 ? (
              <div className="text-slate-400 text-xs py-8 text-center">No regular expression matches found.</div>
            ) : (
              matches.map((m, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-[200px]">{m.match}</span>
                  <span className="text-[10px] text-slate-400">Index: {m.index}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. SQL Formatter Tool
// ==========================================
export function SqlFormatterTool() {
  const [sql, setSql] = useState("select u.id, u.name, o.total from users u left join orders o on u.id = o.user_id where o.total > 50 and u.status = 'active' group by u.id, u.name order by o.total desc limit 10;");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const formatSql = (raw: string): string => {
    const keywords = [
      "SELECT", "FROM", "WHERE", "AND", "OR", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN",
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION ALL", "UNION", "INSERT INTO",
      "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "ON",
      "AS", "IN", "NOT IN", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "DESC", "ASC"
    ];

    let formatted = raw.trim();
    // Normalize spaces
    formatted = formatted.replace(/\s+/g, " ");

    // Keyword Uppercasing and line breaks
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(regex, kw);
    });

    const breakKeywords = ["SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "VALUES", "SET"];
    breakKeywords.forEach((kw) => {
      const regex = new RegExp(`\\s+(${kw})\\s+`, "g");
      formatted = formatted.replace(regex, "\n$1 ");
    });

    // Indent clauses
    formatted = formatted.replace(/\n(AND|OR)\s+/g, "\n  $1 ");

    return formatted;
  };

  const formattedOutput = formatSql(sql);

  const handleCopy = async () => {
    const ok = await copyToClipboard(formattedOutput);
    if (ok) {
      setCopied(true);
      success("Formatted SQL copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Input Raw SQL</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Formatted SQL Query</label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy SQL"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={formattedOutput}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 font-mono text-xs text-emerald-600 dark:text-emerald-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. JSON to TypeScript Interface Tool
// ==========================================
export function JsonToTypescriptTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: "usr_991823",
        username: "alex_dev",
        email: "alex@omnicraft.dev",
        isActive: true,
        age: 28,
        roles: ["admin", "developer"],
        profile: {
          avatarUrl: "https://example.com/avatar.jpg",
          location: "San Francisco, CA",
        },
      },
      null,
      2
    )
  );
  const [rootName, setRootName] = useState("UserProfile");
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const convertJsonToTs = (obj: any, name: string): string => {
    if (typeof obj !== "object" || obj === null) return `type ${name} = any;`;

    if (Array.isArray(obj)) {
      const itemType = obj.length > 0 ? typeof obj[0] : "any";
      return `export type ${name} = ${itemType}[];`;
    }

    let subInterfaces = "";
    let lines = [`export interface ${name} {`];

    for (const [key, value] of Object.entries(obj)) {
      let type: string = typeof value;
      if (value === null) {
        type = "any | null";
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          const subName = `${key.charAt(0).toUpperCase() + key.slice(1)}Item`;
          subInterfaces += convertJsonToTs(value[0], subName) + "\n\n";
          type = `${subName}[]`;
        } else if (value.length > 0) {
          type = `${typeof value[0]}[]`;
        } else {
          type = "any[]";
        }
      } else if (type === "object") {
        const subName = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
        subInterfaces += convertJsonToTs(value, subName) + "\n\n";
        type = subName;
      }
      lines.push(`  ${key}: ${type};`);
    }
    lines.push("}");

    return subInterfaces + lines.join("\n");
  };

  const getTypescriptCode = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      return convertJsonToTs(parsed, rootName || "RootType");
    } catch {
      return "// Invalid JSON input. Please ensure valid JSON format.";
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getTypescriptCode());
    if (ok) {
      setCopied(true);
      success("TypeScript interface copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full sm:w-72">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Root Interface Name</label>
        <input
          type="text"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="e.g. UserResponse"
          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-semibold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Input JSON Object</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={12}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated TypeScript</label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy TS"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={getTypescriptCode()}
            rows={12}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 font-mono text-xs text-indigo-600 dark:text-indigo-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. NanoID & Cryptographic ID Generator
// ==========================================
export function NanoidGeneratorTool() {
  const [length, setLength] = useState<number>(21);
  const [count, setCount] = useState<number>(5);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const generateNanoids = () => {
    const alphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLFG_zcfghjkqvwyz271";
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
      let id = "";
      const randomValues = new Uint8Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let j = 0; j < length; j++) {
        id += alphabet[randomValues[j] % alphabet.length];
      }
      ids.push(id);
    }
    setGeneratedIds(ids);
    success(`Generated ${count} NanoIDs`);
  };

  const handleCopy = async () => {
    if (generatedIds.length === 0) return;
    const ok = await copyToClipboard(generatedIds.join("\n"));
    if (ok) {
      setCopied(true);
      success("IDs copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">ID Length: {length} chars</label>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Quantity: {count}</label>
          <input
            type="range"
            min="1"
            max="25"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={generateNanoids}
        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Code className="w-4 h-4" />
        <span>Generate NanoIDs</span>
      </button>

      {generatedIds.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated NanoIDs</label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy All"}</span>
            </button>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {generatedIds.map((id, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{id}</span>
                <button
                  type="button"
                  onClick={() => { copyToClipboard(id); success("Copied ID"); }}
                  className="text-[11px] text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
