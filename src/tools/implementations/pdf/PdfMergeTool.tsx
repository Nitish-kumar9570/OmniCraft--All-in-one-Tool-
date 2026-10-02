"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { FileText } from "lucide-react";

export function PdfMergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [mergedSize, setMergedSize] = useState<number>(0);
  const { error, success } = useToast();

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      error("Please upload at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);
      setMergedSize(blob.size);
      success("PDFs merged successfully!");
    } catch (err: any) {
      console.error(err);
      error("Failed to merge PDF files. Please ensure files are valid PDFs.");
    } finally {
      setIsProcessing(false);
    }
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="space-y-6">
      {!mergedPdfUrl ? (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFilesSelected}
            accept=".pdf"
            maxFiles={20}
            label="Upload PDF Files to Merge"
            subLabel="Select 2 or more PDF documents"
            files={files}
            onRemoveFile={handleRemove}
            disabled={isProcessing}
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              isLoading={isProcessing}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              {isProcessing ? "Merging PDFs..." : `Merge ${files.length} PDFs`}
            </Button>
          </div>
        </div>
      ) : (
        <ToolResult
          title="PDF Merge Complete"
          originalSize={totalOriginalSize}
          compressedSize={mergedSize}
          downloadUrl={mergedPdfUrl}
          downloadFilename="merged_document.pdf"
          onReset={() => {
            setMergedPdfUrl(null);
            setFiles([]);
          }}
        >
          <div className="space-y-3">
            <div className="hidden sm:block">
              <iframe
                src={mergedPdfUrl}
                className="w-full h-96 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14]"
                title="Merged PDF Preview"
              />
            </div>
            <div className="sm:hidden p-6 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Merged PDF Document</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {files.length} documents merged • {(mergedSize / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <a
                href={mergedPdfUrl}
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

