"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OmniCraftLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animated?: boolean;
}

export function OmniCraftLogo({
  className,
  size = "md",
  showText = true,
  animated = false,
}: OmniCraftLogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  const textSizeMap = {
    sm: "text-base font-semibold",
    md: "text-lg font-bold tracking-tight",
    lg: "text-xl font-bold tracking-tight",
    xl: "text-2xl font-bold tracking-tight",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <div className={cn("relative flex items-center justify-center shrink-0", sizeMap[size])}>
        {/* Orbital glow halo */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-[6px]",
            animated && "animate-pulse-subtle"
          )}
        />

        {/* Abstract OmniCraft Star / Orbit Icon */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "relative w-full h-full text-white drop-shadow-md",
            animated && "animate-spin-slow"
          )}
        >
          <defs>
            <linearGradient id="novaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="novaCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </linearGradient>
          </defs>

          {/* Outer Orbital Ring */}
          <ellipse
            cx="18"
            cy="18"
            rx="14"
            ry="6.5"
            transform="rotate(-28 18 18)"
            stroke="url(#novaGrad1)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="40 8"
          />

          {/* Secondary Counter Ring */}
          <ellipse
            cx="18"
            cy="18"
            rx="14"
            ry="6.5"
            transform="rotate(45 18 18)"
            stroke="url(#novaGrad1)"
            strokeWidth="1.8"
            strokeOpacity="0.8"
            strokeLinecap="round"
            strokeDasharray="25 12"
          />

          {/* Glowing Center Star / Sparkle */}
          <path
            d="M18 6C18 12.5 12.5 18 6 18C12.5 18 18 23.5 18 30C18 23.5 23.5 18 30 18C23.5 18 18 12.5 18 6Z"
            fill="url(#novaCore)"
          />

          {/* Micro satellite nodes */}
          <circle cx="28" cy="11" r="1.8" fill="#38bdf8" />
          <circle cx="8" cy="25" r="1.4" fill="#ec4899" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={cn("bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400", textSizeMap[size])}>
              OmniCraft
            </span>
            <span className={cn("text-slate-800 dark:text-slate-100", textSizeMap[size])}>
              AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export const NovaLogo = OmniCraftLogo;
