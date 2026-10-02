"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Shield, Download, Trash2 } from "lucide-react";

export function PrivacyDashboard() {
  const { success, error } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [clearHistoryModalOpen, setClearHistoryModalOpen] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const exportData = {
        favorites: localStorage.getItem("omnicraft_favorites"),
        history: localStorage.getItem("omnicraft_history"),
        conversations: localStorage.getItem("omnicraft_conversations"),
        memories: localStorage.getItem("omnicraft_memories"),
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omnicraft-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      success("Export Downloaded", "Your full conversational and workspace archive is ready");
    } catch (err: any) {
      error("Export Failed", err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" /> Privacy & Data Control
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          OmniCraft strictly respects user data sovereignty. Your private tools data and favorites remain securely in your local browser storage.
        </p>
      </div>

      {/* Data Export & Management */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-indigo-500" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Export Workspace Data
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Download a JSON export of your favorites, history, and local preferences.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            isLoading={isExporting}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export JSON Archive
          </Button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <Trash2 className="w-4 h-4 text-rose-500" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Clear Workspace Memory
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Erase all personal history, favorites, and cached tool inputs.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setClearHistoryModalOpen(true)}
            className="text-rose-600 dark:text-rose-400"
          >
            Clear Data
          </Button>
        </div>
      </div>

      <Modal
        isOpen={clearHistoryModalOpen}
        onClose={() => setClearHistoryModalOpen(false)}
        title="Clear Workspace Data"
        description="Are you sure you want to clear your stored local data and favorites? This action cannot be undone."
      >
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => setClearHistoryModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              localStorage.removeItem("omnicraft_history");
              localStorage.removeItem("omnicraft_favorites");
              localStorage.removeItem("omnicraft_conversations");
              localStorage.removeItem("omnicraft_memories");
              setClearHistoryModalOpen(false);
              success("Workspace Data Cleared");
            }}
          >
            Confirm Clear
          </Button>
        </div>
      </Modal>
    </div>
  );
}
