"use client";

import React, { useState, useRef } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import { copyToClipboard } from "@/lib/utils";

export function ImageColorPickerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedHex, setSelectedHex] = useState<string>("#6366f1");
  const [selectedRgb, setSelectedRgb] = useState<string>("rgb(99, 102, 241)");
  const [selectedHsl, setSelectedHsl] = useState<string>("hsl(239, 84%, 67%)");
  const [palette, setPalette] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { success } = useToast();

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const url = URL.createObjectURL(files[0]);
    setImageSrc(url);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // Extract sample palette from 6 random sample points
      const colors: string[] = [];
      const stepX = Math.floor(img.naturalWidth / 4);
      const stepY = Math.floor(img.naturalHeight / 3);

      for (let y = stepY / 2; y < img.naturalHeight; y += stepY) {
        for (let x = stepX / 2; x < img.naturalWidth; x += stepX) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
          if (!colors.includes(hex)) colors.push(hex);
        }
      }
      setPalette(colors.slice(0, 6));
    };
    img.src = url;
  };

  const sampleColorAtClientPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.max(0, Math.min(canvas.width - 1, (clientX - rect.left) * scaleX));
    const y = Math.max(0, Math.min(canvas.height - 1, (clientY - rect.top) * scaleY));

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
    setSelectedHex(hex);
    setSelectedRgb(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
    setSelectedHsl(rgbToHsl(pixel[0], pixel[1], pixel[2]));
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    sampleColorAtClientPos(e.clientX, e.clientY);
  };

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches && e.touches[0]) {
      sampleColorAtClientPos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const copyText = async (val: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      success(`Copied ${val}`);
    }
  };


  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="image/*"
          maxFiles={1}
          label="Upload Image to Pick Colors"
          subLabel="Click anywhere on the image to sample exact pixel values"
        />
      ) : (
        <div className="space-y-6">
          {/* Active Color Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-md backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl shadow-inner border border-slate-300 dark:border-white/20"
                style={{ backgroundColor: selectedHex }}
              />
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase font-mono">
                  {selectedHex}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">{selectedRgb}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{selectedHsl}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyText(selectedHex)}>
                Copy HEX
              </Button>
              <Button variant="outline" size="sm" onClick={() => copyText(selectedRgb)}>
                Copy RGB
              </Button>
            </div>
          </div>

          {/* Palette Samples */}
          {palette.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Extracted Palette:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {palette.map((color, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setSelectedHex(color);
                      copyText(color);
                    }}
                    className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e1c] text-slate-800 dark:text-slate-200 cursor-pointer shadow-xs hover:scale-105 transition-transform touch-manipulation active:scale-95"
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20" style={{ backgroundColor: color }} />
                    <span className="text-xs font-mono font-medium">{color}</span>
                  </button>
                ))}

              </div>
            </div>
          )}

          {/* Interactive Canvas */}
          <div className="p-3 sm:p-5 bg-slate-100 dark:bg-[#060a14] rounded-3xl flex justify-center overflow-auto border border-slate-200 dark:border-white/10 shadow-inner">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
              style={{ touchAction: "none" }}
              className="max-h-96 max-w-full object-contain rounded-xl cursor-crosshair shadow-md"
            />
          </div>


          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setImageSrc(null);
                setPalette([]);
              }}
            >
              Upload Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
