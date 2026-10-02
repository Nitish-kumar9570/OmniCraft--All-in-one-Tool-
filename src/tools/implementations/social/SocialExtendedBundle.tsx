"use client";

import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Link as LinkIcon,
  Layers,
  FileCode,
  Smartphone,
  Eye,
  MessageSquare,
  Globe,
  Video,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Twitter / X Thread Formatter Tool
// ==========================================
export function TwitterThreadFormatterTool() {
  const [text, setText] = useState(
    "Building modern software requires balancing speed and stability. When designing scalable web platforms, local-first architecture offers unmatched responsiveness. By moving non-sensitive computational workloads client-side, infrastructure costs drop significantly while user privacy reaches 100%."
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { success } = useToast();

  const splitIntoTweets = (content: string) => {
    const sentences = content.match(/[^.!?]+[.!?]+(\s|$)/g) || [content];
    const tweets: string[] = [];
    let current = "";

    for (const s of sentences) {
      if ((current + s).length > 250) {
        if (current) tweets.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    }
    if (current) tweets.push(current.trim());
    return tweets.map((t, idx, arr) => `${t}\n\n(${idx + 1}/${arr.length})`);
  };

  const tweets = splitIntoTweets(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Long-Form Article / Essay</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs leading-relaxed"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-sm">Thread Breakdown ({tweets.length} Tweets)</h3>
        {tweets.map((t, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
              <span>Tweet #{idx + 1} ({t.length} chars)</span>
              <button
                onClick={() => {
                  copyToClipboard(t);
                  setCopiedIdx(idx);
                  setTimeout(() => setCopiedIdx(null), 2000);
                  success(`Tweet #${idx + 1} copied!`);
                }}
                className="text-indigo-600 font-bold flex items-center gap-1"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === idx ? "Copied" : "Copy Tweet"}
              </button>
            </div>
            <p className="text-xs whitespace-pre-wrap">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. Fancy Unicode Bio & Font Generator
// ==========================================
export function FancyFontBioGeneratorTool() {
  const [text, setText] = useState("OmniCraft Tools");
  const { success } = useToast();

  const toBoldSans = (str: string) => {
    return str.split("").map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + code - 97);
      return c;
    }).join("");
  };

  const toItalicSerif = (str: string) => {
    return str.split("").map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + code - 97);
      return c;
    }).join("");
  };

  const toMonospace = (str: string) => {
    return str.split("").map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + code - 97);
      return c;
    }).join("");
  };

  const styles = [
    { name: "Bold Sans", sample: toBoldSans(text) },
    { name: "Italic Serif", sample: toItalicSerif(text) },
    { name: "Monospace Code", sample: toMonospace(text) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Text to Stylize</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      <div className="space-y-2">
        {styles.map((s, idx) => (
          <div
            key={idx}
            onClick={() => {
              copyToClipboard(s.sample);
              success(`Copied ${s.name}!`);
            }}
            className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] hover:border-rose-500 cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">{s.name}</span>
              <span className="text-sm font-semibold">{s.sample}</span>
            </div>
            <Copy className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. Multi-Platform Social Share Link Generator
// ==========================================
export function SocialShareLinkGeneratorTool() {
  const [url, setUrl] = useState("https://omnicraft.dev");
  const [title, setTitle] = useState("OmniCraft — 500+ Free Online Tools");
  const { success } = useToast();

  const links = [
    { name: "Twitter / X", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "WhatsApp", url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}` },
    { name: "Reddit", url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Target Web URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Share Text Copy</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="space-y-2">
        {links.map((l, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] flex items-center justify-between text-xs">
            <span className="font-bold">{l.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  copyToClipboard(l.url);
                  success(`Copied ${l.name} share link!`);
                }}
                className="text-rose-600 font-bold"
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. YouTube Responsive Embed Code Generator
// ==========================================
export function YouTubeEmbedGeneratorTool() {
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const { success } = useToast();

  const embedCode = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px;">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">YouTube Video ID (or URL)</label>
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value.replace(/.*(?:youtu\.be\/|v=)([^?&]+).*/, "$1"))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="ap"
            checked={autoplay}
            onChange={(e) => setAutoplay(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="ap" className="text-xs font-bold">Autoplay Video</label>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="ctrl"
            checked={controls}
            onChange={(e) => setControls(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="ctrl" className="text-xs font-bold">Show Controls</label>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">Responsive Embed Code</span>
          <button
            onClick={() => {
              copyToClipboard(embedCode);
              success("Embed code copied!");
            }}
            className="text-xs text-rose-600 font-bold"
          >
            Copy HTML
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {embedCode}
        </pre>
      </div>
    </div>
  );
}
