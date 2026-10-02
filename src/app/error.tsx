"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error internally without exposing details to UI
    console.error("Runtime error caught by boundary:", error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Something unexpected occurred
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while executing this tool. Your local data has not been compromised. You can retry the operation or return home.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="gradient"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="cursor-pointer"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
