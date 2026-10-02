export type DocumentStatus = "uploading" | "processing" | "ready" | "failed";

export interface DocumentItem {
  id: string;
  userId: string;
  filename: string;
  storagePath?: string | null;
  mimeType?: string | null;
  fileSize: number;
  status: DocumentStatus;
  pageCount: number;
  title?: string | null;
  description?: string | null;
  metadata?: Record<string, any>;
  chunkCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChunkItem {
  id: string;
  documentId: string;
  userId: string;
  chunkIndex: number;
  pageNumber: number;
  content: string;
  metadata?: Record<string, any>;
  similarity?: number;
}

export interface DocumentUploadResponse {
  document: DocumentItem;
  chunksCreated: number;
  message?: string;
}
