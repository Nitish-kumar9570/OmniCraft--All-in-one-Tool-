"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";
import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";
import { useFavorites } from "@/hooks/useFavorites";
import {
  Search,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Laptop,
  Clock,
  BookOpen,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const { theme, setTheme } = useTheme();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [mobileMenuOpen]);

  // Always close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(true);
  }, []);

  const navLinks = [
    { href: "/tools", label: "All Tools", icon: Layers },
    { href: "/categories", label: "Categories", icon: ChevronDown },
    { href: "/workspace", label: "Workspace", icon: Layers },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/history", label: "Recently Used", icon: Clock },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      {/* Fixed Header with high z-index and mobile compositing protection */}
      <header className="fixed top-0 left-0 right-0 w-full z-[100] bg-white/95 dark:bg-[#070b14]/95 sm:bg-white/90 sm:dark:bg-[#070b14]/90 backdrop-blur-0 sm:backdrop-blur-2xl border-b border-slate-200/90 dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 relative z-[110] pointer-events-auto touch-manipulation">
            <OmniCraftLogo size="sm" className="sm:hidden" />
            <OmniCraftLogo size="md" className="hidden sm:inline-flex" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400 relative z-[110]">
            {/* All Tools */}
            <Link
              href="/tools"
              className={cn(
                "hover:text-slate-900 dark:hover:text-white transition-colors",
                pathname === "/tools" && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              All Tools
            </Link>

            {/* Categories */}
            <Link
              href="/categories"
              className={cn(
                "inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-2",
                pathname.startsWith("/categories") && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>

            {/* Favorites */}
            <Link
              href="/favorites"
              className={cn(
                "hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5",
                pathname === "/favorites" && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Favorites</span>
              {favoritesLoaded && favorites.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[10px] text-rose-600 dark:text-rose-400 font-bold font-mono">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Recently Used */}
            <Link
              href="/history"
              className={cn(
                "hover:text-slate-900 dark:hover:text-white transition-colors",
                pathname === "/history" && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              Recently Used
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className={cn(
                "hover:text-slate-900 dark:hover:text-white transition-colors",
                pathname.startsWith("/blog") && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              Blog
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={cn(
                "hover:text-slate-900 dark:hover:text-white transition-colors",
                pathname === "/about" && "text-indigo-600 dark:text-indigo-400 font-bold"
              )}
            >
              About
            </Link>
          </nav>

          {/* Right Action Tools (Mobile & Desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 relative z-[110] pointer-events-auto">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 text-xs transition-all shadow-xs active:scale-95 cursor-pointer touch-manipulation relative z-[110] pointer-events-auto"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle variant="button" className="inline-flex sm:hidden relative z-[110] pointer-events-auto" />
            <ThemeToggle variant="pill" className="hidden sm:inline-flex relative z-[110] pointer-events-auto" />

            {/* Explore All CTA Button */}
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Tools</span>
            </Link>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 active:scale-95 transition-all cursor-pointer touch-manipulation relative z-[110] pointer-events-auto"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 64px Header Height Spacer to preserve layout spacing across all pages */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-[200] lg:hidden flex flex-col pointer-events-auto">
          {/* Backdrop for outside click */}
          <div
            className="fixed inset-0 top-16 bg-black/60 dark:bg-slate-950/80 backdrop-blur-xs z-[190] animate-in fade-in duration-200 pointer-events-auto"
            onClick={closeMobileMenu}
          />

          {/* Dropdown Menu Container */}
          <div className="relative z-[200] w-full px-4 pt-3 pb-6 border-b border-slate-200/90 dark:border-white/10 bg-white/98 dark:bg-[#070b14]/98 shadow-2xl space-y-3.5 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain transform-gpu pointer-events-auto">

            {/* Mobile Theme Switcher Bar */}
            <div className="p-2 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 pl-2">Theme</span>
              <div className="inline-flex items-center p-0.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 gap-0.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer touch-manipulation active:scale-90 transform-gpu",
                    theme === "light"
                      ? "bg-amber-50 text-amber-700 font-bold shadow-xs border border-amber-200"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  )}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer touch-manipulation active:scale-90 transform-gpu",
                    theme === "dark"
                      ? "bg-indigo-600 text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  )}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer touch-manipulation active:scale-90 transform-gpu",
                    theme === "system"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  )}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Auto</span>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-transform duration-100 touch-manipulation active:scale-[0.98] transform-gpu",
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-100 dark:border-indigo-800/50"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={cn("w-4 h-4", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                      <span>{link.label}</span>
                    </span>

                    {link.href === "/favorites" && favoritesLoaded && favorites.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[10px] text-rose-600 dark:text-rose-400 font-bold font-mono">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Explore Tools Link */}
            <div className="pt-2">
              <Link
                href="/tools"
                onClick={closeMobileMenu}
                className="w-full py-3 px-4 text-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 touch-manipulation"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore All Tools</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Command Palette */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}