"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  label?: string;
  subLabel?: string;
  files?: File[];
  onRemoveFile?: (index: number) => void;
  disabled?: boolean;
}

export function DropZone({
  onFilesSelected,
  accept,
  maxFiles = 1,
  maxSizeBytes = 50 * 1024 * 1024, // 50 MB default
  label = "Click to upload or drag & drop",
  subLabel = "PDF, Images, or Documents",
  files = [],
  onRemoveFile,
  disabled = false,
}: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    setErrorMessage(null);

    const validFiles: File[] = [];
    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i];
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds maximum allowed size of ${formatBytes(maxSizeBytes)}.`);
        continue;
      }
      validFiles.push(file);
      if (validFiles.length >= maxFiles) break;
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-6 sm:p-10 text-center transition-all duration-200 select-none touch-manipulation",
          disabled ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-[#090e1c] border-slate-300 dark:border-white/10" : "cursor-pointer active:scale-[0.99]",
          isDragOver
            ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 scale-[1.01] shadow-lg shadow-indigo-500/10"
            : "border-slate-300 dark:border-white/10 hover:border-indigo-500/60 bg-white/70 dark:bg-[#0c1322]/80 backdrop-blur-xl hover:shadow-md"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
          disabled={disabled}
          className="sr-only"
        />

        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3.5 shadow-xs border border-indigo-200 dark:border-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
          <UploadCloud className="w-8 h-8" />
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {label}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
          {subLabel} • Max {formatBytes(maxSizeBytes)}
        </p>
      </label>

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* File List Chips */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 dark:bg-[#0f172a]/90 border border-slate-200 dark:border-white/10 shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#090e1c] text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/10">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{formatBytes(file.size)}</p>
                </div>
              </div>

              {onRemoveFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(idx);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer touch-manipulation relative z-20"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

