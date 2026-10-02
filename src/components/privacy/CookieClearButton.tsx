"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Trash2, Check } from "lucide-react";

export function CookieClearButton() {
  const [cleared, setCleared] = useState(false);
  const { success } = useToast();

  const handleClear = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("omnicraft_theme");
        localStorage.removeItem("omnicraft_favorites");
        localStorage.removeItem("omnicraft_history");
        localStorage.removeItem("omnicraft_cookie_consent");
        localStorage.removeItem("nova_theme");
        localStorage.removeItem("omnicraft_conversations");
        localStorage.removeItem("omnicraft_memories");

        // Clear real browser cookies
        document.cookie = "omnicraft_cookie_consent=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "omnicraft_theme=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setCleared(true);
        success("All locally cached OmniCraft data and cookies have been removed from your browser.");
        setTimeout(() => setCleared(false), 3000);
      } catch {
        // Handle private browsing or access errors
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10">
      <div>
        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
          Reset OmniCraft Device Storage
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Clear all locally saved theme choices, pinned favorites, and recent activity history.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleClear}
        className="cursor-pointer shrink-0"
        leftIcon={cleared ? <Check className="w-4 h-4 text-emerald-500" /> : <Trash2 className="w-4 h-4 text-rose-500" />}
      >
        {cleared ? "Preferences Cleared" : "Clear Local Storage"}
      </Button>
    </div>
  );
}
