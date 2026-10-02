"use client";

import { useState, useEffect, useCallback } from "react";

export interface HistoryItem {
  toolId: string;
  usedAt: string;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("omnicraft_history");
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return [];
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const recordToolUsage = useCallback((toolId: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toolId !== toolId);
      const updated = [{ toolId, usedAt: new Date().toISOString() }, ...filtered].slice(0, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem("omnicraft_history", JSON.stringify(updated));
      }
      return updated;
    });

    // Record anonymous usage metric
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId }),
    }).catch(() => {});
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("omnicraft_history");
    }
  }, []);

  return {
    history,
    isLoaded,
    recordToolUsage,
    clearHistory,
  };
}
