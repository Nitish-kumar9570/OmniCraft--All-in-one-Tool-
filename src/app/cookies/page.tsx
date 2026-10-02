import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { CookieClearButton } from "@/components/privacy/CookieClearButton";
import { Cookie, ShieldCheck, ChevronRight, Settings2, Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy & Local Storage Preferences | OmniCraft",
  description:
    "OmniCraft Cookie Policy. Detailed information on essential client-side storage, advertising cookies, and how to manage your preferences.",
  alternates: {
    canonical: getCanonicalUrl("/cookies"),
  },
  openGraph: {
    title: "Cookie Policy | OmniCraft",
    description: "OmniCraft Cookie Policy and local storage transparency.",
    url: getCanonicalUrl("/cookies"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function CookiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cookie Policy",
    description: "OmniCraft Cookie Policy and Local Storage Preferences",
    url: getCanonicalUrl("/cookies"),
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
          <span className="text-slate-900 dark:text-white font-semibold">Cookie Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <Cookie className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Transparency &amp; Storage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Cookie &amp; Storage Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: August 2026 • Effective across {siteConfig.name}
          </p>
        </div>

        {/* Policy Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are tiny text files placed onto your computing device by websites you visit. Similar client-side technologies—such as <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-xs">localStorage</code> and <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-xs">sessionStorage</code>—allow web applications to retain user preferences and active state locally within your browser without transmitting them across the network with every HTTP request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              How OmniCraft Uses Client Storage
            </h2>
            <p>
              OmniCraft relies predominantly on client-side <code className="font-mono text-xs">localStorage</code> to give you a personalized workflow without requiring account sign-in:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-900 dark:text-white font-bold">
                  <tr>
                    <th className="p-3">Key / Cookie</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">omnicraft_theme</td>
                    <td className="p-3">Essential LocalStorage</td>
                    <td className="p-3">Remembers your dark mode / light mode visual preference</td>
                    <td className="p-3">Persistent until cleared</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">omnicraft_favorites</td>
                    <td className="p-3">Functional LocalStorage</td>
                    <td className="p-3">Stores the list of tools you have pinned to Favorites</td>
                    <td className="p-3">Persistent until cleared</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">omnicraft_history</td>
                    <td className="p-3">Functional LocalStorage</td>
                    <td className="p-3">Saves recent tool activity for quick resumption</td>
                    <td className="p-3">Persistent until cleared</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">omnicraft_cookie_consent</td>
                    <td className="p-3">Essential LocalStorage</td>
                    <td className="p-3">Remembers your cookie and tracking consent choice</td>
                    <td className="p-3">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Third-Party Advertising Cookies (Google AdSense)
            </h2>
            <p>
              When advertisements are enabled, Google and third-party advertising vendors use cookies (including the DoubleClick DART cookie) to serve ads based on your prior visits to OmniCraft and other sites on the Internet.
            </p>
            <p>
              These cookies help display ads relevant to your interests and prevent the same ad from repeatedly appearing. You can opt out of personalized Google advertising at any time by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-bold"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              How to Control and Delete Browser Cookies
            </h2>
            <p>
              All modern web browsers allow you to manage and erase stored cookies and site data:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Chrome:</strong> Settings → Privacy and security → Third-party cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data.</li>
              <li><strong>Apple Safari:</strong> Settings → Safari → Advanced → Privacy → Block All Cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies.</li>
            </ul>
          </section>

          {/* Interactive Clear Storage Widget */}
          <section className="pt-2">
            <CookieClearButton />
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/10">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Questions &amp; Contact
            </h2>
            <p>
              If you have any questions regarding our storage policies or compliance, contact us at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
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
