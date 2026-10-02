import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdBanner } from "@/components/ads/AdBanner";
import { TOOL_CATEGORIES, CATEGORY_LIST } from "@/tools/categories";
import { getToolsByCategory } from "@/tools/registry";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { ChevronRight, Layers } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_LIST.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = Object.values(TOOL_CATEGORIES).find((c) => c.slug === slug || c.id === slug);
  if (!category) return { title: "Category Not Found — OmniCraft" };

  return {
    title: `${category.name} Tools (Free & 100% Private) | OmniCraft`,
    description: `${category.description} Run high-performance ${category.name} online utilities directly in your browser with zero paywalls and zero file uploads.`,
    alternates: {
      canonical: getCanonicalUrl(`/categories/${category.slug}`),
    },
    openGraph: {
      title: `${category.name} Online Tools | OmniCraft`,
      description: category.description,
      url: getCanonicalUrl(`/categories/${category.slug}`),
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: `${category.name} Tools`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Tools | OmniCraft`,
      description: category.description,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = Object.values(TOOL_CATEGORIES).find((c) => c.slug === slug || c.id === slug);
  if (!category) notFound();

  const tools = getToolsByCategory(category.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Tools`,
    description: category.description,
    url: getCanonicalUrl(`/categories/${category.slug}`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((t, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getCanonicalUrl(`/tools/${t.slug}`),
        name: t.name,
        description: t.description,
      })),
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Categories", item: getCanonicalUrl("/categories") },
      { "@type": "ListItem", position: 3, name: category.name, item: getCanonicalUrl(`/categories/${category.slug}`) },
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <Link href="/categories" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-bold">{category.name}</span>
        </nav>

        {/* Category Hero */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl shadow-lg dark:shadow-xl">
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#090e1a]/60 select-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Category Overview</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              {tools.length} utilities
            </span>
          </div>

          <div className="p-8 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {category.name} Tools
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {category.description} Every tool executes client-side with 100% data confidentiality and zero delay.
            </p>
          </div>
        </div>

        <AdBanner slotType="in-content" />

        {/* Tools List */}
        <section aria-label={`${category.name} tools list`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
