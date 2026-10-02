import { Citation, DeepResearchStep } from "./research";

export type ModelId = "nova-pro" | "nova-fast" | "nova-reasoning" | "nova-creative";

export interface ModelOption {
  id: ModelId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  conversationId?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  isStreaming?: boolean;
  status?: "sending" | "sent" | "error";
  modelUsed?: ModelId;
  citations?: Citation[];
  researchSteps?: DeepResearchStep[];
  contextType?: "private" | "web" | "hybrid" | "memory" | "general";
  isGrounded?: boolean;
  selectedDocIds?: string[];
  attachedFiles?: Array<{ name: string; size: string; type: string; id?: string }>;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: "writing" | "coding" | "learning" | "research" | "planning" | "analysis" | "brainstorming";
  prompt: string;
  iconName: string;
  description: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: "code" | "note" | "prompt" | "conversation";
  content: string;
  language?: string;
  tags: string[];
  createdAt: string;
  conversationId?: string;
}
