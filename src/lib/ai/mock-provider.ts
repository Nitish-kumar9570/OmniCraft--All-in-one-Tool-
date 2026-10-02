import { AIProvider, ChatCompletionRequest, ChatStreamChunk } from "./provider";

export class MockAIProvider implements AIProvider {
  name = "OmniCraft AI Private Partner Engine";

  private getGroundedResponse(prompt: string, request: ChatCompletionRequest): string {
    const p = prompt.toLowerCase();
    const citations = request.citations || [];
    const mode = request.mode || "quick";

    // 1. Single or Multi-Document PDF Summarization & Comparison
    if (p.includes("summarize") && (p.includes("pdf") || p.includes("document") || citations.some((c) => c.sourceType === "private_doc"))) {
      const docName = citations.find((c) => c.sourceType === "private_doc")?.documentName || "Uploaded Document.pdf";
      return `### 📄 Structured Document Summary: **${docName}**

#### 1. Executive Summary
This document provides an in-depth technical analysis and comprehensive breakdown of the core problem domain, methodologies, and architectural guidelines.

#### 2. Key Findings & Core Concepts
- **Foundational Architecture**: Outlines clear structural boundaries and data flows.
- **Methodology & Rigor**: Evaluates practical trade-offs, fault tolerance, and implementation complexity.
- **Observed Metrics**: Sub-millisecond retrieval latency with deterministic consistency.

#### 3. Important Takeaways
> "Designing systems with strict isolation and modular boundaries minimizes technical debt and maximizes operational resilience."

#### 4. Conclusion
The document establishes an authoritative framework that can be directly applied to our active workspace.

---
*Grounded in private user documents: **${docName}** (Page 1–${citations.length + 1})*`;
    }

    // 2. Multi-Document Comparison
    if (p.includes("compare") && citations.length > 1) {
      const docs = Array.from(new Set(citations.filter((c) => c.sourceType === "private_doc").map((c) => c.documentName))).filter(Boolean);
      const docA = docs[0] || "Document A.pdf";
      const docB = docs[1] || "Document B.pdf";

      return `### 🔬 Comparative Analysis: **${docA}** vs **${docB}**

| Dimension | **${docA}** | **${docB}** | Synthesis / Implication |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Architectural Foundation & Schemas | Operational Performance & Scale | Complementary scopes |
| **Methodology** | Declarative Data Modeling | Asynchronous Event Streaming | High compatibility |
| **Security Layer** | Row Level Security (RLS) | Token Validation & RBAC | Multi-layered defense |

#### Key Similarities:
- Both documents advocate for **zero-trust data isolation** and strict authorization boundaries.
- Consistent emphasis on reproducible automated migrations.

#### Key Differences & Nuances:
- **${docA}** prioritizes transactional integrity and foreign key constraints.
- **${docB}** focuses on horizontal partitioning and cache invalidation.

#### Recommendation:
Combine the relational schema constraints from **${docA}** with the asynchronous retrieval optimizations from **${docB}**.`;
    }

    // 3. Image & Diagram Analysis with Document Grounding
    if (p.includes("diagram") || p.includes("image") || p.includes("chart") || p.includes("screenshot")) {
      return `### 🖼️ Multimodal Vision & Document Analysis

#### Visual Structure Breakdown:
1. **Identified Schema / Topology**: The uploaded visual represents a distributed client-server architecture with an authentication gateway and persistent storage.
2. **Key Data Paths**:
   - **Ingress**: User requests authenticate through cookie-based tokens.
   - **Processing Tier**: Orchestrator queries private vectors and hybrid text indexes.
   - **Persistence**: Relational records committed to PostgreSQL with RLS enforcement.

#### Correlation with Uploaded Notes:
Cross-referencing this diagram with your private documents confirms that the visual schema precisely aligns with the multi-tenant partitioning guidelines in your uploaded references.`;
    }

    // 4. Memory-Grounded Responses
    if (citations.some((c) => c.sourceType === "memory")) {
      const memorySnippet = citations.find((c) => c.sourceType === "memory")?.snippet || "your saved preference";
      return `Based on your personal memory (*"${memorySnippet}"*) and our active context:

Here is the tailored recommendation designed specifically around your workflow:

1. **Customized Implementation**:
   - Structured around your established language and tooling preferences.
   - Optimized for fast iterative prototyping without redundant setup.

2. **Next Steps**:
   - Apply these conventions directly to your ongoing project modules.`;
    }

    // 5. Deep Research Mode Synthesis
    if (mode === "research") {
      return `### 🌐 Deep Research Synthesis Report

**Query Analysis**: *"${prompt}"*

#### 1. Background & Context
We performed exhaustive multi-source research across private knowledge assets and verified web intelligence to formulate this grounded report.

#### 2. Synthesis of Evidence & Findings
- **Private Knowledge Consistency**: Your internal documents corroborate that security boundaries must be validated server-side.
- **Industry Standards**: External technical documentation validates that combining vector search with lexical BM25 indexing (Hybrid Search) delivers up to 35% higher retrieval accuracy than pure vector embeddings alone.
- **Implementation Trade-offs**: While pure client-side processing reduces server cost, server-orchestrated pipelines provide superior access control and prevent token leakage.

#### 3. Strategic Recommendations
1. Enforce strict PostgreSQL Row Level Security (RLS) on all user data.
2. Cache vector embeddings to prevent re-processing identical files.
3. Provide transparent source attribution with clickable citations for every grounded assertion.`;
    }

    // Default intelligent response with grounded citations
    const privateNotice = citations.some((c) => c.sourceType === "private_doc")
      ? "\n\n🔒 *Answer grounded using your uploaded private documents.*"
      : "";
    const webNotice = citations.some((c) => c.sourceType === "web")
      ? "\n\n🌐 *Verified with live web research and official documentation.*"
      : "";

    return `### Solution & Grounded Analysis

Addressing: **"${prompt}"**

1. **Key Insights**:
   - **Local-First Grounding**: Prioritizes verified private knowledge before falling back to external sources.
   - **Security & Privacy**: User data remains strictly isolated via Row Level Security (RLS).
   - **Accurate Attribution**: Every piece of cited evidence is directly cross-referenced with your sources.

2. **Step-by-Step Implementation**:
   - **Step 1**: Ingest and validate data schema boundaries.
   - **Step 2**: Execute semantic and lexical hybrid retrieval.
   - **Step 3**: Synthesize the grounded response with complete source attribution.
${privateNotice}${webNotice}

Would you like to explore deeper into any of these areas or compare additional documents?`;
  }

  async generateResponse(request: ChatCompletionRequest): Promise<string> {
    const lastUserMessage = [...request.messages].reverse().find((m) => m.role === "user");
    const prompt = lastUserMessage?.content || "Hello";
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.getGroundedResponse(prompt, request);
  }

  async streamResponse(
    request: ChatCompletionRequest,
    onChunk: (chunk: ChatStreamChunk) => void
  ): Promise<string> {
    const lastUserMessage = [...request.messages].reverse().find((m) => m.role === "user");
    const prompt = lastUserMessage?.content || "Hello";
    const fullText = this.getGroundedResponse(prompt, request);

    const words = fullText.split(" ");
    let accumulated = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i] + (i === words.length - 1 ? "" : " ");
      accumulated += word;
      onChunk({
        delta: word,
        done: false,
        model: request.model || "nova-pro",
      });

      const delay = Math.floor(Math.random() * 16) + 12;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    onChunk({
      delta: "",
      done: true,
      model: request.model || "nova-pro",
      finishReason: "stop",
    });

    return fullText;
  }
}

export const defaultAIProvider = new MockAIProvider();
