"use client";

import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { RotateCw, RotateCcw } from "lucide-react";

export function PdfRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);
  const { error, success } = useToast();

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRot = page.getRotation().angle;
        page.setRotation(degrees((currentRot + rotationAngle) % 360));
      });

      const rotatedBytes = await pdf.save();
      const blob = new Blob([rotatedBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setRotatedUrl(url);
      success("Rotated all pages successfully!");
    } catch (err) {
      console.error(err);
      error("Failed to rotate PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!rotatedUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={(files) => setFile(files[0])}
            accept=".pdf"
            maxFiles={1}
            label="Upload PDF to Rotate"
            subLabel="Rotate pages permanently"
            files={file ? [file] : []}
            onRemoveFile={() => setFile(null)}
            disabled={isProcessing}
          />

          {file && (
            <div className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-md backdrop-blur-xl flex-wrap">
              <Button
                variant={rotationAngle === 90 ? "primary" : "outline"}
                size="md"
                onClick={() => setRotationAngle(90)}
                leftIcon={<RotateCw className="w-4 h-4" />}
              >
                90° Clockwise
              </Button>
              <Button
                variant={rotationAngle === 180 ? "primary" : "outline"}
                size="md"
                onClick={() => setRotationAngle(180)}
                leftIcon={<RotateCw className="w-4 h-4" />}
              >
                180° Flip
              </Button>
              <Button
                variant={rotationAngle === 270 ? "primary" : "outline"}
                size="md"
                onClick={() => setRotationAngle(270)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                90° Counter-Clockwise
              </Button>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleRotate}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<RotateCw className="w-4 h-4" />}
            >
              Rotate PDF
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="Rotated PDF Ready"
          downloadUrl={rotatedUrl}
          downloadFilename={`rotated_${file?.name || "document.pdf"}`}
          onReset={() => {
            setRotatedUrl(null);
            setFile(null);
          }}
        >
          <div className="space-y-3">
            <div className="hidden sm:block">
              <iframe
                src={rotatedUrl}
                className="w-full h-96 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14]"
                title="Rotated PDF Preview"
              />
            </div>
            <div className="sm:hidden p-6 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <RotateCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Rotated PDF Ready</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  Rotated by {rotationAngle}°
                </p>
              </div>
              <a
                href={rotatedUrl}
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

