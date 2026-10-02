"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, leftIcon, rightIcon, id, type = "text", ...props },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none shrink-0 flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full h-10 rounded-xl border transition-all duration-150 text-sm",
              "bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20",
              "disabled:opacity-50 disabled:cursor-not-allowed shadow-xs dark:shadow-inner",
              leftIcon ? "pl-9" : "pl-3.5",
              rightIcon ? "pr-9" : "pr-3.5",
              error
                ? "border-red-500 focus-visible:ring-red-500 text-red-600 dark:text-red-300"
                : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}

        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
