export type MemoryCategory =
  | "preference"
  | "project"
  | "education"
  | "work"
  | "personal"
  | "instruction"
  | "fact"
  | "other";

export interface MemoryItem {
  id: string;
  userId: string;
  content: string;
  category: MemoryCategory;
  importance: number; // 1 to 5
  metadata?: Record<string, any>;
  similarity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemorySettingsState {
  enabled: boolean;
  autoRemember: boolean; // false = ask before remembering, true = automatically remember
  retentionDays?: number;
}
