import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolId } = body;

    try {
      const { user, supabase } = await getAuthenticatedUser();
      if (supabase && toolId) {
        // Record anonymous tool usage metric
        await (supabase.from("tool_usage") as any).insert({
          tool_id: toolId,
          user_id: user?.id || null,
          processing_time_ms: 120,
          success: true,
        });

        if (user) {
          await (supabase.from("recent_tools") as any).upsert({
            user_id: user.id,
            tool_id: toolId,
            used_at: new Date().toISOString(),
          });
        }
      }
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
