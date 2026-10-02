import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required contact fields" }, { status: 400 });
    }

    try {
      const { supabase } = await getAuthenticatedUser();
      if (supabase) {
        await (supabase.from("contact_messages") as any).insert({
          name: name.slice(0, 100),
          email: email.slice(0, 100),
          subject: (subject || "General Inquiry").slice(0, 200),
          message: message.slice(0, 2000),
        });
      }
    } catch {}

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to send message" }, { status: 500 });
  }
}
