import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { TOOLS_REGISTRY } from "@/tools/registry";
import { CATEGORY_LIST } from "@/tools/categories";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Heart,
  ArrowRight,
  ChevronRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OmniCraft | Fast, Private, Free Online Tools",
  description:
    "Learn about OmniCraft's mission to provide 240+ production-grade, 100% client-side digital utilities with zero paywalls, zero file uploads, and unmatched speed.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  openGraph: {
    title: "About OmniCraft | Fast, Private, Free Online Tools",
    description: "OmniCraft provides 240+ production utilities with 100% browser-based privacy.",
    url: getCanonicalUrl("/about"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About OmniCraft",
    description: "Overview of OmniCraft platform architecture, mission, and engineering philosophy.",
    url: getCanonicalUrl("/about"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon-512.png`,
      sameAs: [siteConfig.social.github, siteConfig.social.twitter],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: siteConfig.contactEmail,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">About</span>
        </nav>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>The OmniCraft Story &amp; Engineering Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Every tool you need.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              One place.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            OmniCraft was engineered to replace the fragmented, ad-cluttered, paywalled utility web with a unified, lightning-fast, and privacy-respecting studio.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-center space-y-1 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black font-mono text-indigo-600 dark:text-indigo-400">{TOOLS_REGISTRY.length}+</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Utilities</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-center space-y-1 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black font-mono text-purple-600 dark:text-purple-400">{CATEGORY_LIST.length}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Domains Covered</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-center space-y-1 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">100%</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Free To Use</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-center space-y-1 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black font-mono text-cyan-600 dark:text-cyan-400">0 KB</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Server File Storage</p>
          </div>
        </div>

        {/* Narrative & Core Principles */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Why We Built OmniCraft
            </h2>
            <p>
              Like many developers, designers, students, and professionals, our team was exhausted by the state of online tools. Need to compress a PDF? You find a site that forces you to wait through a 60-second countdown timer. Need to format a JSON snippet or decode a JWT? You must risk pasting confidential company data into an unverified remote server that logs every keystroke.
            </p>
            <p>
              We built OmniCraft to prove that digital utilities can be clean, fast, beautiful, and completely respectful of your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Four Architectural Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span>1. Local-First Browser Execution</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  By utilizing modern web capabilities—including WebAssembly, Web Crypto API, HTML5 Canvas, and Web Workers—computation happens entirely on your machine. Your documents never travel across the internet.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span>2. Instant Zero-Queue Performance</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Because execution does not rely on overloaded shared cloud queues, tasks complete instantaneously with the full hardware acceleration of your local CPU and GPU.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>3. No Paywalls or Mandatory Accounts</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every single tool across all 17 categories is 100% free with full functionality. No email gates, no credit card prompts, and no tier limitations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0f172a]/70 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span>4. Rigorous Mathematical Calibration</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every converter, calculator, and formatting engine is unit-tested against RFC standards (RFC 7519 for JWT, RFC 4122 for UUID, RFC 4648 for Base64) to ensure absolute precision.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Open Communication &amp; Community Feedback
            </h2>
            <p>
              OmniCraft is constantly evolving. If there is a digital utility or format converter you need in your daily routine, our team builds new tools every week based on user suggestions. Reach out via our{" "}
              <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                Contact &amp; Support page
              </Link>{" "}
              or trigger the &ldquo;Let&apos;s talk&rdquo; widget in our footer.
            </p>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-950/40 dark:to-slate-900/60 border border-indigo-200/80 dark:border-white/10 text-center space-y-4">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Ready to explore our full toolkit?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Browse 240+ specialized tools across 17 domains, or jump directly into our categorized catalog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/tools">
              <Button variant="gradient" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Tools
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="md">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
