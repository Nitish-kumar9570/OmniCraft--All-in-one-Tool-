"use client";

import React, { useState } from "react";
import { formatBytes } from "@/lib/utils";
import { ArrowLeftRight, Eye, Columns } from "lucide-react";
import * as Diff from "diff";

interface CompareViewerProps {
  type: "image" | "text" | "json";
  originalImage?: string;
  modifiedImage?: string;
  originalText?: string;
  modifiedText?: string;
  originalSize?: number;
  modifiedSize?: number;
}

export function CompareViewer({
  type,
  originalImage,
  modifiedImage,
  originalText,
  modifiedText,
  originalSize,
  modifiedSize,
}: CompareViewerProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");

  if (type === "image" && originalImage && modifiedImage) {
    return (
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-[#090e1c] p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-500" />
            Before vs After Comparison
          </span>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                viewMode === "slider" ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Slider
            </button>
            <button
              type="button"
              onClick={() => setViewMode("side-by-side")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                viewMode === "side-by-side" ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Side by Side
            </button>
          </div>
        </div>

        {viewMode === "slider" ? (
          <div className="relative w-full max-h-96 h-80 rounded-xl overflow-hidden select-none bg-slate-900 flex items-center justify-center">
            {/* Original Image (Bottom) */}
            <img
              src={originalImage}
              alt="Original"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />

            {/* Modified Image (Clipped Top) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={modifiedImage}
                alt="Modified"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ width: "100%", maxWidth: "none" }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-10 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-white text-indigo-600 shadow-md flex items-center justify-center text-[10px] font-bold">
                ↔
              </div>
            </div>

            {/* Drag Slider Overlay */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Image comparison slider"
            />

            {/* Labels */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-mono z-10 backdrop-blur-xs">
              Optimized {modifiedSize ? `(${formatBytes(modifiedSize)})` : ""}
            </div>
            <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-mono z-10 backdrop-blur-xs">
              Original {originalSize ? `(${formatBytes(originalSize)})` : ""}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-slate-500">Original ({originalSize ? formatBytes(originalSize) : "Original"})</div>
              <div className="h-64 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img src={originalImage} alt="Original" className="max-h-full object-contain" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Optimized ({modifiedSize ? formatBytes(modifiedSize) : "Output"})
              </div>
              <div className="h-64 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img src={modifiedImage} alt="Optimized" className="max-h-full object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if ((type === "text" || type === "json") && originalText !== undefined && modifiedText !== undefined) {
    const diffResult = Diff.diffLines(originalText, modifiedText);

    return (
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-[#090e1c] p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Columns className="w-3.5 h-3.5 text-indigo-500" />
            Diff &amp; Transformation Comparison
          </span>

          <span className="text-[10px] font-mono text-slate-400">
            <span className="text-rose-500 font-bold">- Red removed</span> / <span className="text-emerald-500 font-bold">+ Green added</span>
          </span>
        </div>

        <div className="max-h-64 overflow-y-auto rounded-xl p-3 bg-slate-950 font-mono text-xs leading-relaxed divide-y divide-white/5">
          {diffResult.map((part, index) => {
            const color = part.added
              ? "bg-emerald-950/60 text-emerald-300"
              : part.removed
              ? "bg-rose-950/60 text-rose-300 line-through opacity-70"
              : "text-slate-300";
            return (
              <pre key={index} className={`p-1 whitespace-pre-wrap ${color}`}>
                {part.value}
              </pre>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
