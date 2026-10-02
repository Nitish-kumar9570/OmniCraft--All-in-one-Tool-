"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Globe, Laptop, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function UserAgentTool() {
  const [userAgent, setUserAgent] = useState<string>("");
  const [browserInfo, setBrowserInfo] = useState<Record<string, string>>({});
  const { success } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent;

    // Parse OS & Browser
    let browser = "Unknown";
    if (ua.includes("Firefox/")) browser = "Mozilla Firefox";
    else if (ua.includes("Edg/")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome/")) browser = "Google Chrome";
    else if (ua.includes("Safari/")) browser = "Apple Safari";
    else if (ua.includes("Opera") || ua.includes("OPR/")) browser = "Opera";

    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("like Mac")) os = "iOS";

    const nav = navigator as Navigator & { deviceMemory?: number };

    queueMicrotask(() => {
      setUserAgent(ua);
      setBrowserInfo({
        Browser: browser,
        "Operating System": os,
        "Screen Resolution": `${window.screen.width} × ${window.screen.height} px (DPR: ${window.devicePixelRatio})`,
        "Viewport Size": `${window.innerWidth} × ${window.innerHeight} px`,
        "Color Depth": `${window.screen.colorDepth}-bit`,
        Language: navigator.language || "en-US",
        "Online Status": navigator.onLine ? "Online (Connected)" : "Offline",
        "CPU Cores (Concurrency)": `${navigator.hardwareConcurrency || "Unknown"} logical threads`,
        "Device Memory": nav.deviceMemory ? `${nav.deviceMemory} GB RAM` : "N/A",
        "Touch Support": "ontouchstart" in window ? "Yes" : "No",
        "Do Not Track": navigator.doNotTrack === "1" ? "Enabled" : "Disabled / Unset",
      });
    });
  }, []);


  const copyAll = async () => {
    const ok = await copyToClipboard(JSON.stringify({ userAgent, ...browserInfo }, null, 2));
    if (ok) success("Copied client inspection report to clipboard!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Raw User Agent Header */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-500" /> Current User-Agent String
          </h3>
          <Button variant="outline" size="sm" onClick={async () => {
            const ok = await copyToClipboard(userAgent);
            if (ok) success("Copied User-Agent string!");
          }} leftIcon={<Copy className="w-3.5 h-3.5" />}>
            Copy UA
          </Button>
        </div>


        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 font-mono text-xs text-indigo-600 dark:text-indigo-300 break-all leading-relaxed shadow-inner">
          {userAgent || "Detecting user agent..."}
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-indigo-500" /> Device & Browser Specifications
          </h4>
          <Button variant="secondary" size="sm" onClick={copyAll} leftIcon={<Copy className="w-3.5 h-3.5" />}>
            Export JSON
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(browserInfo).map(([key, val]) => (
            <div
              key={key}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/10 space-y-1"
            >
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{key}</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
