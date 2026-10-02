import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { BLOG_ARTICLES } from "@/lib/blogData";
import { ArrowRight, BookOpen, Clock, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Guides & Utility Tutorials | OmniCraft",
  description:
    "Practical engineering guides on PDF compression, image format optimization (JPG vs PNG vs WebP), and JSON Web Token (JWT) security architectures.",
  alternates: {
    canonical: getCanonicalUrl("/blog"),
  },
  openGraph: {
    title: "Engineering Guides & Utility Tutorials | OmniCraft",
    description: "In-depth engineering tutorials on web performance, document processing, and security.",
    url: getCanonicalUrl("/blog"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "OmniCraft Engineering Blog",
    description: "In-depth tutorials, architectural guides, and utility performance articles.",
    url: getCanonicalUrl("/blog"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_ARTICLES.map((art, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getCanonicalUrl(`/blog/${art.slug}`),
        name: art.title,
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">Blog &amp; Guides</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <BookOpen className="w-3.5 h-3.5" /> Engineering &amp; Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            OmniCraft Engineering Blog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tutorials, architectural deep dives, and practical productivity guides for modern developers.
          </p>
        </div>

        <AdBanner slotType="in-content" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/blog/${art.slug}`}
              className="group flex flex-col justify-between p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl shadow-xs hover:shadow-xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {art.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {art.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {art.readTime}
                </span>
                <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
