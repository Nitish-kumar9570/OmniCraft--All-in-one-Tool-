"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { searchTools } from "@/tools/search";

const ROTATING_PLACEHOLDERS = [
  "make image smaller...",
  "convert photo for website...",
  "clean and format json...",
  "protect and compress pdf...",
  "generate wifi qr code...",
  "prepare image for instagram...",
  "convert csv to structured json...",
  "generate secure cryptographic password...",
];

export function HeroSearch() {
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchTools(searchQuery, 1);
      if (results.length > 0) {
        router.push(`/tools/${results[0].slug}`);
      } else {
        router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2" role="search">
      <div className="relative flex items-center p-2 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#0c1322]/90 backdrop-blur-2xl border-2 border-indigo-500/30 dark:border-white/10 shadow-xl shadow-indigo-500/10 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all duration-200">
        <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 ml-3.5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
          aria-label="Search online tools"
          className="w-full px-4 py-3 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none font-medium"
        />
        <Button
          type="submit"
          variant="gradient"
          size="md"
          className="shrink-0 px-6 rounded-xl sm:rounded-2xl shadow-md shadow-indigo-500/25 active:scale-95 transition-transform cursor-pointer"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
