"use client";

import { useState, useEffect, useCallback } from "react";
import { MemoryItem, MemoryCategory, MemorySettingsState } from "@/types/memory";
import { useToast } from "@/components/ui/Toast";

const MEMORY_STORAGE_KEY = "omnicraft_memories";

export function useMemory() {
  const { success } = useToast();
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<MemorySettingsState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("omnicraft_memory_settings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return { enabled: true, autoRemember: false };
  });

  const fetchMemories = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(MEMORY_STORAGE_KEY);
        if (saved) {
          setMemories(JSON.parse(saved));
        } else {
          setMemories([]);
        }
      }
    } catch {
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const saveMemories = (items: MemoryItem[]) => {
    setMemories(items);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  };

  const updateSettings = (newSettings: Partial<MemorySettingsState>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("omnicraft_memory_settings", JSON.stringify(updated));
      }
      return updated;
    });
    success("Memory Settings Updated");
  };

  const createMemory = async (
    content: string,
    category: MemoryCategory = "fact",
    importance: number = 3
  ): Promise<MemoryItem | null> => {
    if (!content.trim()) return null;

    const newMemory: MemoryItem = {
      id: "mem_" + Math.random().toString(36).substring(2, 9),
      userId: "local_guest",
      content: content.trim(),
      category,
      importance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveMemories([newMemory, ...memories]);
    success("Memory Saved", `Stored under ${category}`);
    return newMemory;
  };

  const updateMemory = async (
    id: string,
    updates: { content?: string; category?: MemoryCategory; importance?: number }
  ): Promise<boolean> => {
    const updated = memories.map((m) =>
      m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
    );
    saveMemories(updated);
    success("Memory Updated");
    return true;
  };

  const deleteMemory = async (id: string): Promise<boolean> => {
    const updated = memories.filter((m) => m.id !== id);
    saveMemories(updated);
    success("Memory Deleted");
    return true;
  };

  return {
    memories,
    isLoading,
    settings,
    updateSettings,
    createMemory,
    updateMemory,
    deleteMemory,
    refresh: fetchMemories,
  };
}
