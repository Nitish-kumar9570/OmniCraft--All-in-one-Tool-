import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";
import { generateEmbedding } from "@/lib/retrieval/vector-search";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, category, importance } = body;

    const updates: any = { updated_at: new Date().toISOString() };
    if (content) {
      updates.content = content.trim();
      const embedding = await generateEmbedding(content.trim());
      updates.embedding = JSON.stringify(embedding);
    }
    if (category) updates.category = category;
    if (importance) updates.importance = Math.min(5, Math.max(1, importance));

    const { data: memory, error } = await (supabase.from("memories") as any)
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ memory, message: "Memory updated successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update memory" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await (supabase.from("memories") as any)
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Memory deleted successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete memory" }, { status: 500 });
  }
}
