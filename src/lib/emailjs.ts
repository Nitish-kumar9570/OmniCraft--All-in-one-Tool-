import emailjs from "@emailjs/browser";

export interface FeedbackPayload {
  name: string;
  email: string;
  category: string;
  rating?: number;
  message: string;
  pageUrl?: string;
}

export interface FeedbackResult {
  success: boolean;
  message: string;
  via: "emailjs" | "api" | "both";
  emailJsConfigured: boolean;
}

/**
 * Checks if EmailJS environment keys are properly configured.
 */
export function isEmailJSConfigured(): boolean {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes("your_") &&
    !publicKey.includes("your_")
  );
}

/**
 * Sends user feedback via EmailJS and records it in the backend API as a reliable fallback.
 */
export async function sendFeedbackEmail(payload: FeedbackPayload): Promise<FeedbackResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const currentUrl =
    payload.pageUrl ||
    (typeof window !== "undefined" ? window.location.href : "https://omnicraft.app");

  // Comprehensive template parameters matching any EmailJS template configuration
  const templateParams: Record<string, string | number> = {
    // Name aliases
    from_name: payload.name.trim() || "Anonymous User",
    name: payload.name.trim() || "Anonymous User",
    user_name: payload.name.trim() || "Anonymous User",

    // Email aliases
    reply_to: payload.email.trim(),
    user_email: payload.email.trim(),
    from_email: payload.email.trim(),
    email: payload.email.trim(),

    // Category & Subject aliases
    category: payload.category || "General Feedback",
    feedback_type: payload.category || "General Feedback",
    subject: `[${payload.category || "Feedback"}] OmniCraft Feedback from ${payload.name.trim() || "User"}`,

    // Rating aliases
    rating: payload.rating ? `${payload.rating} / 5 Stars` : "Not provided",
    stars: payload.rating || 5,
    score: payload.rating || 5,

    // Message aliases
    message: payload.message.trim(),
    user_message: payload.message.trim(),
    feedback: payload.message.trim(),
    comments: payload.message.trim(),

    // Meta
    page_url: currentUrl,
    url: currentUrl,
    submitted_at: new Date().toLocaleString(),
    timestamp: new Date().toISOString(),
  };

  let emailJsSuccess = false;
  let clientErrorMsg = "";
  const configured = isEmailJSConfigured();

  // 1. Try sending via EmailJS client library if keys exist
  if (serviceId && templateId && publicKey && configured) {
    try {
      // Initialize EmailJS with public key
      emailjs.init({ publicKey });

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200 || response.text === "OK") {
        emailJsSuccess = true;
      }
    } catch (err: unknown) {
      console.warn("Client-side EmailJS send encountered an error:", err);
      const errObj = err as Record<string, unknown>;
      clientErrorMsg = String(errObj?.text || errObj?.message || "Client EmailJS error");
    }
  }

  // 2. Also send to our /api/feedback route (which can record in DB AND also dispatch EmailJS via server REST API)
  let apiSuccess = false;
  let serverEmailJsSent = false;

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        category: payload.category,
        rating: payload.rating,
        message: payload.message,
        source: "lets_talk_footer",
        pageUrl: currentUrl,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      apiSuccess = true;
      if (data?.emailJsSent) {
        serverEmailJsSent = true;
      }
    }
  } catch (err) {
    console.warn("API recording error:", err);
  }

  if (emailJsSuccess || serverEmailJsSent) {
    return {
      success: true,
      message: "Feedback sent successfully via EmailJS!",
      via: emailJsSuccess && apiSuccess ? "both" : "emailjs",
      emailJsConfigured: true,
    };
  }

  if (apiSuccess) {
    return {
      success: true,
      message: configured
        ? `Feedback saved! (${clientErrorMsg || "Delivered via server"})`
        : "Feedback received and recorded successfully!",
      via: "api",
      emailJsConfigured: configured,
    };
  }

  return {
    success: false,
    message: clientErrorMsg || "Failed to submit feedback. Please check your network and try again.",
    via: "api",
    emailJsConfigured: configured,
  };
}
