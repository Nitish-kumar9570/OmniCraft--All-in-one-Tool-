"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ToolDefinition } from "@/tools/types";
import { TOOL_CATEGORIES } from "@/tools/categories";
import { ToolCard } from "./ToolCard";
import { FeedbackWidget } from "./FeedbackWidget";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { getRelatedTools } from "@/tools/registry";
import { useHistory } from "@/hooks/useHistory";
import { useFavorites } from "@/hooks/useFavorites";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Heart,
  Share2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ToolShellProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolShell({ tool, children }: ToolShellProps) {
  const category = TOOL_CATEGORIES[tool.category];
  const relatedTools = getRelatedTools(tool, 4);
  const { recordToolUsage } = useHistory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success } = useToast();

  const favorited = isFavorite(tool.id);

  useEffect(() => {
    // Record tool in recently used history
    recordToolUsage(tool.id);
  }, [tool.id, recordToolUsage]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: tool.seoTitle,
          text: tool.description,
          url: window.location.href,
        });
        return;
      } catch {}
    }
    const ok = await copyToClipboard(window.location.href);
    if (ok) {
      success("Tool link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">

      {/* Header Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <Link href="/tools" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <Link
            href={`/categories/${category?.slug || tool.category}`}
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {category?.name || tool.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-semibold truncate">{tool.name}</span>
        </nav>

        {/* Tool Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
                {category?.name || tool.category}
              </span>
              <PrivacyBadge tool={tool} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {tool.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto pointer-events-auto flex-wrap">
            <button
              type="button"
              onClick={() => toggleFavorite(tool.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-sm pointer-events-auto",
                favorited
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-500/50 text-rose-600 dark:text-rose-300 shadow-rose-500/10"
                  : "border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#101828] hover:border-slate-300 dark:hover:border-white/20 backdrop-blur-md"
              )}
            >
              <Heart className={cn("w-4 h-4", favorited && "fill-rose-500 text-rose-500")} />
              <span>{favorited ? "Favorited" : "Favorite"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#101828] hover:border-slate-300 dark:hover:border-white/20 transition-all active:scale-95 shadow-sm backdrop-blur-md cursor-pointer pointer-events-auto"
              title="Share tool"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Main Interactive Tool Workspace */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-2xl shadow-lg dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#090e1a]/60 select-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{tool.name} Workspace</span>
            </div>

            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
              Ready
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>

        {/* How to Use Section */}
        {tool.howToUse && tool.howToUse.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> How to use {tool.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {tool.howToUse.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/70 dark:border-white/[0.08] space-y-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-indigo-500/20">
                    {step.step}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features & Privacy */}
        {tool.features && tool.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-3 shadow-sm dark:shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Key Features
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {tool.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-3 shadow-sm dark:shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Privacy First Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.processingType === "client"
                  ? "This tool runs 100% locally in your browser. Your input data or files are never uploaded to any remote server."
                  : "Your files are securely processed in ephemeral temporary storage and automatically deleted immediately after completion."}
              </p>
            </div>
          </div>
        )}

        {/* FAQs */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3 pt-2">
              {tool.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/70 dark:border-white/[0.08] space-y-1.5 text-xs"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {item.question}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Widget */}
        <FeedbackWidget toolId={tool.id} />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Related Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((rel) => (
                <ToolCard key={rel.id} tool={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
