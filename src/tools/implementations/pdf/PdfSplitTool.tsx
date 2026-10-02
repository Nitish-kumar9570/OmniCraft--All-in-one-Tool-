"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Scissors } from "lucide-react";

export function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const { error, success } = useToast();

  const handleFile = async (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      setPageRange(`1-${count}`);
    } catch {
      error("Could not read PDF page count.");
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const newPdf = await PDFDocument.create();

      // Parse range string (e.g. "1-3, 5")
      const pagesToExtract = new Set<number>();
      const parts = pageRange.split(",");

      for (const part of parts) {
        const clean = part.trim();
        if (clean.includes("-")) {
          const [startStr, endStr] = clean.split("-");
          const start = Math.max(1, parseInt(startStr, 10));
          const end = Math.min(pageCount, parseInt(endStr, 10));
          for (let i = start; i <= end; i++) pagesToExtract.add(i - 1);
        } else {
          const num = parseInt(clean, 10);
          if (num >= 1 && num <= pageCount) pagesToExtract.add(num - 1);
        }
      }

      const indices = Array.from(pagesToExtract).sort((a, b) => a - b);
      if (indices.length === 0) {
        error("Invalid page range specified.");
        setIsProcessing(false);
        return;
      }

      const copied = await newPdf.copyPages(srcPdf, indices);
      copied.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setSplitPdfUrl(url);
      success(`Extracted ${indices.length} page(s) successfully!`);
    } catch (err) {
      console.error(err);
      error("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!splitPdfUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFile}
            accept=".pdf"
            maxFiles={1}
            label="Upload PDF to Split"
            subLabel="Extract specific pages or page ranges"
            files={file ? [file] : []}
            onRemoveFile={() => {
              setFile(null);
              setPageCount(0);
            }}
            disabled={isProcessing}
          />

          {file && pageCount > 0 && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Total Pages: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{pageCount}</strong>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Example: 1-3, 5, 7-9</span>
              </div>
              <Input
                label="Pages to Extract"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="1-3, 5"
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleSplit}
              disabled={!file || isProcessing}
              isLoading={isProcessing}
              leftIcon={<Scissors className="w-4 h-4" />}
            >
              Split & Extract Pages
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="Extracted PDF Ready"
          downloadUrl={splitPdfUrl}
          downloadFilename={`extracted_${file?.name || "pages.pdf"}`}
          onReset={() => {
            setSplitPdfUrl(null);
            setFile(null);
          }}
        >
          <div className="space-y-3">
            <div className="hidden sm:block">
              <iframe
                src={splitPdfUrl}
                className="w-full h-96 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14]"
                title="Split PDF Preview"
              />
            </div>
            <div className="sm:hidden p-6 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Extracted PDF Ready</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  Pages: {pageRange}
                </p>
              </div>
              <a
                href={splitPdfUrl}
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

