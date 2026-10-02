"use client";

import React from "react";
import { formatBytes } from "@/lib/utils";
import { CheckCircle2, FileText, Sparkles, TrendingDown, Clock, Hash, Braces } from "lucide-react";

export interface SmartSummaryData {
  type: "image" | "text" | "json" | "pdf" | "generic";
  originalSize?: number;
  newSize?: number;
  savedBytes?: number;
  reductionPercent?: number;
  compressionStatus?: "compressed" | "already_optimized" | "not_beneficial";
  statusMessage?: string;
  dimensions?: { width: number; height: number };
  format?: string;
  wordCount?: number;
  charCount?: number;
  lineCount?: number;
  pageCount?: number;
  imagesFound?: number;
  imagesOptimized?: number;
  jsonStats?: { objects: number; arrays: number; keys: number };
}

export function SmartResultSummary({ data }: { data: SmartSummaryData }) {
  const isCompressed =
    data.compressionStatus === "compressed" ||
    (data.compressionStatus === undefined &&
      data.originalSize !== undefined &&
      data.newSize !== undefined &&
      data.originalSize > data.newSize);

  const isAlreadyOptimized =
    data.compressionStatus === "already_optimized" ||
    (!isCompressed &&
      data.originalSize !== undefined &&
      data.newSize !== undefined &&
      data.newSize >= data.originalSize);

  const effectiveOutputSize =
    data.originalSize !== undefined && data.newSize !== undefined
      ? isAlreadyOptimized
        ? data.originalSize
        : Math.min(data.newSize, data.originalSize)
      : data.newSize;

  const savedBytes =
    data.originalSize !== undefined && effectiveOutputSize !== undefined && isCompressed
      ? Math.max(0, data.originalSize - effectiveOutputSize)
      : 0;

  const reductionPercent =
    data.originalSize !== undefined && data.originalSize > 0 && isCompressed
      ? Math.max(0, Math.round((savedBytes / data.originalSize) * 100))
      : 0;

  return (
    <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/90 dark:bg-[#070b14]/90 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Execution &amp; Optimization Summary</span>
        </div>

        {isCompressed && reductionPercent > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <TrendingDown className="w-3 h-3" />
            Saved {reductionPercent}% ({formatBytes(savedBytes)})
          </span>
        )}

        {isAlreadyOptimized && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Already Optimized (0% reduction)
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        {data.originalSize !== undefined && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Original Size</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono">
              {formatBytes(data.originalSize)}
            </div>
          </div>
        )}

        {effectiveOutputSize !== undefined && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400">
              {isAlreadyOptimized ? "Best Size" : "Optimized Size"}
            </div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {formatBytes(effectiveOutputSize)}
            </div>
          </div>
        )}

        {data.originalSize !== undefined && data.newSize !== undefined && (
          <>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Space Saved</div>
              <div className="font-bold text-slate-900 dark:text-white font-mono">
                {isCompressed ? formatBytes(savedBytes) : "0 Bytes"}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-slate-400">Reduction</div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {isCompressed ? `${reductionPercent}%` : "0% (Retained)"}
              </div>
            </div>
          </>
        )}

        {data.dimensions && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Dimensions</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono">{data.dimensions.width} × {data.dimensions.height}</div>
          </div>
        )}

        {data.format && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Format</div>
            <div className="font-bold text-indigo-600 dark:text-indigo-400 font-mono uppercase">{data.format}</div>
          </div>
        )}

        {data.pageCount !== undefined && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Page Count</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono">{data.pageCount} Pages</div>
          </div>
        )}

        {data.wordCount !== undefined && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Words / Chars</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono">{data.wordCount.toLocaleString()} words ({data.charCount?.toLocaleString()} chars)</div>
          </div>
        )}

        {data.lineCount !== undefined && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Line Count</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono">{data.lineCount} Lines</div>
          </div>
        )}

        {data.jsonStats && (
          <>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-emerald-600">Valid JSON</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Syntax Valid
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-slate-400">JSON Elements</div>
              <div className="font-bold text-slate-900 dark:text-white font-mono">
                {data.jsonStats.objects} objs, {data.jsonStats.keys} keys
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
