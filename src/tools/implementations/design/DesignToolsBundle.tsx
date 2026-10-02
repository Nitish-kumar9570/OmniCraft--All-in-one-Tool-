"use client";

import React, { useState } from "react";
import { Palette, Copy, Check, Eye, Frame, Sparkles, Layers } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Color Palette Generator Tool
// ==========================================
export function ColorPaletteTool() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);
  const { success } = useToast();

  const generateHarmonic = (hex: string) => {
    // Generate 5 harmonic colors
    return [
      { name: "50 Light", hex: "#eef2ff" },
      { name: "200 Soft", hex: "#c7d2fe" },
      { name: "500 Primary", hex: baseColor },
      { name: "700 Dark", hex: "#4338ca" },
      { name: "900 Deep", hex: "#1e1b4b" },
    ];
  };

  const palette = generateHarmonic(baseColor);

  const handleCopy = async (hex: string) => {
    const ok = await copyToClipboard(hex);
    if (ok) {
      setCopied(hex);
      success(`Copied ${hex}`);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Base Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-10 h-10 rounded-xl border-0 cursor-pointer p-0"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs uppercase font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {palette.map((c) => (
          <div
            key={c.name}
            onClick={() => handleCopy(c.hex)}
            className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3 cursor-pointer hover:shadow-lg transition-all group"
          >
            <div
              style={{ backgroundColor: c.hex }}
              className="w-full h-24 rounded-xl shadow-inner flex items-center justify-center text-white opacity-90 font-mono text-xs font-bold"
            >
              {copied === c.hex ? "Copied!" : ""}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
              <span className="font-mono text-slate-500 uppercase">{c.hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. CSS Glassmorphism Generator Tool
// ==========================================
export function CssGlassmorphismTool() {
  const [blur, setBlur] = useState<number>(16);
  const [opacity, setOpacity] = useState<number>(65);
  const [borderOpacity, setBorderOpacity] = useState<number>(20);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getCss = () => {
    return `background: rgba(255, 255, 255, ${opacity / 100});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: 24px;
border: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);`;
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getCss());
    if (ok) {
      setCopied(true);
      success("Glassmorphism CSS copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Backdrop Blur: {blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Background Opacity: {opacity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Border Opacity: {borderOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CSS Code</label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy CSS"}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto select-all">
              {getCss()}
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div className="relative min-h-[300px] rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-6 w-24 h-24 rounded-full bg-amber-300/60 blur-xl pointer-events-none" />
          <div className="absolute bottom-4 right-6 w-32 h-32 rounded-full bg-cyan-400/60 blur-xl pointer-events-none" />

          <div
            style={{
              background: `rgba(255, 255, 255, ${opacity / 100})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              borderRadius: "24px",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
            }}
            className="w-full max-w-xs p-6 text-slate-900 space-y-2 select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              TN
            </div>
            <h3 className="font-bold text-base">Glassmorphism Card</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Real-time hardware-accelerated CSS glassmorphism effect preview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. WCAG Contrast Checker Tool
// ==========================================
export function WcagContrastTool() {
  const [fg, setFg] = useState("#4f46e5");
  const [bg, setBg] = useState("#ffffff");

  const getLuminance = (hex: string): number => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const [R, G, B] = [r, g, b].map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  const aaaLarge = ratio >= 4.5;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Text Color (Foreground)</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer p-0" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-bold" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Background Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer p-0" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs font-bold" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium">Contrast Ratio</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{ratio.toFixed(2)}:1</div>
        </div>

        <div className={`p-4 rounded-2xl border ${aaNormal ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-200"}`}>
          <span className="text-[11px] font-bold">WCAG AA Normal</span>
          <div className="text-base font-black mt-1">{aaNormal ? "PASS" : "FAIL"}</div>
        </div>

        <div className={`p-4 rounded-2xl border ${aaLarge ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-200"}`}>
          <span className="text-[11px] font-bold">WCAG AA Large (18pt+)</span>
          <div className="text-base font-black mt-1">{aaLarge ? "PASS" : "FAIL"}</div>
        </div>

        <div className={`p-4 rounded-2xl border ${aaaNormal ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-200" : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-200"}`}>
          <span className="text-[11px] font-bold">WCAG AAA Normal</span>
          <div className="text-base font-black mt-1">{aaaNormal ? "PASS" : "FAIL"}</div>
        </div>
      </div>

      <div style={{ backgroundColor: bg, color: fg }} className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-2 text-center transition-colors">
        <h4 className="text-xl font-bold">Sample Heading Contrast Preview</h4>
        <p className="text-sm max-w-md mx-auto leading-relaxed">
          This sample text renders using your selected foreground and background colors to test real readability and accessibility.
        </p>
      </div>
    </div>
  );
}
