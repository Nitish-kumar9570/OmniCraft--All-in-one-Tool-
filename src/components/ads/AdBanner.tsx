"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export type AdSlotType = "header" | "in-content" | "tool-bottom" | "sidebar" | "footer";

interface AdBannerProps {
  slotType: AdSlotType;
  adSlot?: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
}

/**
 * AdBanner Component
 * Production-ready Google AdSense container.
 * - Collapses cleanly with zero layout shift when ads are disabled.
 * - Renders legitimate Google AdSense <ins> tag when enabled with credentials.
 * - Provides non-intrusive preview placeholders in staging/dev if explicitly requested.
 * - Strictly secondary to site content to preserve user experience.
 */
export function AdBanner({
  slotType,
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className,
}: AdBannerProps) {
  const { enabled, clientId, showPlaceholders } = siteConfig.adsense;
  const adRef = useRef<HTMLModElement | null>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !clientId || isLoadedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        // @ts-expect-error Google adsbygoogle array
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch {
      // Ignore adsbygoogle load failures gracefully without crashing UI
    }
  }, [enabled, clientId]);

  // If live ads are enabled and credentials exist, render the AdSense element
  if (enabled && clientId && !clientId.includes("your-")) {
    return (
      <aside
        aria-label="Advertisement"
        className={cn(
          "w-full my-6 flex flex-col items-center justify-center overflow-hidden transition-all select-none",
          slotType === "sidebar" && "my-4",
          className
        )}
      >
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-600 mb-1">
          Advertisement
        </span>
        <div className="w-full min-h-[90px] flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle block w-full"
            style={{ display: "block" }}
            data-ad-client={clientId}
            data-ad-slot={adSlot || "0000000000"}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
          />
        </div>
      </aside>
    );
  }

  // Staging / Dev Placeholder mode: shown ONLY when NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS="true"
  if (showPlaceholders) {
    return (
      <aside
        aria-label="Advertisement Placeholder"
        className={cn(
          "w-full my-6 p-4 rounded-2xl border border-dashed border-slate-300/80 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/30 text-center select-none",
          slotType === "sidebar" && "my-3 p-3",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
            Reserved Ad Space • {slotType.toUpperCase()}
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            AdSense container ready. Code activates automatically upon approval.
          </p>
        </div>
      </aside>
    );
  }

  // By default when ads are not active: render nothing (zero DOM overhead, zero CLS)
  return null;
}
