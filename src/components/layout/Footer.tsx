"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";
import { CATEGORY_LIST } from "@/tools/categories";
import { LetsTalkModal } from "@/components/feedback/LetsTalkModal";
import { MessageSquare, Sparkles } from "lucide-react";

export function Footer() {
  const [isLetsTalkOpen, setIsLetsTalkOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#070b14] text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10">
          {/* Let's Talk Hero Banner Section */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/60 border border-indigo-200/80 dark:border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-pink-500/10 dark:bg-purple-500/20 blur-3xl pointer-events-none" />

            <div className="space-y-2 text-center md:text-left relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-700/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Feedback & Tool Suggestions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Have an idea or feedback? <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Let&apos;s talk</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We build tools driven by your workflows. Tell us what utilities you need next, report an issue, or share your thoughts with our team.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                type="button"
                onClick={() => setIsLetsTalkOpen(true)}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 transition-transform group-hover:rotate-6" />
                <span>Let&apos;s talk</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
              </button>
            </div>
          </div>

          {/* Footer Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Col 1: Brand */}
            <div className="col-span-2 space-y-4">
              <OmniCraftLogo size="md" />
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                Every tool you need. One place. Fast, privacy-focused, browser-powered utilities for PDF, image, developer, conversion, and calculation workflows.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                🔒 100% Client-side processing where possible. Your files never touch a server unless necessary.
              </p>
            </div>

            {/* Col 2: Top Categories */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Top Categories
              </h4>
              <ul className="space-y-2">
                {CATEGORY_LIST.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/categories/${cat.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Popular Tools */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Popular Tools
              </h4>
              <ul className="space-y-2">
                <li><Link href="/tools/pdf-merge" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">PDF Merge</Link></li>
                <li><Link href="/tools/image-compressor" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Image Compressor</Link></li>
                <li><Link href="/tools/qr-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">QR Code Generator</Link></li>
                <li><Link href="/tools/json-formatter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">JSON Formatter</Link></li>
                <li><Link href="/tools/currency-converter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Live Currency</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Password Generator</Link></li>
              </ul>
            </div>

            {/* Col 4: Platform & Feedback */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Company & Feedback
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsLetsTalkOpen(true)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-medium text-indigo-600 dark:text-indigo-400"
                  >
                    <span>Let&apos;s talk</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950 text-[10px] font-bold">
                      Feedback
                    </span>
                  </button>
                </li>
                <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About OmniCraft</Link></li>
                <li><Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Engineering Blog</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact & Support</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} OmniCraft. Every tool you need. One place.</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsLetsTalkOpen(true)}
                className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Let&apos;s talk
              </button>
              <Link href="/privacy" className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</Link>
              <Link href="/disclaimer" className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/sitemap.xml" className="hover:underline hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Let's Talk Feedback Modal */}
      <LetsTalkModal
        isOpen={isLetsTalkOpen}
        onClose={() => setIsLetsTalkOpen(false)}
      />
    </>
  );
}
