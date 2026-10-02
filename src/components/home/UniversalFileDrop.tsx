"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Code2,
  Sheet,
  Music,
  Video,
  Sparkles,
  ArrowRight,
  Layers,
  X,
  Lock,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { detectFileMetadata, FileMetadata, getToolsForFileType } from "@/tools/compatibility";
import { ToolDefinition } from "@/tools/types";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { useToast } from "@/components/ui/Toast";

export function UniversalFileDrop() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileMeta, setFileMeta] = useState<FileMetadata | null>(null);
  const [compatibleTools, setCompatibleTools] = useState<ToolDefinition[]>([]);
  const [isInspecting, setIsInspecting] = useState(false);
  const { info } = useToast();

  const handleProcessFile = useCallback(async (file: File) => {
    setIsInspecting(true);
    try {
      const meta = await detectFileMetadata(file);
      setFileMeta(meta);
      const tools = getToolsForFileType(meta.type, meta.extension, meta.category);
      setCompatibleTools(tools.slice(0, 8));
    } catch {
      info("Processed file with standard detector");
    } finally {
      setIsInspecting(false);
    }
  }, [info]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setFileMeta(null);
    setCompatibleTools([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFileCategoryIcon = (category?: string) => {
    switch (category) {
      case "pdf": return <FileText className="w-8 h-8 text-rose-500" />;
      case "image": return <ImageIcon className="w-8 h-8 text-purple-500" />;
      case "json":
      case "code": return <Code2 className="w-8 h-8 text-cyan-500" />;
      case "csv": return <Sheet className="w-8 h-8 text-emerald-500" />;
      case "audio": return <Music className="w-8 h-8 text-fuchsia-500" />;
      case "video": return <Video className="w-8 h-8 text-amber-500" />;
      default: return <FileText className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-2xl shadow-xl overflow-hidden">
        
        {/* Top title banner */}
        <div className="px-6 py-6 sm:px-8 sm:py-8 border-b border-slate-200/80 dark:border-white/[0.08] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Universal File Drop
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Drop a file. Discover what you can do with it.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Instantly detects format, metadata, and connects your file to all compatible OmniCraft tools.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <PrivacyBadge
              privacy={{
                type: "LOCAL",
                badgeLabel: "100% Client-Side Detection",
                processing: "Client-side",
                dataUploaded: "No",
                dataStored: "No",
                thirdPartyServices: "None",
                description: "File inspection occurs entirely within your browser memory. Nothing is transmitted over the wire."
              }}
            />
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {!fileMeta ? (
            /* Upload Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 scale-[1.01]"
                  : "border-slate-300 dark:border-white/15 bg-slate-50/60 dark:bg-slate-900/40 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-slate-100/60 dark:hover:bg-slate-900/60"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                className="hidden"
                aria-label="Upload file for universal tool inspection"
              />

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-white/[0.08] text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/10 mb-4 shadow-sm">
                <Upload className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white text-center">
                Drag and drop your file here, or click to browse
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1 max-w-md">
                PDF, JPG, PNG, WebP, JSON, CSV, MP3, MP4, Markdown, Code &amp; more. 100% private in browser.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <Button variant="gradient" size="sm" className="rounded-xl pointer-events-none">
                  Choose File
                </Button>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  Any format up to 500MB
                </span>
              </div>
            </div>
          ) : (
            /* File Inspected Result & Compatible Actions */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* File Info Bar */}
              <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/90 dark:bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#070b14] border border-slate-200/80 dark:border-white/10 shrink-0 shadow-xs">
                    {getFileCategoryIcon(fileMeta.category)}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {fileMeta.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {fileMeta.extension.toUpperCase() || fileMeta.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <span>Size: {formatBytes(fileMeta.size)}</span>
                      {fileMeta.dimensions && (
                        <span>Dimensions: {fileMeta.dimensions.width} × {fileMeta.dimensions.height} px</span>
                      )}
                      {fileMeta.pageCount && (
                        <span>Pages: {fileMeta.pageCount}</span>
                      )}
                      {fileMeta.lineCount && (
                        <span>Lines: {fileMeta.lineCount} ({fileMeta.wordCount || 0} words)</span>
                      )}
                      {fileMeta.isValidJson && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Valid JSON</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    title="Change file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Compatible Actions Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Available actions for {fileMeta.name} ({compatibleTools.length} tools)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click any tool to run instantly
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {compatibleTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="group p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#070b14] hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-150 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            {tool.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {tool.processingType === "client" ? "🔒 Local" : "⚡ Cloud"}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tool.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                          {tool.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        <span>Launch Tool</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
