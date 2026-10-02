"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { Crop } from "lucide-react";

export function ImageCropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
  };

  const handleCrop = () => {
    if (!file) return;
    setIsProcessing(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let cropWidth = img.naturalWidth;
      let cropHeight = img.naturalHeight;

      if (aspectRatio) {
        if (img.naturalWidth / img.naturalHeight > aspectRatio) {
          cropWidth = img.naturalHeight * aspectRatio;
        } else {
          cropHeight = img.naturalWidth / aspectRatio;
        }
      }

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const startX = (img.naturalWidth - cropWidth) / 2;
      const startY = (img.naturalHeight - cropHeight) / 2;

      ctx.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCroppedUrl(url);
        }
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      }, file.type || "image/png");
    };

    img.src = objectUrl;
  };

  return (
    <div className="space-y-6">
      {!croppedUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFile}
            accept="image/*"
            maxFiles={1}
            label="Upload Image to Crop"
            subLabel="Standard aspect ratios or centered square"
            files={file ? [file] : []}
            onRemoveFile={() => setFile(null)}
          />

          {file && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                Aspect Ratio Frame
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: null, label: "Full Image" },
                  { id: 1, label: "1:1 Square (Avatar/Post)" },
                  { id: 16 / 9, label: "16:9 Landscape (Video)" },
                  { id: 9 / 16, label: "9:16 Portrait (Story/Reel)" },
                ].map((asp, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setAspectRatio(asp.id)}
                    className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${
                      aspectRatio === asp.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-xs"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                    }`}
                  >
                    {asp.label}
                  </button>
                ))}

              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleCrop}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<Crop className="w-4 h-4" />}
            >
              Crop Image
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="Image Cropped Successfully"
          downloadUrl={croppedUrl}
          downloadFilename={`cropped_${file?.name || "image.png"}`}
          onReset={() => {
            setCroppedUrl(null);
            setFile(null);
          }}
        >
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
            <img src={croppedUrl} alt="Cropped output" className="max-h-80 object-contain rounded-lg shadow-md" />
          </div>
        </ToolResult>
      )}
    </div>
  );
}
