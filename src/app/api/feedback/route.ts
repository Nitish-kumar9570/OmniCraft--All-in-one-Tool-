/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/security/authorization";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      toolId,
      isHelpful,
      message,
      name,
      email,
      category,
      rating,
      source,
      pageUrl,
    } = body;

    let emailJsSent = false;
    let emailJsError = "";

    // 1. Check if EmailJS credentials exist on the server to send via EmailJS REST API
    const serviceId =
      process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey =
      process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_SECRET_KEY;

    const hasValidEmailJsKeys =
      serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes("your_") &&
      !publicKey.includes("your_");

    if (hasValidEmailJsKeys && (email || message)) {
      try {
        const templateParams = {
          // Name aliases
          from_name: String(name || "").trim() || "Anonymous User",
          name: String(name || "").trim() || "Anonymous User",
          user_name: String(name || "").trim() || "Anonymous User",

          // Email aliases
          reply_to: String(email || "").trim(),
          user_email: String(email || "").trim(),
          from_email: String(email || "").trim(),
          email: String(email || "").trim(),

          // Category & Subject aliases
          category: String(category || "General Feedback"),
          feedback_type: String(category || "General Feedback"),
          subject: `[${category || "Feedback"}] OmniCraft Feedback from ${name || "User"}`,

          // Rating aliases
          rating: rating ? `${rating} / 5 Stars` : "Not provided",
          stars: rating || 5,
          score: rating || 5,

          // Message aliases
          message: String(message || "").trim(),
          user_message: String(message || "").trim(),
          feedback: String(message || "").trim(),
          comments: String(message || "").trim(),

          // Meta
          page_url: pageUrl || req.headers.get("referer") || "https://omnicraft.app",
          url: pageUrl || req.headers.get("referer") || "https://omnicraft.app",
          submitted_at: new Date().toLocaleString(),
          timestamp: new Date().toISOString(),
        };

        const emailJsPayload: Record<string, any> = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        };

        if (privateKey) {
          emailJsPayload.accessToken = privateKey;
        }

        const emailJsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailJsPayload),
        });

        if (emailJsRes.ok) {
          emailJsSent = true;
        } else {
          const errText = await emailJsRes.text();
          emailJsError = errText || `EmailJS returned status ${emailJsRes.status}`;
          console.warn("Server EmailJS dispatch returned error:", emailJsError);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed server EmailJS dispatch";
        emailJsError = msg;
        console.warn("Server EmailJS fetch error:", msg);
      }
    }

    // 2. Database Recording (Supabase)
    try {
      const { user, supabase } = await getAuthenticatedUser();
      if (supabase) {
        if (toolId) {
          await (supabase.from("tool_feedback") as any).insert({
            tool_id: toolId,
            user_id: user?.id || null,
            is_helpful: Boolean(isHelpful),
            message: message || null,
          });
        }

        if (name || email || category) {
          await (supabase.from("contact_messages") as any).insert({
            name: String(name || "Anonymous").slice(0, 100),
            email: String(email || "no-email@feedback.user").slice(0, 100),
            subject: `[${category || "Feedback"}] Rating: ${rating || "N/A"} - via ${source || "web"}`.slice(0, 200),
            message: String(message || "No comment provided").slice(0, 2000),
          });
        }
      }
    } catch {}

    return NextResponse.json({
      success: true,
      message: emailJsSent
        ? "Feedback sent successfully via EmailJS!"
        : hasValidEmailJsKeys
        ? `Feedback saved (EmailJS: ${emailJsError || "processed"})`
        : "Feedback recorded successfully.",
      emailJsConfigured: Boolean(hasValidEmailJsKeys),
      emailJsSent,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to record feedback";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
