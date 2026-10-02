"use client";

import React, { useState } from "react";
import { Copy, Globe } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function MetaTagGeneratorTool() {
  const [title, setTitle] = useState<string>("OmniCraft — All-in-One Online Productivity Tools");
  const [description, setDescription] = useState<string>("Every tool you need in one place. PDF, image, calculators, developer utilities, and converters.");
  const [url, setUrl] = useState<string>("https://omnicraft.dev");
  const [imageUrl, setImageUrl] = useState<string>("https://omnicraft.dev/og-image.png");
  const { success } = useToast();

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Fields */}
        <div className="lg:col-span-6 space-y-4">
          <Input label="Site / Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 block">
              Meta Description ({description.length} / 160 chars)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner"
            />
          </div>
          <Input label="Canonical Page URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Input label="Open Graph Social Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        {/* Live SERP Preview */}
        <div className="lg:col-span-6 space-y-4">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
            Google Search Snippet Preview
          </label>
          <div className="p-5 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-1.5 shadow-md font-sans backdrop-blur-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{url}</span>
            </div>
            <h4 className="text-base text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer line-clamp-1">
              {title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block pt-2">
            Generated HTML Meta Tags
          </label>
          <div className="relative">
            <textarea
              readOnly
              value={generatedHtml}
              rows={8}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14] text-indigo-700 dark:text-indigo-300 font-mono text-xs shadow-inner"
            />
            <button
              onClick={async () => {
                const ok = await copyToClipboard(generatedHtml);
                if (ok) success("HTML meta tags copied");
              }}
              className="absolute right-3 top-3 p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors touch-manipulation"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

