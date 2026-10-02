"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "pill" | "button";
}

export function ThemeToggle({ className, variant = "pill" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, setTheme, mounted } = useTheme();

  // If not yet hydrated on client, fallback to 'dark' for rendering icons seamlessly
  const isDark = mounted ? resolvedTheme === "dark" : true;

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={() => toggleTheme()}
        className={cn(
          "relative z-[110] pointer-events-auto flex items-center justify-center w-9 h-9 rounded-xl",
          "border border-slate-200/90 dark:border-white/10",
          "bg-white dark:bg-slate-900/90 sm:backdrop-blur-md",
          "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white",
          "hover:border-indigo-500/40 hover:bg-slate-100 dark:hover:bg-white/[0.14]",
          "transition-transform duration-150 active:scale-90 cursor-pointer touch-manipulation shrink-0 transform-gpu",
          className
        )}
        title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
        aria-label={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
      >
        <div className="relative w-4 h-4 transform-gpu transition-transform duration-300">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 transition-all duration-300 rotate-0 scale-100 animate-in fade-in" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 transition-all duration-300 rotate-0 scale-100 animate-in fade-in" />
          )}
        </div>
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme switcher"
      className={cn(
        "relative z-[110] pointer-events-auto inline-flex items-center p-0.5 rounded-full",
        "bg-slate-200/90 dark:bg-slate-800/90 sm:backdrop-blur-md",
        "border border-slate-300/80 dark:border-white/[0.12]",
        "shadow-inner select-none touch-manipulation shrink-0 transform-gpu",
        className
      )}
    >
      {/* Light Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "relative z-[110] pointer-events-auto flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-150 cursor-pointer active:scale-90 touch-manipulation transform-gpu",
          !isDark
            ? "bg-white text-amber-500 shadow-sm font-bold scale-100 ring-1 ring-slate-900/5"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white opacity-75 hover:opacity-100"
        )}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun className={cn("w-3.5 h-3.5 transition-transform", !isDark && "stroke-[2.5] scale-105")} />
      </button>

      {/* Dark Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "relative z-[110] pointer-events-auto flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-150 cursor-pointer active:scale-90 touch-manipulation transform-gpu",
          isDark
            ? "bg-indigo-600 text-white shadow-sm font-bold scale-100"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white opacity-75 hover:opacity-100"
        )}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon className={cn("w-3.5 h-3.5 transition-transform", isDark && "stroke-[2.5] scale-105")} />
      </button>
    </div>
  );
}
