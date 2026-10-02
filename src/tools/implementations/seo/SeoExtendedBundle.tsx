"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  FileCode,
  Link as LinkIcon,
  Tag,
  Share2,
  Terminal,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Keyword Density Analyzer Tool
// ==========================================
export function KeywordDensityAnalyzerTool() {
  const [text, setText] = useState(
    "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic."
  );

  const getKeywordDensity = () => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const total = words.length || 1;
    const freq: Record<string, number> = {};
    words.forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });

    return Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const densities = getKeywordDensity();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Web Page Article Content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <h3 className="font-bold text-sm">Top Keywords by Frequency & Density</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {densities.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-center">
              <span className="font-bold text-xs truncate block">{item.word}</span>
              <span className="text-[10px] text-slate-400 block">{item.count} occurrences</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.density}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Canonical Tag & Hreflang Generator
// ==========================================
export function CanonicalTagGeneratorTool() {
  const [url, setUrl] = useState("https://omnicraft.dev/tools/pdf-merge");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const canonicalTag = `<link rel="canonical" href="${url.trim()}" />`;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Authoritative / Primary Page URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">HTML Header Tag</span>
          <button
            onClick={() => {
              copyToClipboard(canonicalTag);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Copied to clipboard!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Tag"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {canonicalTag}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 3. Apache .htaccess 301 Redirect Generator
// ==========================================
export function HtaccessRedirectGeneratorTool() {
  const [redirectType, setRedirectType] = useState<"page" | "https" | "www">("page");
  const [oldPath, setOldPath] = useState("/old-page.html");
  const [newUrl, setNewUrl] = useState("https://omnicraft.dev/new-page");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getCode = () => {
    if (redirectType === "page") {
      return `RewriteEngine On\nRedirect 301 ${oldPath} ${newUrl}`;
    }
    if (redirectType === "https") {
      return `RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
    }
    return `RewriteEngine On\nRewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]\nRewriteRule ^(.*)$ https://%1/$1 [R=301,L]`;
  };

  const code = getCode();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: "page", label: "Single Page 301" },
          { id: "https", label: "Force HTTPS" },
          { id: "www", label: "Strip WWW" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setRedirectType(t.id as any)}
            className={`p-2.5 rounded-xl border text-xs font-bold ${
              redirectType === t.id ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" : "border-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {redirectType === "page" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1">Old Relative Path</label>
            <input
              type="text"
              value={oldPath}
              onChange={(e) => setOldPath(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">New Target URL</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
        </div>
      )}

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">.htaccess Rules</span>
          <button
            onClick={() => {
              copyToClipboard(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Copied to clipboard!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Rules"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {code}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 4. UTM Campaign URL Builder
// ==========================================
export function UtmBuilderTool() {
  const [website, setWebsite] = useState("https://omnicraft.dev/pricing");
  const [source, setSource] = useState("twitter");
  const [medium, setMedium] = useState("social");
  const [campaign, setCampaign] = useState("summer_launch_2026");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const utmUrl = `${website.trim()}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1">Website URL</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold block mb-1">Campaign Source (utm_source)</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Campaign Medium (utm_medium)</label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Campaign Name (utm_campaign)</label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Trackable UTM URL</span>
          <button
            onClick={() => {
              copyToClipboard(utmUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Trackable link copied!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs break-all">
          {utmUrl}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 5. Schema.org Article / BlogPosting Generator
// ==========================================
export function SchemaArticleTool() {
  const [headline, setHeadline] = useState("Top 10 Modern Web Development Practices in 2026");
  const [author, setAuthor] = useState("Alex Rivers");
  const [date, setDate] = useState("2026-09-01");
  const [image, setImage] = useState("https://omnicraft.dev/og-banner.png");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline,
      image: [image],
      datePublished: date,
      dateModified: date,
      author: {
        "@type": "Person",
        name: author,
      },
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Article Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Author Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">JSON-LD Structured Data</span>
          <button
            onClick={() => {
              copyToClipboard(jsonLd);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Schema JSON-LD copied!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy JSON-LD"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {jsonLd}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 6. Schema.org Product / Offer Generator
// ==========================================
export function SchemaProductTool() {
  const [name, setName] = useState("Premium Developer Toolbox Pro");
  const [price, setPrice] = useState("29.99");
  const [currency, setCurrency] = useState("USD");
  const [rating, setRating] = useState("4.9");
  const [reviewCount, setReviewCount] = useState("128");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      name,
      offers: {
        "@type": "Offer",
        priceCurrency: currency,
        price,
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount,
      },
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Product Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Rating (1 - 5)</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Product Schema JSON-LD</span>
          <button
            onClick={() => {
              copyToClipboard(jsonLd);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Schema copied!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy JSON-LD"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {jsonLd}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 7. Robots.txt Syntax Validator
// ==========================================
export function RobotsValidatorTool() {
  const [content, setContent] = useState(
    "User-agent: *\nDisallow: /admin/\nDisallow: /api/private/\nAllow: /\n\nSitemap: https://omnicraft.dev/sitemap.xml"
  );
  const [validation, setValidation] = useState<{ valid: boolean; issues: string[] }>({ valid: true, issues: [] });

  const handleValidate = () => {
    const lines = content.split("\n");
    const issues: string[] = [];
    let hasUserAgent = false;

    lines.forEach((l, idx) => {
      const line = l.trim();
      if (!line || line.startsWith("#")) return;
      if (line.toLowerCase().startsWith("user-agent:")) hasUserAgent = true;
      else if (
        !line.toLowerCase().startsWith("disallow:") &&
        !line.toLowerCase().startsWith("allow:") &&
        !line.toLowerCase().startsWith("sitemap:") &&
        !line.toLowerCase().startsWith("crawl-delay:")
      ) {
        issues.push(`Line ${idx + 1}: Unrecognized directive "${line}"`);
      }
    });

    if (!hasUserAgent) issues.push("Missing required 'User-agent:' declaration");
    setValidation({ valid: issues.length === 0, issues });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Robots.txt Directives</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={7}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleValidate}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
      >
        Validate Syntax
      </button>

      <div className={`p-4 rounded-2xl border ${validation.valid ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300" : "bg-rose-50 dark:bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"} text-xs space-y-1`}>
        <span className="font-bold block">{validation.valid ? "✓ Robots.txt syntax is valid!" : "⚠ Syntax errors detected:"}</span>
        {validation.issues.map((err, i) => (
          <p key={i}>• {err}</p>
        ))}
      </div>
    </div>
  );
}
