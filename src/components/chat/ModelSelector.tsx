"use client";

import React, { useState, useRef, useEffect } from "react";
import { ModelId, ModelOption } from "@/types/chat";
import { Sparkles, Zap, Brain, Palette, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  selectedModel: ModelId;
  onSelectModel: (model: ModelId) => void;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "nova-pro",
    name: "OmniCraft Pro",
    tagline: "Most capable & deep reasoning",
    description: "Ideal for complex coding, architectural design, analysis, and detailed writing.",
    icon: "Sparkles",
    badge: "Default",
  },
  {
    id: "nova-fast",
    name: "OmniCraft Fast",
    tagline: "Instant responses & quick answers",
    description: "Ultra-fast latency for everyday queries, quick edits, and summarization.",
    icon: "Zap",
    badge: "Speed",
  },
  {
    id: "nova-reasoning",
    name: "OmniCraft Reasoning",
    tagline: "Step-by-step logical synthesis",
    description: "Specialized for advanced logic, algorithms, mathematics, and debugging.",
    icon: "Brain",
    badge: "Thinking",
  },
  {
    id: "nova-creative",
    name: "OmniCraft Creative",
    tagline: "Rich stylistic prose & brainstorming",
    description: "Optimized for creative writing, marketing copy, and out-of-the-box ideation.",
    icon: "Palette",
  },
];

export function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);


  const getIcon = (id: ModelId) => {
    switch (id) {
      case "nova-fast":
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case "nova-reasoning":
        return <Brain className="w-3.5 h-3.5 text-emerald-400" />;
      case "nova-creative":
        return <Palette className="w-3.5 h-3.5 text-pink-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-colors select-none"
        aria-label="Select AI Model"
      >
        {getIcon(current.id)}
        <span>{current.name}</span>
        <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select OmniCraft Model
          </div>
          {AVAILABLE_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onSelectModel(model.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors",
                selectedModel === model.id
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              )}
            >
              <div className="shrink-0 mt-0.5 p-1 rounded-md bg-slate-100 dark:bg-slate-800">
                {getIcon(model.id)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{model.name}</span>
                  {model.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-medium">
                      {model.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {model.tagline}
                </p>
              </div>
              {selectedModel === model.id && (
                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
