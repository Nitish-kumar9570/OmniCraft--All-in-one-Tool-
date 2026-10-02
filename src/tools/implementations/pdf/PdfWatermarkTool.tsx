"use client";

import React, { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Stamp } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [opacityPercent, setOpacityPercent] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const { error, success } = useToast();

  const opacity = opacityPercent / 100;

  const handleWatermark = async () => {
    if (!file || !watermarkText.trim()) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = pdf.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermarkText.trim(), {
          x: width / 4,
          y: height / 2,
          size: 50,
          rotate: degrees(45),
          opacity,
          color: rgb(0.8, 0.2, 0.2),
        });
      }

      const watermarkedBytes = await pdf.save();
      const blob = new Blob([watermarkedBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setWatermarkedUrl(url);
      success("Watermark stamped on all pages!");
    } catch (err) {
      console.error(err);
      error("Failed to watermark PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!watermarkedUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={(files) => setFile(files[0])}
            accept=".pdf"
            maxFiles={1}
            label="Upload PDF to Watermark"
            subLabel="Add custom text or confidentiality stamps"
            files={file ? [file] : []}
            onRemoveFile={() => setFile(null)}
            disabled={isProcessing}
          />

          {file && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
              <Input
                label="Watermark Text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="CONFIDENTIAL, DRAFT, DO NOT COPY"
              />

              <ManualNumberInput
                label="Stamp Opacity"
                value={opacityPercent}
                onChange={setOpacityPercent}
                min={5}
                max={100}
                step={5}
                suffix="%"
                placeholder="30"
                presets={[
                  { label: "15%", value: 15 },
                  { label: "30%", value: 30 },
                  { label: "50%", value: 50 },
                  { label: "75%", value: 75 },
                ]}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleWatermark}
              disabled={!file || !watermarkText.trim() || isProcessing}
              isLoading={isProcessing}
              leftIcon={<Stamp className="w-4 h-4" />}
            >
              Apply Watermark
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="Watermarked PDF Ready"
          downloadUrl={watermarkedUrl}
          downloadFilename={`watermarked_${file?.name || "document.pdf"}`}
          onReset={() => {
            setWatermarkedUrl(null);
            setFile(null);
          }}
        >
          <div className="space-y-3">
            <div className="hidden sm:block">
              <iframe
                src={watermarkedUrl}
                className="w-full h-96 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14]"
                title="Watermarked PDF Preview"
              />
            </div>
            <div className="sm:hidden p-6 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <Stamp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Watermarked PDF Ready</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  Stamp: &quot;{watermarkText}&quot; ({opacityPercent}% Opacity)
                </p>
              </div>
              <a
                href={watermarkedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md touch-manipulation"
              >
                <span>View PDF in Browser Tab</span>
              </a>
            </div>
          </div>
        </ToolResult>
      )}
    </div>
  );
}

