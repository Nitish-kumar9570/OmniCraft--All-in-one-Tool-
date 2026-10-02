import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { orchestrator } from "@/lib/ai/orchestrator";
import { generateTitleFromPrompt } from "@/lib/utils";
import { Citation, DeepResearchStep } from "@/types/research";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages,
      conversationId,
      model = "nova-pro",
      mode = "quick",
      webSearch = false,
      selectedDocIds = [],
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found in the payload" },
        { status: 400 }
      );
    }

    // Authenticate user via Supabase session
    let userId: string | null = null;
    let supabaseClient: any = null;

    try {
      supabaseClient = await createClient();
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (user) {
        userId = user.id;
      }
    } catch {
      console.log("Supabase session check skipped (local or unconfigured mode)");
    }

    // Save user message to database if conversationId is active
    let activeConversationId = conversationId;
    if (userId && supabaseClient && activeConversationId) {
      try {
        const { data: conv } = await supabaseClient
          .from("conversations")
          .select("id, title")
          .eq("id", activeConversationId)
          .eq("user_id", userId)
          .maybeSingle();

        if (!conv) {
          const { data: newConv } = await supabaseClient
            .from("conversations")
            .insert({
              id: activeConversationId,
              user_id: userId,
              title: generateTitleFromPrompt(lastUserMessage.content),
            })
            .select()
            .single();
          if (newConv) {
            activeConversationId = newConv.id;
          }
        }

        await supabaseClient.from("messages").insert({
          conversation_id: activeConversationId,
          user_id: userId,
          role: "user",
          content: lastUserMessage.content,
        });
      } catch (dbErr) {
        console.error("Error saving user message to database:", dbErr);
      }
    }

    // Set up Server-Sent Events (SSE) stream for orchestrator chunks
    const encoder = new TextEncoder();
    let accumulatedContent = "";
    let capturedCitations: Citation[] = [];
    const capturedResearchSteps: DeepResearchStep[] = [];
    let capturedContextType = "general";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await orchestrator.streamGroundedChat(
            {
              userId,
              messages,
              model,
              mode,
              webSearch,
              selectedDocIds,
            },
            (chunk) => {
              if (chunk.delta) {
                accumulatedContent += chunk.delta;
              }
              if (chunk.citations) {
                capturedCitations = chunk.citations;
              }
              if (chunk.researchStep) {
                capturedResearchSteps.push(chunk.researchStep);
              }
              if (chunk.contextType) {
                capturedContextType = chunk.contextType;
              }

              const data = JSON.stringify(chunk);
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          );

          // Save assistant message to Supabase upon stream completion
          if (userId && supabaseClient && activeConversationId && accumulatedContent) {
            try {
              await supabaseClient.from("messages").insert({
                conversation_id: activeConversationId,
                user_id: userId,
                role: "assistant",
                content: accumulatedContent,
              });

              // Update conversation timestamp & title
              const { data: currentConv } = await supabaseClient
                .from("conversations")
                .select("title")
                .eq("id", activeConversationId)
                .single();

              const updates: any = { updated_at: new Date().toISOString() };
              if (currentConv && (!currentConv.title || currentConv.title === "New conversation")) {
                updates.title = generateTitleFromPrompt(lastUserMessage.content);
              }

              await supabaseClient
                .from("conversations")
                .update(updates)
                .eq("id", activeConversationId);
            } catch (saveErr) {
              console.error("Error persisting assistant message:", saveErr);
            }
          }

          controller.close();
        } catch (streamErr: any) {
          console.error("Streaming error in orchestrator:", streamErr);
          const errorData = JSON.stringify({
            error: streamErr?.message || "Internal generation error",
            done: true,
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}
