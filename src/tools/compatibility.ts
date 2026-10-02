import { ToolDefinition, ToolPrivacyMetadata, ToolCapabilities } from "./types";
import { TOOLS_REGISTRY } from "./registry";

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  extension: string;
  category: "pdf" | "image" | "json" | "text" | "csv" | "audio" | "video" | "code" | "archive" | "other";
  dimensions?: { width: number; height: number; aspectRatio?: string };
  pageCount?: number;
  duration?: number;
  lineCount?: number;
  wordCount?: number;
  isValidJson?: boolean;
  jsonStats?: { objects: number; arrays: number; keys: number };
  previewUrl?: string;
  snippet?: string;
}

/**
 * Standard Privacy Metadata Resolver
 */
export function getToolPrivacy(tool: ToolDefinition): ToolPrivacyMetadata {
  if (tool.privacy?.type && tool.privacy?.processing) {
    return {
      type: tool.privacy.type,
      badgeLabel: tool.privacy.badgeLabel || (tool.privacy.type === "LOCAL" ? "100% Client-Side" : tool.privacy.type === "SERVER" ? "Server Processing" : "External Service"),
      processing: tool.privacy.processing,
      dataUploaded: tool.privacy.dataUploaded ?? (tool.privacy.type === "LOCAL" ? "No" : "Yes"),
      dataStored: tool.privacy.dataStored ?? (tool.privacy.type === "LOCAL" ? "No" : "Temporary processing only"),
      thirdPartyServices: tool.privacy.thirdPartyServices || (tool.privacy.type === "LOCAL" ? "None" : tool.privacy.type === "EXTERNAL" ? "OpenAI / Gemini" : "OmniCraft Processing Engine"),
      description: tool.privacy.description || (tool.privacy.type === "LOCAL" ? "Your data stays in your browser. Zero uploads or telemetry." : "Processed ephemerally in volatile memory with instant purging.")
    };
  }

  // Infer based on processingType and category
  if (tool.processingType === "client" || (!tool.processingType && tool.category !== "ai")) {
    return {
      type: "LOCAL",
      badgeLabel: "100% Client-Side",
      processing: "Client-side",
      dataUploaded: "No",
      dataStored: "No",
      thirdPartyServices: "None",
      description: "Computation runs 100% within your local browser engine. Files and secrets never leave your device."
    };
  }

  if (tool.processingType === "ai" || tool.category === "ai") {
    return {
      type: "EXTERNAL",
      badgeLabel: "External AI Service",
      processing: "External Service",
      dataUploaded: "Yes",
      dataStored: "Temporary processing only",
      thirdPartyServices: "OmniCraft AI & Gemini Engine",
      description: "Uses secure stateless API processing for AI inference. Input is not retained or used for training."
    };
  }

  return {
    type: "SERVER",
    badgeLabel: "Server Processing",
    processing: "Server",
    dataUploaded: "Yes",
    dataStored: "Temporary processing only",
    thirdPartyServices: "OmniCraft Processing Worker",
    description: "Requires temporary server-side conversion. Files are purged immediately after output delivery."
  };
}

/**
 * Infer or retrieve Tool Input Types
 */
export function getToolInputTypes(tool: ToolDefinition): string[] {
  if (tool.inputTypes && tool.inputTypes.length > 0) {
    return tool.inputTypes;
  }

  const slug = tool.slug.toLowerCase();
  const cat = tool.category;

  if (cat === "pdf" || slug.includes("pdf")) return ["pdf"];
  if (cat === "image" || slug.includes("image") || slug.includes("photo") || slug.includes("favicon") || slug.includes("crop") || slug.includes("compress")) {
    if (slug.includes("base64-to-image")) return ["text", "code"];
    return ["image"];
  }
  if (slug.includes("json") || slug.includes("manifest")) return ["json", "text"];
  if (slug.includes("csv")) return ["csv", "text"];
  if (cat === "audio" || slug.includes("audio") || slug.includes("voice")) return ["audio"];
  if (cat === "video" || slug.includes("video")) return ["video"];
  if (cat === "developer" || cat === "text" || cat === "seo" || cat === "social" || cat === "ai") return ["text", "code"];
  if (cat === "converters" || cat === "calculators") return ["number", "form", "text"];

  return ["text", "file"];
}

/**
 * Infer or retrieve Tool Output Types
 */
