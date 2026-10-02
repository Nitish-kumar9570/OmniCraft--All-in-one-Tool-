import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function generateTitleFromPrompt(prompt: string): string {
  const clean = prompt.replace(/[\n\r]+/g, " ").trim();
  if (clean.length <= 40) return clean;
  const words = clean.split(" ");
  let title = "";
  for (const word of words) {
    if ((title + " " + word).trim().length > 35) break;
    title += (title ? " " : "") + word;
  }
  return title ? `${title}...` : clean.slice(0, 35) + "...";
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(
    url &&
    key &&
    url.startsWith("https://") &&
    !url.includes("your-project-id") &&
    !url.includes("placeholder") &&
    !key.includes("dummy_anon_key") &&
    !key.includes("placeholder-anon-key")
  );
}

/**
 * Robust copy-to-clipboard function that works reliably on:
 * - Desktop browsers
 * - Mobile Safari (iOS)
 * - Chrome Android
 * - Insecure / Local network contexts (http://192.168.x.x) where navigator.clipboard is undefined
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !text) return false;

  // 1. Try modern navigator.clipboard API if available and in secure context
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to fallback
    }
  }

  // 2. Mobile-friendly textarea selection fallback
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-999999px";
    textArea.style.left = "-999999px";
    textArea.setAttribute("readonly", "");
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 999999);
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Trigger browser file download from a Blob or URL
 */
export function downloadBlob(blob: Blob | string, filename: string): void {
  if (typeof window === "undefined") return;
  const url = typeof blob === "string" ? blob : URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof blob !== "string") {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

