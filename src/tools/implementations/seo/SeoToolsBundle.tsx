"use client";

import React, { useState } from "react";
import { Search, Copy, Download, Globe, Code, FileText, Check, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. XML Sitemap Generator Tool
// ==========================================
export function SitemapGeneratorTool() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [urls, setUrls] = useState<Array<{ path: string; priority: string; changefreq: string }>>([
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/blog", priority: "0.9", changefreq: "weekly" },
    { path: "/contact", priority: "0.7", changefreq: "yearly" },
  ]);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const addUrl = () => {
    setUrls([...urls, { path: "/new-page", priority: "0.8", changefreq: "monthly" }]);
  };

  const removeUrl = (idx: number) => {
    setUrls(urls.filter((_, i) => i !== idx));
  };

  const generateXml = () => {
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const today = new Date().toISOString().split("T")[0];
    const items = urls.map((u) => {
      const full = `${cleanBase}${u.path.startsWith("/") ? u.path : `/${u.path}`}`;
      return `  <url>
    <loc>${full}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join("\n")}
</urlset>`;
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(generateXml());
    if (ok) {
      setCopied(true);
      success("Sitemap XML copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generateXml()], { type: "application/xml" });
    downloadBlob(blob, "sitemap.xml");
    success("sitemap.xml downloaded");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-80">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Website URL</label>
          <input
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={addUrl}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add URL
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy XML"}</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download sitemap.xml
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pages List ({urls.length})</span>
        <div className="space-y-2 max-h-60 overflow-y-auto p-1">
          {urls.map((u, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <input
                type="text"
                value={u.path}
                onChange={(e) => {
                  const updated = [...urls];
                  updated[idx].path = e.target.value;
                  setUrls(updated);
                }}
                className="flex-1 p-2 rounded-lg bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-xs font-mono"
              />
              <select
                value={u.changefreq}
                onChange={(e) => {
                  const updated = [...urls];
                  updated[idx].changefreq = e.target.value;
                  setUrls(updated);
                }}
                className="p-2 rounded-lg bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-xs"
              >
                <option value="always">always</option>
                <option value="hourly">hourly</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
              </select>
              <select
                value={u.priority}
                onChange={(e) => {
                  const updated = [...urls];
                  updated[idx].priority = e.target.value;
                  setUrls(updated);
                }}
                className="p-2 rounded-lg bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-xs font-mono"
              >
                <option value="1.0">1.0</option>
                <option value="0.9">0.9</option>
                <option value="0.8">0.8</option>
                <option value="0.7">0.7</option>
                <option value="0.5">0.5</option>
                <option value="0.3">0.3</option>
              </select>
              <button
                type="button"
                onClick={() => removeUrl(idx)}
                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated XML Output</label>
        <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-56">
          {generateXml()}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 2. JSON-LD Schema Markup Generator Tool
// ==========================================
export function SchemaMarkupTool() {
  const [schemaType, setSchemaType] = useState<"Organization" | "Article" | "FAQPage" | "Product" | "LocalBusiness">("Organization");
  const [orgName, setOrgName] = useState("OmniCraft");
  const [orgUrl, setOrgUrl] = useState("https://omnicraft.dev");
  const [orgLogo, setOrgLogo] = useState("https://omnicraft.dev/icon.png");

  const [articleTitle, setArticleTitle] = useState("10 Best Developer Tools for Productivity");
  const [articleAuthor, setArticleAuthor] = useState("Dev Team");

  const [productName, setProductName] = useState("Pro Tools Subscription");
  const [productPrice, setProductPrice] = useState("0");

  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const getJsonLd = () => {
    let obj: any = { "@context": "https://schema.org" };

    if (schemaType === "Organization") {
      obj = {
        ...obj,
        "@type": "Organization",
        name: orgName,
        url: orgUrl,
        logo: orgLogo,
        sameAs: ["https://twitter.com/omnicraft", "https://github.com/omnicraft"],
      };
    } else if (schemaType === "Article") {
      obj = {
        ...obj,
        "@type": "Article",
        headline: articleTitle,
        author: { "@type": "Person", name: articleAuthor },
        datePublished: new Date().toISOString(),
        publisher: { "@type": "Organization", name: orgName, logo: { "@type": "ImageObject", url: orgLogo } },
      };
    } else if (schemaType === "FAQPage") {
      obj = {
        ...obj,
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is OmniCraft free to use?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, all core tools are 100% free and run in your browser." },
          },
          {
            "@type": "Question",
            name: "Are files private?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, processing occurs client-side whenever technically possible." },
          },
        ],
      };
    } else if (schemaType === "Product") {
      obj = {
        ...obj,
        "@type": "Product",
        name: productName,
        offers: {
          "@type": "Offer",
          price: productPrice,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      };
    } else if (schemaType === "LocalBusiness") {
      obj = {
        ...obj,
        "@type": "LocalBusiness",
        name: orgName,
        url: orgUrl,
        telephone: "+1-555-0199",
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Market St",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94105",
          addressCountry: "US",
        },
      };
    }

    return JSON.stringify(obj, null, 2);
  };

  const handleCopy = async () => {
    const script = `<script type="application/ld+json">\n${getJsonLd()}\n</script>`;
    const ok = await copyToClipboard(script);
    if (ok) {
      setCopied(true);
      success("JSON-LD script copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(["Organization", "Article", "FAQPage", "Product", "LocalBusiness"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSchemaType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              schemaType === type ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300"
            }`}
          >
            {type} Schema
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {schemaType === "Organization" && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Company / Organization Name</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Website URL</label>
              <input type="url" value={orgUrl} onChange={(e) => setOrgUrl(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs" />
            </div>
          </>
        )}

        {schemaType === "Article" && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Article Headline</label>
              <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Author Name</label>
              <input type="text" value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs" />
            </div>
          </>
        )}

        {schemaType === "Product" && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Product Name</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Price (USD)</label>
              <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs" />
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated JSON-LD Code</label>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied HTML Tag" : "Copy <script> Tag"}</span>
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 select-all">
{`<script type="application/ld+json">
${getJsonLd()}
</script>`}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 3. Google SERP Simulator Tool
// ==========================================
export function SerpPreviewTool() {
  const [title, setTitle] = useState("OmniCraft — 100+ Free Online Tools & Utilities for Creators");
  const [url, setUrl] = useState("https://omnicraft.dev/tools/pdf-compress");
  const [description, setDescription] = useState("Compress, edit, convert, and format PDF documents, images, JSON files, code, and calculations instantly in your browser with 100% privacy.");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>Page Title</span>
            <span className={titleLength > 60 ? "text-amber-500 font-mono" : "text-slate-400 font-mono"}>
              {titleLength} / 60 chars {titleLength > 60 && "(may be truncated)"}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Destination URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>Meta Description</span>
            <span className={descLength > 160 ? "text-amber-500 font-mono" : "text-slate-400 font-mono"}>
              {descLength} / 160 chars {descLength > 160 && "(may be truncated)"}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-white/10 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Google Search Result Preview</span>
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06]">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${device === "desktop" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${device === "mobile" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              Mobile
            </button>
          </div>
        </div>

        <div className={`p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200/60 dark:border-white/5 space-y-1 ${device === "mobile" ? "max-w-sm mx-auto" : ""}`}>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] font-bold">T</div>
            <span className="truncate max-w-xs">{url.replace("https://", "")}</span>
          </div>
          <h3 className="text-base sm:text-lg text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer leading-tight">
            {title || "Untitled Web Page"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
            {description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. URL Slug Generator Tool
// ==========================================
export function SlugGeneratorTool() {
  const [text, setText] = useState("Top 10 High Performance Developer Utilities for 2026!");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const generateSlug = () => {
    let str = text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
    if (lowercase) str = str.toLowerCase();
    if (removeNumbers) str = str.replace(/[0-9]/g, "");
    str = str.replace(/[^a-zA-Z0-9\s_-]/g, ""); // Remove special chars
    str = str.trim().replace(/[\s_-]+/g, separator);
    return str;
  };

  const slug = generateSlug();

  const handleCopy = async () => {
    const ok = await copyToClipboard(slug);
    if (ok) {
      setCopied(true);
      success("Slug copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter Article Title or Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. My Awesome New Blog Post!"
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span>Separator:</span>
          <button
            type="button"
            onClick={() => setSeparator("-")}
            className={`px-3 py-1 rounded-lg border cursor-pointer ${separator === "-" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700"}`}
          >
            Hyphen (-)
          </button>
          <button
            type="button"
            onClick={() => setSeparator("_")}
            className={`px-3 py-1 rounded-lg border cursor-pointer ${separator === "_" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700"}`}
          >
            Underscore (_)
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
          <span>Lowercase All</span>
        </label>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate">{slug || "slug-preview"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy Slug"}</span>
        </button>
      </div>
    </div>
  );
}
