export type ToolCategoryId =
  | "pdf"
  | "image"
  | "qr-barcode"
  | "converters"
  | "calculators"
  | "text"
  | "developer"
  | "seo"
  | "ai"
  | "video"
  | "audio"
  | "office"
  | "security"
  | "web"
  | "social"
  | "design"
  | "productivity";

export type ToolProcessingType = "client" | "server" | "ai" | "hybrid";

export type ToolInputType =
  | "file"
  | "files"
  | "text"
  | "code"
  | "form"
  | "canvas"
  | "custom";

export type PrivacyState = "LOCAL" | "SERVER" | "EXTERNAL";

export interface ToolPrivacyMetadata {
  type: PrivacyState;
  badgeLabel: string;
  processing: "Client-side" | "Server" | "External Service";
  dataUploaded: "No" | "Yes" | "Temporary processing only";
  dataStored: "No" | "Temporary processing only" | "Never";
  thirdPartyServices: string;
  description: string;
}

export interface ToolCapabilities {
  acceptsFile?: boolean;
  acceptsText?: boolean;
  acceptsJSON?: boolean;
  acceptsImage?: boolean;
  acceptsPDF?: boolean;
  acceptsAudio?: boolean;
  acceptsVideo?: boolean;
  acceptsCSV?: boolean;
  producesFile?: boolean;
  producesText?: boolean;
  producesJSON?: boolean;
  producesImage?: boolean;
  producesPDF?: boolean;
  producesAudio?: boolean;
  producesVideo?: boolean;
  producesCSV?: boolean;
  clientSide?: boolean;
  serverSide?: boolean;
  supportsChaining?: boolean;
}

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolHowToStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  category: ToolCategoryId;
  description: string;
  icon: string;
  keywords: string[];
  synonyms?: string[];
  inputType: ToolInputType;
  processingType: ToolProcessingType;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  usageCount?: number;
  seoTitle: string;
  seoDescription: string;
  howToUse?: ToolHowToStep[];
  features?: string[];
  faq?: ToolFaqItem[];
  relatedToolSlugs?: string[];
  componentName?: string;
  
  // Tool Compatibility & Privacy metadata extensions
  inputTypes?: string[];
  outputTypes?: string[];
  acceptedFormats?: string[];
  producedFormats?: string[];
  capabilities?: ToolCapabilities;
  privacy?: Partial<ToolPrivacyMetadata>;
}

export interface CategoryDefinition {
  id: ToolCategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  colorGradient: string;
  accentColor: string;
  sortOrder: number;
}

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  recommendedToolSlugs: string[];
}


