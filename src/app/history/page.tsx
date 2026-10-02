"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolCard } from "@/components/tools/ToolCard";
import { useHistory } from "@/hooks/useHistory";
import { getToolBySlug } from "@/tools/registry";
import { ToolDefinition } from "@/tools/types";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HistoryPage() {
  const { history, clearHistory } = useHistory();

  const historyTools: ToolDefinition[] = history
    .map((item) => getToolBySlug(item.toolId))
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" /> Activity History
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recently Used Tools
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Quickly resume your recent tasks and calculations
            </p>
          </div>

          {historyTools.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={clearHistory}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear History
            </Button>
          )}
        </div>

        {historyTools.length === 0 ? (
          <div className="p-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
            <Clock className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No recent activity yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              As you compress PDFs, format JSON, resize images, or use calculators, your recently accessed tools will appear here.
            </p>
            <div className="pt-2">
              <Link href="/tools">
                <Button variant="gradient" size="sm">
                  Start Using Tools
                </Button>
              </Link>
            </div>
          </div>
        ) : (
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

export default HistoryPage;
