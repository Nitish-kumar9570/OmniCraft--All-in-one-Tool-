"use client";

import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Upload, Download, Trash2, Scissors, Info, Hash } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { downloadBlob } from "@/lib/utils";

// ==========================================
// 1. PDF Page Deleter Tool
// ==========================================
export function PdfPageDeleterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesToDelete, setPagesToDelete] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setPageCount(pdfDoc.getPageCount());
      success(`Loaded PDF with ${pdfDoc.getPageCount()} pages`);
    } catch {
      error("Failed to load PDF file");
    }
  };

  const parseRanges = (input: string, max: number): number[] => {
    const indices: Set<number> = new Set();
    const parts = input.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
            if (i >= 1 && i <= max) indices.add(i - 1);
          }
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= max) {
          indices.add(num - 1);
        }
      }
    }
    return Array.from(indices).sort((a, b) => b - a); // Descending for safe deletion
  };

  const handleDelete = async () => {
    if (!file) return;
    const deleteList = parseRanges(pagesToDelete, pageCount);
    if (deleteList.length === 0) {
      error("Please specify valid page numbers to delete (e.g. 1, 3-5)");
      return;
    }
    if (deleteList.length >= pageCount) {
      error("Cannot delete all pages in document");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      for (const pageIdx of deleteList) {
        pdfDoc.removePage(pageIdx);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      downloadBlob(blob, `${file.name.replace(".pdf", "")}_pages_deleted.pdf`);
      success(`Successfully removed ${deleteList.length} page(s)!`);
    } catch (err: any) {
      error("Failed to delete pages: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Trash2 className="w-10 h-10 text-rose-500 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload PDF Document
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Permanently remove specific pages or ranges from your document
          </span>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{file.name}</div>
              <div className="text-[11px] text-slate-500">Total: {pageCount} Pages</div>
            </div>
            <button
              type="button"
              onClick={() => { setFile(null); setPagesToDelete(""); }}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Change File
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Page numbers to delete (e.g. 1, 3-5, 8)
            </label>
            <input
              type="text"
              value={pagesToDelete}
              onChange={(e) => setPagesToDelete(e.target.value)}
              placeholder="e.g. 2, 4-6"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isProcessing ? "Processing..." : "Delete Pages & Download PDF"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. PDF Page Extractor Tool
// ==========================================
export function PdfPageExtractorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesToExtract, setPagesToExtract] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setPageCount(pdfDoc.getPageCount());
      success(`Loaded PDF with ${pdfDoc.getPageCount()} pages`);
    } catch {
      error("Failed to load PDF file");
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    const parts = pagesToExtract.split(",");
    const indices: number[] = [];
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
            if (i >= 1 && i <= pageCount) indices.push(i - 1);
          }
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= pageCount) {
          indices.push(num - 1);
        }
      }
    }

    if (indices.length === 0) {
      error("Please specify valid page numbers to extract (e.g. 1-3, 5)");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      const copiedPages = await newDoc.copyPages(sourceDoc, indices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      downloadBlob(blob, `${file.name.replace(".pdf", "")}_extracted_pages.pdf`);
      success(`Extracted ${indices.length} page(s) into new PDF!`);
    } catch (err: any) {
      error("Failed to extract pages: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Scissors className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload PDF Document
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Extract selected pages into a clean new standalone PDF
          </span>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{file.name}</div>
              <div className="text-[11px] text-slate-500">Total Pages: {pageCount}</div>
            </div>
            <button
              type="button"
              onClick={() => { setFile(null); setPagesToExtract(""); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Change File
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Page numbers to extract (e.g. 1-4, 7, 10-12)
            </label>
            <input
              type="text"
              value={pagesToExtract}
              onChange={(e) => setPagesToExtract(e.target.value)}
              placeholder="e.g. 1-3, 5"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleExtract}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isProcessing ? "Extracting..." : "Extract Pages & Download PDF"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. PDF Metadata Viewer & Editor Tool
// ==========================================
export function PdfMetadataTool() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [creator, setCreator] = useState("");
  const [producer, setProducer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setTitle(pdfDoc.getTitle() || "");
      setAuthor(pdfDoc.getAuthor() || "");
      setSubject(pdfDoc.getSubject() || "");
      setKeywords((pdfDoc.getKeywords() || "").toString());
      setCreator(pdfDoc.getCreator() || "");
      setProducer(pdfDoc.getProducer() || "");
      success("PDF metadata loaded");
    } catch {
      error("Failed to load PDF metadata");
    }
  };

  const handleSaveMetadata = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      pdfDoc.setTitle(title);
      pdfDoc.setAuthor(author);
      pdfDoc.setSubject(subject);
      pdfDoc.setKeywords(keywords.split(",").map((k) => k.trim()));
      pdfDoc.setCreator(creator);
      pdfDoc.setProducer(producer);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      downloadBlob(blob, `${file.name.replace(".pdf", "")}_updated_metadata.pdf`);
      success("Metadata saved and new PDF downloaded!");
    } catch (err: any) {
      error("Failed to save metadata: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Info className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload PDF Document
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View, inspect, and update PDF document metadata properties
          </span>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Financial Report"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Q4 Performance & Analysis"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Keywords (comma separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. finance, quarterly, report, 2026"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Creator Application</label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. OmniCraft Studio"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">PDF Producer</label>
              <input
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                placeholder="e.g. OmniCraft PDF Engine"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveMetadata}
              disabled={isProcessing}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? "Saving Metadata..." : "Save Metadata & Download PDF"}</span>
            </button>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. PDF Header & Footer / Page Number Tool
// ==========================================
export function PdfHeaderFooterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [headerText, setHeaderText] = useState("");
  const [footerPattern, setFooterPattern] = useState<"page-num" | "page-of-total" | "custom">("page-of-total");
  const [customFooter, setCustomFooter] = useState("");
  const [fontSize, setFontSize] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      success("PDF loaded");
    }
  };

  const handleApply = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      pages.forEach((page, idx) => {
        const { width, height } = page.getSize();
        const pageNum = idx + 1;

        // Draw Header
        if (headerText.trim()) {
          const headerWidth = helvetica.widthOfTextAtSize(headerText, fontSize);
          page.drawText(headerText, {
            x: (width - headerWidth) / 2,
            y: height - 25,
            size: fontSize,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4),
          });
        }

        // Draw Footer
        let footerStr = "";
        if (footerPattern === "page-num") {
          footerStr = `Page ${pageNum}`;
        } else if (footerPattern === "page-of-total") {
          footerStr = `Page ${pageNum} of ${totalPages}`;
        } else {
          footerStr = customFooter.replace("{page}", pageNum.toString()).replace("{total}", totalPages.toString());
        }

        if (footerStr.trim()) {
          const footerWidth = helvetica.widthOfTextAtSize(footerStr, fontSize);
          page.drawText(footerStr, {
            x: (width - footerWidth) / 2,
            y: 20,
            size: fontSize,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      downloadBlob(blob, `${file.name.replace(".pdf", "")}_header_footer.pdf`);
      success("Headers & page numbers applied successfully!");
    } catch (err: any) {
      error("Failed to apply headers: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Hash className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload PDF Document
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add page numbers, header text, and footer notices across all PDF pages
          </span>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Header Text (Top Centered)
            </label>
            <input
              type="text"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              placeholder="e.g. Confidential — Internal Review"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Footer / Page Numbering
              </label>
              <select
                value={footerPattern}
                onChange={(e: any) => setFooterPattern(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
              >
                <option value="page-of-total">Page X of Y (e.g. Page 1 of 12)</option>
                <option value="page-num">Page X (e.g. Page 1)</option>
                <option value="custom">Custom Format</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Font Size: {fontSize}pt
              </label>
              <input
                type="range"
                min="8"
                max="18"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
              />
            </div>
          </div>

          {footerPattern === "custom" && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Custom Footer Pattern (use {'{page}'} and {'{total}'})
              </label>
              <input
                type="text"
                value={customFooter}
                onChange={(e) => setCustomFooter(e.target.value)}
                placeholder="e.g. Doc #42 — Page {page} of {total}"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleApply}
              disabled={isProcessing}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? "Applying Headers..." : "Apply & Download PDF"}</span>
            </button>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
