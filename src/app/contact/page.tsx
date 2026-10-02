import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { MessageSquare, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Support | OmniCraft",
  description:
    "Get in touch with the OmniCraft team for tool suggestions, technical support, bug reports, and partnership inquiries.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact & Support | OmniCraft",
    description: "Contact the OmniCraft engineering and support team.",
    url: getCanonicalUrl("/contact"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact OmniCraft",
    description: "Contact and support page for OmniCraft tools platform.",
    url: getCanonicalUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contactEmail,
        availableLanguage: ["English"],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070b14] bg-dev-dots sm:bg-fixed text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold">Contact &amp; Support</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Contact &amp; Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a tool suggestion, found a bug, or have questions about our client-side architecture? Drop us a line below.
          </p>
        </div>

        {/* Interactive Form Component */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
