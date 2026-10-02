import { ModelId } from "@/types/chat";
import { Citation, DeepResearchStep, GroundedAnswerResult } from "@/types/research";

export interface ChatCompletionRequest {
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  model?: ModelId;
  mode?: "quick" | "private" | "web" | "research" | "docs";
  webSearch?: boolean;
  groundedContext?: string;
  citations?: Citation[];
  temperature?: number;
  maxTokens?: number;
}

export interface ChatStreamChunk {
  delta: string;
  done: boolean;
  model?: string;
  finishReason?: string | null;
  researchStep?: DeepResearchStep;
  citations?: Citation[];
  contextType?: "private" | "web" | "hybrid" | "memory" | "general";
  isGrounded?: boolean;
}

export interface AIProvider {
  name: string;
  generateResponse(request: ChatCompletionRequest): Promise<string>;
  streamResponse(
    request: ChatCompletionRequest,
    onChunk: (chunk: ChatStreamChunk) => void
  ): Promise<string>;
}
