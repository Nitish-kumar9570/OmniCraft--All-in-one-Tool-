import { searchPrivateDocuments, PrivateSearchResult } from "./private-search";
import { searchUserMemories } from "./memory-search";
import { searchWeb, WebSearchResult } from "../web/search";
import { Citation } from "@/types/research";
import { MemoryItem } from "@/types/memory";

export interface HybridSearchContext {
  privateResults: PrivateSearchResult[];
  memories: MemoryItem[];
  webResults: WebSearchResult[];
  citations: Citation[];
  hasPrivateKnowledge: boolean;
  hasWebResults: boolean;
  contextType: "private" | "web" | "hybrid" | "memory" | "general";
}

export async function performHybridRetrieval(
  userId: string | null,
  query: string,
  options?: {
    mode?: "quick" | "private" | "web" | "research" | "docs";
    documentIds?: string[];
    forceWeb?: boolean;
  }
): Promise<HybridSearchContext> {
  const mode = options?.mode || "quick";
  const forceWeb = options?.forceWeb || false;
  let citations: Citation[] = [];
  let citationIndex = 1;

  // 1. Retrieve Private Documents if user is authenticated
  let privateResults: PrivateSearchResult[] = [];
  if (userId) {
    privateResults = await searchPrivateDocuments(userId, query, {
      documentIds: options?.documentIds,
      maxResults: mode === "research" ? 8 : 4,
    });
  }

  // 2. Retrieve Relevant Personal Memories
  let memories: MemoryItem[] = [];
  if (userId && mode !== "docs") {
    memories = await searchUserMemories(userId, query, 3);
  }

  // 3. Determine if Web Search is needed
  // Routing rule:
  // - If mode is "web" or "research", or forceWeb is true -> always web search
  // - If mode is "private" or "docs" -> NO web search
  // - If mode is "quick" (default) -> web search ONLY if private knowledge is insufficient or question is time-sensitive
  const isTimeSensitive =
    /latest|current|news|today|recent|2025|2026|version|update|price|release/i.test(query);

  const needsWebSearch =
    mode === "web" ||
    mode === "research" ||
    forceWeb ||
    (mode === "quick" && (privateResults.length === 0 || isTimeSensitive));

  let webResults: WebSearchResult[] = [];
  if (needsWebSearch && mode !== "private" && mode !== "docs") {
    webResults = await searchWeb(query, mode === "research" ? 5 : 3);
  }

  // 4. Construct Structured Citations with clear source attribution
  // Private document citations
  privateResults.forEach((res) => {
    citations.push({
      id: `cit-priv-${res.chunk.id}`,
      index: citationIndex++,
      title: `${res.filename} (Page ${res.chunk.pageNumber})`,
      sourceType: "private_doc",
      documentId: res.chunk.documentId,
      documentName: res.filename,
      pageNumber: res.chunk.pageNumber,
      snippet: res.chunk.content.slice(0, 200) + "...",
      similarity: res.score,
    });
  });

  // Web citations
  webResults.forEach((res) => {
    citations.push({
      id: `cit-web-${Math.random().toString(36).substring(2, 7)}`,
      index: citationIndex++,
      title: res.title,
      sourceType: "web",
      url: res.url,
      snippet: res.snippet,
    });
  });

  // Memory citations
  memories.forEach((mem) => {
    citations.push({
      id: `cit-mem-${mem.id}`,
      index: citationIndex++,
      title: `Saved Memory (${mem.category})`,
      sourceType: "memory",
      snippet: mem.content,
    });
  });

  // Classify Context Type
  let contextType: "private" | "web" | "hybrid" | "memory" | "general" = "general";
  if (privateResults.length > 0 && webResults.length > 0) {
    contextType = "hybrid";
  } else if (privateResults.length > 0) {
    contextType = "private";
  } else if (webResults.length > 0) {
    contextType = "web";
  } else if (memories.length > 0) {
    contextType = "memory";
  }

  return {
    privateResults,
    memories,
    webResults,
    citations,
    hasPrivateKnowledge: privateResults.length > 0,
    hasWebResults: webResults.length > 0,
    contextType,
  };
}
