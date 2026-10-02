import { createClient } from "@/lib/supabase/server";
import { generateEmbedding, cosineSimilarity } from "./vector-search";
import { MemoryItem } from "@/types/memory";

export async function searchUserMemories(
  userId: string,
  query: string,
  maxResults: number = 4
): Promise<MemoryItem[]> {
  const queryEmbedding = await generateEmbedding(query);
  const queryKeywords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  try {
    const supabase = await createClient();
    const { data: memories, error } = await (supabase.from("memories") as any)
      .select("*")
      .eq("user_id", userId)
      .order("importance", { ascending: false })
      .limit(50);

    if (error || !memories || memories.length === 0) {
      return [];
    }

    const scored: Array<MemoryItem & { score: number }> = [];

    for (const mem of memories) {
      let score = (mem.importance || 3) * 0.05; // base boost for importance

      // Vector similarity
      if (mem.embedding) {
        try {
          const memVec = typeof mem.embedding === "string" ? JSON.parse(mem.embedding) : mem.embedding;
          score += cosineSimilarity(queryEmbedding, memVec) * 0.65;
        } catch {}
      }

      // Keyword match
      const contentLower = mem.content.toLowerCase();
      let keywordHits = 0;
      for (const kw of queryKeywords) {
        if (contentLower.includes(kw)) keywordHits++;
      }
      if (queryKeywords.length > 0) {
        score += (keywordHits / queryKeywords.length) * 0.3;
      }

      if (score >= 0.15) {
        scored.push({
          id: mem.id,
          userId: mem.user_id,
          content: mem.content,
          category: mem.category,
          importance: mem.importance,
          metadata: mem.metadata,
          createdAt: mem.created_at,
          updatedAt: mem.updated_at,
          similarity: score,
          score,
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, maxResults);
  } catch (err) {
    console.error("Error in searchUserMemories:", err);
    return [];
  }
}
