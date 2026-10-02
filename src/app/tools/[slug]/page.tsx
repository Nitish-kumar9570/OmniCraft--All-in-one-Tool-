import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { AdBanner } from "@/components/ads/AdBanner";
import { getToolBySlug, TOOLS_REGISTRY } from "@/tools/registry";
import { TOOL_CATEGORIES } from "@/tools/categories";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found — OmniCraft" };

  const rawTitle = tool.seoTitle || `${tool.name} — Free Online Tool`;
  const pageTitle = rawTitle.includes("OmniCraft") ? rawTitle : `${rawTitle} | OmniCraft`;
  const pageDescription = tool.seoDescription || tool.description;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: getCanonicalUrl(`/tools/${tool.slug}`),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: getCanonicalUrl(`/tools/${tool.slug}`),
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function IndividualToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = TOOL_CATEGORIES[tool.category];
  const toolCanonicalUrl = getCanonicalUrl(`/tools/${tool.slug}`);

  // 1. WebApplication Schema
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: toolCanonicalUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires HTML5 Canvas and JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: tool.features,
  };

  // 2. BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: getCanonicalUrl("/tools") },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name || tool.category,
        item: getCanonicalUrl(`/categories/${category?.slug || tool.category}`),
      },
      { "@type": "ListItem", position: 4, name: tool.name, item: toolCanonicalUrl },
    ],
  };

  // 3. FAQ Schema (ONLY where genuine FAQ items exist)
  const faqJsonLd =
    tool.faq && tool.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // 4. HowTo Schema (ONLY where genuine step-by-step instructions exist)
  const howToJsonLd =
    tool.howToUse && tool.howToUse.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to use ${tool.name}`,
          description: `Step-by-step guide for using ${tool.name} online for free.`,
          step: tool.howToUse.map((step) => ({
            "@type": "HowToStep",
            position: step.step,
            name: step.title,
            text: step.description,
          })),
        }
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#070b14]">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1">
        <ToolShell tool={tool}>
          <ToolRenderer slug={tool.slug} componentName={tool.componentName} />
          <AdBanner slotType="tool-bottom" className="mt-8" />
        </ToolShell>
      </main>

      <Footer />
    </div>
  );
}
