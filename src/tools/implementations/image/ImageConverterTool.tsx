"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { RefreshCw } from "lucide-react";

export function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { success } = useToast();

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill white background for JPEG
      if (targetFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${targetFormat}`;
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
          success(`Converted to ${targetFormat.toUpperCase()}!`);
        }
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      }, mimeType, 0.92);
    };

    img.src = objectUrl;
  };

  const getTargetExt = () => (targetFormat === "jpeg" ? "jpg" : targetFormat);

  return (
    <div className="space-y-6">
      {!convertedUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={(files) => setFile(files[0])}
            accept="image/*"
            maxFiles={1}
            label="Upload Image to Convert"
            subLabel="JPG, PNG, WEBP, BMP, SVG supported"
            files={file ? [file] : []}
            onRemoveFile={() => setFile(null)}
          />

          {file && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                Target Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "png", label: "PNG", desc: "Lossless with transparency" },
                  { id: "jpeg", label: "JPG / JPEG", desc: "Best for photos & web" },
                  { id: "webp", label: "WEBP", desc: "Modern lightweight format" },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setTargetFormat(fmt.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      targetFormat === fmt.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 font-bold text-indigo-700 dark:text-indigo-300 shadow-xs"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                    }`}
                  >
                    <p className="text-xs font-bold">{fmt.label}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{fmt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleConvert}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Convert to {targetFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title={`Converted to ${targetFormat.toUpperCase()}`}
          downloadUrl={convertedUrl}
          downloadFilename={`converted_${file?.name?.replace(/\.[^/.]+$/, "") || "image"}.${getTargetExt()}`}
          onReset={() => {
            setConvertedUrl(null);
            setFile(null);
          }}
        >
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
            <img src={convertedUrl} alt="Converted output" className="max-h-80 object-contain rounded-lg shadow-md" />
          </div>
        </ToolResult>
      )}
    </div>
  );
}
