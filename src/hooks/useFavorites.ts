"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/Toast";
import { getToolBySlug } from "@/tools/registry";

const DEFAULT_FAVORITES = [
  "pdf-compress",
  "image-compressor",
  "qr-generator",
  "json-formatter",
  "password-generator",
  "currency-converter",
];

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (toolId: string) => boolean;
  toggleFavorite: (toolId: string) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("omnicraft_favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        } else {
          setFavorites(DEFAULT_FAVORITES);
          localStorage.setItem("omnicraft_favorites", JSON.stringify(DEFAULT_FAVORITES));
        }
      } else {
        setFavorites(DEFAULT_FAVORITES);
        localStorage.setItem("omnicraft_favorites", JSON.stringify(DEFAULT_FAVORITES));
      }
    } catch {
      setFavorites(DEFAULT_FAVORITES);
    } finally {
      setIsLoaded(true);
    }

    // Cross-tab and window synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "omnicraft_favorites" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveFavorites = useCallback((items: string[]) => {
    setFavorites(items);
    try {
      localStorage.setItem("omnicraft_favorites", JSON.stringify(items));
    } catch {}
  }, []);

  const isFavorite = useCallback(
    (toolId: string) => {
      if (!toolId) return false;
      const tool = getToolBySlug(toolId);
      const id = tool ? tool.id : toolId;
      const slug = tool ? tool.slug : toolId;
      return favorites.includes(id) || favorites.includes(slug);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (toolId: string) => {
      const tool = getToolBySlug(toolId);
      const targetId = tool ? tool.id : toolId;
      const targetSlug = tool ? tool.slug : toolId;
      const toolName = tool ? tool.name : targetId;

      const exists = favorites.includes(targetId) || favorites.includes(targetSlug);

      const updated = exists
        ? favorites.filter((id) => id !== targetId && id !== targetSlug)
        : [...favorites, targetId];

      saveFavorites(updated);

      if (exists) {
        toast({
          type: "info",
          title: "Removed from Favorites",
          message: `${toolName} unpinned from favorites.`,
        });
      } else {
        toast({
          type: "favorite",
          title: "Added to Favorites",
          message: `${toolName} pinned to favorites for instant access.`,
        });
      }
    },
    [favorites, saveFavorites, toast]
  );

  return React.createElement(
    FavoritesContext.Provider,
    { value: { favorites, isFavorite, toggleFavorite, isLoaded } },
    children
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}