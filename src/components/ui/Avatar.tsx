"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl font-bold",
  };

  const getInitials = (n?: string | null) => {
    if (!n) return "";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center shrink-0 overflow-hidden font-semibold select-none border border-white/10 shadow-sm",
        sizeClasses[size],
        !src || imgError
          ? "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white"
          : "bg-slate-100 dark:bg-slate-800",
        className
      )}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name || "User Avatar"}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User className="w-1/2 h-1/2 text-white/90" />
      )}
    </div>
  );
}