export function getToolOutputTypes(tool: ToolDefinition): string[] {
  if (tool.outputTypes && tool.outputTypes.length > 0) {
    return tool.outputTypes;
  }

  const slug = tool.slug.toLowerCase();
  const cat = tool.category;

  if (slug === "pdf-to-text" || slug === "extract-pdf-text" || slug.includes("pdf-text")) return ["text"];
  if (slug === "pdf-to-image" || slug === "pdf-to-jpg") return ["image", "zip"];
  if (cat === "pdf" || slug.includes("pdf")) return ["pdf"];

  if (slug === "image-to-base64" || slug === "image-color-picker" || slug === "image-palette") return ["text", "json", "color"];
  if (slug === "image-to-pdf") return ["pdf"];
  if (cat === "image" || slug.includes("image") || slug.includes("compressor") || slug.includes("resizer") || slug.includes("crop")) return ["image"];

  if (slug === "json-to-typescript" || slug === "json-to-ts") return ["typescript", "code", "text"];
  if (slug === "json-to-csv") return ["csv", "text"];
  if (slug === "csv-to-json") return ["json", "text"];
  if (slug === "json-schema-generator") return ["json", "text"];
  if (slug.includes("json")) return ["json", "text"];

  if (slug === "markdown-preview" || slug === "html-to-markdown" || slug.includes("markdown")) return ["markdown", "html", "text"];
  if (slug.includes("summarizer") || slug.includes("grammar") || slug.includes("cleaner") || slug.includes("case")) return ["text"];

  if (cat === "audio") return ["audio"];
  if (cat === "video") return ["video"];

  return ["text", "file"];
}

/**
 * Infer or retrieve Tool Capabilities
 */
export function getToolCapabilities(tool: ToolDefinition): ToolCapabilities {
  if (tool.capabilities) return tool.capabilities;

  const inTypes = getToolInputTypes(tool);
  const outTypes = getToolOutputTypes(tool);

  return {
    acceptsFile: inTypes.some((t) => ["file", "files", "pdf", "image", "audio", "video"].includes(t)),
    acceptsPDF: inTypes.includes("pdf"),
    acceptsImage: inTypes.includes("image"),
    acceptsText: inTypes.includes("text") || inTypes.includes("code"),
    acceptsJSON: inTypes.includes("json"),
    acceptsCSV: inTypes.includes("csv"),
    producesFile: outTypes.some((t) => ["file", "pdf", "image", "audio", "video", "zip"].includes(t)),
    producesPDF: outTypes.includes("pdf"),
    producesImage: outTypes.includes("image"),
    producesText: outTypes.includes("text") || outTypes.includes("code") || outTypes.includes("markdown") || outTypes.includes("typescript"),
    producesJSON: outTypes.includes("json"),
    producesCSV: outTypes.includes("csv"),
    clientSide: tool.processingType === "client",
    serverSide: tool.processingType === "server" || tool.processingType === "ai",
    supportsChaining: true,
  };
}

/**
 * Check if target tool can accept the output of source tool
 */
export function isToolCompatible(sourceTool: ToolDefinition, targetTool: ToolDefinition): boolean {
  if (sourceTool.id === targetTool.id) return false;

  const sourceOut = getToolOutputTypes(sourceTool);
  const targetIn = getToolInputTypes(targetTool);

  // Direct intersection check
  const directMatch = sourceOut.some((outType) =>
    targetIn.some((inType) => {
      if (outType === inType) return true;
      if (outType === "json" && (inType === "text" || inType === "code")) return true;
      if (outType === "typescript" && (inType === "text" || inType === "code")) return true;
      if (outType === "markdown" && (inType === "text" || inType === "html")) return true;
      if (outType === "csv" && inType === "text") return true;
      if (outType === "pdf" && inType === "file") return true;
      if (outType === "image" && inType === "file") return true;
      return false;
    })
  );

  return directMatch;
}

/**
 * Smart recommendation for "What would you like to do next?"
 */
export function getRecommendedNextTools(
  currentTool: ToolDefinition,
  explicitOutputType?: string,
  limit: number = 6
): ToolDefinition[] {
  const currentOut = explicitOutputType ? [explicitOutputType] : getToolOutputTypes(currentTool);
  const matched: { tool: ToolDefinition; score: number }[] = [];

  for (const candidate of TOOLS_REGISTRY) {
    if (candidate.id === currentTool.id) continue;

    let score = 0;
    const targetIn = getToolInputTypes(candidate);

    // Check type compatibility
    const hasTypeOverlap = currentOut.some((outType) =>
      targetIn.some((inType) => outType === inType || (outType === "json" && inType === "text"))
    );

    if (hasTypeOverlap) {
      score += 40;

      // Related tool slug boost
      if (currentTool.relatedToolSlugs?.includes(candidate.slug) || currentTool.relatedToolSlugs?.includes(candidate.id)) {
        score += 30;
      }

      // Same or complementary category boost
      if (candidate.category === currentTool.category) {
        score += 20;
      } else if (
        (currentTool.category === "pdf" && candidate.category === "text") ||
        (currentTool.category === "text" && candidate.category === "ai") ||
        (currentTool.category === "developer" && candidate.category === "text")
      ) {
        score += 15;
      }

      // Popularity boost
      if (candidate.isPopular) score += 10;

      matched.push({ tool: candidate, score });
    }
  }

  matched.sort((a, b) => b.score - a.score);
  return matched.slice(0, limit).map((m) => m.tool);
}

/**
 * Get compatible tools for a dropped file
 */
