import { performHybridRetrieval, HybridSearchContext } from "../retrieval/hybrid-search";
import { defaultAIProvider } from "./mock-provider";
import { ChatCompletionRequest, ChatStreamChunk } from "./provider";
import { DeepResearchStep, Citation } from "@/types/research";
import { ModelId } from "@/types/chat";

export interface OrchestratorInput {
  userId: string | null;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  model?: ModelId;
  mode?: "quick" | "private" | "web" | "research" | "docs";
  webSearch?: boolean;
  selectedDocIds?: string[];
}

export class AIOrchestrator {
  /**
   * Orchestrates the complete grounded reasoning workflow:
   * 1. Intent understanding & research step emissions
   * 2. Local-first hybrid retrieval (Private documents -> Memories -> Web search)
   * 3. Grounded context synthesis with strict attribution
   * 4. Multi-step SSE streaming to the client
   */
  async streamGroundedChat(
    input: OrchestratorInput,
    onChunk: (chunk: ChatStreamChunk) => void
  ): Promise<{ answer: string; citations: Citation[]; contextType: string; isGrounded: boolean }> {
    const { userId, messages, model = "nova-pro", mode = "quick", webSearch = false, selectedDocIds = [] } = input;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUserMessage?.content || "";

    // 1. Emit Initial Understanding Step for Deep Research
    if (mode === "research" || mode === "docs") {
      onChunk({
        delta: "",
        done: false,
        researchStep: {
          id: "step-1",
          stage: "understanding",
          message: `Analyzing query intent and context for: "${query.slice(0, 45)}..."`,
          timestamp: new Date().toISOString(),
          completed: true,
        },
      });
      await new Promise((r) => setTimeout(r, 200));
    }

    // 2. Execute Hybrid Retrieval across Private Knowledge, Memories, and Web
    if (mode === "research" || mode === "private" || mode === "docs") {
      onChunk({
        delta: "",
        done: false,
        researchStep: {
          id: "step-2",
          stage: "private_search",
          message: selectedDocIds.length > 0
            ? `Searching ${selectedDocIds.length} targeted private document(s)...`
            : "Searching private documents and long-term memory base...",
          timestamp: new Date().toISOString(),
          completed: true,
        },
      });
      await new Promise((r) => setTimeout(r, 200));
    }

    const retrieval: HybridSearchContext = await performHybridRetrieval(userId, query, {
      mode,
      documentIds: selectedDocIds.length > 0 ? selectedDocIds : undefined,
      forceWeb: webSearch || mode === "web" || mode === "research",
    });

    // 3. Emit Web Research Step if web search was triggered
    if (retrieval.hasWebResults && mode === "research") {
      onChunk({
        delta: "",
        done: false,
        researchStep: {
          id: "step-3",
          stage: "web_search",
          message: `Gathered ${retrieval.webResults.length} verified web sources. Cross-referencing findings...`,
          timestamp: new Date().toISOString(),
          completed: true,
        },
      });
      await new Promise((r) => setTimeout(r, 200));
    }

    // 4. Emit Synthesis Step
    if (mode === "research" || mode === "docs") {
      onChunk({
        delta: "",
        done: false,
        researchStep: {
          id: "step-4",
          stage: "synthesizing",
          message: `Synthesizing grounded response with ${retrieval.citations.length} verified citation(s)...`,
          timestamp: new Date().toISOString(),
          completed: true,
        },
      });
    }

    // Send Citations Payload to UI
    if (retrieval.citations.length > 0) {
      onChunk({
        delta: "",
        done: false,
        citations: retrieval.citations,
        contextType: retrieval.contextType,
        isGrounded: true,
      });
    }

    // 5. Construct Grounded Context Prompt
    let groundedContext = "";
    if (retrieval.privateResults.length > 0) {
      groundedContext += "\n\n### PRIVATE USER KNOWLEDGE BASE:\n" +
        retrieval.privateResults.map((r, i) => `[Doc ${i + 1}] (${r.filename}, Page ${r.chunk.pageNumber}): ${r.chunk.content}`).join("\n\n");
    }

    if (retrieval.memories.length > 0) {
      groundedContext += "\n\n### RELEVANT USER MEMORIES:\n" +
        retrieval.memories.map((m) => `[Memory - ${m.category}]: ${m.content}`).join("\n");
    }

    if (retrieval.webResults.length > 0) {
      groundedContext += "\n\n### VERIFIED WEB RESEARCH SOURCES:\n" +
        retrieval.webResults.map((w, i) => `[Web Source ${i + 1}] (${w.title} - ${w.url}): ${w.snippet}`).join("\n\n");
    }

    // 6. Execute Streaming via AI Provider
    const request: ChatCompletionRequest = {
      messages,
      model,
      mode,
      webSearch,
      groundedContext,
      citations: retrieval.citations,
    };

    const answer = await defaultAIProvider.streamResponse(request, onChunk);

    return {
      answer,
      citations: retrieval.citations,
      contextType: retrieval.contextType,
      isGrounded: retrieval.citations.length > 0,
    };
  }
}

export const orchestrator = new AIOrchestrator();
