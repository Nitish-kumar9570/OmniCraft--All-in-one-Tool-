import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";
import { generateEmbedding } from "@/lib/retrieval/vector-search";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: memories, error } = await (supabase.from("memories") as any)
      .select("*")
      .eq("user_id", user.id)
      .order("importance", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ memories: memories || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch memories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, category = "fact", importance = 3, metadata = {} } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Memory content is required." }, { status: 400 });
    }

    const embedding = await generateEmbedding(content.trim());

    const { data: memory, error } = await (supabase.from("memories") as any)
      .insert({
        user_id: user.id,
        content: content.trim(),
        category,
        importance: Math.min(5, Math.max(1, importance)),
        embedding: JSON.stringify(embedding),
        metadata,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ memory, message: "Memory saved successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save memory" }, { status: 500 });
  }
}
