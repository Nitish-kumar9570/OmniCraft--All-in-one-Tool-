import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { CATEGORY_LIST } from "@/tools/categories";
import { TOOLS_REGISTRY } from "@/tools/registry";
import { Layers, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tool Categories (17 Specialized Toolkits) | OmniCraft",
  description:
    "Browse 240+ online utilities organized across 17 specialized domains: PDF editor, image compressor, format converters, calculators, developer formatters, and security.",
  alternates: {
    canonical: getCanonicalUrl("/categories"),
  },
  openGraph: {
    title: "Tool Categories (17 Specialized Toolkits) | OmniCraft",
    description: "Browse 240+ free online utilities organized across 17 specialized domains.",
    url: getCanonicalUrl("/categories"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tool Categories | OmniCraft",
    description: "Browse 240+ free online utilities across 17 specialized categories.",
  },
};

export default function CategoriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "OmniCraft Tool Categories",
    description: "Directory of 17 specialized online utility categories on OmniCraft.",
    url: getCanonicalUrl("/categories"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CATEGORY_LIST.map((cat, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getCanonicalUrl(`/categories/${cat.slug}`),
        name: cat.name,
      })),
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Categories", item: getCanonicalUrl("/categories") },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">Categories</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50/80 dark:bg-white/[0.08] backdrop-blur-xl text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-white/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>17 Specialized Domains</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore Toolkits by Category
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Find the right digital utility for your specific workflow, organized cleanly across 17 domains.
          </p>
        </div>

        <AdBanner slotType="in-content" />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_LIST.map((cat) => {
            const count = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.35)] hover:shadow-xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.06] text-indigo-600 dark:text-indigo-400 border border-slate-200/50 dark:border-white/[0.05] group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/70 transition-all duration-300">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/[0.05]">
                      {count > 0 ? `${count} tools` : "Active"}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline"
                  >
                    <span>Explore {cat.name} Toolkit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
