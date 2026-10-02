"use client";

import React from "react";
import { DocumentItem } from "@/types/documents";
import { FileText, Check, X, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentSelectorProps {
  documents: DocumentItem[];
  selectedDocIds: string[];
  onToggleSelect: (id: string) => void;
  onClear: () => void;
}

export function DocumentSelector({
  documents,
  selectedDocIds,
  onToggleSelect,
  onClear,
}: DocumentSelectorProps) {
  if (documents.length === 0) return null;

  return (
    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          Targeted Document Research ({selectedDocIds.length} of {documents.length} selected)
        </span>
        {selectedDocIds.length > 0 && (
          <button
            onClick={onClear}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-1">
        {documents.map((doc) => {
          const isSelected = selectedDocIds.includes(doc.id);
          return (
            <button
              key={doc.id}
              onClick={() => onToggleSelect(doc.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer",
                isSelected
                  ? "bg-indigo-600 border-indigo-600 text-white font-medium shadow-xs"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              )}
            >
              <FileText className="w-3 h-3" />
              <span className="max-w-[150px] truncate">{doc.filename}</span>
              {isSelected && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
