"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, Sliders, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { downloadBlob } from "@/lib/utils";

export function ImageFiltersTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("filtered_image");
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);
  const { success, error } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      handleReset();
      success("Image loaded");
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setBlur(0);
    setGrayscale(0);
    setSepia(0);
    setInvert(0);
    setHue(0);
  };

  const filterStyle = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) hue-rotate(${hue}deg)`;

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.filter = filterStyle;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${fileName}_filtered.png`);
          success("Filtered image downloaded");
        }
      }, "image/png");
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Sliders className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image to Adjust &amp; Filter
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Adjust Brightness, Contrast, Saturation, Blur, Grayscale, Sepia, and Invert
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls column */}
          <div className="lg:col-span-1 space-y-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Adjustments</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Contrast</span>
                <span>{contrast}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Saturation</span>
                <span>{saturate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturate}
                onChange={(e) => setSaturate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Blur</span>
                <span>{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Grayscale</span>
                <span>{grayscale}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={grayscale}
                onChange={(e) => setGrayscale(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Sepia</span>
                <span>{sepia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                <span>Invert Colors</span>
                <span>{invert}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={invert}
                onChange={(e) => setInvert(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Image</span>
            </button>
          </div>

          {/* Live Preview column */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 min-h-[350px] rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 overflow-hidden">
            <img
              src={imageSrc}
              alt="Filtered preview"
              style={{ filter: filterStyle, maxHeight: "400px", maxWidth: "100%", objectFit: "contain" }}
              className="rounded-lg shadow-md transition-all duration-75"
            />
            <button
              type="button"
              onClick={() => setImageSrc(null)}
              className="mt-4 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Upload a different image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ImageWatermarkTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("watermarked_image");
  const [text, setText] = useState<string>("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState<number>(36);
  const [opacity, setOpacity] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(-30);
  const [color, setColor] = useState<string>("#ffffff");
  const [position, setPosition] = useState<string>("center");
  const { success, error } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      success("Image loaded");
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc || !text.trim()) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      ctx.save();
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px sans-serif`;

      let x = canvas.width / 2;
      let y = canvas.height / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (position === "top-left") { x = 60; y = 60; ctx.textAlign = "left"; }
      else if (position === "top-right") { x = canvas.width - 60; y = 60; ctx.textAlign = "right"; }
      else if (position === "bottom-left") { x = 60; y = canvas.height - 60; ctx.textAlign = "left"; }
      else if (position === "bottom-right") { x = canvas.width - 60; y = canvas.height - 60; ctx.textAlign = "right"; }

      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${fileName}_watermarked.png`);
          success("Watermarked image downloaded");
        }
      }, "image/png");
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image to Add Watermark
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add custom text watermark with opacity, rotation, and custom positioning
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Watermark Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. © 2026 OmniCraft"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Opacity: {opacity}%</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Angle: {rotation}°</label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0"
                  />
                  <span className="text-xs font-mono">{color}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              >
                <option value="center">Center</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Apply &amp; Download</span>
            </button>
          </div>

          <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 min-h-[350px] rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 relative overflow-hidden">
            <div className="relative inline-block max-w-full max-h-[400px]">
              <img src={imageSrc} alt="Base" className="max-h-[360px] max-w-full rounded-lg shadow-md object-contain" />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: position.includes("top") ? "flex-start" : position.includes("bottom") ? "flex-end" : "center",
                  justifyContent: position.includes("left") ? "flex-start" : position.includes("right") ? "flex-end" : "center",
                  padding: "24px",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    color,
                    opacity: opacity / 100,
                    fontSize: `${fontSize * 0.7}px`,
                    fontWeight: "bold",
                    transform: `rotate(${rotation}deg)`,
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setImageSrc(null)}
              className="mt-4 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Change Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
