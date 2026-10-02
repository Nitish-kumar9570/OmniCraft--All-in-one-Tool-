import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { ShieldAlert, ChevronRight, AlertCircle, Calculator, HeartPulse, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Informational Notice | OmniCraft",
  description:
    "OmniCraft usage disclaimer regarding financial calculations, health indexes, developer utilities, and third-party services.",
  alternates: {
    canonical: getCanonicalUrl("/disclaimer"),
  },
  openGraph: {
    title: "Disclaimer & Informational Notice | OmniCraft",
    description: "OmniCraft usage disclaimer regarding calculations and utilities.",
    url: getCanonicalUrl("/disclaimer"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Disclaimer & Informational Notice",
    description: "OmniCraft platform disclaimer regarding calculators and utilities.",
    url: getCanonicalUrl("/disclaimer"),
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">Disclaimer</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Legal & Operational Notice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: August 2026 • Effective for all tools and services on OmniCraft
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              1. General Informational Purpose
            </h2>
            <p>
              All utilities, converters, calculators, generators, and documentation provided on OmniCraft (accessible at {siteConfig.url}) are offered solely for general educational, personal, and informational purposes. While we strive to maintain the highest standard of mathematical and algorithmic precision, tools are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              2. Financial & Calculation Disclaimer
            </h2>
            <p>
              Calculators such as the EMI Calculator, Compound Interest Calculator, Percentage Calculator, and Currency Converter provide mathematical approximations based on user inputs and standard formulas.
            </p>
            <p>
              These computations do not account for institution-specific loan origination fees, compounding schedule variations, municipal taxes, fluctuating foreign exchange spreads, or legal lending stipulations. Nothing on OmniCraft constitutes certified banking, accounting, tax, or investment advisory. Always consult a licensed certified financial advisor (CFA) or accountant before making financial decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              3. Health & Fitness Calculations Disclaimer
            </h2>
            <p>
              The Body Mass Index (BMI) Calculator and related health utilities are mathematical screenings based on standard World Health Organization (WHO) statistical categories. BMI does not evaluate body composition, muscle density, bone structure, or pediatric health variations.
            </p>
            <p>
              Results are strictly informational and are never a substitute for clinical medical advice, professional diagnosis, or personalized dietary consultation by a qualified physician.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-500" />
              4. Developer & Cryptographic Tools Disclaimer
            </h2>
            <p>
              Developer utilities (including JSON Formatters, JWT Decoders, Base64 Encoders, Hash Generators, and SQL Converters) process input client-side using browser JavaScript engines. Users are responsible for verifying generated code, regex patterns, and cryptographic tokens before deploying them to mission-critical or commercial production systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Advertising & External Links
            </h2>
            <p>
              OmniCraft may display third-party advertisements served by Google AdSense or external advertising networks. OmniCraft does not endorse, guarantee, or assume responsibility for products, claims, or services advertised on external sites linked from our platform.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Questions Regarding This Notice
            </h2>
            <p>
              For inquiries or clarifications regarding these terms, please contact our support team at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
