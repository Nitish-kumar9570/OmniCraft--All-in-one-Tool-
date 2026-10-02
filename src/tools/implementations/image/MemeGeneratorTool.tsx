"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Smile } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function MemeGeneratorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [topText, setTopText] = useState<string>("WHEN YOUR CODE WORKS");
  const [bottomText, setBottomText] = useState<string>("ON THE FIRST TRY");
  const [fontSize, setFontSize] = useState<number>(36);
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerate = () => {
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
      ctx.drawImage(img, 0, 0);

      // Setup meme impact text style
      const scaledFontSize = Math.round((fontSize * canvas.width) / 600);
      ctx.font = `900 ${scaledFontSize}px Impact, Arial, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = Math.max(3, scaledFontSize / 8);
      ctx.textAlign = "center";

      // Top Text
      if (topText.trim()) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, scaledFontSize + 20);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, scaledFontSize + 20);
      }

      // Bottom Text
      if (bottomText.trim()) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setMemeUrl(url);
        }
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      }, "image/png");
    };

    img.src = objectUrl;
  };

  return (
    <div className="space-y-6">
      {!memeUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={(files) => setFile(files[0])}
            accept="image/*"
            maxFiles={1}
            label="Upload Image for Meme"
            subLabel="PNG, JPG, WEBP"
            files={file ? [file] : []}
            onRemoveFile={() => setFile(null)}
          />

          {file && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
              <Input
                label="Top Text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="TOP CAPTION"
              />
              <Input
                label="Bottom Text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="BOTTOM CAPTION"
              />
              <ManualNumberInput
                label="Caption Font Size"
                value={fontSize}
                onChange={setFontSize}
                min={12}
                max={150}
                step={1}
                suffix="px"
                placeholder="36"
                presets={[
                  { label: "24px", value: 24 },
                  { label: "36px", value: 36 },
                  { label: "48px", value: 48 },
                  { label: "64px", value: 64 },
                  { label: "80px", value: 80 },
                ]}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleGenerate}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<Smile className="w-4 h-4" />}
            >
              Generate Meme
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="Meme Ready to Share"
          downloadUrl={memeUrl}
          downloadFilename="custom_meme.png"
          onReset={() => {
            setMemeUrl(null);
            setFile(null);
          }}
        >
          <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
            <img src={memeUrl} alt="Meme output" className="max-h-96 object-contain rounded-lg shadow-md" />
          </div>
        </ToolResult>
      )}
    </div>
  );
}
