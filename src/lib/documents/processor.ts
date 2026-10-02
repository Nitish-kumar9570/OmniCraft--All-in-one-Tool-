import { parseDocumentBuffer } from "./parser";
import { chunkDocumentText, TextChunk } from "./chunker";
import { generateEmbedding } from "../retrieval/vector-search";

export interface ProcessedDocumentResult {
  document: {
    filename: string;
    mimeType: string;
    fileSize: number;
    pageCount: number;
    title: string;
    description: string;
    status: "ready" | "failed";
    metadata: Record<string, any>;
  };
  chunks: Array<{
    chunkIndex: number;
    pageNumber: number;
    content: string;
    embedding: string;
    metadata: Record<string, any>;
  }>;
}

export async function processDocumentFile(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<ProcessedDocumentResult> {
  const parsed = await parseDocumentBuffer(buffer, filename, mimeType);
  const textChunks: TextChunk[] = chunkDocumentText(parsed.pages, 700, 100);

  const processedChunks = await Promise.all(
    textChunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk.content);
      return {
        chunkIndex: chunk.chunkIndex,
        pageNumber: chunk.pageNumber,
        content: chunk.content,
        embedding: JSON.stringify(embedding),
        metadata: {
          ...chunk.metadata,
          filename,
        },
      };
    })
  );

  return {
    document: {
      filename,
      mimeType,
      fileSize: buffer.length,
      pageCount: parsed.pageCount,
      title: parsed.title || filename,
      description: `Ingested ${parsed.pageCount} page(s) with ${processedChunks.length} searchable chunk(s).`,
      status: "ready",
      metadata: {
        ...parsed.metadata,
        totalChunks: processedChunks.length,
        processedAt: new Date().toISOString(),
      },
    },
    chunks: processedChunks,
  };
}
