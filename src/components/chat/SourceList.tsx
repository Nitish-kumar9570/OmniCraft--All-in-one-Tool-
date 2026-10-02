"use client";

import React, { useState } from "react";
import { Citation } from "@/types/research";
import { FileText, Globe, Brain, ExternalLink, ChevronDown, ChevronUp, Check, Copy } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

interface SourceListProps {
  citations: Citation[];
}

export function SourceList({ citations }: SourceListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { success } = useToast();

  if (!citations || citations.length === 0) return null;

  const handleCopySnippet = async (text?: string, id?: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id || "cop");
      success("Source snippet copied");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };


  const getSourceIcon = (type: Citation["sourceType"]) => {
    switch (type) {
      case "private_doc":
        return <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
      case "web":
        return <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case "memory":
        return <Brain className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <>
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 py-1 px-2.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <span>Sources & Citations</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-mono">
            {citations.length}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 animate-in fade-in duration-150">
            {citations.map((cit, idx) => (
              <div
                key={cit.id || idx}
                onClick={() => setSelectedCitation(cit)}
                className="group relative flex items-start justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-850 shadow-xs transition-all cursor-pointer text-left"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <div className="mt-0.5 p-1 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60 transition-colors">
                    {getSourceIcon(cit.sourceType)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {cit.title}
                    </p>
                    {cit.snippet && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {cit.snippet}
                      </p>
                    )}
                  </div>
                </div>

                {cit.url && (
                  <a
                    href={cit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded text-slate-400 hover:text-indigo-500 transition-colors shrink-0 ml-1"
                    title="Open external link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Source Detail Modal */}
      <Modal
        isOpen={Boolean(selectedCitation)}
        onClose={() => setSelectedCitation(null)}
        title={
          <div className="flex items-center gap-2 text-sm font-semibold">
            {selectedCitation && getSourceIcon(selectedCitation.sourceType)}
            <span>{selectedCitation?.title}</span>
          </div>
        }
      >
        <div className="space-y-4 pt-1">
          {selectedCitation?.url && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
              <span className="truncate text-slate-600 dark:text-slate-300 font-mono">
                {selectedCitation.url}
              </span>
              <a
                href={selectedCitation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {selectedCitation?.snippet && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-60 overflow-y-auto">
              {selectedCitation.snippet}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => handleCopySnippet(selectedCitation?.snippet, selectedCitation?.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {copiedId === selectedCitation?.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
