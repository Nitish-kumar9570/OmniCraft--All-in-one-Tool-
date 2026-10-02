import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdBanner } from "@/components/ads/AdBanner";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LIST } from "@/tools/categories";
import { getPopularTools, getNewTools, TOOLS_REGISTRY } from "@/tools/registry";
import { QuickActionsBar } from "@/components/home/QuickActionsBar";
import { TaskBasedDiscovery } from "@/components/home/TaskBasedDiscovery";
import { UniversalFileDrop } from "@/components/home/UniversalFileDrop";
import { LocalRecommendations } from "@/components/home/LocalRecommendations";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HomeFaqAccordion, FaqItem } from "@/components/home/HomeFaqAccordion";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Lock,
  Layers,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniCraft — Every Tool You Need. One Place. | 240+ Free Online Utilities",
  description:
    "High-performance PDF, image, converter, calculator, developer, security, and text utilities — built with 100% client-side privacy, instant speed, and zero paywalls.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    title: "OmniCraft — Every Tool You Need. One Place.",
    description:
      "High-performance PDF, image, converter, calculator, developer, security, and text utilities — built with 100% client-side privacy.",
    url: getCanonicalUrl("/"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "OmniCraft Tools Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCraft — Every Tool You Need. One Place.",
    description: "240+ free online tools with 100% browser-based privacy.",
  },
};

const POPULAR_SEARCH_PILLS = [
  { label: "Compress PDF", slug: "pdf-compress" },
  { label: "Image Compressor", slug: "image-compressor" },
  { label: "JSON Formatter", slug: "json-formatter" },
  { label: "JSON to TypeScript", slug: "json-to-typescript" },
  { label: "WiFi QR Code", slug: "wifi-qr-generator" },
  { label: "Password Generator", slug: "password-generator" },
  { label: "WebP Converter", slug: "image-converter" },
  { label: "Clean Whitespace", slug: "clean-whitespace" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Is OmniCraft completely free to use?",
    a: "Yes, OmniCraft is 100% free to use. There are no hidden subscription tiers, paywalls, or feature gates. Every tool across all 17 categories is accessible with full functionality.",
  },
  {
    q: "Are my uploaded files and private data secure?",
    a: "Absolutely. The vast majority of our utilities run 100% client-side inside your web browser using HTML5 APIs, Canvas, and WebAssembly. Your files, text, images, and documents never leave your computer or get uploaded to our servers.",
  },
  {
    q: "What types of tools are available on OmniCraft?",
    a: "OmniCraft provides 240+ specialized utilities spanning PDF manipulation, Image processing, Converters, Calculators, Developer tools, SEO, AI utilities, Security, and Text formatting.",
  },
  {
    q: "What does the '🔒 100% Client-Side' badge mean?",
    a: "The client-side badge guarantees that computation happens strictly within your local browser engine. Even if you disconnect your internet connection after opening the page, the tool will continue to process your files securely offline.",
  },
  {
    q: "Do I need to create an account or sign in to use tools?",
    a: "No account registration is required. You can immediately access and run any tool or download output without providing an email address or credit card.",
  },
  {
    q: "Can I use OmniCraft on mobile phones and tablets?",
    a: "Yes! Every single tool in OmniCraft is engineered with a fully responsive, touch-friendly interface for seamless usage on iOS and Android devices.",
  },
  {
    q: "What PDF tools are included in OmniCraft?",
    a: "OmniCraft includes PDF Merge, PDF Split, PDF Compression, PDF Page Deleter, PDF Page Extractor, PDF to Text Converter, Image-to-PDF Builder, PDF Metadata Editor, Watermark Stamper, and Header/Footer Page Numbering.",
  },
  {
    q: "How does the Universal File Drop work?",
    a: "You can drag and drop any file onto the homepage or click 'Choose File'. Our client-side engine inspects the file header, dimensions, page count, and format locally to automatically recommend compatible tools.",
  },
  {
    q: "How does the Image Compressor reduce file size without losing quality?",
    a: "Our image compressor uses browser canvas quantization algorithms to strip redundant metadata, optimize chroma subsampling, and re-encode JPG/PNG/WebP files while preserving visual sharpness.",
  },
  {
    q: "Can I generate WiFi and vCard QR codes for commercial use?",
    a: "Yes. All QR codes and Barcodes generated on OmniCraft are high-resolution, standards-compliant (vCard 3.0, WPA2 WiFi, EAN-13, CODE-128) and free for commercial print and digital distribution.",
  },
  {
    q: "Are the AI-powered tools free to use?",
    a: "Yes! Our AI tools, including AI Text Summarizer, AI Grammar Fixer, AI Paraphraser, AI Email Writer, and AI SQL Generator, are available without mandatory token subscriptions or API keys.",
  },
  {
    q: "Does OmniCraft store or log my passwords and API keys?",
    a: "Never. Passwords and cryptographic tokens created with our Password Generator, Hash Generator, and Secret Scanner are generated ephemerally in volatile memory and are zeroed out as soon as you close or refresh the tab.",
  },
  {
    q: "What happens to my data in the Workspace?",
    a: "The digital Workspace saves items only in your browser's persistent localStorage or session memory. No data is synchronized or uploaded to remote databases without your explicit command.",
  },
  {
    q: "Can I bookmark my favorite tools for quick access?",
    a: "Yes. Simply click the heart/star icon on any tool card to save it to your Favorites bar. Favorites are stored locally in your browser's persistent storage.",
  },
  {
    q: "How frequently are new tools added to OmniCraft?",
    a: "We continuously deploy new tools, format converters, and developer utilities weekly. All updates are automatically available on the platform without requiring app updates.",
  },
];

