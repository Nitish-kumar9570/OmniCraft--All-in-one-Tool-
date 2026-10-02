"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TASK_DEFINITIONS } from "@/tools/tasks";
import { getToolBySlug } from "@/tools/registry";
import {
  FileText,
  Image as ImageIcon,
  Code2,
  Sparkles,
  ShieldCheck,
  ArrowLeftRight,
  Share2,
  Search,
  ArrowRight,
  Zap,
} from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { cn } from "@/lib/utils";

export function TaskBasedDiscovery() {
  const [activeTaskId, setActiveTaskId] = useState<string>("work-with-pdfs");
  const activeTask = TASK_DEFINITIONS.find((t) => t.id === activeTaskId) || TASK_DEFINITIONS[0];

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText": return <FileText className="w-4 h-4" />;
      case "Image": return <ImageIcon className="w-4 h-4" />;
      case "Code2": return <Code2 className="w-4 h-4" />;
      case "Sparkles": return <Sparkles className="w-4 h-4" />;
      case "ShieldCheck": return <ShieldCheck className="w-4 h-4" />;
      case "ArrowLeftRight": return <ArrowLeftRight className="w-4 h-4" />;
      case "Share2": return <Share2 className="w-4 h-4" />;
      case "Search": return <Search className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const recommendedTools = activeTask.recommendedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" /> Intent-Driven Navigation
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            What are you trying to accomplish?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Select a goal and OmniCraft will display the best tools and utilities for the job.
          </p>
        </div>

        <Link
          href="/tools"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline shrink-0"
        >
          <span>Browse All Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Task Selection Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
        {TASK_DEFINITIONS.map((task) => {
          const isActive = task.id === activeTaskId;
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => setActiveTaskId(task.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shrink-0 border",
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                  : "bg-white/80 dark:bg-[#0c1322]/80 border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500/40 backdrop-blur-md"
              )}
            >
              {getTaskIcon(task.icon)}
              <span>{task.title}</span>
            </button>
          );
        })}
      </div>

      {/* Task Content Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recommended Tools for &ldquo;{activeTask.title}&rdquo; ({recommendedTools.length} tools)
          </span>
          <span className="text-xs text-slate-400">
            {activeTask.description}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
