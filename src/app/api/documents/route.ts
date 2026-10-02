import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's documents ordered by creation date
    const { data: docs, error } = await (supabase.from("documents") as any)
      .select("id, user_id, filename, mime_type, file_size, status, page_count, title, description, metadata, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ documents: docs || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch documents" }, { status: 500 });
  }
}
