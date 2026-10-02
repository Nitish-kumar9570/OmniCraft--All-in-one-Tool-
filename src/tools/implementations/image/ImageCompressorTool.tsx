"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { formatBytes } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { Button } from "@/components/ui/Button";
import { getToolBySlug } from "@/tools/registry";
import {
  compressImageFile,
  ImageCompressionMode,
  ImageDimensionPreset,
  ImageCompressionResult,
} from "@/lib/compression/imageCompression";
import {
  Zap,
  Sliders,
  Flame,
  CheckCircle2,
  Info,
  AlertTriangle,
  Download,
  RefreshCw,
  Sparkles,
  Layers,
} from "lucide-react";

interface BatchItem {
  id: string;
  file: File;
  result?: ImageCompressionResult;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export function ImageCompressorTool() {
  const currentTool = getToolBySlug("image-compressor");
  const [files, setFiles] = useState<File[]>([]);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [singleResult, setSingleResult] = useState<ImageCompressionResult | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  // Settings
  const [mode, setMode] = useState<ImageCompressionMode>("balanced");
  const [quality, setQuality] = useState<number>(75);
  const [dimensionPreset, setDimensionPreset] = useState<ImageDimensionPreset>("original");
  const [customScalePercent, setCustomScalePercent] = useState<number>(100);
  const [outputFormat, setOutputFormat] = useState<"auto" | "jpeg" | "png" | "webp">("auto");
  const [stripMetadata, setStripMetadata] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>("");
  const { error, success, info } = useToast();

  // Process a single file
  const runSingleCompression = useCallback(
    async (imgFile: File) => {
      setIsProcessing(true);
      setProgressStatus("Analyzing image format & dimensions...");
      try {
        const origUrl = URL.createObjectURL(imgFile);
        setOriginalUrl(origUrl);

        setProgressStatus("Compressing with adaptive quality...");
        const res = await compressImageFile(imgFile, {
          mode,
          quality,
          dimensionPreset,
          customScalePercent,
          outputFormat,
          stripMetadata,
        });

        setProgressStatus("Verifying output integrity...");
        setSingleResult(res);

        if (res.compressed) {
          success(`Image compressed! Saved ${formatBytes(res.savedBytes)} (${res.reductionPercent}%)`);
        } else {
          info(res.message || "Original file retained — already optimized.");
        }
      } catch (err: any) {
        console.error(err);
        error("Failed to compress image.");
      } finally {
        setIsProcessing(false);
        setProgressStatus("");
      }
    },
    [mode, quality, dimensionPreset, customScalePercent, outputFormat, stripMetadata, success, info, error]
  );

  // Process batch of files independently
  const runBatchCompression = useCallback(
    async (rawFiles: File[]) => {
      setIsProcessing(true);
      const items: BatchItem[] = rawFiles.map((f, idx) => ({
        id: `${f.name}-${idx}-${Date.now()}`,
        file: f,
        status: "pending",
      }));
      setBatchItems(items);

      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        setProgressStatus(`Processing file ${i + 1} of ${items.length}: ${currentItem.file.name}...`);
        setBatchItems((prev) =>
          prev.map((item, idx) => (idx === i ? { ...item, status: "processing" } : item))
        );

        try {
          const res = await compressImageFile(currentItem.file, {
            mode,
            quality,
            dimensionPreset,
            customScalePercent,
            outputFormat,
            stripMetadata,
          });

          setBatchItems((prev) =>
            prev.map((item, idx) =>
              idx === i ? { ...item, status: "done", result: res } : item
            )
          );
        } catch (err: any) {
          setBatchItems((prev) =>
            prev.map((item, idx) =>
              idx === i ? { ...item, status: "error", error: "Compression failed" } : item
            )
          );
        }
      }

      setIsProcessing(false);
      setProgressStatus("");
      success("Batch compression finished!");
    },
    [mode, quality, dimensionPreset, customScalePercent, outputFormat, stripMetadata, success]
  );

