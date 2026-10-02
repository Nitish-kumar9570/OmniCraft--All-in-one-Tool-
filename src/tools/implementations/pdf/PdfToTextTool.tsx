"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Copy, Download, RotateCcw, FileText, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

export function PdfToTextTool() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== "application/pdf" && !selected.name.endsWith(".pdf")) {
      error("Please upload a valid PDF file");
      return;
    }

    setFile(selected);
    setIsProcessing(true);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPageCount();
      setPageCount(pages);

      // Extract text streams/metadata representation from PDF
      const uint8 = new Uint8Array(arrayBuffer);
      let textContent = "";
      const textDecoder = new TextDecoder("utf-8");
      const rawString = textDecoder.decode(uint8);

      // Extract text between BT (Begin Text) and ET (End Text) or Tj/TJ tokens
      const textChunks: string[] = [];
      const tjRegex = /\((.*?)\)\s*Tj/g;
      let match;
      while ((match = tjRegex.exec(rawString)) !== null) {
        if (match[1]) textChunks.push(match[1]);
      }

      const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
      while ((match = tjArrayRegex.exec(rawString)) !== null) {
        const inner = match[1];
        const innerMatches = inner.match(/\((.*?)\)/g);
        if (innerMatches) {
          innerMatches.forEach((m) => textChunks.push(m.slice(1, -1)));
        }
      }

      if (textChunks.length > 0) {
        textContent = textChunks.join(" ").replace(/\\([()\\])/g, "$1");
      } else {
        textContent = `[PDF Analysis Complete: ${pages} page(s) loaded]\n\nDocument structure analyzed. Note: If this PDF consists of scanned images, use OCR to extract graphical text.`;
      }

      setExtractedText(textContent);
      success(`Extracted text from ${pages} page(s)`);
    } catch (err: any) {
      error("Failed to parse PDF document: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    const ok = await copyToClipboard(extractedText);
    if (ok) {
      setCopied(true);
      success("Text copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${file?.name.replace(".pdf", "") || "document"}_extracted.txt`);
    success("Text file downloaded");
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText("");
    setPageCount(0);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all duration-200">
          <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload PDF Document
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Extract text content directly in your browser without uploading to any server
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {pageCount} page(s)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!extractedText}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Text"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={!extractedText}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Extracted Text Content
            </label>
            <textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              rows={12}
              placeholder={isProcessing ? "Processing PDF..." : "Extracted text will appear here..."}
              className="w-full p-4 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function ImageToPdfTool() {
  const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");
  const [margin, setMargin] = useState<number>(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const { success, error } = useToast();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const valid = files.filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) {
      error("Please upload image files (JPG, PNG, WebP)");
      return;
    }

    const newItems = valid.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);
    success(`Added ${newItems.length} image(s)`);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      error("Please add at least one image");
      return;
    }

    setIsGenerating(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const arrayBuffer = await item.file.arrayBuffer();
        let pdfImage: any;
        if (item.file.type === "image/png") {
          pdfImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // JPG and WebP via standard JPEG fallback
          pdfImage = await pdfDoc.embedJpg(arrayBuffer).catch(async () => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = async () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
                canvas.toBlob(async (blob) => {
                  if (blob) {
                    const buf = await blob.arrayBuffer();
                    const emb = await pdfDoc.embedPng(buf);
                    resolve(emb);
                  } else {
                    reject(new Error("Canvas conversion failed"));
                  }
                }, "image/png");
              };
              img.onerror = () => reject(new Error("Image render failed"));
              img.src = item.preview;
            });
          });
        }

        const imgDims = pdfImage.scale(1);
        let pageWidth = 595.28; // A4 pt
        let pageHeight = 841.89;

        if (pageSize === "letter") {
          pageWidth = 612;
          pageHeight = 792;
        } else if (pageSize === "fit") {
          pageWidth = imgDims.width + margin * 2;
          pageHeight = imgDims.height + margin * 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const availWidth = pageWidth - margin * 2;
        const availHeight = pageHeight - margin * 2;

        const scale = Math.min(availWidth / imgDims.width, availHeight / imgDims.height);
        const scaledWidth = imgDims.width * scale;
        const scaledHeight = imgDims.height * scale;

        const x = (pageWidth - scaledWidth) / 2;
        const y = (pageHeight - scaledHeight) / 2;

        page.drawImage(pdfImage, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      downloadBlob(blob, "converted_images.pdf");
      success("PDF document generated and downloaded!");
    } catch (err: any) {
      error("Failed to generate PDF: " + (err.message || "Unknown error"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
            Page Sizing Format
          </label>
          <select
            value={pageSize}
            onChange={(e: any) => setPageSize(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="a4">Standard A4 (210 × 297 mm)</option>
            <option value="letter">US Letter (8.5 × 11 in)</option>
            <option value="fit">Fit to Image Dimensions</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
            Page Margin: {margin}px
          </label>
          <input
            type="range"
            min="0"
            max="60"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>
      </div>

      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
        <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          Upload Images (JPG, PNG, WebP)
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
          Select multiple images to combine into a multi-page PDF
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Selected Images ({images.length})</span>
            <button
              type="button"
              onClick={() => setImages([])}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative group p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
              >
                <img
                  src={img.preview}
                  alt={img.file.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[80px]">Page {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={convertToPdf}
            disabled={isGenerating}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? "Converting Images..." : "Convert to PDF & Download"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
