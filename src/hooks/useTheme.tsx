"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "omnicraft_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Apply theme to document with zero-lag transition suppression
  const applyThemeToDOM = useCallback((currentTheme: Theme, suppressTransitions = true) => {
    if (typeof window === "undefined") return "dark" as const;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = currentTheme === "system" ? mediaQuery.matches : currentTheme === "dark";
    const resolved: "light" | "dark" = isDark ? "dark" : "light";

    // Temporarily disable CSS transitions so 500+ DOM nodes don't trigger simultaneous color interpolation
    let styleTag: HTMLStyleElement | null = null;
    if (suppressTransitions) {
      styleTag = document.createElement("style");
      styleTag.appendChild(
        document.createTextNode(
          "*, *::before, *::after { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; -ms-transition: none !important; transition: none !important; }"
        )
      );
      document.head.appendChild(styleTag);
    }

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.style.colorScheme = resolved;
    document.documentElement.setAttribute("data-theme", resolved);
    setResolvedTheme(resolved);

    // Force style recalculation then restore transitions on the next animation frame
    if (styleTag) {
      // Trigger a reflow
      const _ = window.getComputedStyle(styleTag).opacity;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (styleTag && document.head.contains(styleTag)) {
            document.head.removeChild(styleTag);
          }
        });
      });
    }

    return resolved;
  }, []);

  // Initialize theme from storage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const cookieTheme = typeof document !== "undefined"
        ? (document.cookie.match(/(?:^|;\s*)omnicraft_theme=([^;]+)/)?.[1] as Theme | null)
        : null;

      const saved = (
        localStorage.getItem(THEME_STORAGE_KEY) ||
        cookieTheme ||
        localStorage.getItem("omnicraft_theme") ||
        localStorage.getItem("nova_theme")
      ) as Theme | null;

      if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
        setThemeState(saved);
        applyThemeToDOM(saved);
      } else {
        setThemeState("system");
        applyThemeToDOM("system");
      }
    } catch {
      applyThemeToDOM("dark");
    }
  }, [applyThemeToDOM]);

  // Handle system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        applyThemeToDOM("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted, applyThemeToDOM]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyThemeToDOM(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        document.cookie = `${THEME_STORAGE_KEY}=${encodeURIComponent(newTheme)}; path=/; max-age=31536000; SameSite=Lax${isHttps ? "; Secure" : ""}`;
      } catch {}
    },
    [applyThemeToDOM]
  );

  const toggleTheme = useCallback(() => {
    // If currently resolved is dark, switch to light; if light, switch to dark
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, mounted, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
