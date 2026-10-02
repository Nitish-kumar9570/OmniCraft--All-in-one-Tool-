"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none rounded-xl cursor-pointer pointer-events-auto";


    const variantStyles = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/25 focus-visible:ring-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500",
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-slate-900 focus-visible:ring-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",
      outline:
        "border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 focus-visible:ring-slate-400",
      ghost:
        "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus-visible:ring-slate-400",
      destructive:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm focus-visible:ring-red-500",
      gradient:
        "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 focus-visible:ring-purple-500",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >

        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";
