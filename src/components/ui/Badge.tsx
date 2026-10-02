import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "warning" | "gradient" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variantClasses = {
    default: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    secondary: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    gradient: "bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 text-purple-600 dark:text-purple-300 border-purple-300/30",
    outline: "bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-medium",
    md: "px-2.5 py-1 text-xs font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border leading-none shrink-0",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
