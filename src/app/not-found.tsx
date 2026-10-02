import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Search, Home, ArrowRight, FileText, Image, QrCode, Braces } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | OmniCraft",
  description: "The page or tool you requested could not be found. Explore 240+ free browser utilities on OmniCraft.",
  robots: {
    index: false,
    follow: true,
  },
};

const SUGGESTED_TOOLS = [
  { name: "PDF Merge", slug: "pdf-merge", icon: FileText, desc: "Combine multiple PDF files instantly" },
  { name: "Image Compressor", slug: "image-compressor", icon: Image, desc: "Reduce photo size with zero quality loss" },
  { name: "QR Generator", slug: "qr-generator", icon: QrCode, desc: "Create customizable high-res QR codes" },
  { name: "JSON Formatter", slug: "json-formatter", icon: Braces, desc: "Format, validate, and minify JSON" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex flex-col items-center justify-center text-center space-y-10">
        {/* Error Badge */}
        <div className="space-y-4 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-xs">
            HTTP Error 404
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Page or Tool Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Try searching our directory below or browse our popular utilities.
          </p>
        </div>

        {/* Search Redirect Box */}
        <form
          action="/tools"
          method="GET"
          className="w-full max-w-lg mx-auto"
        >
          <div className="relative flex items-center p-2 rounded-2xl bg-white dark:bg-[#0c1322] border-2 border-slate-200/90 dark:border-white/10 shadow-lg focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 ml-3 shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search 240+ online tools..."
              className="w-full px-3 py-2 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <Button type="submit" variant="gradient" size="sm" className="shrink-0 px-4 rounded-xl cursor-pointer">
              Find Tool
            </Button>
          </div>
        </form>

        {/* Suggested Tools Grid */}
        <div className="w-full space-y-4 pt-4 text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">
            Popular Online Utilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUGGESTED_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/70 backdrop-blur-xl hover:border-indigo-500/50 hover:shadow-lg transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-white/[0.06] text-indigo-600 dark:text-indigo-400 w-fit mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Direct Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="gradient" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Back to Homepage
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Browse All Tools
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
