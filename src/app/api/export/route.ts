import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile
    const { data: profile } = await (supabase.from("profiles") as any)
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    // Fetch user conversations and messages
    const { data: conversations } = await (supabase.from("conversations") as any)
      .select("*, messages(*)")
      .eq("user_id", user.id);

    // Fetch user documents metadata
    const { data: documents } = await (supabase.from("documents") as any)
      .select("id, filename, mime_type, file_size, page_count, title, description, status, created_at")
      .eq("user_id", user.id);

    // Fetch user memories
    const { data: memories } = await (supabase.from("memories") as any)
      .select("id, content, category, importance, created_at, updated_at")
      .eq("user_id", user.id);

    const exportData = {
      exportVersion: "1.0",
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        profile,
      },
      conversations: conversations || [],
      documents: documents || [],
      memories: memories || [],
    };

    return NextResponse.json(exportData);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to export data" }, { status: 500 });
  }
}
