"use client";

import React, { useState } from "react";
import { Upload, Download, Sparkles, Layout, Frame, Maximize2, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { downloadBlob } from "@/lib/utils";

// ==========================================
// 1. Favicon Generator Tool
// ==========================================
export function FaviconGeneratorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { success, error } = useToast();

  const FAVICON_SIZES = [
    { size: 16, name: "favicon-16x16.png", desc: "Browser tab standard" },
    { size: 32, name: "favicon-32x32.png", desc: "Retina browser tab" },
    { size: 48, name: "favicon-48x48.png", desc: "Windows desktop shortcut" },
    { size: 180, name: "apple-touch-icon.png", desc: "iOS home screen" },
    { size: 192, name: "android-chrome-192x192.png", desc: "Android home screen PWA" },
    { size: 512, name: "android-chrome-512x512.png", desc: "PWA splash screen" },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      success("Icon image loaded");
    };
    reader.readAsDataURL(file);
  };

  const downloadSingleIcon = (size: number, name: string) => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, name);
          success(`Downloaded ${name}`);
        }
      }, "image/png");
    };
    img.src = imageSrc;
  };

  const downloadAllIcons = () => {
    FAVICON_SIZES.forEach((item, idx) => {
      setTimeout(() => {
        downloadSingleIcon(item.size, item.name);
      }, idx * 250);
    });
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Logo or Square Image for Favicons
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate 16x16, 32x32, 48x48, Apple Touch Icon (180x180), and Android PWA (192 &amp; 512px) icons
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img src={imageSrc} alt="Source" className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-1" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Favicon Package Ready</div>
                <div className="text-[11px] text-slate-500">{FAVICON_SIZES.length} standard app icons</div>
              </div>
            </div>
            <button
              type="button"
              onClick={downloadAllIcons}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download All Sizes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FAVICON_SIZES.map((item) => (
              <div
                key={item.size}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200/90 dark:border-white/10 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-white/5">
                    <img src={imageSrc} alt={`${item.size}px`} style={{ width: Math.min(item.size, 32), height: Math.min(item.size, 32) }} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{item.size}×{item.size}px • {item.desc}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadSingleIcon(item.size, item.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                  title="Download icon"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">HTML Code Snippet</span>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto select-all">
{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Social Media Image Resizer Tool
// ==========================================
export function SocialImageResizerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string>("instagram-post");
  const { success, error } = useToast();

  const PRESETS: Record<string, { width: number; height: number; name: string; platform: string }> = {
    "instagram-post": { width: 1080, height: 1080, name: "Instagram Square Post", platform: "Instagram" },
    "instagram-portrait": { width: 1080, height: 1350, name: "Instagram Portrait Post", platform: "Instagram" },
    "instagram-story": { width: 1080, height: 1920, name: "Instagram / TikTok Story", platform: "Instagram" },
    "twitter-post": { width: 1200, height: 675, name: "X (Twitter) Feed Post", platform: "Twitter" },
    "twitter-header": { width: 1500, height: 500, name: "X (Twitter) Header Banner", platform: "Twitter" },
    "youtube-thumbnail": { width: 1280, height: 720, name: "YouTube Video Thumbnail", platform: "YouTube" },
    "youtube-banner": { width: 2560, height: 1440, name: "YouTube Channel Banner", platform: "YouTube" },
    "linkedin-post": { width: 1200, height: 627, name: "LinkedIn Feed Post", platform: "LinkedIn" },
    "linkedin-cover": { width: 1584, height: 396, name: "LinkedIn Profile Cover", platform: "LinkedIn" },
    "facebook-cover": { width: 820, height: 312, name: "Facebook Page Cover", platform: "Facebook" },
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      success("Image loaded");
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const preset = PRESETS[platform];
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill canvas background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cover scaling math
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${platform}_${preset.width}x${preset.height}.png`);
          success(`Downloaded ${preset.name}`);
        }
      }, "image/png");
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Layout className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image for Social Media Resizing
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Instantly format for Instagram, YouTube, X (Twitter), LinkedIn, Facebook, and TikTok
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.entries(PRESETS).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlatform(key)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  platform === key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-[#0c1322] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-indigo-500/40"
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">{item.platform}</div>
                <div className="text-xs font-bold truncate mt-0.5">{item.name}</div>
                <div className="text-[10px] font-mono opacity-80 mt-1">{item.width} × {item.height}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10">
            <div
              style={{
                aspectRatio: `${PRESETS[platform].width} / ${PRESETS[platform].height}`,
                maxHeight: "320px",
                maxWidth: "100%",
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-xl shadow-lg border border-slate-200 dark:border-white/10 w-full"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download {PRESETS[platform].name} ({PRESETS[platform].width}×{PRESETS[platform].height})</span>
            </button>
            <button
              type="button"
              onClick={() => setImageSrc(null)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. Image Dimension & Aspect Ratio Analyzer Tool
// ==========================================
export function ImageDimensionAnalyzerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    name: string;
    width: number;
    height: number;
    aspectRatio: string;
    megaPixels: string;
    fileSize: string;
    type: string;
  } | null>(null);
  const { success, error } = useToast();

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        const divisor = gcd(img.width, img.height);
        const ratio = `${img.width / divisor}:${img.height / divisor}`;
        const mp = ((img.width * img.height) / 1000000).toFixed(2);
        const sizeStr = (file.size / 1024).toFixed(1) + " KB";
        setStats({
          name: file.name,
          width: img.width,
          height: img.height,
          aspectRatio: ratio,
          megaPixels: mp,
          fileSize: sizeStr,
          type: file.type || "image/unknown",
        });
        success("Image analyzed");
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {!stats ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Maximize2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image to Inspect Dimensions
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculate exact resolution (px), aspect ratio, megapixels, and file metrics
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Resolution</span>
              <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{stats.width} × {stats.height}</div>
              <div className="text-[10px] text-slate-400">Pixels (W × H)</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Aspect Ratio</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">{stats.aspectRatio}</div>
              <div className="text-[10px] text-slate-400">Simplified Ratio</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Megapixels</span>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono">{stats.megaPixels} MP</div>
              <div className="text-[10px] text-slate-400">Total pixel density</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">File Size</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{stats.fileSize}</div>
              <div className="text-[10px] text-slate-400">{stats.type}</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10">
            <img src={imageSrc!} alt="Preview" className="max-h-80 max-w-full rounded-lg shadow-md object-contain" />
            <button
              type="button"
              onClick={() => { setImageSrc(null); setStats(null); }}
              className="mt-4 text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
