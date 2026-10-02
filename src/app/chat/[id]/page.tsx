import { Suspense } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { createClient } from "@/lib/supabase/server";
import { ChatMessage } from "@/types/chat";
import type { Metadata } from "next";

interface ChatIdPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ doc?: string }>;
}

export async function generateMetadata({ params }: ChatIdPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const supabase = await createClient();
    const { data: conv } = await (supabase.from("conversations") as any)
      .select("title")
      .eq("id", id)
      .maybeSingle();

    return {
      title: conv?.title ? `${conv.title} - OmniCraft AI` : "Chat - OmniCraft AI",
    };
  } catch {
    return {
      title: "Chat - OmniCraft AI",
    };
  }
}

export default async function ChatDetailPage({ params, searchParams }: ChatIdPageProps) {
  const { id } = await params;
  const sParams = searchParams ? await searchParams : {};
  const docId = sParams.doc;

  let conversationTitle = "Conversation";
  let formattedMessages: ChatMessage[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Fetch conversation (RLS enforces user_id = auth.uid())
    const { data: conv } = await (supabase.from("conversations") as any)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (conv) {
      conversationTitle = conv.title || "Conversation";

      // Fetch messages for this conversation
      const { data: messagesData } = await (supabase.from("messages") as any)
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      if (messagesData) {
        formattedMessages = messagesData.map((m: any) => ({
          id: m.id,
          conversationId: m.conversation_id,
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
          createdAt: m.created_at,
        }));
      }
    } else if (user) {
      console.log("Conversation not found or unauthorized:", id);
    }
  } catch (err) {
    console.error("Error loading chat in server component:", err);
  }

  return (
    <DashboardShell title={conversationTitle}>
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading conversation...</div>}>
        <ChatWindow
          conversationId={id}
          initialMessages={formattedMessages}
          initialDocId={docId}
        />
      </Suspense>
    </DashboardShell>
  );
}
