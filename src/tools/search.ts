import { TOOLS_REGISTRY } from "./registry";
import { ToolDefinition } from "./types";
import { TOOL_CATEGORIES } from "./categories";

export interface SearchResultItem {
  tool: ToolDefinition;
  score: number;
  matchedOn: "name" | "keyword" | "synonym" | "description" | "category" | "intent";
}

// Intent-based expansion mappings
const INTENT_MAPPINGS: Record<string, string[]> = {
  "make image smaller": ["image-compressor", "image-resizer", "image-converter"],
  "reduce image size": ["image-compressor", "image-resizer"],
  "shrink photo": ["image-compressor", "image-resizer"],
  "convert photo for website": ["image-converter", "image-compressor", "image-resizer"],
  "photo for web": ["image-converter", "image-compressor"],
  "clean json": ["json-formatter", "json-validator", "json-schema-generator"],
  "format json": ["json-formatter", "json-validator"],
  "fix json": ["json-validator", "json-formatter"],
  "protect pdf": ["pdf-protect", "pdf-watermark"],
  "lock pdf": ["pdf-protect"],
  "make pdf smaller": ["pdf-compress"],
  "reduce pdf size": ["pdf-compress"],
  "shrink pdf": ["pdf-compress"],
  "prepare image for instagram": ["image-cropper", "image-resizer", "image-compressor"],
  "instagram photo": ["image-cropper", "image-resizer", "image-compressor"],
  "youtube banner": ["image-resizer", "image-cropper"],
  "extract text from pdf": ["pdf-to-text"],
  "pdf to text": ["pdf-to-text"],
  "extract text": ["pdf-to-text", "image-to-text"],
  "make qr code": ["wifi-qr-generator", "vcard-qr-generator", "qr-code-generator"],
  "wifi qr": ["wifi-qr-generator"],
  "strong password": ["password-generator", "hash-generator"],
  "create password": ["password-generator"],
  "calculate loan": ["emi-calculator", "compound-interest"],
  "convert units": ["unit-converter", "currency-converter"],
  "convert currency": ["currency-converter"],
  "clean text": ["text-cleaner", "remove-duplicate-lines"],
  "remove duplicate lines": ["remove-duplicate-lines", "text-cleaner"],
  "count words": ["word-counter", "character-counter"],
  "decode jwt": ["jwt-decoder"],
  "generate uuid": ["uuid-generator"],
  "generate hash": ["hash-generator", "md5-hash-generator"]
};

/**
 * Natural language intent matching + keyword scoring
 */
export function searchTools(query: string, limit: number = 12): ToolDefinition[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const tokens = clean.split(/\s+/).filter(Boolean);
  const scoredMap = new Map<string, { tool: ToolDefinition; score: number; matchedOn: SearchResultItem["matchedOn"] }>();

  // 1. Intent Direct & Partial Matching
  for (const [intentPhrase, targetSlugs] of Object.entries(INTENT_MAPPINGS)) {
    if (clean.includes(intentPhrase) || intentPhrase.includes(clean)) {
      targetSlugs.forEach((slug, rank) => {
        const tool = TOOLS_REGISTRY.find((t) => t.slug === slug || t.id === slug);
        if (tool) {
          const current = scoredMap.get(tool.id)?.score || 0;
          scoredMap.set(tool.id, {
            tool,
            score: Math.max(current, 120 - rank * 15),
            matchedOn: "intent",
          });
        }
      });
    }
  }

  // 2. Comprehensive Tool Registry Scoring
  for (const tool of TOOLS_REGISTRY) {
    let score = scoredMap.get(tool.id)?.score || 0;
    let matchedOn: SearchResultItem["matchedOn"] = scoredMap.get(tool.id)?.matchedOn || "description";

    const nameLower = tool.name.toLowerCase();
    const slugLower = tool.slug.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const catName = TOOL_CATEGORIES[tool.category]?.name.toLowerCase() || "";

    // Exact Name / Slug Match
    if (nameLower === clean || slugLower === clean) {
      score += 100;
      matchedOn = "name";
    } else if (nameLower.startsWith(clean)) {
      score += 65;
      matchedOn = "name";
    } else if (nameLower.includes(clean)) {
      score += 45;
      matchedOn = "name";
    }

    // Keyword & Synonym Matches
    if (tool.keywords) {
      for (const kw of tool.keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower === clean) {
          score += 55;
          matchedOn = "keyword";
          break;
        } else if (clean.includes(kwLower) || kwLower.includes(clean)) {
          score += 35;
          matchedOn = "keyword";
        }
      }
    }

    if (tool.synonyms) {
      for (const syn of tool.synonyms) {
        const synLower = syn.toLowerCase();
        if (synLower === clean || clean.includes(synLower) || synLower.includes(clean)) {
          score += 40;
          matchedOn = "synonym";
          break;
        }
      }
    }

    // Category Match
    if (catName.includes(clean) || tool.category.includes(clean)) {
      score += 25;
      if (score < 30) matchedOn = "category";
    }

    // Token Substring Matches across name, description, and keywords
    let tokenMatches = 0;
    for (const token of tokens) {
      if (token.length < 2) continue;
      if (nameLower.includes(token)) tokenMatches += 4;
      if (descLower.includes(token)) tokenMatches += 2;
      if (tool.keywords?.some((k) => k.toLowerCase().includes(token))) tokenMatches += 3;
    }
    score += tokenMatches * 5;

    // Popularity boost
    if (tool.isPopular) score += 4;

    if (score > 0) {
      scoredMap.set(tool.id, { tool, score, matchedOn });
    }
  }

  const results = Array.from(scoredMap.values());
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit).map((s) => s.tool);
}

