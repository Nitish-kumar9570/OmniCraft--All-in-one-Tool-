"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { getToolBySlug, TOOLS_REGISTRY } from "@/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  Clock,
  Settings,
  Layers,
  Sparkles,
} from "lucide-react";

export function DashboardPage() {
  const { favorites } = useFavorites();
  const { history } = useHistory();
  const [activeTab, setActiveTab] = useState<"overview" | "favorites" | "history">("overview");

  const favoriteTools = favorites
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is any => Boolean(t));

  const historyTools = history
    .map((item) => getToolBySlug(item.toolId))
    .filter((t): t is any => Boolean(t));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* User Hero Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                OmniCraft Local Workspace
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                100% Client-Side • Local Device Storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="outline" size="sm" leftIcon={<Settings className="w-3.5 h-3.5" />}>
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 select-none">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "favorites", label: `Favorites (${favoriteTools.length})`, icon: Heart },
            { id: "history", label: `Recent (${historyTools.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Favorite Tools</span>
                <p className="text-3xl font-extrabold font-mono text-rose-500">{favoriteTools.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recent Operations</span>
                <p className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">{historyTools.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Platform Tools</span>
                <p className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{TOOLS_REGISTRY.length}+</p>
              </div>
            </div>

            {/* Favorite tools preview */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Pinned Favorites
                </h3>
                <Link href="/favorites" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {favoriteTools.slice(0, 4).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: FAVORITES */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* TAB: HISTORY */}
        {activeTab === "history" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {historyTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DashboardPage;
