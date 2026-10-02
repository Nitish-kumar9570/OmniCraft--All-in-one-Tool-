export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  user_id: string;
  filename: string;
  storage_path: string | null;
  mime_type: string | null;
  file_size: number;
  status: "uploading" | "processing" | "ready" | "failed";
  page_count: number;
  title: string | null;
  description: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DocumentChunkRow {
  id: string;
  document_id: string;
  user_id: string;
  chunk_index: number;
  page_number: number;
  content: string;
  metadata: Record<string, any>;
  embedding: string | null;
  created_at: string;
}

export interface MemoryRow {
  id: string;
  user_id: string;
  content: string;
  category: "preference" | "project" | "education" | "work" | "personal" | "instruction" | "fact" | "other";
  importance: number;
  embedding: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeItemRow {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  embedding: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      conversations: {
        Row: Conversation;
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      documents: {
        Row: DocumentRow;
        Insert: Partial<DocumentRow> & { user_id: string; filename: string };
        Update: Partial<DocumentRow>;
        Relationships: [];
      };
      document_chunks: {
        Row: DocumentChunkRow;
        Insert: Partial<DocumentChunkRow> & { document_id: string; user_id: string; chunk_index: number; content: string };
        Update: Partial<DocumentChunkRow>;
        Relationships: [];
      };
      memories: {
        Row: MemoryRow;
        Insert: Partial<MemoryRow> & { user_id: string; content: string };
        Update: Partial<MemoryRow>;
        Relationships: [];
      };
      knowledge_items: {
        Row: KnowledgeItemRow;
        Insert: Partial<KnowledgeItemRow> & { user_id: string; title: string; content: string };
        Update: Partial<KnowledgeItemRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
