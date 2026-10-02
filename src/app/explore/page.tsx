"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Search, Sparkles, Code2, PenTool, BookOpen, Compass, BarChart3, Lightbulb, ArrowUpRight, Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { useConversations } from "@/hooks/useConversations";
import { copyToClipboard } from "@/lib/utils";


interface ExploreCard {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
  tags: string[];
}

const EXPLORE_ITEMS: ExploreCard[] = [
  {
    id: "code-refactor",
    title: "Code Refactoring & Optimization",
    category: "coding",
    description: "Analyze code for performance bottlenecks, code smells, and modern TypeScript idioms.",
    prompt: "Review the following code for performance bottlenecks, algorithmic complexity, and refactor it into clean, idiomatic TypeScript with strict typing:\n\n[PASTE YOUR CODE HERE]",
    tags: ["TypeScript", "Performance", "Refactoring"],
  },
  {
    id: "sql-rls",
    title: "PostgreSQL RLS Policy Generator",
    category: "coding",
    description: "Generate robust Row Level Security policies with foreign key joins and audit triggers.",
    prompt: "Write a complete PostgreSQL schema with Row Level Security (RLS) policies for a multi-tenant application with organizations, teams, and member roles.",
    tags: ["SQL", "Postgres", "Security"],
  },
  {
    id: "tech-spec",
    title: "Technical Architecture RFC",
    category: "planning",
    description: "Draft a comprehensive Request for Comments (RFC) covering data models, endpoints, and trade-offs.",
    prompt: "Draft an Engineering Technical Specification (RFC) for a distributed real-time messaging pipeline, including schema design, latency targets, fault tolerance, and security.",
    tags: ["Architecture", "System Design", "RFC"],
  },
  {
    id: "product-launch",
    title: "Product Launch Strategy & Copy",
    category: "writing",
    description: "Craft compelling announcements, launch emails, and feature value propositions.",
    prompt: "Create a complete product launch announcement strategy for a next-generation AI platform, including headline hook, value propositions, key differentiators, and email copy.",
    tags: ["Marketing", "Copywriting", "Growth"],
  },
  {
    id: "system-design",
    title: "System Design Interview Prep",
    category: "learning",
    description: "Deep dive into distributed systems, load balancing, caching tiers, and rate limiting.",
    prompt: "Walk me through how to design a URL shortener system capable of handling 100M daily active users, detailing the database schema, hashing collisions, caching strategy, and API design.",
    tags: ["System Design", "Distributed Systems", "Interview"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Metric Synthesis",
    category: "analysis",
    description: "Extract actionable insights, cohort retention trends, and anomaly detection.",
    prompt: "Given a dataset of user onboarding drop-off points, analyze the core conversion funnel metrics, identify bottlenecks, and recommend 3 A/B test experiments to improve activation.",
    tags: ["Analytics", "Metrics", "Funnel"],
  },
  {
    id: "brainstorm-features",
    title: "Product Feature Ideation",
    category: "brainstorming",
    description: "Generate high-impact, innovative feature concepts tailored to user workflows.",
    prompt: "Brainstorm 7 innovative features for an AI workspace that reduce cognitive load and streamline context switching for software engineers.",
    tags: ["Innovation", "Product", "Ideation"],
  },
  {
    id: "research-summary",
    title: "Academic & Tech Paper Digest",
    category: "research",
    description: "Summarize complex research papers, extracting methodology, proofs, and conclusions.",
    prompt: "Summarize the core concepts of Transformer attention mechanisms, specifically Multi-Head Attention vs Grouped-Query Attention (GQA), highlighting memory savings and compute trade-offs.",
    tags: ["AI", "Transformers", "Research"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: Sparkles },
  { id: "coding", label: "Coding", icon: Code2 },
  { id: "writing", label: "Writing", icon: PenTool },
  { id: "learning", label: "Learning", icon: BookOpen },
  { id: "planning", label: "Planning", icon: Compass },
  { id: "analysis", label: "Data Analysis", icon: BarChart3 },
  { id: "brainstorming", label: "Brainstorming", icon: Lightbulb },
];

export default function ExplorePage() {
  const router = useRouter();
  const { createConversation } = useConversations();
  const { success } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLaunchChat = async (prompt: string) => {
    const newId = await createConversation("New conversation");
    if (newId) {
      router.push(`/chat/${newId}`);
    } else {
      router.push("/chat");
    }
  };

  const handleCopyPrompt = async (id: string, prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopiedId(id);
      success("Prompt copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };


  return (
    <DashboardShell title="Explore OmniCraft Templates">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Explore Prompt Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Discover curated prompts and workflows to accelerate coding, writing, research, and planning.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompt templates, tags, or topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLaunchChat(item.prompt)}
              className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopyPrompt(item.id, item.prompt, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Copy prompt"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
