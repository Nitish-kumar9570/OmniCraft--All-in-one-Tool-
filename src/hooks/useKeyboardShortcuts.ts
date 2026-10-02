"use client";

import { useEffect } from "react";

interface ShortcutHandlers {
  onSearch?: () => void;
  onNewChat?: () => void;
  onToggleSidebar?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        handlers.onSearch?.();
      }

      if (cmdOrCtrl && (e.key === "j" || e.key === "J" || (e.shiftKey && (e.key === "o" || e.key === "O")))) {
        e.preventDefault();
        handlers.onNewChat?.();
      }

      if (cmdOrCtrl && (e.key === "b" || e.key === "B" || (e.shiftKey && (e.key === "s" || e.key === "S")))) {
        e.preventDefault();
        handlers.onToggleSidebar?.();
      }

      if (e.key === "Escape") {
        handlers.onEscape?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}
