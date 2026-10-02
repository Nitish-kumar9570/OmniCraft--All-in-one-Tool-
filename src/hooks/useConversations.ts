"use client";

import { useState, useEffect, useCallback } from "react";
import { Conversation } from "@/types/database";

const STORAGE_KEY = "omnicraft_conversations";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setConversations(JSON.parse(saved));
        } else {
          setConversations([]);
        }
      }
    } catch {
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const saveToStorage = (updated: Conversation[]) => {
    setConversations(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
    }
  };

  const createConversation = async (title: string = "New conversation"): Promise<string | null> => {
    const id = "conv_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
    const newConv: Conversation = {
      id,
      user_id: "local_guest",
      title,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveToStorage([newConv, ...conversations]);
    return id;
  };

  const deleteConversation = async (id: string): Promise<boolean> => {
    const updated = conversations.filter((c) => c.id !== id);
    saveToStorage(updated);
    return true;
  };

  const renameConversation = async (id: string, newTitle: string): Promise<boolean> => {
    const updated = conversations.map((c) =>
      c.id === id ? { ...c, title: newTitle, updated_at: new Date().toISOString() } : c
    );
    saveToStorage(updated);
    return true;
  };

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    renameConversation,
    refresh: fetchConversations,
  };
}
