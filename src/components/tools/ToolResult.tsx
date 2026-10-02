"use client";

import React, { useState } from "react";
import { Download, Copy, Check, Share2, RefreshCw, Sparkles, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";
import confetti from "canvas-confetti";
import { ToolDefinition } from "@/tools/types";
import { CompareViewer } from "./CompareViewer";
import { SmartResultSummary, SmartSummaryData } from "./SmartResultSummary";
import { ContinueWork } from "./ContinueWork";

interface ToolResultProps {
  title?: string;
  originalSize?: number;
  compressedSize?: number;
  downloadUrl?: string;
  downloadFilename?: string;
  copyText?: string;
  onReset?: () => void;
  children?: React.ReactNode;
  
  // Rich extensions for OmniCraft Experience
  currentTool?: ToolDefinition;
  outputType?: string;
  originalImage?: string;
  modifiedImage?: string;
  originalText?: string;
  modifiedText?: string;
  summaryData?: SmartSummaryData;
  hideNextSteps?: boolean;

  // Compression status enhancements
  compressionStatus?: "compressed" | "already_optimized" | "not_beneficial";
  statusMessage?: string;
}

export function ToolResult({
  title = "Task Complete",
  originalSize,
  compressedSize,
  downloadUrl,
  downloadFilename = "result.file",
  copyText,
  onReset,
  children,
  currentTool,
  outputType,
  originalImage,
  modifiedImage,
  originalText,
  modifiedText,
  summaryData,
  hideNextSteps = false,
  compressionStatus,
  statusMessage,
}: ToolResultProps) {
  const { success } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    const ok = await copyToClipboard(copyText);
    if (ok) {
      setCopied(true);
      success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {}
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "OmniCraft - Online Utility",
          url: window.location.href,
        });
        return;
      } catch {}
    }
    const ok = await copyToClipboard(window.location.href);
    if (ok) {
      success("Tool link copied to clipboard");
    }
  };

  const isCompressed =
    compressionStatus === "compressed" ||
    (compressionStatus === undefined &&
      originalSize !== undefined &&
      compressedSize !== undefined &&
      originalSize > compressedSize);

  const isAlreadyOptimized =
    compressionStatus === "already_optimized" ||
    (!isCompressed &&
      originalSize !== undefined &&
      compressedSize !== undefined &&
      compressedSize >= originalSize);

  const isNotBeneficial = compressionStatus === "not_beneficial";

  const effectiveOutputSize =
    originalSize !== undefined && compressedSize !== undefined
      ? isAlreadyOptimized || isNotBeneficial
        ? originalSize
        : Math.min(compressedSize, originalSize)
      : compressedSize;

  const savedBytes =
    originalSize !== undefined && effectiveOutputSize !== undefined && isCompressed
      ? Math.max(0, originalSize - effectiveOutputSize)
      : 0;

  const savedPercent =
    originalSize && isCompressed && effectiveOutputSize !== undefined && originalSize > effectiveOutputSize
      ? Math.round((savedBytes / originalSize) * 100)
      : null;

  const autoSummaryData: SmartSummaryData = summaryData || {
    type: (outputType as any) || (originalImage ? "image" : copyText ? "text" : "generic"),
    originalSize,
    newSize: effectiveOutputSize,
    savedBytes,
    reductionPercent: savedPercent || 0,
    compressionStatus,
    statusMessage,
    wordCount: copyText ? copyText.trim().split(/\s+/).filter(Boolean).length : undefined,
    charCount: copyText ? copyText.length : undefined,
    lineCount: copyText ? copyText.split("\n").length : undefined,
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="p-4 sm:p-6 rounded-3xl bg-white/85 dark:bg-[#0c1322]/80 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-5">
        
        {/* Header with savings badge */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isAlreadyOptimized
                ? "bg-amber-500/10 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-[10px] font-mono uppercase font-bold ${
                isAlreadyOptimized ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}>
                {isAlreadyOptimized ? "Original Retained" : "Your result is ready"}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
            </div>
          </div>

          {isCompressed && savedPercent !== null && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              ✓ Compressed — Saved {savedPercent}% Size
            </span>
          )}

          {isAlreadyOptimized && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              ℹ Already Optimized
            </span>
          )}

          {isNotBeneficial && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              ⚠ Compression Not Beneficial
            </span>
          )}
        </div>

        {/* Status explanation message banner if present */}
        {statusMessage && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2.5 ${
              isCompressed
                ? "bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/40"
                : "bg-amber-50/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/40"
            }`}
          >
            {isCompressed ? (
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            )}
            <span className="leading-relaxed font-medium">{statusMessage}</span>
          </div>
        )}

        {/* Embedded Children / Preview */}
        {children && <div className="rounded-2xl overflow-hidden">{children}</div>}

        {/* Before vs After Comparison */}
        {((originalImage && modifiedImage) || (originalText && modifiedText)) && (
          <CompareViewer
            type={originalImage ? "image" : "text"}
            originalImage={originalImage}
            modifiedImage={modifiedImage}
            originalText={originalText}
            modifiedText={modifiedText}
            originalSize={originalSize}
            modifiedSize={effectiveOutputSize}
          />
        )}

        {/* Smart Metrics Summary */}
        {(originalSize || copyText || summaryData) && (
          <SmartResultSummary data={autoSummaryData} />
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={downloadFilename}
                onClick={handleDownload}
                className="flex-1 sm:flex-initial"
              >
                <Button
                  variant="gradient"
                  size="md"
                  className="w-full sm:w-auto touch-manipulation cursor-pointer"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  {isAlreadyOptimized ? "Download Original File" : "Download Result"}
                </Button>
              </a>
            )}

            {copyText && (
              <Button
                variant="outline"
                size="md"
                onClick={handleCopy}
                className="flex-1 sm:flex-initial touch-manipulation cursor-pointer"
                leftIcon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? "Copied!" : "Copy Output"}
              </Button>
            )}

            <Button
              variant="ghost"
              size="md"
              onClick={handleShare}
              className="touch-manipulation cursor-pointer"
              leftIcon={<Share2 className="w-4 h-4" />}
              title="Share tool"
            >
              Share
            </Button>
          </div>

          {onReset && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onReset}
              className="w-full sm:w-auto touch-manipulation cursor-pointer"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Process Another
            </Button>
          )}
        </div>
      </div>

      {/* "What would you like to do next?" */}
      {!hideNextSteps && currentTool && (
        <ContinueWork
          currentTool={currentTool}
          outputType={outputType}
          outputText={copyText}
          outputFileUrl={downloadUrl}
          outputFilename={downloadFilename}
        />
      )}
    </div>
  );
}
