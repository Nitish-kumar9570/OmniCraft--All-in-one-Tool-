/**
 * OmniCraft Site Configuration & SEO Constants
 * Central source of truth for URLs, branding, metadata, and service integrations.
 */

export const siteConfig = {
  name: "OmniCraft",
  legalName: "OmniCraft Tools Studio",
  tagline: "Every tool you need. One place.",
  description:
    "OmniCraft is a massive all-in-one suite of 240+ free, fast, and private online tools for PDF editing, image optimization, developer formatting, calculations, and security.",
  longDescription:
    "Access over 240+ high-performance browser utilities. Convert, compress, calculate, format, inspect, and optimize without subscriptions, paywalls, or privacy compromises. 100% client-side execution ensures your data never leaves your device.",
  url: (() => {
    const raw =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      "https://omnicraft.dev";
    const clean = raw.trim().replace(/\/+$/, "");
    return clean.startsWith("http://") || clean.startsWith("https://") ? clean : `https://${clean}`;
  })(),
  ogImage: "/icon-512.png",
  contactEmail: "support@omnicraft.dev",
  author: {
    name: "OmniCraft Engineering Team",
    url: "https://omnicraft.dev/about",
  },
  social: {
    twitter: "https://twitter.com/omnicraft",
    github: "https://github.com/omnicraft",
  },
  // Google Search Console & Webmaster verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
  },
  // Google AdSense Configuration
  adsense: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "",
    // Only enable ad rendering if explicitly set in environment
    enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
    // In local dev, show non-intrusive placeholders for layout verification
    showPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
  },
  // Google Analytics Configuration (optional)
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  },
};

/**
 * Returns an absolute canonical URL for a given relative route path.
 * Ensures consistent canonical formatting without duplicate trailing slashes.
 */
export function getCanonicalUrl(path: string = ""): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  if (!path || path === "/") return base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath.replace(/\/+$/, "")}`;
}
