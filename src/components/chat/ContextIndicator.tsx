"use client";

import React from "react";
import { Lock, Globe, Sparkles, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextIndicatorProps {
  contextType?: "private" | "web" | "hybrid" | "memory" | "general";
  isGrounded?: boolean;
}

export function ContextIndicator({ contextType = "general", isGrounded = false }: ContextIndicatorProps) {
  if (!isGrounded || contextType === "general") return null;

  const configs = {
    private: {
      label: "Private Knowledge Grounded",
      icon: Lock,
      className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
    web: {
      label: "Web Research Verified",
      icon: Globe,
      className: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    },
    hybrid: {
      label: "Private Knowledge + Web Research",
      icon: Sparkles,
      className: "bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30",
    },
    memory: {
      label: "Personal Memory Applied",
      icon: Brain,
      className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
    general: {
      label: "",
      icon: Sparkles,
      className: "",
    },
  };

  const config = configs[contextType] || configs.general;
  if (!config.label) return null;

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold tracking-tight shadow-xs select-none",
        config.className
      )}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </div>
  );
}
