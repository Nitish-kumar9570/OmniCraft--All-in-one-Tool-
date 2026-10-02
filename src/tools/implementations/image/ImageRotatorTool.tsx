"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { downloadBlob } from "@/lib/utils";

export function ImageRotatorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("image");
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { success, error } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      error("Please upload an image file");
      return;
    }
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      success("Image loaded");
    };
    reader.readAsDataURL(file);
  };

  const handleRotate = (deg: number) => {
    setRotation((prev) => (prev + deg + 360) % 360);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const isSideways = rotation === 90 || rotation === 270;
      canvas.width = isSideways ? img.height : img.width;
      canvas.height = isSideways ? img.width : img.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${fileName}_transformed.png`);
          success("Image downloaded");
        }
      }, "image/png");
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <RotateCw className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image to Rotate &amp; Flip
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Rotate 90°, 180°, 270° or mirror flip horizontally and vertically
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => handleRotate(-90)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 90° CCW
            </button>
            <button
              type="button"
              onClick={() => handleRotate(90)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" /> 90° CW
            </button>
            <button
              type="button"
              onClick={() => setFlipH(!flipH)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                flipH ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5" /> Flip Horizontal
            </button>
            <button
              type="button"
              onClick={() => setFlipV(!flipV)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                flipV ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              }`}
            >
              <FlipVertical className="w-3.5 h-3.5" /> Flip Vertical
            </button>
            <button
              type="button"
              onClick={() => { setRotation(0); setFlipH(false); setFlipV(false); }}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Reset Transformation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preview Container */}
          <div className="flex items-center justify-center p-6 min-h-[300px] rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 overflow-hidden">
            <img
              src={imageSrc}
              alt="Preview"
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                transition: "transform 0.2s ease-out",
                maxHeight: "360px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Transformed Image</span>
            </button>
            <button
              type="button"
              onClick={() => setImageSrc(null)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Change Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
