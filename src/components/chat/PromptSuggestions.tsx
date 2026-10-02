"use client";

import React from "react";
import { Sparkles, Code2, FileText, Brain, Compass, Layers, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { PromptTemplate } from "@/types/chat";

interface PromptSuggestionsProps {
  onSelectPrompt: (promptText: string) => void;
}

export const SUGGESTIONS: PromptTemplate[] = [
  {
    id: "summarize-doc",
    title: "Summarize & Extract Insights",
    category: "research",
    description: "Deep dive into your uploaded PDF or notes with structured findings and page citations",
    prompt: "Summarize my uploaded document and highlight the core findings, methodology, and limitations.",
    iconName: "FileText",
  },
  {
    id: "compare-docs",
    title: "Compare Multiple Documents",
    category: "research",
    description: "Find cross-document correlations, contradictions, and common methodologies",
    prompt: "Compare my uploaded documents and provide a comparative analysis table of similarities and differences.",
    iconName: "Layers",
  },
  {
    id: "deep-research",
    title: "Deep Multi-Source Research",
    category: "planning",
    description: "Synthesize private knowledge with verified live web research and source citations",
    prompt: "Perform deep research on PostgreSQL Row Level Security (RLS) vs multi-tenant schema partitioning.",
    iconName: "Compass",
  },
  {
    id: "analyze-diagram",
    title: "Explain Visual Diagram",
    category: "analysis",
    description: "Analyze uploaded screenshots, architecture diagrams, or handwritten notes with vision",
    prompt: "Analyze this system architecture diagram and explain the data flow using my uploaded technical notes.",
    iconName: "ImageIcon",
  },
  {
    id: "code-craft",
    title: "Build Production Code",
    category: "coding",
    description: "Write idiomatic TypeScript, Next.js server actions, or optimized database queries",
    prompt: "Create a custom React hook in TypeScript for debounced search with caching and SSR safety.",
    iconName: "Code2",
  },
  {
    id: "remember-pref",
    title: "Personal Partner Memory",
    category: "learning",
    description: "Store persistent preferences and project context for grounded conversational continuity",
    prompt: "Remember that my primary stack is Next.js App Router, TypeScript, and Supabase PostgreSQL.",
    iconName: "Brain",
  },
];

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="w-5 h-5 text-indigo-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-purple-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-pink-400" />;
      case "ImageIcon":
        return <ImageIcon className="w-5 h-5 text-cyan-400" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "Brain":
        return <Brain className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Hero Welcome Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Your Private Personal AI Partner
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2.5">
          How can I help you today?
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Ask questions, research your uploaded PDFs, analyze diagrams, or search the live web.
        </p>
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SUGGESTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group relative flex flex-col justify-between p-4.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-850 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-xs hover:shadow-md transition-all duration-200 text-left cursor-pointer active:scale-[0.98] touch-manipulation"
          >

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 group-hover:scale-110 transition-transform">
                  {getIcon(item.iconName)}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 line-clamp-1 italic">
              "{item.prompt}"
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
