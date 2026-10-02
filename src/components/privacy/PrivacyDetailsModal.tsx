"use client";

import React from "react";
import { ShieldCheck, Lock, Server, Cloud, X, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";
import { ToolPrivacyMetadata } from "@/tools/types";
import { Button } from "@/components/ui/Button";

interface PrivacyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  privacy: ToolPrivacyMetadata;
  toolName?: string;
}

export function PrivacyDetailsModal({ isOpen, onClose, privacy, toolName = "This tool" }: PrivacyDetailsModalProps) {
  if (!isOpen) return null;

  const isLocal = privacy.type === "LOCAL";
  const isServer = privacy.type === "SERVER";
  const isExternal = privacy.type === "EXTERNAL";

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150 pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200/90 dark:border-white/10 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl ${
                isLocal
                  ? "bg-emerald-500/10 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : isServer
                  ? "bg-amber-500/10 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  : "bg-purple-500/10 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-500/20"
              }`}
            >
              {isLocal ? <Lock className="w-5 h-5" /> : isServer ? <Server className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Privacy &amp; Data Security
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                How your data is processed
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Breakdown table */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#070b14]/80 divide-y divide-slate-200/60 dark:divide-white/[0.06] text-xs">
          <div className="p-3.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Processing Architecture</span>
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              {isLocal && <Cpu className="w-3.5 h-3.5 text-emerald-500" />}
              {privacy.processing}
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Data Uploaded</span>
            <span
              className={`font-bold flex items-center gap-1 ${
                privacy.dataUploaded === "No" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {privacy.dataUploaded === "No" ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> No (Stays in browser)
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" /> {privacy.dataUploaded}
                </>
              )}
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Data Stored</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {privacy.dataStored}
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Third-Party Services</span>
            <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">
              {privacy.thirdPartyServices}
            </span>
          </div>
        </div>

        {/* Narrative description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-50/60 dark:bg-white/[0.04] p-3.5 rounded-2xl border border-indigo-100/80 dark:border-white/5">
          {privacy.description}
        </p>

        <div className="flex justify-end pt-1">
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl px-4">
            Got it, thanks
          </Button>
        </div>
      </div>
    </div>
  );
}
