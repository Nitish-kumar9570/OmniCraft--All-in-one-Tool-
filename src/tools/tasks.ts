import { TaskDefinition } from "./types";

export const TASK_DEFINITIONS: TaskDefinition[] = [
  {
    id: "work-with-pdfs",
    title: "Work with PDFs",
    description: "Merge, compress, split, rotate, watermark, protect, or extract text from PDF files.",
    icon: "FileText",
    category: "pdf",
    recommendedToolSlugs: [
      "pdf-compress",
      "pdf-merge",
      "pdf-split",
      "pdf-to-text",
      "pdf-rotate",
      "pdf-watermark",
      "pdf-page-number",
      "pdf-metadata"
    ]
  },
  {
    id: "optimize-images",
    title: "Optimize an Image",
    description: "Compress file size, resize dimensions, convert to WebP/PNG, crop, or strip EXIF metadata.",
    icon: "Image",
    category: "image",
    recommendedToolSlugs: [
      "image-compressor",
      "image-resizer",
      "image-converter",
      "image-cropper",
      "remove-exif",
      "favicon-generator",
      "image-color-picker",
      "image-to-base64"
    ]
  },
  {
    id: "clean-data",
    title: "Clean & Format Data",
    description: "Format messy JSON, clean text whitespace, convert CSV to JSON, deduplicate lines, or validate syntax.",
    icon: "Code2",
    category: "developer",
    recommendedToolSlugs: [
      "json-formatter",
      "json-validator",
      "csv-to-json",
      "text-cleaner",
      "remove-duplicate-lines",
      "json-to-typescript",
      "json-schema-generator",
      "sort-text"
    ]
  },
  {
    id: "build-something",
    title: "Build Something",
    description: "Generate UUIDs, test Regular Expressions, decode JWT tokens, build meta tags, or format code.",
    icon: "Sparkles",
    category: "developer",
    recommendedToolSlugs: [
      "uuid-generator",
      "regex-tester",
      "jwt-decoder",
      "meta-tag-generator",
      "json-to-typescript",
      "html-formatter",
      "css-gradient",
      "hash-generator"
    ]
  },
  {
    id: "protect-info",
    title: "Protect Information",
    description: "Generate high-entropy passwords, calculate SHA-256 hashes, encrypt text, or protect PDF files.",
    icon: "ShieldCheck",
    category: "security",
    recommendedToolSlugs: [
      "password-generator",
      "hash-generator",
      "pdf-protect",
      "remove-exif",
      "base64-converter",
      "secret-scanner",
      "jwt-decoder",
      "url-encoder"
    ]
  },
  {
    id: "convert-files",
    title: "Convert a File",
    description: "Transform between image formats, CSV and JSON, Base64, units of measurement, or currencies.",
    icon: "ArrowLeftRight",
    category: "converters",
    recommendedToolSlugs: [
      "image-converter",
      "csv-to-json",
      "base64-converter",
      "unit-converter",
      "currency-converter",
      "pdf-to-text",
      "markdown-preview",
      "json-to-csv"
    ]
  },
  {
    id: "social-media",
    title: "Prepare Social Media",
    description: "Resize photos for Instagram/YouTube, generate hashtags, format Twitter threads, or create fancy bios.",
    icon: "Share2",
    category: "social",
    recommendedToolSlugs: [
      "image-cropper",
      "hashtag-generator",
      "social-character-counter",
      "twitter-thread-formatter",
      "fancy-font-bio",
      "image-compressor",
      "social-share-link",
      "youtube-embed"
    ]
  },
  {
    id: "analyze-docs",
    title: "Analyze a Document",
    description: "Extract text from scanned PDFs, summarize long articles, count words & reading time, or compare diffs.",
    icon: "Search",
    category: "text",
    recommendedToolSlugs: [
      "pdf-to-text",
      "ai-summarizer",
      "word-counter",
      "text-diff",
      "text-cleaner",
      "keyword-density",
      "ai-grammar",
      "markdown-preview"
    ]
  }
];

export function getTaskById(id: string): TaskDefinition | undefined {
  return TASK_DEFINITIONS.find((t) => t.id === id);
}
