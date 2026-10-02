"use client";

import React, { useState } from "react";
import { Hash, Copy, Check, Sparkles, Type, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Instagram & Social Hashtag Generator Tool
// ==========================================
export function HashtagGeneratorTool() {
  const [topic, setTopic] = useState("technology");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const TAG_DATABASE: Record<string, string[]> = {
    technology: [
      "#tech", "#technology", "#coding", "#developer", "#software", "#ai", "#innovation",
      "#programming", "#webdev", "#frontend", "#backend", "#code", "#javascript", "#nextjs",
      "#react", "#typescript", "#devlife", "#techtrends", "#softwareengineer", "#fullstack"
    ],
    business: [
      "#business", "#entrepreneur", "#startup", "#marketing", "#success", "#motivation",
      "#smallbusiness", "#money", "#leadership", "#growth", "#mindset", "#branding",
      "#productivity", "#saas", "#ecommerce", "#finance", "#sales"
    ],
    design: [
      "#design", "#ui", "#ux", "#uidesign", "#uxdesign", "#webdesign", "#graphicdesign",
      "#designer", "#figma", "#creative", "#appdesign", "#userexperience", "#dribbble", "#behance"
    ],
    fitness: [
      "#fitness", "#gym", "#workout", "#fit", "#health", "#bodybuilding", "#training",
      "#lifestyle", "#fitfam", "#healthy", "#gymlife", "#crossfit", "#personaltrainer"
    ],
  };

  const currentTags = TAG_DATABASE[topic] || TAG_DATABASE.technology;

  const handleCopyAll = async () => {
    const ok = await copyToClipboard(currentTags.join(" "));
    if (ok) {
      setCopied(true);
      success("All hashtags copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {["technology", "business", "design", "fitness"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setTopic(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              topic === cat ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Recommended Hashtags ({currentTags.length})
          </label>
          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy All 30"}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          {currentTags.map((tag) => (
            <span
              key={tag}
              onClick={() => {
                copyToClipboard(tag);
                success(`Copied ${tag}`);
              }}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-white/10 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 cursor-pointer shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Social Character Counter Tool
// ==========================================
export function SocialCharacterCounterTool() {
  const [text, setText] = useState("Excited to launch our new suite of client-side developer utilities at OmniCraft! Built for speed, privacy, and simplicity.");

  const length = text.length;

  const LIMITS = [
    { name: "X / Twitter Post", limit: 280 },
    { name: "Instagram Caption", limit: 2200 },
    { name: "Instagram Bio", limit: 150 },
    { name: "Threads Post", limit: 500 },
    { name: "LinkedIn Post", limit: 3000 },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Post Draft</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LIMITS.map((item) => {
          const remaining = item.limit - length;
          const isOver = remaining < 0;
          return (
            <div
              key={item.name}
              className={`p-3.5 rounded-2xl border transition-all ${
                isOver ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40" : "bg-white dark:bg-[#0c1322] border-slate-200 dark:border-white/10"
              }`}
            >
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-800 dark:text-slate-200">{item.name}</span>
                <span className={`font-mono text-xs ${isOver ? "text-rose-600 font-black" : "text-indigo-600 dark:text-indigo-400"}`}>
                  {length} / {item.limit}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden mt-2">
                <div
                  className={`h-full ${isOver ? "bg-rose-600" : "bg-indigo-600"}`}
                  style={{ width: `${Math.min(100, (length / item.limit) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
