"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { TopBar } from "./TopBar";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useRouter } from "next/navigation";
import { useConversations } from "@/hooks/useConversations";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { createConversation } = useConversations();

  useKeyboardShortcuts({
    onNewChat: async () => {
      const newId = await createConversation("New conversation");
      if (newId) {
        router.push(`/chat/${newId}`);
      } else {
        router.push("/chat");
      }
    },
    onToggleSidebar: () => {
      setIsCollapsed((prev) => !prev);
    },
  });

  return (
    <div className="flex h-screen h-[100dvh] w-full overflow-hidden bg-slate-50 dark:bg-[#070b14]">
      {/* Desktop Persistent Sidebar */}

      <div className="hidden md:flex h-full shrink-0">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <TopBar
          onOpenMobileSidebar={() => setMobileOpen(true)}
          title={title}
        />
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
