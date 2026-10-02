"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useDocuments } from "@/hooks/useDocuments";
import { useToast } from "@/components/ui/Toast";
import { CONFIG_LIMITS } from "@/lib/config";

interface DocumentUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (doc: any) => void;
}

export function DocumentUploader({ isOpen, onClose, onSuccess }: DocumentUploaderProps) {
  const { uploadDocument, isUploading, uploadProgress } = useDocuments();
  const { warning } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const maxMb = CONFIG_LIMITS.MAX_FILE_SIZE_MB;
    if (file.size > maxMb * 1024 * 1024) {
      warning(`File too large`, `Max allowed file size is ${maxMb}MB`);
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const doc = await uploadDocument(selectedFile);
    if (doc) {
      onSuccess?.(doc);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload to Private Knowledge Base" maxWidth="md">
      <div className="space-y-4 pt-1">
        {/* Dropzone */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all touch-manipulation active:scale-[0.99] select-none ${
            dragOver
              ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30"
              : "border-slate-300 dark:border-slate-800 hover:border-slate-400 bg-slate-50/50 dark:bg-slate-900/50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
              e.target.value = "";
            }}
            accept=".pdf,.txt,.md,.csv,.json,.png,.jpg,.jpeg,.webp"
            className="sr-only"
          />

          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PDFs, Images, Markdown, Text, or Code (Max {CONFIG_LIMITS.MAX_FILE_SIZE_MB}MB)
          </p>
        </label>


        {/* Selected File Chip */}
        {selectedFile && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                {selectedFile.type.startsWith("image/") ? (
                  <ImageIcon className="w-4 h-4" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedFile(null)}
              className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Status */}
        {uploadProgress && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs">
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{uploadProgress}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            isLoading={isUploading}
          >
            Process & Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
