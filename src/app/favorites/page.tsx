"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolCard } from "@/components/tools/ToolCard";
import { useFavorites } from "@/hooks/useFavorites";
import { getToolBySlug } from "@/tools/registry";
import { ToolDefinition } from "@/tools/types";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteTools: ToolDefinition[] = favorites
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 fill-current text-rose-500" /> Bookmarked Tools
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Favorites
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {favoriteTools.length} tools saved for quick 1-click access
            </p>
          </div>

          <Link href="/tools">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Explore More Tools
            </Button>
          </Link>
        </div>

        {favoriteTools.length === 0 ? (
          <div className="p-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
            <Heart className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No favorite tools yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Click the heart icon on any tool card across the directory to pin your most frequently used utilities here.
            </p>
            <div className="pt-2">
              <Link href="/tools">
                <Button variant="gradient" size="sm">
                  Browse All Tools
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesPage;
