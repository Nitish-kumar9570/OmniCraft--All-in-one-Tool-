import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { ToolCard } from "@/components/tools/ToolCard";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { BLOG_ARTICLES, getBlogArticleBySlug } from "@/lib/blogData";
import { getToolBySlug } from "@/tools/registry";
import { ToolDefinition } from "@/tools/types";
import { ArrowLeft, Clock, Calendar, User, ChevronRight, Sparkles, Wrench } from "lucide-react";
import type { Metadata } from "next";

interface BlogArticleProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) return { title: "Article Not Found — OmniCraft" };

  return {
    title: `${article.title} | OmniCraft Engineering`,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: {
      canonical: getCanonicalUrl(`/blog/${article.slug}`),
    },
    openGraph: {
      title: `${article.title} | OmniCraft Engineering`,
      description: article.excerpt,
      url: getCanonicalUrl(`/blog/${article.slug}`),
      siteName: siteConfig.name,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author.name],
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | OmniCraft Engineering`,
      description: article.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) notFound();

  const relatedTools: ToolDefinition[] = article.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolDefinition => Boolean(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    url: getCanonicalUrl(`/blog/${article.slug}`),
    mainEntityOfPage: getCanonicalUrl(`/blog/${article.slug}`),
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon-512.png`,
      },
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: getCanonicalUrl("/blog") },
      { "@type": "ListItem", position: 3, name: article.title, item: getCanonicalUrl(`/blog/${article.slug}`) },
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

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>

        {/* Header Title & Author Metadata */}
        <header className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{article.author.name}</strong> ({article.author.role})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.datePublished}>{article.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            {article.content.intro}
          </p>

          <AdBanner slotType="in-content" />

          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {sec.heading}
              </h2>
              {sec.body.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}
              {sec.tip && (
                <aside className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-500 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 my-3">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Pro Tip
                  </span>
                  <p>{sec.tip}</p>
                </aside>
              )}
            </section>
          ))}

          <section className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Summary &amp; Takeaways</h2>
            <p>{article.content.conclusion}</p>
          </section>
        </article>

        {/* Related Tools Internal Linking */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Featured Tools Mentioned in This Guide
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
