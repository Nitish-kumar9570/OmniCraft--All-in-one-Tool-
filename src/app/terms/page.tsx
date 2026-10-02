import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";
import { FileCheck, ShieldAlert, Scale, Ban, CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | OmniCraft",
  description:
    "OmniCraft Terms of Service and Acceptable Use Policy. Review terms governing our free online tools, user ownership, and disclaimers.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Service | OmniCraft",
    description: "OmniCraft Terms of Service and acceptable use conditions.",
    url: getCanonicalUrl("/terms"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description: "OmniCraft Terms of Service and Acceptable Use Policy",
    url: getCanonicalUrl("/terms"),
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
          <span className="text-slate-900 dark:text-white font-semibold">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: August 2026 • Please read these terms carefully before using {siteConfig.name}
          </p>
        </div>

        {/* Terms Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing any utility, calculator, converter, or feature on OmniCraft ({siteConfig.url}), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service, our{" "}
              <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                Privacy Policy
              </Link>
              , and our{" "}
              <Link href="/disclaimer" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                Disclaimer
              </Link>
              . If you do not agree to these terms, you must discontinue use immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              2. Permitted Use & Free Access
            </h2>
            <p>
              OmniCraft grants you a non-exclusive, revocable, non-transferable license to access and run all online utilities free of charge for lawful personal, educational, research, and commercial workflows. There are no compulsory subscriptions, software installations, or account registrations required to execute any tool.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Ban className="w-5 h-5 text-rose-500" />
              3. Acceptable Use Policy & Prohibited Conduct
            </h2>
            <p>
              You agree not to misuse OmniCraft or assist any third party in doing so. Specifically, you may not:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Launch automated Distributed Denial of Service (DDoS) attacks, automated rapid-fire request flooding, or brute force scripts against our infrastructure.</li>
              <li>Attempt to decompile, reverse-engineer, or circumvent security protections of our backend API endpoints.</li>
              <li>Transmit any malicious payloads, viruses, worms, or trojan horses through file upload inputs.</li>
              <li>Impersonate any individual, organization, or misrepresent your affiliation with OmniCraft.</li>
              <li>Frame, mirror, or repackage our utilities inside an iframe or wrapper for deceptive commercial resale without prior written authorization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              4. Intellectual Property & User Content Ownership
            </h2>
            <p>
              <strong>Your Data Remains 100% Yours:</strong> You retain complete, unrestricted ownership and copyright over all files, text, data, and documents you process through OmniCraft. We claim no intellectual property rights or ownership over your files or tool outputs.
            </p>
            <p>
              <strong>Platform IP:</strong> All OmniCraft logos, custom software code, visual designs, typography, brand assets, and documentation are the proprietary intellectual property of OmniCraft and protected by applicable copyright and international intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              5. Disclaimer of Warranties
            </h2>
            <p>
              OmniCraft is provided on an &ldquo;AS-IS&rdquo; and &ldquo;AS-AVAILABLE&rdquo; basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              We make no representations that our tools will be error-free, uninterrupted, or that converted files will satisfy specific third-party technical standards. You are advised to review and verify all calculation results, formatted code, and converted files before using them in mission-critical environments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, in no event shall OmniCraft, its maintainers, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including loss of profits, data corruption, business interruption, or computational inaccuracies) arising out of or related to your use of or inability to use our tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              7. Third-Party Advertising & External Links
            </h2>
            <p>
              OmniCraft may display third-party advertisements served by Google AdSense and link to external web pages. OmniCraft does not control and is not liable for the content, privacy policies, or commercial practices of third-party websites or services.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Contact & Inquiries
            </h2>
            <p>
              For legal inquiries, copyright notices, or questions regarding these Terms, please reach our administrative team at{" "}
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
