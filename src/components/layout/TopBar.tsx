"use client";

import React from "react";
import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";
import { ThemeToggle } from "./ThemeToggle";

interface TopBarProps {
  onOpenMobileSidebar: () => void;
  title?: string;
}

export function TopBar({ onOpenMobileSidebar, title = "OmniCraft" }: TopBarProps) {
  return (
    <header className="h-13 w-full bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 shrink-0 z-20 transition-colors">
      {/* Left items */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-95 touch-manipulation"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>


        <div className="flex md:hidden items-center gap-2">
          <OmniCraftLogo size="sm" showText={false} />
        </div>

        <h1 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-md">
          {title}
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle variant="button" className="p-1.5 rounded-xl" />

        <Link
          href="/chat"
          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-xs shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">New Chat</span>
        </Link>
      </div>
    </header>
  );
}
