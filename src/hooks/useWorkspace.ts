"use client";

import { useState, useEffect, useCallback } from "react";

export interface WorkspaceItem {
  id: string;
  title: string;
  type: "file" | "text" | "json" | "image" | "pdf" | "workflow";
  content?: string;
  fileUrl?: string;
  fileName?: string;
  size?: number;
  sourceTool?: string;
  timestamp: number;
}

const STORAGE_KEY = "omnicraft_workspace_items";

export function useWorkspace() {
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const saveItems = useCallback((newItems: WorkspaceItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch {}
  }, []);

  const addItem = useCallback((item: Omit<WorkspaceItem, "id" | "timestamp">) => {
    const newItem: WorkspaceItem = {
      ...item,
      id: `ws_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };
    setItems((prev) => {
      const updated = [newItem, ...prev].slice(0, 50); // cap at 50 local items
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return newItem;
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const clearWorkspace = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    clearWorkspace,
  };
}
