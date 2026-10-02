"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Copy,
  Check,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  Maximize2,
  Minimize2,
  Grid,
  FileCode,
  Sun,
  Contrast,
  Circle,
  Square,
  Zap,
  Layers,
  Palette,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob, formatBytes } from "@/lib/utils";

// ==========================================
// 1. Image Grayscale & Black/White Studio
// ==========================================
export function ImageGrayscaleTool() {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<"grayscale" | "high-contrast" | "warm-bw">("grayscale");
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (mode === "grayscale") ctx.filter = "grayscale(100%)";
      if (mode === "high-contrast") ctx.filter = "grayscale(100%) contrast(160%)";
      if (mode === "warm-bw") ctx.filter = "grayscale(100%) sepia(20%)";

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `bw_${mode}.png`);
          success("Black & white image saved!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <ImageIcon className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Convert to Black & White</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img
              src={image}
              alt="B&W"
              className="max-h-72 object-contain"
              style={{
                filter:
                  mode === "grayscale"
                    ? "grayscale(100%)"
                    : mode === "high-contrast"
                    ? "grayscale(100%) contrast(160%)"
                    : "grayscale(100%) sepia(20%)",
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "grayscale", label: "Classic Grayscale" },
              { id: "high-contrast", label: "High Contrast B&W" },
              { id: "warm-bw", label: "Warm Noir Tone" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setMode(t.id as any)}
                className={`p-3 rounded-xl border text-xs font-bold ${
                  mode === t.id ? "border-purple-600 bg-purple-50 dark:bg-purple-500/10 text-purple-600" : "border-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download B&W Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Image Brightness, Contrast & Saturation Studio
// ==========================================
export function ImageBrightnessContrastTool() {
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "adjusted_image.png");
          success("Adjusted image downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Sun className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Adjust Brightness & Contrast</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img
              src={image}
              alt="Adjusted"
              className="max-h-72 object-contain"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
              }}
            />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={200}
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Contrast</span>
                <span>{contrast}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={200}
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Saturation</span>
                <span>{saturation}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={250}
                value={saturation}
                onChange={(e) => setSaturation(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Enhanced Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. Image DPI & Print Size Calculator
// ==========================================
export function DpiCalculatorTool() {
  const [pixelsW, setPixelsW] = useState<number>(3840);
  const [pixelsH, setPixelsH] = useState<number>(2160);
  const [dpi, setDpi] = useState<number>(300);

  const inchesW = (pixelsW / dpi).toFixed(2);
  const inchesH = (pixelsH / dpi).toFixed(2);
  const cmW = ((pixelsW / dpi) * 2.54).toFixed(2);
  const cmH = ((pixelsH / dpi) * 2.54).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Width (Pixels)</label>
          <input
            type="number"
            value={pixelsW}
            onChange={(e) => setPixelsW(parseInt(e.target.value, 10) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Height (Pixels)</label>
          <input
            type="number"
            value={pixelsH}
            onChange={(e) => setPixelsH(parseInt(e.target.value, 10) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Target DPI (Dots Per Inch)</label>
          <select
            value={dpi}
            onChange={(e) => setDpi(parseInt(e.target.value, 10))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          >
            <option value={72}>72 DPI (Standard Web)</option>
            <option value={150}>150 DPI (Newspaper / Draft Print)</option>
            <option value={300}>300 DPI (Standard High-Res Print)</option>
            <option value={600}>600 DPI (Ultra Fine Art Print)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs text-slate-400 block mb-1">Physical Print Size (Inches)</span>
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {inchesW}″ × {inchesH}″
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-center">
          <span className="text-xs text-slate-400 block mb-1">Physical Print Size (Centimeters)</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {cmW} × {cmH} cm
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SVG Optimizer & Cleaner
// ==========================================
export function SvgOptimizerTool() {
  const [svgInput, setSvgInput] = useState<string>(
    `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n  <!-- Created with Sketch -->\n  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" id="Oval-1" />\n</svg>`
  );
  const [optimized, setOptimized] = useState<string>("");
  const [savings, setSavings] = useState<number>(0);
  const { success } = useToast();

  const handleOptimize = () => {
    let clean = svgInput
      .replace(/<!--[\s\S]*?-->/g, "") // remove comments
      .replace(/xmlns:sketch="[^"]*"/g, "") // remove sketch
      .replace(/xmlns:inkscape="[^"]*"/g, "")
      .replace(/sketch:type="[^"]*"/g, "")
      .replace(/\s+/g, " ")
      .replace(/> </g, "><")
      .trim();

    setOptimized(clean);
    const before = svgInput.length;
    const after = clean.length;
    const diff = Math.max(0, Math.round(((before - after) / before) * 100));
    setSavings(diff);
    success(`Optimized SVG with ${diff}% size reduction!`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Raw SVG Markup</label>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold">Optimized Clean SVG</label>
            {savings > 0 && <span className="text-[10px] text-emerald-500 font-bold">Saved {savings}% bytes</span>}
          </div>
          <textarea
            value={optimized}
            readOnly
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleOptimize}
        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" /> Clean & Minify SVG Code
      </button>
    </div>
  );
}

// ==========================================
// 5. Invert Colors & Negative Image Tool
// ==========================================
export function InvertColorsTool() {
  const [image, setImage] = useState<string | null>(null);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = "invert(100%)";
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "inverted_image.png");
          success("Negative inverted image downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Contrast className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Invert Colors (Negative)</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img src={image} alt="Inverted" className="max-h-72 object-contain" style={{ filter: "invert(100%)" }} />
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Inverted Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. Sepia Vintage Photo Filter Tool
// ==========================================
export function SepiaTool() {
  const [image, setImage] = useState<string | null>(null);
  const [sepiaAmount, setSepiaAmount] = useState<number>(80);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = `sepia(${sepiaAmount}%)`;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "vintage_sepia.png");
          success("Vintage sepia photo downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Sparkles className="w-10 h-10 text-amber-500 mb-3" />
          <span className="text-sm font-bold">Upload Photo for Vintage Sepia Tone</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img src={image} alt="Sepia" className="max-h-72 object-contain" style={{ filter: `sepia(${sepiaAmount}%)` }} />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Vintage Sepia Intensity: {sepiaAmount}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={sepiaAmount}
              onChange={(e) => setSepiaAmount(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Vintage Photo
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. Multi-Platform App Icon Generator
// ==========================================
export function AppIconGeneratorTool() {
  const [image, setImage] = useState<string | null>(null);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadIcon = (size: number) => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `icon_${size}x${size}.png`);
          success(`Saved icon_${size}x${size}.png!`);
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Layers className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload High-Res Logo to Generate App Icons</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-60 overflow-hidden">
            <img src={image} alt="App Icon Source" className="max-h-48 object-contain rounded-2xl shadow-md" />
          </div>
          <h3 className="font-bold text-sm">Download Standard Platform Sizes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { size: 512, label: "512×512 (Store / PWA)" },
              { size: 192, label: "192×192 (Android)" },
              { size: 180, label: "180×180 (iOS Retina)" },
              { size: 64, label: "64×64 (Favicon HQ)" },
            ].map((icon) => (
              <button
                key={icon.size}
                onClick={() => downloadIcon(icon.size)}
                className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-purple-500 font-bold text-xs flex flex-col items-center gap-1"
              >
                <span>{icon.label}</span>
                <span className="text-[10px] text-purple-600 font-mono">PNG Export</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
