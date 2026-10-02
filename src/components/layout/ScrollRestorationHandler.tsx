"use client";

import { useEffect } from "react";

/**
 * ScrollRestorationHandler
 *
 * Ensures seamless, instant scroll restoration during browser Back/Forward navigation,
 * while preserving smooth scrolling for in-page anchor links (e.g. #faq, #tools).
 *
 * Prevents the jarring "fast-scrolling" animation from top to previous scroll position.
 */
export function ScrollRestorationHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure the browser uses native auto scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

    // Intercept popstate (browser back/forward buttons & swipe gestures) in the capture phase
    const handlePopState = () => {
      const html = document.documentElement;

      // Force instant scroll behavior for history restoration
      html.style.setProperty("scroll-behavior", "auto", "important");
      html.removeAttribute("data-scroll-behavior");

      // Force synchronous reflow so browser picks up auto scroll immediately
      html.getClientRects();

      // After restoration has finished and painted, restore smooth behavior for anchor links
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.style.removeProperty("scroll-behavior");
          html.setAttribute("data-scroll-behavior", "smooth");
        });
      });
    };

    // Handle link clicks to differentiate anchor jumps vs page navigations
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // In-page anchor navigation (e.g. #faq, #categories, or /#tools on same page)
      const isAnchor =
        href.startsWith("#") ||
        (href.includes("#") && href.split("#")[0] === window.location.pathname);

      if (isAnchor) {
        // Ensure smooth scrolling is enabled for in-page anchor jumps
        document.documentElement.setAttribute("data-scroll-behavior", "smooth");
      } else if (!href.startsWith("http") && !href.startsWith("//") && !target.target) {
        // Page-to-page navigation: ensure instant scroll to top (no animated scroll-through)
        const html = document.documentElement;
        html.style.setProperty("scroll-behavior", "auto", "important");
        html.getClientRects();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            html.style.removeProperty("scroll-behavior");
            html.setAttribute("data-scroll-behavior", "smooth");
          });
        });
      }
    };

    window.addEventListener("popstate", handlePopState, { capture: true });
    document.addEventListener("click", handleLinkClick, { capture: true });

    return () => {
      window.removeEventListener("popstate", handlePopState, { capture: true });
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  return null;
}
