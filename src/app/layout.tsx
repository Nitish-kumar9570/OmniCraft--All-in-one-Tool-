import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { ScrollRestorationHandler } from "@/components/layout/ScrollRestorationHandler";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { siteConfig, getCanonicalUrl } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "OmniCraft — Every tool you need. One place.",
    template: "%s",
  },
  description:
    "OmniCraft brings 240+ useful online tools together in one place. Convert, calculate, format, compress, inspect, and optimize with 100% client-side privacy.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  keywords: [
    "online tools",
    "free tools",
    "pdf tools",
    "pdf compressor",
    "pdf merge",
    "image compressor",
    "qr generator",
    "json formatter",
    "currency converter",
    "unit converter",
    "calculator",
    "password generator",
    "client-side utilities",
    "omnicraft",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "OmniCraft — Every tool you need. One place.",
    description:
      "OmniCraft brings 240+ useful online tools together in one place. Convert, calculate, format, compress, inspect, and optimize with 100% client-side privacy.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "OmniCraft — Every tool you need. One place.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCraft — Every tool you need. One place.",
    description:
      "OmniCraft brings 240+ useful online tools together in one place. Convert, calculate, format, compress, inspect, and optimize with 100% client-side privacy.",
    images: ["/icon-512.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  verification: {
    google: siteConfig.verification.google || undefined,
    yandex: siteConfig.verification.yandex || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <AdSenseScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 1. Theme initialization
                  var cookieMatch = document.cookie.match(/(?:^|;\\s*)omnicraft_theme=([^;]+)/);
                  var saved = cookieMatch ? decodeURIComponent(cookieMatch[1]) : localStorage.getItem("omnicraft_theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var isDark = saved === "dark" || ((!saved || saved === "system") && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                    document.documentElement.setAttribute("data-theme", "dark");
                    document.documentElement.style.colorScheme = "dark";
                  } else {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.setAttribute("data-theme", "light");
                    document.documentElement.style.colorScheme = "light";
                  }

                  // 2. Prevent fast-scrolling animation during browser Back/Forward navigation
                  if (typeof window !== "undefined") {
                    if ("scrollRestoration" in history) {
                      history.scrollRestoration = "auto";
                    }

                    window.addEventListener("popstate", function() {
                      var html = document.documentElement;
                      html.style.setProperty("scroll-behavior", "auto", "important");
                      html.removeAttribute("data-scroll-behavior");
                      html.getClientRects();

                      requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                          html.style.removeProperty("scroll-behavior");
                          html.setAttribute("data-scroll-behavior", "smooth");
                        });
                      });
                    }, { capture: true });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
        <ScrollRestorationHandler />
        <ThemeProvider>
          <ToastProvider>
            <FavoritesProvider>
              {children}
              <CookieConsent />
            </FavoritesProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
