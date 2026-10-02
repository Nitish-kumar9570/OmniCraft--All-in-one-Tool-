"use client";

import React from "react";
import { DocumentItem } from "@/types/documents";
import { FileText, Image as ImageIcon, Trash2, ArrowUpRight, CheckCircle2, Layers, HardDrive } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useConversations } from "@/hooks/useConversations";

interface DocumentCardProps {
  document: DocumentItem;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

export function DocumentCard({
  document,
  onDelete,
  isSelected = false,
  onToggleSelect,
}: DocumentCardProps) {
  const router = useRouter();
  const { createConversation } = useConversations();

  const handleAskAboutDoc = async () => {
    const newId = await createConversation(`Research: ${document.filename}`);
    if (newId) {
      router.push(`/chat/${newId}?doc=${document.id}`);
    } else {
      router.push(`/chat?doc=${document.id}`);
    }
  };

  const isImage = document.mimeType?.startsWith("image/");
  const sizeMb = (document.fileSize / (1024 * 1024)).toFixed(1);

  return (
    <div
      className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
        isSelected
          ? "border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-500 shrink-0 group-hover:scale-105 transition-transform">
              {isImage ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {document.title || document.filename}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">{document.filename}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(document.id)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer mr-1"
                title="Select for multi-document research"
              />
            )}
            <button
              onClick={() => onDelete(document.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              title="Delete document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-3 gap-2 my-3 text-[11px] text-slate-600 dark:text-slate-400">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{document.pageCount} page{document.pageCount > 1 ? "s" : ""}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-purple-400" />
            <span>{sizeMb} MB</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="capitalize">{document.status}</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-[10px] text-slate-400">{formatDate(document.createdAt)}</span>
        <button
          onClick={handleAskAboutDoc}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <span>Ask OmniCraft about this</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
