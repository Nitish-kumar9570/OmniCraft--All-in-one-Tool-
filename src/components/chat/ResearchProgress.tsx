"use client";

import React, { useState } from "react";
import { DeepResearchStep } from "@/types/research";
import { CheckCircle2, Loader2, Sparkles, ChevronDown, ChevronUp, Search, Globe, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchProgressProps {
  steps: DeepResearchStep[];
  isGenerating?: boolean;
}

export function ResearchProgress({ steps, isGenerating = false }: ResearchProgressProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  const getStepIcon = (stage: DeepResearchStep["stage"]) => {
    switch (stage) {
      case "private_search":
        return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      case "web_search":
        return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
      case "synthesizing":
        return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
      default:
        return <Search className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const currentStep = steps[steps.length - 1];

  return (
    <div className="my-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 dark:bg-indigo-950/30 overflow-hidden shadow-sm backdrop-blur-sm">
      {/* Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/15 transition-colors text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          {isGenerating ? (
            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 truncate">
            {isGenerating ? (currentStep?.message || "Researching sources...") : "Deep Research Complete"}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
            {steps.length} step{steps.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="p-1 rounded-md text-indigo-400 hover:text-indigo-200">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Step Trace */}
      {isExpanded && (
        <div className="p-3 space-y-2 border-t border-indigo-500/20 text-xs">
          {steps.map((step, idx) => (
            <div key={step.id || idx} className="flex items-start gap-2.5 text-slate-300 animate-in fade-in">
              <div className="mt-0.5 p-1 rounded-md bg-indigo-900/50 shrink-0">
                {getStepIcon(step.stage)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-slate-700 dark:text-slate-200 leading-snug">
                  {step.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
