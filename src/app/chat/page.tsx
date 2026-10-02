import { Suspense } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChatWindow } from "@/components/chat/ChatWindow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - OmniCraft AI",
  description: "Chat with OmniCraft AI, your private personal AI partner with grounded document and web research.",
};

interface ChatPageProps {
  searchParams?: Promise<{ doc?: string }>;
}

export default async function ChatHomePage({ searchParams }: ChatPageProps) {
  const params = searchParams ? await searchParams : {};
  const docId = params.doc;

  return (
    <DashboardShell title="New Chat">
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading chat...</div>}>
        <ChatWindow initialDocId={docId} />
      </Suspense>
    </DashboardShell>
  );
}