export function getToolsForFileType(mimeType: string, extension: string, fileCategory?: string): ToolDefinition[] {
  const ext = extension.toLowerCase().replace(/^\./, "");
  const mime = mimeType.toLowerCase();

  const isPdf = mime.includes("pdf") || ext === "pdf";
  const isImage = mime.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "ico"].includes(ext);
  const isJson = mime.includes("json") || ext === "json";
  const isCsv = mime.includes("csv") || ext === "csv";
  const isText = mime.startsWith("text/") || ["txt", "md", "markdown", "log", "rtf"].includes(ext);
  const isCode = ["js", "ts", "jsx", "tsx", "py", "html", "css", "sql", "yaml", "yml", "xml"].includes(ext);
  const isAudio = mime.startsWith("audio/") || ["mp3", "wav", "ogg", "m4a", "flac", "aac"].includes(ext);
  const isVideo = mime.startsWith("video/") || ["mp4", "webm", "mov", "avi", "mkv"].includes(ext);

  return TOOLS_REGISTRY.filter((tool) => {
    const inTypes = getToolInputTypes(tool);
    if (isPdf && inTypes.includes("pdf")) return true;
    if (isImage && inTypes.includes("image")) return true;
    if (isJson && (inTypes.includes("json") || inTypes.includes("text"))) return true;
    if (isCsv && (inTypes.includes("csv") || inTypes.includes("text"))) return true;
    if ((isText || isCode) && (inTypes.includes("text") || inTypes.includes("code"))) return true;
    if (isAudio && inTypes.includes("audio")) return true;
    if (isVideo && inTypes.includes("video")) return true;
    return false;
  }).sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
}

/**
 * Detect local file metadata without uploading
 */
export async function detectFileMetadata(file: File): Promise<FileMetadata> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const mime = file.type || "";
  
  let category: FileMetadata["category"] = "other";
  if (mime.includes("pdf") || extension === "pdf") category = "pdf";
  else if (mime.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "ico"].includes(extension)) category = "image";
  else if (mime.includes("json") || extension === "json") category = "json";
  else if (mime.includes("csv") || extension === "csv") category = "csv";
  else if (mime.startsWith("audio/") || ["mp3", "wav", "ogg", "m4a", "flac"].includes(extension)) category = "audio";
  else if (mime.startsWith("video/") || ["mp4", "webm", "mov", "mkv"].includes(extension)) category = "video";
  else if (["js", "ts", "jsx", "tsx", "py", "html", "css", "sql", "xml", "yaml", "yml"].includes(extension)) category = "code";
  else if (mime.startsWith("text/") || ["txt", "md", "markdown", "log"].includes(extension)) category = "text";
  else if (["zip", "tar", "gz", "7z", "rar"].includes(extension)) category = "archive";

  const meta: FileMetadata = {
    name: file.name,
    size: file.size,
    type: mime || `application/${extension}`,
    extension,
    category,
  };

  // Image dimension extraction
  if (category === "image" && typeof window !== "undefined") {
    try {
      const url = URL.createObjectURL(file);
      meta.previewUrl = url;
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          meta.dimensions = {
            width: img.naturalWidth,
            height: img.naturalHeight,
            aspectRatio: `${(img.naturalWidth / (gcd(img.naturalWidth, img.naturalHeight) || 1))}:${(img.naturalHeight / (gcd(img.naturalWidth, img.naturalHeight) || 1))}`,
          };
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url;
      });
    } catch {}
  }

  // PDF page count extraction
  if (category === "pdf" && typeof window !== "undefined") {
    try {
      const arrayBuffer = await file.slice(0, Math.min(file.size, 5 * 1024 * 1024)).arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      meta.pageCount = pdfDoc.getPageCount();
    } catch {
      meta.pageCount = 1;
    }
  }

  // JSON, Text, CSV snippet and metrics extraction
  if ((category === "json" || category === "text" || category === "csv" || category === "code") && typeof window !== "undefined") {
    try {
      const text = await file.slice(0, 100000).text();
      meta.snippet = text.slice(0, 400);
      meta.lineCount = text.split("\n").length;
      meta.wordCount = text.trim().split(/\s+/).filter(Boolean).length;

      if (category === "json" || extension === "json") {
        try {
          const parsed = JSON.parse(text);
          meta.isValidJson = true;
          const stats = countJsonElements(parsed);
          meta.jsonStats = stats;
        } catch {
          meta.isValidJson = false;
        }
      }
    } catch {}
  }

  return meta;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function countJsonElements(obj: any): { objects: number; arrays: number; keys: number } {
  let objects = 0;
  let arrays = 0;
  let keys = 0;

  function traverse(item: any) {
    if (item === null || typeof item !== "object") return;
    if (Array.isArray(item)) {
      arrays++;
      item.forEach(traverse);
    } else {
      objects++;
      const itemKeys = Object.keys(item);
      keys += itemKeys.length;
      itemKeys.forEach((k) => traverse(item[k]));
    }
  }

  traverse(obj);
  return { objects, arrays, keys };
}
