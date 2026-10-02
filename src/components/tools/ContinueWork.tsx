"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolDefinition } from "@/tools/types";
import { getRecommendedNextTools } from "@/tools/compatibility";
import { ArrowRight, Sparkles, Zap, Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ContinueWorkProps {
  currentTool?: ToolDefinition;
  outputType?: string;
  outputData?: any;
  outputText?: string;
  outputFileUrl?: string;
  outputFilename?: string;
}

export function ContinueWork({
  currentTool,
  outputType,
  outputData,
  outputText,
  outputFileUrl,
  outputFilename,
}: ContinueWorkProps) {
  const router = useRouter();
  const { info } = useToast();

  if (!currentTool) return null;

  const nextTools = getRecommendedNextTools(currentTool, outputType, 4);
  if (nextTools.length === 0) return null;

  const handleContinueWithTool = (targetTool: ToolDefinition) => {
    // Store pending output payload for next tool to load
    const payload = {
      sourceToolSlug: currentTool.slug,
      sourceToolName: currentTool.name,
      targetToolSlug: targetTool.slug,
      type: outputType || "text",
      text: outputText || (typeof outputData === "string" ? outputData : JSON.stringify(outputData)),
      fileUrl: outputFileUrl,
      fileName: outputFilename,
      timestamp: Date.now(),
    };

    try {
      sessionStorage.setItem("omni_pending_input", JSON.stringify(payload));
    } catch {}

    router.push(`/tools/${targetTool.slug}?from=${currentTool.slug}`);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-200/80 dark:border-indigo-500/20 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Next Steps
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            What would you like to do next with this result?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Continue transforming your output directly with compatible tools without re-uploading.
          </p>
        </div>
      </div>

      {/* Recommended Next Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {nextTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleContinueWithTool(tool)}
            className="p-4 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-[#070b14]/90 hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-150 cursor-pointer select-none group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {tool.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Compatible ✓
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.name}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {tool.description}
              </p>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Continue with {tool.name.split(" ")[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
