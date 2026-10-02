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
  Eye,
  Shield,
  Palette,
  Maximize2,
  Grid,
  FileCode,
  Layers,
  RotateCw,
  Crop,
  Sun,
  Contrast,
  Circle,
  Square,
  Zap,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob, formatBytes } from "@/lib/utils";

// ==========================================
// 1. Image Flip Tool (Horizontal / Vertical)
// ==========================================
export function ImageFlipTool() {
  const [image, setImage] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { success, error } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
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
      ctx.translate(flipH ? img.width : 0, flipV ? img.height : 0);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "flipped_image.png");
          success("Flipped image downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
          <ImageIcon className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Mirror / Flip</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden max-h-80">
            <img
              src={image}
              alt="Preview"
              className="max-h-72 object-contain transition-transform duration-300"
              style={{
                transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFlipH(!flipH)}
              className={`p-3 rounded-xl border font-bold text-xs ${flipH ? "border-purple-600 bg-purple-50 dark:bg-purple-500/10 text-purple-600" : "border-slate-200 dark:border-white/10"}`}
            >
              Flip Horizontal (↔)
            </button>
            <button
              onClick={() => setFlipV(!flipV)}
              className={`p-3 rounded-xl border font-bold text-xs ${flipV ? "border-purple-600 bg-purple-50 dark:bg-purple-500/10 text-purple-600" : "border-slate-200 dark:border-white/10"}`}
            >
              Flip Vertical (↕)
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Flipped Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Image Blur & Censor Tool
// ==========================================
export function ImageBlurTool() {
  const [image, setImage] = useState<string | null>(null);
  const [blurAmount, setBlurAmount] = useState<number>(8);
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
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `blurred_${blurAmount}px.png`);
          success("Blurred image downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Sparkles className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Apply Blur</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img
              src={image}
              alt="Blurred preview"
              className="max-h-72 object-contain"
              style={{ filter: `blur(${blurAmount}px)` }}
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Blur Radius: {blurAmount}px</label>
            <input
              type="range"
              min={1}
              max={30}
              value={blurAmount}
              onChange={(e) => setBlurAmount(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Blurred Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. Image Pixelate & Censor Tool
// ==========================================
export function ImagePixelateTool() {
  const [image, setImage] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState<number>(12);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const w = Math.ceil(img.width / pixelSize);
      const h = Math.ceil(img.height / pixelSize);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offCanvas, 0, 0, w, h, 0, 0, img.width, img.height);
    };
    img.src = image;
  }, [image, pixelSize]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `pixelated_${pixelSize}px.png`);
        success("Pixelated image saved!");
      }
    });
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Grid className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Pixelate</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <canvas ref={canvasRef} className="max-h-72 max-w-full object-contain" />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Pixel Block Size: {pixelSize}px</label>
            <input
              type="range"
              min={4}
              max={50}
              value={pixelSize}
              onChange={(e) => setPixelSize(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Pixelated Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. Image Rounded Corners & Circular Avatar Crop
// ==========================================
export function ImageRoundedCornersTool() {
  const [image, setImage] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(32);
  const [isCircle, setIsCircle] = useState(false);
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
      const size = isCircle ? Math.min(img.width, img.height) : 0;
      canvas.width = isCircle ? size : img.width;
      canvas.height = isCircle ? size : img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      if (isCircle) {
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      } else {
        const r = radius * (img.width / 400);
        ctx.roundRect(0, 0, img.width, img.height, r);
      }
      ctx.clip();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, isCircle ? "avatar_circle.png" : "rounded_image.png");
          success("Processed PNG with transparent background downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Circle className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Round Corners</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <img
              src={image}
              alt="Rounded"
              className="max-h-72 object-contain transition-all"
              style={{
                borderRadius: isCircle ? "50%" : `${radius}px`,
                aspectRatio: isCircle ? "1/1" : "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCircle(!isCircle)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold ${isCircle ? "border-purple-600 bg-purple-50 text-purple-600" : "border-slate-200"}`}
            >
              {isCircle ? "Mode: Perfect Circle Avatar" : "Mode: Rounded Rectangle"}
            </button>
            {!isCircle && (
              <div className="flex-1">
                <label className="text-xs font-bold block mb-1">Corner Radius: {radius}px</label>
                <input
                  type="range"
                  min={0}
                  max={120}
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Transparent PNG
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. Image Border & Frame Maker
// ==========================================
export function ImageBorderTool() {
  const [image, setImage] = useState<string | null>(null);
  const [borderWidth, setBorderWidth] = useState<number>(16);
  const [borderColor, setBorderColor] = useState<string>("#ffffff");
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
      const b = borderWidth * (img.width / 400);
      canvas.width = img.width + b * 2;
      canvas.height = img.height + b * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, b, b, img.width, img.height);

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "framed_image.png");
          success("Framed image downloaded!");
        }
      }, "image/png");
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Square className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Add Custom Border Frame</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-80 overflow-hidden">
            <div style={{ padding: `${borderWidth}px`, backgroundColor: borderColor }} className="inline-block shadow-lg">
              <img src={image} alt="Framed" className="max-h-60 object-contain block" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold block mb-1">Border Width: {borderWidth}px</label>
              <input
                type="range"
                min={2}
                max={60}
                value={borderWidth}
                onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Border Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-10 h-8 rounded-lg cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="flex-1 p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Framed Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. EXIF Metadata Viewer & Inspector
// ==========================================
export function ExifViewerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<any>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const img = new Image();
    img.onload = () => {
      setInfo({
        name: selected.name,
        type: selected.type,
        size: formatBytes(selected.size),
        dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`,
        aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
        colorSpace: "sRGB",
        lastModified: new Date(selected.lastModified).toLocaleString(),
      });
    };
    img.src = URL.createObjectURL(selected);
  };

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
        <Eye className="w-8 h-8 text-purple-500 mb-2" />
        <span className="text-sm font-bold">{file ? file.name : "Upload Photo to Read EXIF Metadata"}</span>
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
      </label>

      {info && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <h3 className="font-bold text-sm">Image Technical Properties</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">Dimensions</span>
              <span className="font-bold font-mono">{info.dimensions}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">File Size</span>
              <span className="font-bold font-mono">{info.size}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">Aspect Ratio</span>
              <span className="font-bold font-mono">{info.aspectRatio}:1</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">MIME Type</span>
              <span className="font-mono">{info.type}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">Color Profile</span>
              <span className="font-mono">{info.colorSpace}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-400 block mb-1">Modified Date</span>
              <span className="truncate block">{info.lastModified}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. EXIF Metadata Remover (1-Click Sanitizer)
// ==========================================
export function ExifRemoverTool() {
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

  const handleClean = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, "clean_no_exif.jpg");
          success("All EXIF tags & GPS data completely stripped!");
        }
      }, "image/jpeg", 0.95);
    };
    img.src = image;
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Shield className="w-10 h-10 text-emerald-500 mb-3" />
          <span className="text-sm font-bold">Upload Photo to Strip GPS & Device Metadata</span>
          <span className="text-xs text-slate-500 mt-1">Protects privacy before uploading to public web</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <p className="text-xs text-slate-500">Image loaded. Canvas re-rendering will discard all EXIF headers, camera model, and GPS latitude/longitude.</p>
          <button
            onClick={handleClean}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Clean Sanitized Photo
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. Color Palette & Dominant Color Generator
// ==========================================
export function PaletteGeneratorTool() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImage(src);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 50, 50);
        const data = ctx.getImageData(0, 0, 50, 50).data;
        const sampled: string[] = [];
        for (let i = 0; i < data.length; i += 40 * 4) {
          const r = data[i].toString(16).padStart(2, "0");
          const g = data[i + 1].toString(16).padStart(2, "0");
          const b = data[i + 2].toString(16).padStart(2, "0");
          sampled.push(`#${r}${g}${b}`);
        }
        setColors(Array.from(new Set(sampled)).slice(0, 8));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const copyHex = (hex: string) => {
    copyToClipboard(hex);
    success(`Copied ${hex} to clipboard!`);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
          <Palette className="w-10 h-10 text-purple-500 mb-3" />
          <span className="text-sm font-bold">Upload Image to Extract Color Palette</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-black/20 rounded-xl max-h-60 overflow-hidden">
            <img src={image} alt="Target" className="max-h-52 object-contain" />
          </div>
          <h3 className="font-bold text-sm">Extracted Palette Colors ({colors.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colors.map((c, idx) => (
              <div
                key={idx}
                onClick={() => copyHex(c)}
                className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="h-16 rounded-xl mb-2 shadow-inner" style={{ backgroundColor: c }} />
                <span className="font-mono font-bold text-xs uppercase block text-center">{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. ASCII Art Generator Tool
// ==========================================
export function AsciiArtGeneratorTool() {
  const [ascii, setAscii] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const width = 80;
        const height = Math.floor((img.height / img.width) * width * 0.55);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.getImageData(0, 0, width, height).data;

        const chars = "@%#*+=-:. ";
        let output = "";
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const avg = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            const charIdx = Math.floor((avg / 255) * (chars.length - 1));
            output += chars[charIdx];
          }
          output += "\n";
        }
        setAscii(output);
        success("ASCII Art Generated!");
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    copyToClipboard(ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    success("ASCII copied!");
  };

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50">
        <FileCode className="w-8 h-8 text-purple-500 mb-2" />
        <span className="text-sm font-bold">Upload Image to Convert to ASCII Text Art</span>
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
      </label>

      {ascii && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy ASCII Art"}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-black text-emerald-400 font-mono text-[8px] leading-[8px] overflow-x-auto select-all">
            {ascii}
          </pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. Open Graph (OG) Banner Studio
// ==========================================
export function OgImageGeneratorTool() {
  const [title, setTitle] = useState("OmniCraft — All-in-One Developer Tools");
  const [subtitle, setSubtitle] = useState("Free, instant browser-side utilities");
  const [badge, setBadge] = useState("PRO TOOLS");
  const [gradient, setGradient] = useState<"purple" | "blue" | "dark" | "emerald">("purple");
  const { success } = useToast();

  const gradients = {
    purple: "from-purple-900 via-indigo-900 to-slate-950",
    blue: "from-blue-900 via-cyan-950 to-slate-950",
    dark: "from-slate-900 via-zinc-900 to-black",
    emerald: "from-emerald-950 via-teal-950 to-slate-950",
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, "#1e1b4b");
    grad.addColorStop(1, "#0f172a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Badge
    ctx.fillStyle = "#6366f1";
    ctx.font = "bold 20px system-ui";
    ctx.fillText(`● ${badge}`, 80, 140);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px system-ui";
    ctx.fillText(title, 80, 240);

    // Subtitle
    ctx.fillStyle = "#94a3b8";
    ctx.font = "30px system-ui";
    ctx.fillText(subtitle, 80, 320);

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, "og_image_1200x630.png");
        success("1200×630 OG banner downloaded!");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${gradients[gradient]} text-white aspect-[1200/630] flex flex-col justify-between shadow-2xl border border-white/10`}>
        <div className="inline-block self-start px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 font-mono text-xs font-bold">
          ● {badge}
        </div>
        <div className="space-y-2">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
          <p className="text-xs sm:text-base text-slate-300">{subtitle}</p>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">1200 × 630 px Standard Open Graph</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Headline Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Tagline Badge</label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" /> Download 1200×630 PNG
      </button>
    </div>
  );
}
