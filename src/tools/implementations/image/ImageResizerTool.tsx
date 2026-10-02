"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { Maximize2, Lock, Unlock } from "lucide-react";

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number } | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { success } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);

    const img = new Image();
    const url = URL.createObjectURL(selected);
    img.onload = () => {
      setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockRatio && originalDims && originalDims.width > 0) {
      setTargetHeight(Math.round((w / originalDims.width) * originalDims.height));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockRatio && originalDims && originalDims.height > 0) {
      setTargetWidth(Math.round((h / originalDims.height) * originalDims.width));
    }
  };

  const handleResize = () => {
    if (!file || targetWidth <= 0 || targetHeight <= 0) return;
    setIsProcessing(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResizedUrl(url);
          success(`Resized to ${targetWidth}x${targetHeight}px!`);
        }
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      }, file.type || "image/png");
    };

    img.src = objectUrl;
  };

  return (
    <div className="space-y-6">
      {!resizedUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFile}
            accept="image/*"
            maxFiles={1}
            label="Upload Image to Resize"
            subLabel="Set exact dimensions in pixels"
            files={file ? [file] : []}
            onRemoveFile={() => {
              setFile(null);
              setOriginalDims(null);
            }}
          />

          {file && originalDims && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Original Resolution: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{originalDims.width} x {originalDims.height} px</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setLockRatio(!lockRatio)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    lockRatio
                      ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 shadow-xs"
                      : "bg-slate-100 dark:bg-[#090e1c] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{lockRatio ? "Aspect Ratio Locked" : "Freeform"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ManualNumberInput
                  label="Target Width"
                  value={targetWidth}
                  onChange={handleWidthChange}
                  min={1}
                  max={10000}
                  step={1}
                  suffix="px"
                  placeholder="800"
                />
                <ManualNumberInput
                  label="Target Height"
                  value={targetHeight}
                  onChange={handleHeightChange}
                  min={1}
                  max={10000}
                  step={1}
                  suffix="px"
                  placeholder="600"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs text-slate-500 dark:text-slate-400">Presets:</span>
                {[
                  { label: "50%", scale: 0.5 },
                  { label: "75%", scale: 0.75 },
                  { label: "1080p (1920x1080)", w: 1920, h: 1080 },
                  { label: "720p (1280x720)", w: 1280, h: 720 },
                  { label: "Avatar (512x512)", w: 512, h: 512 },
                ].map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (p.scale) {
                        setTargetWidth(Math.round(originalDims.width * p.scale));
                        setTargetHeight(Math.round(originalDims.height * p.scale));
                      } else if (p.w && p.h) {
                        setTargetWidth(p.w);
                        setTargetHeight(p.h);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-white cursor-pointer transition-all shadow-xs"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleResize}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<Maximize2 className="w-4 h-4" />}
            >
              Resize Image
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title={`Resized Image (${targetWidth}x${targetHeight}px)`}
          downloadUrl={resizedUrl}
          downloadFilename={`resized_${targetWidth}x${targetHeight}_${file?.name || "image.png"}`}
          onReset={() => {
            setResizedUrl(null);
            setFile(null);
          }}
        >
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
            <img
              src={resizedUrl}
              alt="Resized preview"
              className="max-h-80 object-contain rounded-lg shadow-md"
            />
          </div>
        </ToolResult>
      )}
    </div>
  );
}
