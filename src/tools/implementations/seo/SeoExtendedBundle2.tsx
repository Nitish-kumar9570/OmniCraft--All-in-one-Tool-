"use client";

import React, { useState } from "react";
import {
  Share2,
  FileCode,
  Check,
  Copy,
  Layout,
  Type,
  Eye,
  Layers,
  HelpCircle,
  Building,
  Utensils,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Twitter / X Card Meta Tags Generator
// ==========================================
export function TwitterCardGeneratorTool() {
  const [cardType, setCardType] = useState<"summary_large_image" | "summary">("summary_large_image");
  const [title, setTitle] = useState("OmniCraft — Ultimate Developer Toolbox");
  const [description, setDescription] = useState("500+ free online developer, design, PDF and conversion tools.");
  const [handle, setHandle] = useState("@omnicraft_app");
  const [image, setImage] = useState("https://omnicraft.dev/banner.png");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const code = `<meta name="twitter:card" content="${cardType}" />
<meta name="twitter:site" content="${handle}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Card Type</label>
          <select
            value={cardType}
            onChange={(e: any) => setCardType(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          >
            <option value="summary_large_image">Summary Large Image (Recommended)</option>
            <option value="summary">Standard Summary</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Twitter Handle</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Twitter Meta Tags</span>
          <button
            onClick={() => {
              copyToClipboard(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Twitter card tags copied!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Tags"}
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
// 2. Schema.org FAQPage Generator
// ==========================================
export function SchemaFaqTool() {
  const [faqs, setFaqs] = useState([
    { q: "Is OmniCraft completely free?", a: "Yes, OmniCraft is 100% free with no sign-up or paywalls." },
    { q: "Are my uploaded files private?", a: "All processing happens client-side in your browser." },
  ]);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
            <input
              type="text"
              value={f.q}
              onChange={(e) => {
                const next = [...faqs];
                next[idx].q = e.target.value;
                setFaqs(next);
              }}
              placeholder="Question"
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-bold text-xs"
            />
            <textarea
              value={f.a}
              onChange={(e) => {
                const next = [...faqs];
                next[idx].a = e.target.value;
                setFaqs(next);
              }}
              placeholder="Answer"
              rows={2}
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs"
            />
          </div>
        ))}
        <button
          onClick={() => setFaqs([...faqs, { q: "New Question?", a: "Answer text here." }])}
          className="text-xs text-indigo-600 font-bold hover:underline"
        >
          + Add Another FAQ Item
        </button>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">FAQPage Schema JSON-LD</span>
          <button
            onClick={() => {
              copyToClipboard(jsonLd);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("FAQ JSON-LD copied!");
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
// 3. Schema.org LocalBusiness Generator
// ==========================================
export function SchemaLocalBusinessTool() {
  const [name, setName] = useState("Downtown Tech Hub");
  const [street, setStreet] = useState("100 Market Street");
  const [city, setCity] = useState("San Francisco");
  const [region, setRegion] = useState("CA");
  const [postal, setPostal] = useState("94105");
  const [phone, setPhone] = useState("+1-415-555-0192");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name,
      telephone: phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: city,
        addressRegion: region,
        postalCode: postal,
        addressCountry: "US",
      },
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Business Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Telephone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Street Address</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">City, State, Zip</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="p-2 rounded-xl border border-slate-200 text-xs" />
            <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="p-2 rounded-xl border border-slate-200 text-xs" />
            <input type="text" value={postal} onChange={(e) => setPostal(e.target.value)} className="p-2 rounded-xl border border-slate-200 text-xs font-mono" />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">LocalBusiness Schema</span>
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
// 4. Heading Tag & Structure Inspector
// ==========================================
export function HeadingTagExtractorTool() {
  const [html, setHtml] = useState(
    `<h1>Welcome to OmniCraft</h1>\n<p>Main body text</p>\n<h2>Developer Tools</h2>\n<h3>JSON Formatter</h3>\n<h3>Base64 Converter</h3>\n<h2>PDF Tools</h2>\n<h3>PDF Merge</h3>`
  );

  const extractHeadings = () => {
    const matches: Array<{ tag: string; text: string }> = [];
    const regex = /<(h[1-6])[^>]*>(.*?)<\/\1>/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      matches.push({ tag: m[1].toUpperCase(), text: m[2].replace(/<[^>]+>/g, "").trim() });
    }
    return matches;
  };

  const headings = extractHeadings();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">HTML Markup</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <h3 className="font-bold text-sm">Extracted Heading Hierarchy ({headings.length} Headings)</h3>
        <div className="space-y-2">
          {headings.map((h, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-xs">
              <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                {h.tag}
              </span>
              <span className="font-medium truncate">{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. Nginx 301 Redirect Generator
// ==========================================
export function NginxRedirectGeneratorTool() {
  const [oldUrl, setOldUrl] = useState("/legacy-path");
  const [newUrl, setNewUrl] = useState("https://omnicraft.dev/modern-path");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const code = `location = ${oldUrl} {\n    return 301 ${newUrl};\n}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Old URI</label>
          <input
            type="text"
            value={oldUrl}
            onChange={(e) => setOldUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Target 301 URL</label>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Nginx Server Block Directives</span>
          <button
            onClick={() => {
              copyToClipboard(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              success("Nginx config copied!");
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Directives"}
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs">
          {code}
        </pre>
      </div>
    </div>
  );
}
