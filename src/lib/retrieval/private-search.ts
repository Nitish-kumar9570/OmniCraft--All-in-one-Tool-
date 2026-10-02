import { createClient } from "@/lib/supabase/server";
import { generateEmbedding, cosineSimilarity } from "./vector-search";
import { DocumentChunkItem } from "@/types/documents";

export interface PrivateSearchResult {
  chunk: DocumentChunkItem;
  documentTitle: string;
  filename: string;
  score: number;
}

export async function searchPrivateDocuments(
  userId: string,
  query: string,
  options?: {
    documentIds?: string[];
    maxResults?: number;
    minScore?: number;
  }
): Promise<PrivateSearchResult[]> {
  const maxResults = options?.maxResults || 6;
  const minScore = options?.minScore || 0.15;
  const queryEmbedding = await generateEmbedding(query);
  const queryKeywords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  try {
    const supabase = await createClient();

    // Query chunks strictly belonging to the authenticated user
    let queryBuilder = (supabase.from("document_chunks") as any)
      .select("id, document_id, user_id, chunk_index, page_number, content, metadata, embedding")
      .eq("user_id", userId);

    if (options?.documentIds && options.documentIds.length > 0) {
      queryBuilder = queryBuilder.in("document_id", options.documentIds);
    }

    const { data: chunks, error } = await queryBuilder.limit(100);

    if (error || !chunks || chunks.length === 0) {
      return [];
    }

    // Fetch document titles
    const docIds = Array.from(new Set(chunks.map((c: any) => c.document_id)));
    const { data: docs } = await (supabase.from("documents") as any)
      .select("id, title, filename")
      .in("id", docIds);

    const docMap = new Map<string, { title: string; filename: string }>();
    docs?.forEach((d: any) => {
      docMap.set(d.id, { title: d.title || d.filename, filename: d.filename });
    });

    const scored: PrivateSearchResult[] = [];

    for (const chunk of chunks) {
      let score = 0;

      // 1. Vector cosine similarity
      if (chunk.embedding) {
        try {
          const chunkVec = typeof chunk.embedding === "string" ? JSON.parse(chunk.embedding) : chunk.embedding;
          const sim = cosineSimilarity(queryEmbedding, chunkVec);
          score += sim * 0.7;
        } catch {}
      }

      // 2. Keyword exact match boost (BM25-style lexical weight)
      const contentLower = chunk.content.toLowerCase();
      let keywordHits = 0;
      for (const kw of queryKeywords) {
        if (contentLower.includes(kw)) {
          keywordHits++;
        }
      }
      if (queryKeywords.length > 0) {
        score += (keywordHits / queryKeywords.length) * 0.3;
      }

      if (score >= minScore) {
        const docInfo = docMap.get(chunk.document_id) || {
          title: chunk.metadata?.filename || "Private Document",
          filename: chunk.metadata?.filename || "document.pdf",
        };

        scored.push({
          chunk: {
            id: chunk.id,
            documentId: chunk.document_id,
            userId: chunk.user_id,
            chunkIndex: chunk.chunk_index,
            pageNumber: chunk.page_number || 1,
            content: chunk.content,
            metadata: chunk.metadata,
            similarity: score,
          },
          documentTitle: docInfo.title,
          filename: docInfo.filename,
          score,
        });
      }
    }

    // Sort by relevance score descending
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, maxResults);
  } catch (err) {
    console.error("Error in searchPrivateDocuments:", err);
    return [];
  }
}
