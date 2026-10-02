import React, { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Free Online Tools (240+ Browser Utilities) | OmniCraft",
  description:
    "Explore 240+ instant browser tools across 17 specialized categories: PDF editor, image compressor, format converters, calculators, developer utilities, and security.",
  alternates: {
    canonical: getCanonicalUrl("/tools"),
  },
  openGraph: {
    title: "All Free Online Tools Directory | OmniCraft",
    description: "Explore 240+ free, client-side digital utilities across 17 categories.",
    url: getCanonicalUrl("/tools"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "OmniCraft Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free Online Tools Directory | OmniCraft",
    description: "Explore 240+ instant browser tools across 17 categories.",
  },
};

function ToolsLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-44 bg-slate-200/60 dark:bg-slate-800/60 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "OmniCraft Tools Directory",
    description: "Complete catalog of 240+ free client-side online tools and utilities.",
    url: getCanonicalUrl("/tools"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Suspense fallback={<ToolsLoadingSkeleton />}>
          <ToolsExplorer />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
