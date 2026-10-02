"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdBanner } from "@/components/ads/AdBanner";
import { TOOLS_REGISTRY } from "@/tools/registry";
import { CATEGORY_LIST } from "@/tools/categories";
import { searchTools } from "@/tools/search";
import { Search, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolsExplorer() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("cat") || "all";
  const initialSort = searchParams.get("sort") || "popular";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  const filteredTools = useMemo(() => {
    let result = searchQuery.trim() ? searchTools(searchQuery, 100) : [...TOOLS_REGISTRY];

    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (sortBy === "popular") {
      result.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    } else if (sortBy === "new") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "alpha-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "alpha-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> All Tools Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            All Online Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Displaying <strong className="font-mono text-indigo-600 dark:text-indigo-400">{filteredTools.length}</strong> instant browser utilities
          </p>
        </div>

        {/* Search Input in Top Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword or task..."
            aria-label="Filter online tools"
            className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-[#0c1322]/80 backdrop-blur-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-xs placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              aria-label="Clear filter query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <AdBanner slotType="in-content" />

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 select-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-xs",
              selectedCategory === "all"
                ? "bg-indigo-600 text-white shadow-indigo-500/25"
                : "bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-white"
            )}
          >
            All Categories ({TOOLS_REGISTRY.length})
          </button>

          {CATEGORY_LIST.map((cat) => {
            const count = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-xs",
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-indigo-500/25"
                    : "bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-white"
                )}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-xs">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort tools directory"
            className="h-9 rounded-xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0c1322] backdrop-blur-md text-xs px-3 font-semibold text-slate-900 dark:text-white shadow-xs focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="new">Recently Added</option>
            <option value="alpha-asc">Alphabetical (A to Z)</option>
            <option value="alpha-desc">Alphabetical (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No matching tools found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn&apos;t find any tool matching &quot;{searchQuery}&quot;. Try clearing filters or searching for terms like &quot;pdf&quot;, &quot;image&quot;, or &quot;json&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
