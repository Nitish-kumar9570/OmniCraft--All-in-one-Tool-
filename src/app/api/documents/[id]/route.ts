import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export const runtime = "nodejs";

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

    // Delete document (RLS ensures user_id = auth.uid() and cascading removes chunks)
    const { error } = await (supabase.from("documents") as any)
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Document deleted successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete document" }, { status: 500 });
  }
}
