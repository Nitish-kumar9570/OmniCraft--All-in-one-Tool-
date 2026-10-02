"use client";

import React, { useState } from "react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { Ratio, Smartphone, Monitor, Video, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function VideoAspectRatioTool() {
  const [baseWidth, setBaseWidth] = useState<number>(1920);
  const [baseHeight, setBaseHeight] = useState<number>(1080);
  const [targetRatio, setTargetRatio] = useState<string>("16:9");
  const { success } = useToast();

  const RATIO_PRESETS = [
    { label: "16:9 Landscape (YouTube, TV, standard)", ratio: 16 / 9, id: "16:9", icon: Video, sampleW: 1920, sampleH: 1080 },
    { label: "9:16 Vertical (TikTok, Reels, Shorts)", ratio: 9 / 16, id: "9:16", icon: Smartphone, sampleW: 1080, sampleH: 1920 },
    { label: "1:1 Square (Instagram Feed, Post)", ratio: 1, id: "1:1", icon: Share2, sampleW: 1080, sampleH: 1080 },
    { label: "4:5 Portrait (Instagram Carousel, Ads)", ratio: 4 / 5, id: "4:5", icon: Share2, sampleW: 1080, sampleH: 1350 },
    { label: "21:9 UltraWide (Cinematic Movie)", ratio: 21 / 9, id: "21:9", icon: Monitor, sampleW: 2560, sampleH: 1080 },
    { label: "4:3 Classic (Retro TV, SD)", ratio: 4 / 3, id: "4:3", icon: Monitor, sampleW: 1440, sampleH: 1080 },
  ];

  const activePreset = RATIO_PRESETS.find((p) => p.id === targetRatio) || RATIO_PRESETS[0];

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const currentGcd = gcd(baseWidth, baseHeight);
  const currentAspectStr = `${Math.round(baseWidth / currentGcd)}:${Math.round(baseHeight / currentGcd)}`;
  const totalPixels = baseWidth * baseHeight;
  const megaPixels = (totalPixels / 1000000).toFixed(2);

  // Calculate resolution scale ladders
  const resolutions = [
    { name: "4K UHD", w: Math.round(3840), h: Math.round(3840 / activePreset.ratio) },
    { name: "1440p (2K)", w: Math.round(2560), h: Math.round(2560 / activePreset.ratio) },
    { name: "1080p (FHD)", w: Math.round(1920), h: Math.round(1920 / activePreset.ratio) },
    { name: "720p (HD)", w: Math.round(1280), h: Math.round(1280 / activePreset.ratio) },
    { name: "480p (SD)", w: Math.round(854), h: Math.round(854 / activePreset.ratio) },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Target Preset Selector */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Ratio className="w-4 h-4 text-indigo-500" /> Target Social & Video Aspect Ratios
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {RATIO_PRESETS.map((p) => {
            const Icon = p.icon;
            const isSelected = targetRatio === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setTargetRatio(p.id);
                  setBaseWidth(p.sampleW);
                  setBaseHeight(p.sampleH);
                }}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#090e1c] hover:border-indigo-300"
                }`}
              >
                <div className={`p-2 rounded-xl ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{p.id}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{p.label.split("(")[0]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Dimension Calculator */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-xl backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ManualNumberInput
            label="Width (Pixels)"
            value={baseWidth}
            onChange={(w) => {
              setBaseWidth(w);
              setBaseHeight(Math.round(w / activePreset.ratio));
            }}
            min={100}
            max={7680}
            step={10}
            suffix="px"
            placeholder="1920"
          />
          <ManualNumberInput
            label="Height (Pixels)"
            value={baseHeight}
            onChange={(h) => {
              setBaseHeight(h);
              setBaseWidth(Math.round(h * activePreset.ratio));
            }}
            min={100}
            max={7680}
            step={10}
            suffix="px"
            placeholder="1080"
          />
        </div>

        {/* Live Visual Canvas Framing Preview */}
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-3">
          <div
            className="rounded-xl border-2 border-dashed border-indigo-500 bg-indigo-500/10 flex items-center justify-center transition-all shadow-md"
            style={{
              width: "100%",
              maxWidth: "280px",
              aspectRatio: `${baseWidth} / ${baseHeight}`,
              maxHeight: "180px",
            }}
          >
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {baseWidth} × {baseHeight} ({currentAspectStr})
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Aspect Ratio: <strong className="text-slate-900 dark:text-white">{currentAspectStr}</strong></span>
            <span>•</span>
            <span>Total Pixels: <strong className="text-slate-900 dark:text-white">{megaPixels} MP</strong></span>
          </div>
        </div>

        {/* Standard Resolution Ladder */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Matching Standard Resolutions for {targetRatio}:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {resolutions.map((res, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setBaseWidth(res.w);
                  setBaseHeight(res.h);
                  success(`Loaded ${res.name} (${res.w}x${res.h})`);
                }}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e1c] text-slate-800 dark:text-slate-200 text-left hover:border-indigo-500 cursor-pointer shadow-xs transition-all"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white">{res.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{res.w} × {res.h}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
