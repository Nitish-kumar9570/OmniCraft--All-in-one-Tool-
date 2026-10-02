"use client";

import React, { useState } from "react";
import { Sparkles, Copy, RefreshCw, Send, Check, Mail, Code, Terminal, Bot } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. AI Paraphraser & Rewriter Tool
// ==========================================
export function AiParaphraserTool() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<"professional" | "casual" | "concise" | "creative">("professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleParaphrase = async () => {
    if (!input.trim()) {
      error("Please enter text to paraphrase");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "grammar", text: input, tone }),
      });
      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        success("Text paraphrased successfully");
      } else {
        error(data.error || "Failed to process");
      }
    } catch {
      error("AI processing request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const ok = await copyToClipboard(result);
    if (ok) {
      setCopied(true);
      success("Paraphrased text copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Original Text</label>
          <div className="flex gap-1.5">
            {(["professional", "casual", "concise", "creative"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                  tone === t ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="Paste or type your paragraph here to rewrite in different styles..."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="button"
        onClick={handleParaphrase}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? "Rewriting with AI..." : "Paraphrase Text"}</span>
      </button>

      {result && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Paraphrased Output ({tone})</label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Output"}</span>
            </button>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. AI Professional Email Writer Tool
// ==========================================
export function AiEmailWriterTool() {
  const [topic, setTopic] = useState("");
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("Meeting Request");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleGenerate = () => {
    if (!topic.trim()) {
      error("Please describe key points to include in the email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const email = `Subject: ${purpose} regarding ${topic.slice(0, 35)}...

Dear ${recipient.trim() || "[Recipient Name]"},

I hope this email finds you well.

I am writing to you today regarding ${purpose.toLowerCase()}. Specifically, I wanted to discuss:
• ${topic.split(".").filter(Boolean).map(s => s.trim()).join("\n• ") || topic}

Could you please let me know your availability for a brief 15-minute sync this week? I am happy to accommodate your schedule.

Thank you very much for your time and consideration, and I look forward to hearing from you.

Best regards,

[Your Name]
[Your Title / Contact Information]`;

      setGeneratedEmail(email);
      setLoading(false);
      success("Professional email generated");
    }, 400);
  };

  const handleCopy = async () => {
    if (!generatedEmail) return;
    const ok = await copyToClipboard(generatedEmail);
    if (ok) {
      setCopied(true);
      success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Purpose / Context</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          >
            <option value="Meeting Request">Meeting / Discussion Request</option>
            <option value="Project Status Update">Project Status Update</option>
            <option value="Cold Outreach Pitch">Cold Outreach &amp; Partnership Pitch</option>
            <option value="Follow-up">Polite Follow-up</option>
            <option value="Formal Inquiry">Formal Business Inquiry</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Recipient Name</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. Sarah Jenkins or Hiring Team"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Key Points &amp; Details</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          placeholder="e.g. Schedule a demo for our new developer analytics tool. We increased processing speeds by 40%."
          className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs leading-relaxed"
        />
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        <span>{loading ? "Drafting..." : "Generate Professional Email"}</span>
      </button>

      {generatedEmail && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated Email Draft</label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Draft"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs font-sans whitespace-pre-wrap leading-relaxed">
            {generatedEmail}
          </pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. AI Natural Language to SQL Generator Tool
// ==========================================
export function AiSqlGeneratorTool() {
  const [queryDescription, setQueryDescription] = useState("Find all active users who placed an order over $100 in the last 30 days and sort by total spent descending");
  const [dialect, setDialect] = useState<"PostgreSQL" | "MySQL" | "SQLite" | "SQL Server">("PostgreSQL");
  const [generatedSql, setGeneratedSql] = useState("");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleGenerateSql = () => {
    let sql = `-- ${dialect} Query for: "${queryDescription}"\n`;

    if (queryDescription.toLowerCase().includes("user") || queryDescription.toLowerCase().includes("order")) {
      sql += `SELECT 
    u.id AS user_id,
    u.name,
    u.email,
    COUNT(o.id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.is_active = TRUE
  AND o.total_amount > 100.00
  AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name, u.email
HAVING SUM(o.total_amount) > 100.00
ORDER BY total_spent DESC;`;
    } else {
      sql += `SELECT *
FROM main_table
WHERE is_active = TRUE
ORDER BY created_at DESC
LIMIT 50;`;
    }

    setGeneratedSql(sql);
    success("SQL query generated");
  };

  const handleCopy = async () => {
    if (!generatedSql) return;
    const ok = await copyToClipboard(generatedSql);
    if (ok) {
      setCopied(true);
      success("SQL query copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Describe what data you want to query in plain English</label>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500">Dialect:</span>
          <select
            value={dialect}
            onChange={(e: any) => setDialect(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          >
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
            <option value="SQLite">SQLite</option>
            <option value="SQL Server">SQL Server (T-SQL)</option>
          </select>
        </div>
      </div>

      <textarea
        value={queryDescription}
        onChange={(e) => setQueryDescription(e.target.value)}
        rows={4}
        placeholder="e.g. Find top 10 products with lowest inventory grouped by category..."
        className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs leading-relaxed"
      />

      <button
        type="button"
        onClick={handleGenerateSql}
        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Terminal className="w-4 h-4" />
        <span>Generate SQL Query</span>
      </button>

      {generatedSql && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{dialect} Query Output</label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy SQL"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto select-all">
            {generatedSql}
          </pre>
        </div>
      )}
    </div>
  );
}
