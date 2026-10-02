"use client";

import React from "react";
import Link from "next/link";
import { ToolDefinition } from "@/tools/types";
import { TOOL_CATEGORIES } from "@/tools/categories";
import { useFavorites } from "@/hooks/useFavorites";
import {
  FileText,
  Image as ImageIcon,
  QrCode,
  ArrowLeftRight,
  Calculator,
  Type,
  Code2,
  Search,
  Sparkles,
  Video,
  Music,
  Sheet,
  ShieldCheck,
  Globe,
  Share2,
  Palette,
  Clock,
  Heart,
  ArrowUpRight,
  TrendingUp,
  Sparkle,
} from "lucide-react";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolDefinition;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const category = TOOL_CATEGORIES[tool.category];
  const favorited = isFavorite(tool.id);

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case "pdf": return <FileText className="w-5 h-5" />;
      case "image": return <ImageIcon className="w-5 h-5" />;
      case "qr-barcode": return <QrCode className="w-5 h-5" />;
      case "converters": return <ArrowLeftRight className="w-5 h-5" />;
      case "calculators": return <Calculator className="w-5 h-5" />;
      case "text": return <Type className="w-5 h-5" />;
      case "developer": return <Code2 className="w-5 h-5" />;
      case "seo": return <Search className="w-5 h-5" />;
      case "ai": return <Sparkles className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      case "audio": return <Music className="w-5 h-5" />;
      case "office": return <Sheet className="w-5 h-5" />;
      case "security": return <ShieldCheck className="w-5 h-5" />;
      case "web": return <Globe className="w-5 h-5" />;
      case "social": return <Share2 className="w-5 h-5" />;
      case "design": return <Palette className="w-5 h-5" />;
      case "productivity": return <Clock className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-5 rounded-2xl select-none text-left",
        "bg-white/80 dark:bg-[#0c1322]/70 backdrop-blur-xl",
        "border border-slate-200/90 dark:border-white/[0.08]",
        "shadow-xs hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/15",
        "hover:border-indigo-500/50 dark:hover:border-indigo-500/50",
        "transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        {/* Top bar: category badge, Badges, Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Link
            href={`/categories/${category?.slug || tool.category}`}
            className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.07] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-white/[0.08] transition-colors"
          >
            {category?.name || tool.category}
          </Link>

          <div className="flex items-center gap-1.5">
            {tool.isPopular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shadow-xs">
                <TrendingUp className="w-3 h-3" /> Popular
              </span>
            )}
            {tool.isNew && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                <Sparkle className="w-3 h-3" /> New
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(tool.id);
              }}
              className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer active:scale-110 touch-manipulation relative z-10"
              title={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("w-4 h-4 transition-transform", favorited && "fill-rose-500 text-rose-500")} />
            </button>

          </div>
        </div>

        {/* Icon & Title */}
        <Link href={`/tools/${tool.slug}`} className="block">
          <div className="flex items-start gap-3.5 mb-2">
            <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-white/[0.05] border border-indigo-100 dark:border-white/[0.05] text-indigo-600 dark:text-indigo-400 transition-colors duration-200 shrink-0 shadow-xs">
              {getCategoryIcon(tool.category)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer CTA */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
        <PrivacyBadge tool={tool} size="sm" />

        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
        >
          <span>Run Tool</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
