"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ManualNumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  presets?: Array<{ label: string; value: number }>;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  decimalPlaces?: number;
  allowNegative?: boolean;
}

export function ManualNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  placeholder,
  helperText,
  error: customError,
  presets,
  disabled = false,
  className,
  inputClassName,
  decimalPlaces,
  allowNegative,
}: ManualNumberInputProps) {
  const isNegativeAllowed = allowNegative !== undefined ? allowNegative : (min !== undefined && min < 0);

  // Compute decimal precision based on step
  const decimals =
    decimalPlaces !== undefined
      ? decimalPlaces
      : step.toString().includes(".")
      ? step.toString().split(".")[1].length
      : 0;

  const formatNumber = (val: number): string => {
    if (isNaN(val)) return "";
    return decimals > 0 ? val.toFixed(decimals) : val.toString();
  };

  const [rawText, setRawText] = useState<string>(formatNumber(value));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  // Synchronize when external value updates and not actively focused
  useEffect(() => {
    if (!isFocused) {
      setRawText(formatNumber(value));
      setValidationError("");
    }
  }, [value, decimals, isFocused]);

  const validateAndNotify = (strVal: string) => {
    if (strVal.trim() === "" || strVal === "-" || strVal === ".") {
      setValidationError("");
      return;
    }

    const parsed = parseFloat(strVal);
    if (isNaN(parsed)) {
      setValidationError("Please enter a valid number");
      return;
    }

    if (!isNegativeAllowed && parsed < 0) {
      setValidationError("Negative numbers are not allowed");
      return;
    }

    if (min !== undefined && parsed < min) {
      setValidationError(`Minimum value is ${prefix || ""}${min.toLocaleString("en-IN")}${suffix || ""}`);
      return;
    }

    if (max !== undefined && parsed > max) {
      setValidationError(`Maximum value is ${prefix || ""}${max.toLocaleString("en-IN")}${suffix || ""}`);
      return;
    }

    setValidationError("");
    // Update live calculation when within valid bounds
    onChange(parsed);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawText(raw);
    validateAndNotify(raw);
  };

  const commitValue = () => {
    setIsFocused(false);
    let parsed = parseFloat(rawText);

    if (isNaN(parsed)) {
      parsed = min !== undefined ? min : 0;
    }

    // Clamp
    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;
    if (!isNegativeAllowed && parsed < 0) parsed = 0;

    // Round to step / decimals
    const factor = Math.pow(10, decimals);
    const stepped = Math.round(parsed / step) * step;
    const finalVal = Math.round(stepped * factor) / factor;

    onChange(finalVal);
    setRawText(formatNumber(finalVal));
    setValidationError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitValue();
      (e.target as HTMLInputElement).blur();
    }
  };

  const displayedError = customError || validationError;

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </label>
          {(min !== undefined || max !== undefined) && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              Range: {prefix || ""}{min !== undefined ? min.toLocaleString("en-IN") : "−∞"} to {prefix || ""}{max !== undefined ? max.toLocaleString("en-IN") : "+∞"}{suffix || ""}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center rounded-xl bg-white/90 dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-xs dark:shadow-inner transition-all overflow-hidden">
        {prefix && (
          <div className="px-3 py-2 bg-slate-100 dark:bg-white/[0.04] border-r border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 select-none">
            {prefix}
          </div>
        )}

        <input
          type="text"
          inputMode="decimal"
          value={rawText}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={commitValue}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || (min !== undefined ? min.toString() : "0")}
          disabled={disabled}
          className={cn(
            "w-full h-10 px-3.5 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none disabled:opacity-50 touch-manipulation",
            inputClassName
          )}
        />

        {suffix && (
          <div className="px-3 py-2 bg-slate-100 dark:bg-white/[0.04] border-l border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 select-none shrink-0">
            {suffix}
          </div>
        )}
      </div>

      {/* Preset Quick Buttons */}
      {presets && presets.length > 0 && (
        <div className="flex items-center gap-1.5 pt-1 flex-wrap touch-manipulation">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mr-1">Quick Values:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(p.value);
                setRawText(formatNumber(p.value));
                setValidationError("");
              }}
              disabled={disabled}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer touch-manipulation active:scale-95",
                value === p.value
                  ? "bg-indigo-600 text-white shadow-xs border border-indigo-500"
                  : "bg-slate-100 dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-white"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}


      {displayedError ? (
        <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">{displayedError}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
