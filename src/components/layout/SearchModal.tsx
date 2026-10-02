"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Wrench,
  Zap,
  Upload,
  Braces,
  Clipboard,
  Heart,
  Clock,
  Layers,
  FolderKanban,
  FileText,
} from "lucide-react";
import { searchTools } from "@/tools/search";
import { ToolDefinition } from "@/tools/types";
import { TOOL_CATEGORIES } from "@/tools/categories";
import { getPopularTools } from "@/tools/registry";
import { cn } from "@/lib/utils";

interface ConversationItem {
  id: string;
  title: string;
  updated_at?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations?: ConversationItem[];
}

type UnifiedSearchResult =
  | {
      type: "tool";
      id: string;
      title: string;
      description: string;
      category: string;
      url: string;
      tool: ToolDefinition;
    }
  | {
      type: "action";
      id: string;
      title: string;
      description: string;
      category: string;
      url: string;
      icon: any;
    }
  | {
      type: "conversation";
      id: string;
      title: string;
      description: string;
      category: string;
      url: string;
    };

const QUICK_ACTIONS = [
  { id: "act-drop", title: "Universal File Drop", description: "Inspect file and find compatible tools", url: "/#universal-drop", icon: Upload },
  { id: "act-workspace", title: "Open Workspace", description: "View temporary files & saved outputs", url: "/workspace", icon: FolderKanban },
  { id: "act-favorites", title: "My Favorites", description: "View starred tools", url: "/favorites", icon: Heart },
  { id: "act-history", title: "Recently Used", description: "View tool execution history", url: "/history", icon: Clock },
];

export function SearchModal({ isOpen, onClose, conversations }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "tools" | "actions">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Compute unified results
  const results: UnifiedSearchResult[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const list: UnifiedSearchResult[] = [];

    // Quick Actions (included if query is empty or matches)
    if (activeFilter === "all" || activeFilter === "actions") {
      const matchedActions = trimmed
        ? QUICK_ACTIONS.filter((a) => a.title.toLowerCase().includes(trimmed) || a.description.toLowerCase().includes(trimmed))
        : !trimmed ? QUICK_ACTIONS.slice(0, 3) : [];

      matchedActions.forEach((act) => {
        list.push({
          type: "action",
          id: act.id,
          title: act.title,
          description: act.description,
          category: "Quick Action",
          url: act.url,
          icon: act.icon,
        });
      });
    }

    // Matching Tools
    if (activeFilter === "all" || activeFilter === "tools") {
      const toolResults = trimmed ? searchTools(trimmed, 8) : getPopularTools(6);
      toolResults.forEach((tool) => {
        const cat = TOOL_CATEGORIES[tool.category];
        list.push({
          type: "tool",
          id: `tool-${tool.id}`,
          title: tool.name,
          description: tool.description,
          category: cat?.name || tool.category,
          url: `/tools/${tool.slug}`,
          tool,
        });
      });
    }

    // Chat conversations
    if (conversations && conversations.length > 0 && trimmed) {
      const matchingConvs = conversations
        .filter((c) => c.title.toLowerCase().includes(trimmed))
        .slice(0, 2);

      matchingConvs.forEach((conv) => {
        list.push({
          type: "conversation",
          id: `conv-${conv.id}`,
          title: conv.title,
          description: "Saved Chat Conversation",
          category: "Chat",
          url: `/chat/${conv.id}`,
        });
      });
    }

    return list;
  }, [query, activeFilter, conversations]);

  const activeIndex = results.length > 0 ? Math.min(Math.max(0, selectedIndex), results.length - 1) : 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 30);
      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    }
  }, [activeIndex]);

  const handleSelectResult = useCallback(
    (item?: UnifiedSearchResult) => {
      const target = item || results[activeIndex];
      if (target) {
        router.push(target.url);
        onClose();
      } else if (query.trim()) {
        router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
        onClose();
      }
    },
    [results, activeIndex, query, router, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length === 0 ? 0 : (prev + 1) % results.length));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length === 0 ? 0 : (prev - 1 + results.length) % results.length));
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleSelectResult();
        return;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown, true);
  }, [isOpen, results, handleSelectResult, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-3 sm:pt-16 px-2.5 sm:px-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-xs sm:backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto overscroll-contain pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette and search"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#090e1c] border border-slate-200/90 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/90 dark:bg-[#0c1322]/80 select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>OmniCraft Command Palette</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-white/10 px-1.5 py-0.5 rounded">
              ESC to close
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="flex items-center px-4 sm:px-5 border-b border-slate-200/80 dark:border-white/[0.08] bg-transparent">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools & intents: 'make image smaller', 'clean json', 'pdf'..."
            className="w-full py-3.5 sm:py-4.5 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-medium"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#070b14]/50 overflow-x-auto scrollbar-none text-xs">
          {(["all", "tools", "actions"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIndex(0);
              }}
              className={cn(
                "px-2.5 py-1 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-colors cursor-pointer",
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div ref={resultsContainerRef} className="p-2 sm:p-3 max-h-[60vh] sm:max-h-96 overflow-y-auto space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <div className="text-xs text-slate-500 font-mono">
                No matching results found for &quot;{query}&quot;.
              </div>
              <p className="text-xs text-slate-400">
                Try &quot;make image smaller&quot;, &quot;clean json&quot;, &quot;pdf&quot;, or &quot;workspace&quot;.
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 select-none min-h-[48px]",
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 translate-x-1"
                      : "hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-300"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "p-2 rounded-xl shrink-0 transition-colors",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-indigo-50 dark:bg-white/[0.07] text-indigo-600 dark:text-indigo-400 border border-indigo-100/80 dark:border-white/[0.05]"
                      )}
                    >
                      {item.type === "action" ? (
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Wrench className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold truncate">{item.title}</span>
                        <span
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/[0.05]"
                          )}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-xs line-clamp-1 mt-0.5",
                          isSelected ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "w-4 h-4 shrink-0 ml-2 transition-transform",
                      isSelected ? "text-white translate-x-0.5" : "text-slate-400"
                    )}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-50/90 dark:bg-[#070b15] border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 select-none font-mono">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
              ENTER
            </kbd>{" "}
            select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
              ESC
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
