import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { ShieldCheck, Lock, Cookie, Server, Eye, FileText, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OmniCraft",
  description:
    "OmniCraft Privacy Policy. Learn about our 100% client-side privacy architecture, zero file storage guarantee, cookies, and Google AdSense compliance.",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | OmniCraft",
    description: "OmniCraft Privacy Policy. 100% client-side data privacy guarantee.",
    url: getCanonicalUrl("/privacy"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "OmniCraft privacy statement and data protection policy.",
    url: getCanonicalUrl("/privacy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: August 2026 • Effective immediately across {siteConfig.name}
          </p>
        </div>

        {/* Policy Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Introduction & Core Privacy Commitment
            </h2>
            <p>
              At OmniCraft ({siteConfig.url}), we consider privacy a fundamental human right. Unlike traditional utility platforms that upload user files to remote servers for processing and advertising profiling, OmniCraft is engineered from the ground up around a <strong>Client-Side First</strong> paradigm.
            </p>
            <p>
              This document clearly explains our operational practices, what data we collect (and what we deliberately do not collect), how cookies are managed, how Google AdSense operates on this site, and your rights under GDPR, CCPA, and global privacy standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              1. 100% Client-Side Processing Guarantee
            </h2>
            <p>
              Over 95% of the 240+ utilities on OmniCraft execute entirely within your web browser using HTML5 Canvas, WebAssembly (Wasm), Web Crypto API, and Web Workers. When you:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Compress, crop, or resize an image</li>
              <li>Merge, split, rotate, or watermark a PDF</li>
              <li>Format, validate, or convert JSON, XML, or CSV</li>
              <li>Generate cryptographic hashes, UUIDs, or passwords</li>
              <li>Calculate loans, interest, BMI, or percentage changes</li>
            </ul>
            <p>
              <strong>Your files, text, and inputs are never transmitted to our servers or any third-party infrastructure.</strong> All computation occurs in local device memory, and is wiped when you close or refresh the tab.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              2. Ephemeral Server-Assisted Utilities
            </h2>
            <p>
              A small number of specialized utilities (such as specific multi-engine conversions or optional AI drafting) may utilize server-assisted processing. In these rare instances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Payloads are processed strictly in volatile, ephemeral RAM.</li>
              <li>Data is automatically and permanently purged immediately upon transmission back to your browser.</li>
              <li>We never log, inspect, archive, or mine user document contents.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              3. Local Storage & Client Preferences
            </h2>
            <p>
              OmniCraft uses browser <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-xs">localStorage</code> to deliver personalization without requiring user accounts or passwords. We store:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><code className="font-mono text-indigo-600 dark:text-indigo-400">omnicraft_theme</code>: Remembers your preferred color theme (Light, Dark, or System Auto).</li>
              <li><code className="font-mono text-indigo-600 dark:text-indigo-400">omnicraft_favorites</code>: Stores tool IDs you have pinned to your Favorites shelf.</li>
              <li><code className="font-mono text-indigo-600 dark:text-indigo-400">omnicraft_history</code>: Records recently accessed tools for quick resume.</li>
              <li><code className="font-mono text-indigo-600 dark:text-indigo-400">omnicraft_cookie_consent</code>: Stores your cookie preference choices.</li>
            </ul>
            <p>
              This information is stored exclusively on your device. You can clear it anytime from your browser settings or via our <Link href="/cookies" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">Cookie Management page</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              4. Advertising & Google AdSense Compliance
            </h2>
            <p>
              To keep our tools 100% free for everyone without subscription paywalls, OmniCraft may display advertisements managed by Google AdSense and third-party advertising partners.
            </p>
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 space-y-2">
              <p className="font-semibold text-slate-900 dark:text-white">
                Google AdSense Required Privacy Disclosures:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to OmniCraft and other sites on the Internet.</li>
                <li>
                  Users may opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 underline font-bold"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 underline font-bold"
                  >
                    www.aboutads.info
                  </a>
                  .
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              5. Analytics & Anonymous Log Data
            </h2>
            <p>
              When you browse OmniCraft, standard web server logs and privacy-preserving analytics may aggregate non-personally identifiable technical information, including your IP address, browser type, operating system, referring URL, and page request timestamps. This data is used solely to monitor platform health, prevent DDoS abuse, and optimize asset delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. Your Rights Under GDPR & CCPA
            </h2>
            <p>
              Depending on your location (such as the European Economic Area or California), you may hold statutory rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right of Access & Deletion:</strong> Because OmniCraft does not store files or maintain user accounts, no personal document archives exist to delete. Any locally cached data can be cleared instantly via your browser.</li>
              <li><strong>Right to Opt Out of Sale:</strong> OmniCraft does not sell, rent, or trade your personal information.</li>
              <li><strong>Right to Non-Discrimination:</strong> You will never receive degraded service or feature limitations for exercising your privacy rights.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Contact Privacy Operations
            </h2>
            <p>
              If you have any questions, suggestions, or concerns regarding our privacy practices, please contact our Data Protection Officer at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                {siteConfig.contactEmail}
              </a>
              . We review and respond to inquiries within 48 business hours.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
