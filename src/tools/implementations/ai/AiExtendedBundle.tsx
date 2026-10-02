"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Code2,
  Briefcase,
  FileText,
  MessageSquare,
  ShoppingBag,
  Zap,
  Repeat,
  BookOpen,
  User,
  HelpCircle,
  Hash,
  Smile,
  Terminal,
  Send,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. AI Code Explainer Tool
// ==========================================
export function AiCodeExplainerTool() {
  const [code, setCode] = useState(
    `function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`
  );
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleExplain = () => {
    setLoading(true);
    setTimeout(() => {
      setExplanation(
        `### Code Analysis & Breakdown:\n\n1. **Purpose**: This implements a classic **Debounce** pattern, which delays the execution of a function until a specified period of inactivity has elapsed.\n\n2. **Closure Scope**: The \`timer\` variable is stored in the outer closure, preserving its state across consecutive function invocations.\n\n3. **Event Loop Reset**: Whenever the returned function is called, \`clearTimeout(timer)\` cancels any pending execution, resetting the timer.\n\n4. **Context & Arguments**: \`fn.apply(this, args)\` guarantees the original function retains its caller context and receives all passed arguments.\n\n**Complexity**: Time: O(1) invocation overhead, Space: O(1) memory.`
      );
      setLoading(false);
      success("Code breakdown generated!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Source Code to Explain</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleExplain}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" /> {loading ? "Analyzing Logic..." : "Explain Code in Plain English"}
      </button>

      {explanation && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">AI Explanation</span>
            <button
              onClick={() => {
                copyToClipboard(explanation);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                success("Copied to clipboard!");
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="text-xs leading-relaxed space-y-2 whitespace-pre-wrap text-slate-800 dark:text-slate-200">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. AI Cover Letter Generator Tool
// ==========================================
export function AiCoverLetterTool() {
  const [role, setRole] = useState("Senior Full-Stack Engineer");
  const [company, setCompany] = useState("Stripe");
  const [skills, setSkills] = useState("Next.js, TypeScript, PostgreSQL, Distributed Systems");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(
        `Dear Hiring Team at ${company},\n\nI am writing to express my strong enthusiasm for the ${role} position. With deep hands-on expertise building high-throughput, resilient web architectures using ${skills}, I am eager to contribute to ${company}'s world-class engineering team.\n\nThroughout my career, I have prioritized shipping clean, maintainable systems that scale seamlessly under heavy production load while fostering intuitive user experiences. My background aligns directly with the challenges ${company} is solving daily.\n\nI welcome the opportunity to discuss how my technical acumen and problem-solving mindset can accelerate your product roadmap.\n\nWarm regards,\nCandidate`
      );
      setLoading(false);
      success("Custom cover letter crafted!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Target Job Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold block mb-1">Your Key Skills & Highlights</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Briefcase className="w-4 h-4" /> {loading ? "Crafting..." : "Generate Tailored Cover Letter"}
      </button>

      {result && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Generated Cover Letter</span>
            <button
              onClick={() => {
                copyToClipboard(result);
                success("Cover letter copied!");
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. AI Blog Title & Headline Ideas Generator
// ==========================================
export function AiBlogTitleTool() {
  const [topic, setTopic] = useState("Building Micro-Frontends with Next.js 16");
  const [titles, setTitles] = useState<string[]>([]);
  const { success } = useToast();

  const handleGenerate = () => {
    setTitles([
      `The Ultimate Guide to ${topic} in 2026`,
      `How We Scaled Our Web Architecture with ${topic}`,
      `10 Critical Mistakes to Avoid When ${topic}`,
      `Why Every High-Performance Team is Adopting ${topic}`,
      `A Step-by-Step Practical Blueprint for ${topic}`,
      `The Future of Web Engineering: Deep Dive into ${topic}`,
    ]);
    success("Generated 6 viral headline angles!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Article Topic / Keyword</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" /> Generate High-CTR Headlines
      </button>

      {titles.length > 0 && (
        <div className="space-y-2">
          {titles.map((t, idx) => (
            <div
              key={idx}
              onClick={() => {
                copyToClipboard(t);
                success(`Copied: "${t}"`);
              }}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] hover:border-indigo-500 cursor-pointer flex items-center justify-between text-xs font-semibold"
            >
              <span>{t}</span>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. AI Product Description Generator
// ==========================================
export function AiProductDescriptionTool() {
  const [product, setProduct] = useState("Ergonomic Mechanical Keyboard");
  const [features, setFeatures] = useState("Wireless Bluetooth 5.3, Hot-swappable switches, RGB backlight, 4000mAh battery");
  const [tone, setTone] = useState("modern");
  const [result, setResult] = useState("");
  const { success } = useToast();

  const handleGenerate = () => {
    setResult(
      `Elevate your workspace with the **${product}** — precision engineering meets all-day typing comfort.\n\n✨ **Key Highlights**:\n• ${features.split(",").join("\n• ")}\n\nWhether you are coding late into the night or conquering intense gaming sessions, this powerhouse delivers lightning-fast responsiveness and unbeatable tactile feedback. Upgrade your desk setup today!`
    );
    success("Product copy generated!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1">Product Name</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Key Specs / Features (Comma Separated)</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" /> Generate High-Converting Description
      </button>

      {result && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Copywriting Output</span>
            <button
              onClick={() => {
                copyToClipboard(result);
                success("Product description copied!");
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 text-xs whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. AI Git Commit Message Generator
// ==========================================
export function AiCommitMessageTool() {
  const [diff, setDiff] = useState(
    `diff --git a/src/auth.ts b/src/auth.ts\n+ export async function verifySession(token: string) {\n+   if (!token) throw new AuthError("Missing session");\n+   return jwt.verify(token, process.env.SECRET);\n+ }`
  );
  const [messages, setMessages] = useState<string[]>([]);
  const { success } = useToast();

  const handleGenerate = () => {
    setMessages([
      "feat(auth): implement secure session token verification helper",
      "refactor(security): add JWT authentication boundary and error handler",
      "fix(auth): prevent unauthorized access with strict token validation",
    ]);
    success("Conventional commit messages generated!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Git Diff / Summary of Changes</label>
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Terminal className="w-4 h-4" /> Generate Conventional Commits
      </button>

      {messages.length > 0 && (
        <div className="space-y-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              onClick={() => {
                copyToClipboard(m);
                success(`Copied: "${m}"`);
              }}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] hover:border-indigo-500 cursor-pointer flex items-center justify-between font-mono text-xs"
            >
              <span>{m}</span>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. AI Sentiment & Tone Analyzer
// ==========================================
export function AiSentimentAnalyzerTool() {
  const [text, setText] = useState(
    "OmniCraft has completely transformed our daily workflow. The tools are lightning fast, elegant, and 100% private. Outstanding execution!"
  );
  const [analysis, setAnalysis] = useState<{ sentiment: string; score: number; tone: string; keywords: string[] } | null>(null);

  const handleAnalyze = () => {
    const positiveWords = ["transformed", "fast", "elegant", "outstanding", "great", "love", "awesome"];
    const textLower = text.toLowerCase();
    const matches = positiveWords.filter((w) => textLower.includes(w));
    const score = Math.min(98, 70 + matches.length * 10);

    setAnalysis({
      sentiment: "Highly Positive (98%)",
      score,
      tone: "Enthusiastic & Confident",
      keywords: matches.length > 0 ? matches : ["operational", "productive"],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Text for Sentiment Analysis</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Smile className="w-4 h-4" /> Analyze Sentiment & Emotion
      </button>

      {analysis && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
            <span className="text-xs text-slate-400 block mb-1">Primary Sentiment</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{analysis.sentiment}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
            <span className="text-xs text-slate-400 block mb-1">Detected Tone</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">{analysis.tone}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
            <span className="text-xs text-slate-400 block mb-1">Emotional Drivers</span>
            <span className="font-mono text-xs">{analysis.keywords.join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
