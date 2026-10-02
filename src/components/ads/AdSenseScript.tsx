"use client";

import React from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/siteConfig";

/**
 * AdSenseScript Component
 * Injects Google AdSense client script only when a valid publisher ID is provided
 * and ads are explicitly enabled in site configuration.
 */
export function AdSenseScript() {
  const { clientId, enabled } = siteConfig.adsense;

  // Never load AdSense script if ads are disabled or clientId is not configured
  if (!enabled || !clientId || clientId.includes("your-") || clientId === "ca-pub-XXXXXXXXXXXXXXXX") {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
