"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "omnicraft_cookie_consent";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setConsentCookie(value: { essential: boolean; analytics: boolean; timestamp: number }) {
  if (typeof document === "undefined") return;
  const serialized = encodeURIComponent(JSON.stringify(value));
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${STORAGE_KEY}=${serialized}; path=/; max-age=31536000; SameSite=Lax${isHttps ? "; Secure" : ""}`;
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only run in client browser
    if (typeof window === "undefined") return;
    const cookieConsent = getCookie(STORAGE_KEY);
    const localConsent = localStorage.getItem(STORAGE_KEY);

    if (!cookieConsent && !localConsent) {
      // Small timeout so it doesn't cause layout shift during initial paint
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    } else if (localConsent && !cookieConsent) {
      // Keep cookie in sync if consent was stored in localStorage
      try {
        setConsentCookie(JSON.parse(localConsent));
      } catch {}
    }
  }, []);

  const handleAcceptAll = () => {
    const payload = { essential: true, analytics: true, timestamp: Date.now() };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {}
      setConsentCookie(payload);
      window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: payload }));
    }
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    const payload = { essential: true, analytics: false, timestamp: Date.now() };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {}
      setConsentCookie(payload);
      window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: payload }));
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[150] p-5 rounded-3xl bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-slate-900/10 dark:shadow-black/60 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-200/60 dark:border-indigo-800/40">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Privacy & Storage Preferences</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            </h3>
            <button
              onClick={handleEssentialOnly}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            OmniCraft uses client-side storage to remember your theme and saved tools. Files you process remain 100% in your browser. Review our{" "}
            <Link href="/cookies" className="underline hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold">
              Privacy Statement
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1.5">
            <Button
              size="sm"
              variant="gradient"
              onClick={handleAcceptAll}
              className="text-xs px-3.5 py-1.5 rounded-xl cursor-pointer"
            >
              Accept All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleEssentialOnly}
              className="text-xs px-3.5 py-1.5 rounded-xl cursor-pointer"
            >
              Essential Only
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