export default function HomePage() {
  const popularTools = getPopularTools(8);
  const newTools = getNewTools(4);

  // Schema.org WebSite JSON-LD with Sitelinks Searchbox
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "OmniCraft Tools",
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Schema.org Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    sameAs: [siteConfig.social.github, siteConfig.social.twitter],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contactEmail,
    },
  };

  // Schema.org FAQPage JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300 relative overflow-x-clip">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Ambient Glowing Background Orbs */}
      <div className="glow-orb-indigo top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-70 pointer-events-none z-0" />
      <div className="glow-orb-purple top-1/3 -right-20 opacity-50 pointer-events-none z-0" />
      <div className="glow-orb-cyan bottom-1/4 -left-20 opacity-40 pointer-events-none z-0" />

      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 overflow-x-clip">
        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
          {/* SaaS Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50/90 dark:bg-white/[0.08] backdrop-blur-xl text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-white/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>OmniCraft Studio</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span>{TOOLS_REGISTRY.length}+ Production Digital Utilities</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Every tool you need.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              One place.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            High-performance PDF, image, converter, calculator, developer, security, and text utilities — built with 100% client-side privacy and instant speed.
          </p>

          {/* 2. Large Hero Search Box */}
          <HeroSearch />

          {/* Popular Searches Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1 text-[11px]">Popular:</span>
            {POPULAR_SEARCH_PILLS.map((pill) => (
              <Link
                key={pill.slug}
                href={`/tools/${pill.slug}`}
                className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 shadow-xs"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* Quick Actions Bar */}
          <QuickActionsBar />
        </div>
      </section>

      {/* 3. Task-Based Intent Discovery ("What are you trying to accomplish?") */}
      <TaskBasedDiscovery />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdBanner slotType="in-content" />
      </div>

      {/* 4. Popular Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" /> Top Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Popular Tools
            </h2>
          </div>
          <Link href="/tools" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
            <span>Browse All {TOOLS_REGISTRY.length}+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 5. Browse by Category Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explore specialized toolkits tailored for creators, developers, students, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORY_LIST.map((cat) => {
              const count = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 select-none shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.06] text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/70 border border-slate-200/50 dark:border-white/[0.05] transition-colors duration-200">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/[0.05]">
                      {count > 0 ? `${count} tools` : "Active"}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Universal File Drop ("Drop a file — discover what you can do") */}
      <div id="universal-drop">
        <UniversalFileDrop />
      </div>

      {/* 7. Local Recommendations & Fresh Releases */}
      <LocalRecommendations />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Fresh Releases
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recently Added Tools
            </h2>
          </div>
          <Link href="/tools?sort=new" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All New
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 8. 6-Card Feature Grid: Built for speed, privacy and simplicity */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-[#070c18]/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Engineered for Developers &amp; Creators
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Built for speed, privacy and simplicity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every utility is built from the ground up using modern browser architectures, WebAssembly, and zero tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your files, text, and secrets are processed entirely in your browser memory and never uploaded to remote servers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-indigo-100/80 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Instant Hardware Acceleration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Powered by WebAssembly, Web Audio API, and HTML5 Canvas engines with zero queue times or processing lag.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-purple-100/80 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Touch &amp; Mobile Optimized
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Clean responsive layouts, accessible 44px+ touch targets, and mobile clipboard integration on iOS and Android.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-cyan-100/80 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                17 Specialized Categories
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                From PDF workflows and Image manipulation to Cryptography, SEO, and AI drafting in a single platform.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-amber-100/80 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Sign-Up or Paywalls
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No mandatory accounts, no captcha loops, and no usage limits. Every tool is immediately ready to run.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c1322]/65 backdrop-blur-xl space-y-3 shadow-xs hover:border-indigo-500/30 transition-all">
              <div className="p-3 w-fit rounded-2xl bg-rose-100/80 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Local History &amp; Favorites
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pin frequently used tools to your workspace and access your recent conversion history stored safely in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 15-Question FAQ Section */}
      <HomeFaqAccordion items={FAQ_ITEMS} />

      {/* 10. Bottom CTA & Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-950/20 border-t border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Stop searching across 20 different websites. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              OmniCraft has everything in one place.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bookmark OmniCraft and get instant access to {TOOLS_REGISTRY.length}+ free online utilities.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link href="/tools">
              <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All {TOOLS_REGISTRY.length}+ Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
