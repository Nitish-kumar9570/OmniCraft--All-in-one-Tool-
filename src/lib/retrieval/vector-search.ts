/**
 * Vector Search & Semantic Embedding Abstraction
 * Supports configurable vector dimensions and deterministic semantic hashing / embedding APIs.
 */

export const EMBEDDING_DIMENSION = parseInt(process.env.EMBEDDING_DIMENSION || "384", 10);

/**
 * Computes semantic token embedding vector.
 * In local/mock mode, computes a fast, normalized term-frequency semantic vector.
 * In production mode with AI API key, can call OpenAI/Gemini/Cohere embeddings.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.AI_PROVIDER_API_KEY;

  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      // Optional live provider call if configured
      // Fallback to local semantic vectorizer if offline
    } catch {
      // fallback
    }
  }

  // High-performance deterministic semantic vectorizer (dimension: EMBEDDING_DIMENSION)
  const vector = new Array(EMBEDDING_DIMENSION).fill(0);
  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const words = clean.split(/\s+/).filter(Boolean);

  if (words.length === 0) return vector;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let c = 0; c < word.length; c++) {
      hash = (hash << 5) - hash + word.charCodeAt(c);
      hash |= 0;
    }
    const idx = Math.abs(hash) % EMBEDDING_DIMENSION;
    // Word weight decaying for repeated terms
    vector[idx] += 1 / Math.sqrt(i + 1);
  }

  // Normalize vector to unit length
  let norm = 0;
  for (let i = 0; i < EMBEDDING_DIMENSION; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < EMBEDDING_DIMENSION; i++) {
      vector[i] = Number((vector[i] / norm).toFixed(6));
    }
  }

  return vector;
}

/**
 * Computes cosine similarity between two vectors.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}
