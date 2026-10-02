"use client";

import React, { useState, useCallback } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatBytes } from "@/lib/utils";
import { getToolBySlug } from "@/tools/registry";
import {
  compressPdfFile,
  PdfCompressionLevel,
  PdfCompressionResult,
} from "@/lib/compression/pdfCompression";
import {
  Minimize2,
  FileText,
  CheckCircle2,
  Info,
  AlertTriangle,
  Download,
  RefreshCw,
  Sparkles,
  Layers,
  ShieldCheck,
} from "lucide-react";

interface BatchPdfItem {
  id: string;
  file: File;
  result?: PdfCompressionResult;
  status: "pending" | "processing" | "done" | "error";
  progressStage?: string;
  error?: string;
}

export function PdfCompressTool() {
  const currentTool = getToolBySlug("pdf-compress");
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<PdfCompressionLevel>("balanced");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const [singleResult, setSingleResult] = useState<PdfCompressionResult | null>(null);
  const [batchItems, setBatchItems] = useState<BatchPdfItem[]>([]);
  const { error, success, info } = useToast();

  const handleSingleCompress = useCallback(
    async (pdfFile: File, level: PdfCompressionLevel) => {
      setIsProcessing(true);
      setProgressPercent(5);
      setProgressStage("Analyzing PDF structure & embedded images...");

      try {
        const res = await compressPdfFile(pdfFile, {
          level,
          onProgress: (stage, pct) => {
            setProgressStage(stage);
            if (pct !== undefined) setProgressPercent(pct);
          },
        });

        setSingleResult(res);

        if (res.compressed) {
          success(`PDF optimized! Saved ${formatBytes(res.savedBytes)} (${res.reductionPercent}%)`);
        } else {
          info(res.message || "PDF is already well optimized.");
        }
      } catch (err: any) {
        console.error(err);
        error("Failed to compress PDF.");
      } finally {
        setIsProcessing(false);
        setProgressStage("");
        setProgressPercent(0);
      }
    },
    [success, info, error]
  );

  const handleBatchCompress = useCallback(
    async (rawFiles: File[], level: PdfCompressionLevel) => {
      setIsProcessing(true);
      const items: BatchPdfItem[] = rawFiles.map((f, idx) => ({
        id: `${f.name}-${idx}-${Date.now()}`,
        file: f,
        status: "pending",
      }));
      setBatchItems(items);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setProgressStage(`Processing file ${i + 1} of ${items.length}: ${item.file.name}...`);
        setProgressPercent(Math.round(((i + 1) / items.length) * 100));

        setBatchItems((prev) =>
          prev.map((it, idx) => (idx === i ? { ...it, status: "processing" } : it))
        );

        try {
          const res = await compressPdfFile(item.file, {
            level,
            onProgress: (stage) => {
              setBatchItems((prev) =>
                prev.map((it, idx) =>
                  idx === i ? { ...it, progressStage: stage } : it
                )
              );
            },
          });

          setBatchItems((prev) =>
            prev.map((it, idx) =>
              idx === i ? { ...it, status: "done", result: res } : it
            )
          );
        } catch (err: any) {
          setBatchItems((prev) =>
            prev.map((it, idx) =>
              idx === i ? { ...it, status: "error", error: "Compression failed" } : it
            )
          );
        }
      }

      setIsProcessing(false);
      setProgressStage("");
      setProgressPercent(0);
      success("Batch PDF optimization completed!");
    },
    [success]
  );

  const handleFilesSelected = (selected: File[]) => {
    if (!selected || selected.length === 0) return;
    setFiles(selected);

    if (selected.length === 1) {
      setBatchItems([]);
      handleSingleCompress(selected[0], compressionLevel);
    } else {
      setSingleResult(null);
      handleBatchCompress(selected, compressionLevel);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setSingleResult(null);
    setBatchItems([]);
    setProgressStage("");
    setProgressPercent(0);
  };

  const handleLevelChange = (lvl: PdfCompressionLevel) => {
    setCompressionLevel(lvl);
    if (files.length === 1) {
      handleSingleCompress(files[0], lvl);
    } else if (files.length > 1) {
      handleBatchCompress(files, lvl);
    }
  };

  return (
    <div className="space-y-6">
      {!singleResult && batchItems.length === 0 && (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFilesSelected}
            accept=".pdf,application/pdf"
            maxFiles={10}
            label="Upload PDF(s) to Compress"
            subLabel="Scanned & image-heavy PDFs, reports, and documents — 100% Client-Side Private"
            files={files}
            onRemoveFile={(idx) => {
              const updated = files.filter((_, i) => i !== idx);
              setFiles(updated);
            }}
            disabled={isProcessing}
          />

          {/* Compression Level Selector */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-3 shadow-md backdrop-blur-xl">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              Compression Optimization Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "low",
                  label: "LOW COMPRESSION",
                  sub: "Better Quality",
                  desc: "Moderate reduction, sharpest embedded image detail",
                },
                {
                  id: "balanced",
                  label: "BALANCED",
                  sub: "Recommended",
                  desc: "Optimal balance of file size reduction and clarity",
                },
                {
                  id: "high",
                  label: "HIGH COMPRESSION",
                  sub: "Maximum Reduction",
                  desc: "Smallest practical size for email and web upload",
                },
              ].map((lvl) => {
                const active = compressionLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setCompressionLevel(lvl.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 font-bold text-indigo-700 dark:text-indigo-300 shadow-xs ring-1 ring-indigo-500/20"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{lvl.label}</span>
                        <span className="text-[10px] font-mono opacity-80">{lvl.sub}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-normal">
                        {lvl.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Progress & Processing Indicator */}
      {isProcessing && (
        <div className="p-6 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200">
            <span>{progressStage || "Optimizing PDF..."}</span>
            <span>{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-mono text-center">
            Processing 100% inside your browser — your files never leave your device.
          </p>
        </div>
      )}

      {/* SINGLE FILE RESULT VIEW */}
      {singleResult && !isProcessing && (
        <div className="space-y-6">
          {/* Level Switcher to re-test different compression levels */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Compression Level</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              {(["low", "balanced", "high"] as PdfCompressionLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer text-[11px] ${
                    compressionLevel === lvl
                      ? "bg-indigo-600 text-white shadow-xs font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Full ToolResult Rendering */}
          <ToolResult
            title={
              singleResult.compressed
                ? "PDF Compressed Successfully"
                : "PDF is Already Optimized"
            }
            originalSize={singleResult.originalSize}
            compressedSize={singleResult.outputSize}
            compressionStatus={singleResult.status}
            statusMessage={singleResult.message}
            downloadUrl={singleResult.outputUrl}
            downloadFilename={
              singleResult.compressed
                ? `compressed_${files[0]?.name || "document.pdf"}`
                : files[0]?.name || "document.pdf"
            }
            currentTool={currentTool}
            outputType="pdf"
            summaryData={{
              type: "pdf",
              originalSize: singleResult.originalSize,
              newSize: singleResult.outputSize,
              savedBytes: singleResult.savedBytes,
              reductionPercent: singleResult.reductionPercent,
              compressionStatus: singleResult.status,
              statusMessage: singleResult.message,
              pageCount: singleResult.pageCount,
              imagesFound: singleResult.imagesFound,
              imagesOptimized: singleResult.imagesOptimized,
            }}
            onReset={handleReset}
          >
            <div className="p-6 bg-slate-50 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {files[0]?.name || "document.pdf"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {singleResult.pageCount} Pages • {singleResult.imagesFound} embedded images ({singleResult.imagesOptimized} optimized)
                </p>
              </div>
            </div>
          </ToolResult>
        </div>
      )}

      {/* BATCH RESULT VIEW */}
      {batchItems.length > 0 && !isProcessing && (
        <div className="space-y-6">
          {/* Batch Summary Header */}
          {(() => {
            const completed = batchItems.filter((i) => i.status === "done" && i.result);
            const totalOrig = completed.reduce((acc, i) => acc + (i.result?.originalSize || 0), 0);
            const totalOut = completed.reduce((acc, i) => acc + (i.result?.outputSize || 0), 0);
            const totalSaved = Math.max(0, totalOrig - totalOut);
            const totalPct = totalOrig > 0 ? Math.round((totalSaved / totalOrig) * 100) : 0;

            return (
              <div className="p-6 rounded-3xl bg-white/85 dark:bg-[#0c1322]/85 border border-slate-200/90 dark:border-white/10 shadow-lg space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Batch PDF Optimization ({completed.length} of {batchItems.length} files)
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Overall Saved: {totalPct}% ({formatBytes(totalSaved)})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Total Original</div>
                    <div className="font-bold text-slate-900 dark:text-white">{formatBytes(totalOrig)}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">Total Output</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{formatBytes(totalOut)}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Space Saved</div>
                    <div className="font-bold text-slate-900 dark:text-white">{formatBytes(totalSaved)}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Total Reduction</div>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">{totalPct}%</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Individual PDF File Results */}
          <div className="space-y-3">
            {batchItems.map((item) => {
              const res = item.result;
              const isCompressed = res?.compressed;
              const isAlreadyOptimized = res && !res.compressed;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.file.name}
                      </span>

                      {isCompressed && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          ✓ Reduced {res.reductionPercent}%
                        </span>
                      )}

                      {isAlreadyOptimized && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          ℹ Already optimized
                        </span>
                      )}

                      {item.status === "error" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                          ⚠ Error
                        </span>
                      )}
                    </div>

                    {res && (
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-3">
                        <span>Original: {formatBytes(res.originalSize)}</span>
                        <span>→</span>
                        <span className={isCompressed ? "text-emerald-600 font-bold" : ""}>
                          Output: {formatBytes(res.outputSize)}
                        </span>
                        {isCompressed && (
                          <span className="text-emerald-600">
                            (Saved {formatBytes(res.savedBytes)})
                          </span>
                        )}
                        <span className="text-slate-400">({res.pageCount} pages)</span>
                      </div>
                    )}
                  </div>

                  {res && (
                    <a
                      href={res.outputUrl}
                      download={
                        res.compressed
                          ? `compressed_${item.file.name}`
                          : item.file.name
                      }
                    >
                      <Button
                        variant={isCompressed ? "gradient" : "outline"}
                        size="sm"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                      >
                        {isCompressed ? "Download PDF" : "Download Original"}
                      </Button>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleReset}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Compress More PDFs
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