  // Pipeline integration from other OmniCraft tools
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("omni_pending_input");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fileUrl) {
          fetch(parsed.fileUrl)
            .then((r) => r.blob())
            .then((blob) => {
              const syntheticFile = new File([blob], parsed.fileName || "image.jpg", {
                type: blob.type || "image/jpeg",
              });
              setFiles([syntheticFile]);
              runSingleCompression(syntheticFile);
              info(`Loaded image from ${parsed.sourceToolName || "previous tool"}`);
              sessionStorage.removeItem("omni_pending_input");
            });
        }
      }
    } catch {}
  }, [runSingleCompression, info]);

  const handleFilesSelected = (incoming: File[]) => {
    if (!incoming || incoming.length === 0) return;
    setFiles(incoming);

    if (incoming.length === 1) {
      setBatchItems([]);
      runSingleCompression(incoming[0]);
    } else {
      setSingleResult(null);
      runBatchCompression(incoming);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setBatchItems([]);
    setSingleResult(null);
    setOriginalUrl(null);
  };

  const recompressCurrent = () => {
    if (files.length === 1) {
      runSingleCompression(files[0]);
    } else if (files.length > 1) {
      runBatchCompression(files);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone when no files or processing new */}
      {!singleResult && batchItems.length === 0 && (
        <div className="space-y-6">
          <DropZone
            onFilesSelected={handleFilesSelected}
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            maxFiles={10}
            label="Upload Image(s) to Compress"
            subLabel="JPG, PNG, WebP, AVIF — 100% Client-Side Private"
            files={files}
            onRemoveFile={(idx) => {
              const updated = files.filter((_, i) => i !== idx);
              setFiles(updated);
            }}
            disabled={isProcessing}
          />

          {/* Quick Pre-Upload Mode Selection */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Compression Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "fast",
                  label: "FAST",
                  desc: "Minimal quality loss, instant processing",
                  icon: Zap,
                },
                {
                  id: "balanced",
                  label: "BALANCED",
                  desc: "Recommended size & high visual fidelity",
                  icon: Sparkles,
                },
                {
                  id: "maximum",
                  label: "MAXIMUM",
                  desc: "Smallest practical file size",
                  icon: Flame,
                },
              ].map((m) => {
                const Icon = m.icon;
                const active = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 font-bold text-indigo-700 dark:text-indigo-300 shadow-xs ring-1 ring-indigo-500/20"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090e1c] text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">{m.label}</span>
                      <Icon className={`w-4 h-4 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-normal">
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Processing Progress Indicator */}
      {isProcessing && (
        <div className="p-6 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-center space-y-3 animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200 font-mono">
            {progressStatus || "Optimizing image assets..."}
          </p>
        </div>
      )}

      {/* SINGLE FILE RESULT VIEW */}
      {singleResult && !isProcessing && (
        <div className="space-y-6">
          {/* Interactive Quality & Tuning Controls */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-500" />
                Fine-Tune Compression
              </span>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {(["fast", "balanced", "maximum", "custom"] as ImageCompressionMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      if (files[0]) {
                        setTimeout(() => runSingleCompression(files[0]), 50);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer text-[11px] ${
                      mode === m
                        ? "bg-indigo-600 text-white shadow-xs font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Mode Controls */}
            {mode === "custom" && (
              <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-white/5">
                <ManualNumberInput
                  label="Quality Level (Lossy Formats)"
                  value={quality}
                  onChange={(q) => {
                    setQuality(q);
                    if (files[0]) runSingleCompression(files[0]);
                  }}
                  min={1}
                  max={100}
                  step={1}
                  suffix="%"
                  placeholder="75"
                  helperText="Progressively balanced to avoid bloating already compressed files."
                  presets={[
                    { label: "45% (Max Reduction)", value: 45 },
                    { label: "65% (High Saver)", value: 65 },
                    { label: "75% (Balanced)", value: 75 },
                    { label: "85% (High Quality)", value: 85 },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Downscale Resolution
                    </label>
                    <select
                      value={dimensionPreset}
                      onChange={(e) => {
                        setDimensionPreset(e.target.value as any);
                        if (files[0]) setTimeout(() => runSingleCompression(files[0]), 50);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="original">Original (No Resize, Never Upscale)</option>
                      <option value="large">Large (Max 1920px)</option>
                      <option value="medium">Medium (Max 1200px)</option>
                      <option value="small">Small (Max 800px)</option>
                      <option value="custom">Custom Scale %</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Output Format Strategy
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) => {
                        setOutputFormat(e.target.value as any);
                        if (files[0]) setTimeout(() => runSingleCompression(files[0]), 50);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="auto">Auto (Smallest Valid Format, Preserves Alpha)</option>
                      <option value="webp">WebP (Modern, Smallest)</option>
                      <option value="jpeg">JPEG (Universal Photos)</option>
                      <option value="png">PNG (Lossless Graphics)</option>
                    </select>
                  </div>
                </div>

                {dimensionPreset === "custom" && (
                  <div className="pt-2">
                    <ManualNumberInput
                      label="Custom Scale Ratio"
                      value={customScalePercent}
                      onChange={(p) => {
                        setCustomScalePercent(p);
                        if (files[0]) runSingleCompression(files[0]);
                      }}
                      min={10}
                      max={100}
                      step={5}
                      suffix="%"
                      placeholder="100"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Standard OmniCraft ToolResult Component */}
          <ToolResult
            title={
              singleResult.compressed
                ? "Image Compressed Successfully"
                : "Image Already Optimized"
            }
            originalSize={singleResult.originalSize}
            compressedSize={singleResult.outputSize}
            compressionStatus={singleResult.status}
            statusMessage={singleResult.message}
            downloadUrl={singleResult.outputUrl}
            downloadFilename={
              singleResult.compressed
                ? `compressed_${files[0]?.name || "image"}.${singleResult.format}`
                : files[0]?.name || "image.jpg"
            }
            currentTool={currentTool}
            outputType="image"
            originalImage={originalUrl || undefined}
            modifiedImage={singleResult.outputUrl}
            summaryData={{
              type: "image",
              originalSize: singleResult.originalSize,
              newSize: singleResult.outputSize,
              savedBytes: singleResult.savedBytes,
              reductionPercent: singleResult.reductionPercent,
              compressionStatus: singleResult.status,
              statusMessage: singleResult.message,
              dimensions: {
                width: singleResult.outputWidth,
                height: singleResult.outputHeight,
              },
              format: singleResult.format,
            }}
            onReset={handleReset}
          >
            <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
              <img
                src={singleResult.outputUrl}
                alt="Compressed preview"
                className="max-h-80 object-contain rounded-lg shadow-md"
              />
            </div>
          </ToolResult>
        </div>
      )}

      {/* BATCH MULTI-FILE RESULT VIEW */}
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
                      Batch Compression Results ({completed.length} of {batchItems.length} files)
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

          {/* Individual File Result Cards */}
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
                      </div>
                    )}
                  </div>

                  {res && (
                    <a
                      href={res.outputUrl}
                      download={
                        res.compressed
                          ? `compressed_${item.file.name.replace(/\.[^.]+$/, "")}.${res.format}`
                          : item.file.name
                      }
                    >
                      <Button
                        variant={isCompressed ? "gradient" : "outline"}
                        size="sm"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                      >
                        {isCompressed ? "Download" : "Download Original"}
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
              Compress More Images
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
