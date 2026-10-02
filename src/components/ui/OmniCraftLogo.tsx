import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface OmniCraftLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export function OmniCraftLogo({
  size = "md",
  showText = true,
  animated = false,
  className,
}: OmniCraftLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <div
        className={cn(
          "rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25",
          animated && "animate-pulse",
          iconSizes[size]
        )}
      >
        <Sparkles className="w-5 h-5 stroke-[2.2]" />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-black tracking-tight text-slate-900 dark:text-white font-sans transition-colors", textSizes[size])}>
            Omni<span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Craft</span>
          </span>
        </div>
      )}
    </div>
  );
}
