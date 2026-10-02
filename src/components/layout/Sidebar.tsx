"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OmniCraftLogo } from "@/components/ui/OmniCraftLogo";
import { SearchModal } from "./SearchModal";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Search,
  MessageSquare,
  Compass,
  FileText,
  Brain,
  Settings,
  MoreHorizontal,
  Trash2,
  Edit2,
  ChevronLeft,
  Sliders,
} from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
  onCloseMobile?: () => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { conversations, createConversation, deleteConversation, renameConversation } = useConversations();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingConv, setEditingConv] = useState<{ id: string; title: string } | null>(null);
  const [deletingConvId, setDeletingConvId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleNewChat = async () => {
    const newId = await createConversation("New conversation");
    if (newId) {
      router.push(`/chat/${newId}`);
      onCloseMobile?.();
    } else {
      router.push("/chat");
      onCloseMobile?.();
    }
  };

  useKeyboardShortcuts({
    onSearch: () => setIsSearchOpen((prev) => !prev),
    onNewChat: handleNewChat,
  });

  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConv && editingConv.title.trim()) {
      await renameConversation(editingConv.id, editingConv.title.trim());
      setEditingConv(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingConvId) {
      await deleteConversation(deletingConvId);
      if (pathname === `/chat/${deletingConvId}`) {
        router.push("/chat");
      }
      setDeletingConvId(null);
    }
  };

  const groupConversations = () => {
    const now = new Date();
    const today: typeof conversations = [];
    const yesterday: typeof conversations = [];
    const previous7Days: typeof conversations = [];
    const older: typeof conversations = [];

    conversations.forEach((c) => {
      const date = new Date(c.updated_at);
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

      if (diffInDays === 0) today.push(c);
      else if (diffInDays === 1) yesterday.push(c);
      else if (diffInDays < 7) previous7Days.push(c);
      else older.push(c);
    });

    return { today, yesterday, previous7Days, older };
  };

  const groups = groupConversations();

  const navLinks = [
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/library", label: "Knowledge & Docs", icon: FileText },
    { href: "/library?tab=memories", label: "Memories", icon: Brain },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <aside
        className={cn(
          "flex flex-col h-full bg-[#f8fafc] dark:bg-[#0b1120] border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 select-none z-30",
          isCollapsed ? "w-[68px]" : "w-[260px]"
        )}
      >
        {/* Top Branding & Collapse Button */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link href="/chat" className="flex items-center gap-2 overflow-hidden" onClick={onCloseMobile}>
            <OmniCraftLogo size="sm" showText={!isCollapsed} />
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </button>
        </div>

        {/* Action Controls: New Chat & Search */}
        <div className="p-3 space-y-2">
          <button
            type="button"
            onClick={handleNewChat}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm hover:shadow-indigo-500/25 transition-all duration-150 active:scale-[0.98] cursor-pointer touch-manipulation",
              isCollapsed && "px-0"
            )}
            title="New Chat (Cmd+J)"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            {!isCollapsed && <span>New Chat</span>}
          </button>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "w-full flex items-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 text-xs transition-colors cursor-pointer touch-manipulation",
              isCollapsed ? "justify-center px-0" : "justify-between"
            )}
            title="Search Conversations (Cmd+K)"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 shrink-0" />
              {!isCollapsed && <span className="truncate">Search chats...</span>}
            </div>
            {!isCollapsed && (
              <kbd className="hidden sm:inline text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            )}
          </button>
        </div>

        {/* App Navigation Links */}
        <div className="px-3 py-1 space-y-0.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/chat"
                ? pathname.startsWith("/chat")
                : item.href.includes("?tab=")
                ? pathname === "/library" && typeof window !== "undefined" && window.location.search.includes("memories")
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200",
                  isCollapsed && "justify-center px-0"
                )}
                title={item.label}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Separator */}
        <div className="mx-3 my-2 border-t border-slate-200/80 dark:border-slate-800/80" />

        {/* Conversation History */}
        {!isCollapsed ? (
          <div className="flex-1 overflow-y-auto px-3 space-y-4">
            {conversations.length === 0 ? (
              <div className="px-2 py-4 text-center text-xs text-slate-400">
                No chat history yet. Start a new conversation!
              </div>
            ) : (
              <>
                {[
                  { label: "Today", items: groups.today },
                  { label: "Yesterday", items: groups.yesterday },
                  { label: "Previous 7 Days", items: groups.previous7Days },
                  { label: "Older", items: groups.older },
                ].map((group) => {
                  if (group.items.length === 0) return null;
                  return (
                    <div key={group.label} className="space-y-1">
                      <p className="px-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {group.label}
                      </p>
                      {group.items.map((conv) => {
                        const isSelected = pathname === `/chat/${conv.id}`;
                        return (
                          <div
                            key={conv.id}
                            className={cn(
                              "group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer",
                              isSelected
                                ? "bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/40 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                            onClick={() => {
                              router.push(`/chat/${conv.id}`);
                              onCloseMobile?.();
                            }}
                          >
                            <span className="truncate pr-4 flex-1">{conv.title}</span>

                            <div className="relative shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpenId(menuOpenId === conv.id ? null : conv.id);
                                }}
                                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-1 rounded-md hover:bg-slate-300/60 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-opacity touch-manipulation cursor-pointer"
                                aria-label="Conversation options"
                              >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>

                              {menuOpenId === conv.id && (
                                <div
                                  className="absolute right-0 top-full mt-1 w-32 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-40"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingConv({ id: conv.id, title: conv.title });
                                      setMenuOpenId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer touch-manipulation"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    Rename
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeletingConvId(conv.id);
                                      setMenuOpenId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-left cursor-pointer touch-manipulation"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-2 flex flex-col items-center gap-2">
            {conversations.slice(0, 5).map((conv) => (
              <button
                type="button"
                key={conv.id}
                onClick={() => {
                  router.push(`/chat/${conv.id}`);
                  onCloseMobile?.();
                }}
                className={cn(
                  "p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-manipulation",
                  pathname === `/chat/${conv.id}` && "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                )}
                title={conv.title}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}

        {/* Bottom Workspace Navigation Area */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <Link
            href="/settings"
            onClick={onCloseMobile}
            className={cn(
              "w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors text-left cursor-pointer touch-manipulation",
              isCollapsed && "justify-center p-1"
            )}
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  Local Workspace
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Preferences & Settings
                </p>
              </div>
            )}
          </Link>
        </div>

      </aside>

      {/* Rename Dialog Modal */}
      <Modal isOpen={Boolean(editingConv)} onClose={() => setEditingConv(null)} title="Rename Conversation">
        <form onSubmit={handleRenameSubmit} className="space-y-4">
          <Input
            label="Conversation Title"
            value={editingConv?.title || ""}
            onChange={(e) => setEditingConv((prev) => (prev ? { ...prev, title: e.target.value } : null))}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditingConv(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Title
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingConvId)}
        onClose={() => setDeletingConvId(null)}
        title="Delete Conversation"
        description="Are you sure you want to delete this conversation? This action cannot be undone."
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setDeletingConvId(null)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" size="sm" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      </Modal>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} conversations={conversations} />
    </>
  );
}
