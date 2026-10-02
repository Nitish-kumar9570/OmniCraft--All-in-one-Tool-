export type SourceType = "private_doc" | "memory" | "web" | "conversation";

export interface Citation {
  id: string;
  index: number;
  title: string;
  sourceType: SourceType;
  url?: string;
  documentId?: string;
  documentName?: string;
  pageNumber?: number;
  snippet?: string;
  similarity?: number;
}

export interface DeepResearchStep {
  id: string;
  stage: "understanding" | "private_search" | "web_search" | "source_review" | "comparison" | "synthesizing" | "completed";
  message: string;
  timestamp: string;
  completed: boolean;
}

export type ChatMode = "quick" | "private" | "web" | "research" | "docs";

export interface GroundedAnswerResult {
  answer: string;
  citations: Citation[];
  researchSteps?: DeepResearchStep[];
  contextType: "private" | "web" | "hybrid" | "memory" | "general";
  isGrounded: boolean;
}
