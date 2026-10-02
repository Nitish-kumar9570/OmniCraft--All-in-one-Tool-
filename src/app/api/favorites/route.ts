import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ success: true, message: "Stored locally for guest user." });
    }

    const { toolId, action } = await req.json();

    if (action === "add") {
      await (supabase.from("favorites") as any).upsert({
        user_id: user.id,
        tool_id: toolId,
      });
    } else {
      await (supabase.from("favorites") as any)
        .delete()
        .eq("user_id", user.id)
        .eq("tool_id", toolId);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
