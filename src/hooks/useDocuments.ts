"use client";

import { useState, useEffect, useCallback } from "react";
import { DocumentItem } from "@/types/documents";
import { useToast } from "@/components/ui/Toast";

export function useDocuments() {
  const { success, error: toastError } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  const fetchDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        const docs: DocumentItem[] = (data.documents || []).map((d: any) => ({
          id: d.id,
          userId: d.user_id || "local_guest",
          filename: d.filename,
          storagePath: d.storage_path,
          mimeType: d.mime_type,
          fileSize: Number(d.file_size || 0),
          status: d.status || "ready",
          pageCount: d.page_count || 1,
          title: d.title || d.filename,
          description: d.description,
          metadata: d.metadata,
          chunkCount: d.metadata?.totalChunks || 0,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
        setDocuments(docs);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDocument = async (file: File): Promise<DocumentItem | null> => {
    setIsUploading(true);
    setUploadProgress(`Processing "${file.name}"... (Extracting & Chunking)`);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      success("Document Processed", data.message || `Uploaded ${file.name}`);
      await fetchDocuments();
      return data.document;
    } catch (err: any) {
      toastError("Upload Failed", err.message || "Failed to process document");
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const deleteDocument = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
        setSelectedDocIds((prev) => prev.filter((docId) => docId !== id));
        success("Document Deleted");
        return true;
      }
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
    return false;
  };

  const toggleDocSelection = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelectedDocs = () => {
    setSelectedDocIds([]);
  };

  return {
    documents,
    isLoading,
    isUploading,
    uploadProgress,
    selectedDocIds,
    setSelectedDocIds,
    toggleDocSelection,
    clearSelectedDocs,
    uploadDocument,
    deleteDocument,
    refresh: fetchDocuments,
  };
}
