"use client";

import React, { useState } from "react";
import {
  Palette,
  Copy,
  Check,
  Layout,
  Grid,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Sliders,
  Type,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. CSS Fancy Border Radius Generator
// ==========================================
export function CssBorderRadiusGeneratorTool() {
  const [tl, setTl] = useState(30);
  const [tr, setTr] = useState(70);
  const [br, setBr] = useState(70);
  const [bl, setBl] = useState(30);
  const { success } = useToast();

  const borderRadius = `${tl}% ${100 - tl}% ${br}% ${100 - br}% / ${tr}% ${bl}% ${100 - bl}% ${100 - tr}%`;
  const cssCode = `border-radius: ${borderRadius};`;

  return (
    <div className="space-y-6">
      <div className="flex justify-center p-8 bg-slate-100 dark:bg-black/20 rounded-3xl">
        <div
          style={{ borderRadius }}
          className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-violet-600 to-purple-500 shadow-2xl transition-all duration-300 flex items-center justify-center text-white font-bold text-xs"
        >
          Organic Shape
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Top-Left: {tl}%</label>
          <input type="range" min={0} max={100} value={tl} onChange={(e) => setTl(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Top-Right: {tr}%</label>
          <input type="range" min={0} max={100} value={tr} onChange={(e) => setTr(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Bottom-Right: {br}%</label>
          <input type="range" min={0} max={100} value={br} onChange={(e) => setBr(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Bottom-Left: {bl}%</label>
          <input type="range" min={0} max={100} value={bl} onChange={(e) => setBl(parseInt(e.target.value, 10))} className="w-full" />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">CSS Code</span>
          <button
            onClick={() => {
              copyToClipboard(cssCode);
              success("CSS copied!");
            }}
            className="text-xs text-purple-600 font-bold"
          >
            Copy
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs">
          {cssCode}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 2. CSS Flexbox Layout Visual Playground
// ==========================================
export function CssFlexboxPlaygroundTool() {
  const [direction, setDirection] = useState<"row" | "column" | "row-reverse">("row");
  const [justify, setJustify] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around">("space-between");
  const [align, setAlign] = useState<"flex-start" | "center" | "flex-end" | "stretch">("center");
  const [gap, setGap] = useState<number>(16);
  const { success } = useToast();

  const cssCode = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\ngap: ${gap}px;`;

  return (
    <div className="space-y-6">
      <div
        style={{
          display: "flex",
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          gap: `${gap}px`,
        }}
        className="p-6 rounded-3xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 min-h-[220px] transition-all"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-lg">1</div>
        <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center shadow-lg">2</div>
        <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white font-bold flex items-center justify-center shadow-lg">3</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">flex-direction</label>
          <select value={direction} onChange={(e: any) => setDirection(e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs">
            <option value="row">row</option>
            <option value="column">column</option>
            <option value="row-reverse">row-reverse</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">justify-content</label>
          <select value={justify} onChange={(e: any) => setJustify(e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs">
            <option value="flex-start">flex-start</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">align-items</label>
          <select value={align} onChange={(e: any) => setAlign(e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs">
            <option value="center">center</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="stretch">stretch</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">Generated CSS</span>
          <button onClick={() => { copyToClipboard(cssCode); success("CSS copied!"); }} className="text-xs text-purple-600 font-bold">Copy</button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs">{cssCode}</pre>
      </div>
    </div>
  );
}

// ==========================================
// 3. Neumorphism Soft UI Generator
// ==========================================
export function NeumorphismSoftUiTool() {
  const [size, setSize] = useState(180);
  const [radius, setRadius] = useState(30);
  const [distance, setDistance] = useState(15);
  const [blur, setBlur] = useState(30);
  const { success } = useToast();

  const shadow = `${distance}px ${distance}px ${blur}px #bebebe, -${distance}px -${distance}px ${blur}px #ffffff`;
  const cssCode = `border-radius: ${radius}px;\nbackground: #e0e0e0;\nbox-shadow: ${shadow};`;

  return (
    <div className="space-y-6">
      <div className="flex justify-center p-12 bg-[#e0e0e0] rounded-3xl">
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${radius}px`,
            backgroundColor: "#e0e0e0",
            boxShadow: shadow,
          }}
          className="flex items-center justify-center text-slate-700 font-bold text-xs"
        >
          Soft UI
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Distance: {distance}px</label>
          <input type="range" min={5} max={40} value={distance} onChange={(e) => setDistance(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Blur: {blur}px</label>
          <input type="range" min={10} max={60} value={blur} onChange={(e) => setBlur(parseInt(e.target.value, 10))} className="w-full" />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Radius: {radius}px</label>
          <input type="range" min={0} max={60} value={radius} onChange={(e) => setRadius(parseInt(e.target.value, 10))} className="w-full" />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">Neumorphism CSS</span>
          <button onClick={() => { copyToClipboard(cssCode); success("CSS copied!"); }} className="text-xs text-purple-600 font-bold">Copy</button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs">{cssCode}</pre>
      </div>
    </div>
  );
}
