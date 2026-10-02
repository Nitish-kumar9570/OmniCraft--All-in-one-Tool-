"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useWorkspace, WorkspaceItem } from "@/hooks/useWorkspace";
import {
  FolderKanban,
  Trash2,
  Download,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Code2,
  Zap,
  Lock,
  Plus,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, formatBytes } from "@/lib/utils";

export default function WorkspacePage() {
  const { items, isLoaded, removeItem, clearWorkspace } = useWorkspace();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { success } = useToast();

  const handleCopy = async (id: string, text?: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getItemIcon = (type: WorkspaceItem["type"]) => {
    switch (type) {
      case "pdf": return <FileText className="w-4 h-4 text-rose-500" />;
      case "image": return <ImageIcon className="w-4 h-4 text-purple-500" />;
      case "json":
      case "text": return <Code2 className="w-4 h-4 text-cyan-500" />;
      case "workflow": return <Zap className="w-4 h-4 text-indigo-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Local Digital Workspace
              </span>
              <PrivacyBadge
                privacy={{
                  type: "LOCAL",
                  badgeLabel: "100% In-Browser Memory",
                  processing: "Client-side",
                  dataUploaded: "No",
                  dataStored: "No",
                  thirdPartyServices: "None",
                  description: "Stored temporarily in local device memory. Zero tracking or remote sync.",
                }}
              />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Temporary Workspace &amp; Saved Outputs
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Keep temporary file conversions, intermediate workflow results, and payloads while you work.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/tools">
              <Button variant="gradient" size="sm" className="rounded-xl" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Browse Tools
              </Button>
            </Link>

            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearWorkspace} className="text-rose-600 dark:text-rose-400">
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Content list */}
        {items.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-white/40 dark:bg-slate-900/30 space-y-4">
            <FolderKanban className="w-10 h-10 mx-auto text-slate-400 opacity-60" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Your Workspace is Empty
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When you run tools or workflows, you can save results here to chain them together later.
              </p>
            </div>
            <Link href="/tools">
              <Button variant="outline" size="sm" className="rounded-xl">
                Explore Available Tools
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                        {getItemIcon(item.type)}
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {item.type}
                    </span>
                  </div>

                  {item.content && (
                    <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 text-[10px] font-mono line-clamp-3 overflow-hidden">
                      {item.content}
                    </pre>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {item.content && (
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 cursor-pointer"
                        title="Copy content"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        download={item.fileName || "file"}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
