"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useHistory } from "@/hooks/useHistory";
import { getToolBySlug, TOOLS_REGISTRY } from "@/tools/registry";
import { getRecommendedNextTools } from "@/tools/compatibility";
import { ToolDefinition } from "@/tools/types";
import { ToolCard } from "@/components/tools/ToolCard";
import { Clock, Sparkles, ArrowRight, Compass } from "lucide-react";

export function LocalRecommendations() {
  const { history, isLoaded } = useHistory();
  const [recentTools, setRecentTools] = useState<ToolDefinition[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<{ becauseTool: ToolDefinition; suggestions: ToolDefinition[] } | null>(null);

  useEffect(() => {
    if (!isLoaded || history.length === 0) return;

    // Get up to 4 most recently used tools
    const tools = history
      .map((item) => getToolBySlug(item.toolId))
      .filter((t): t is ToolDefinition => Boolean(t))
      .slice(0, 4);

    setRecentTools(tools);

    // Pick latest tool to compute "Because you used X, Try Y"
    if (tools.length > 0) {
      const latest = tools[0];
      const nextTools = getRecommendedNextTools(latest, undefined, 4);
      if (nextTools.length > 0) {
        setRecommendedTools({
          becauseTool: latest,
          suggestions: nextTools,
        });
      }
    }
  }, [history, isLoaded]);

  if (!isLoaded || recentTools.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      
      {/* "Because you used [Tool], Try these" Recommendation */}
      {recommendedTools && recommendedTools.suggestions.length > 0 && (
        <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-pink-50/40 dark:from-[#0c1322] dark:via-[#0a0f1d] dark:to-[#120f26] border border-indigo-200/70 dark:border-indigo-500/20 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Smart Local Recommendation
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Because you used <span className="text-indigo-600 dark:text-indigo-400">{recommendedTools.becauseTool.name}</span>, you might need:
                </h3>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              🔒 100% In-Browser Privacy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {recommendedTools.suggestions.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Used Tools Carousel / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Recently Used Tools
            </h3>
          </div>
          <Link href="/history" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            <span>View Full History</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
