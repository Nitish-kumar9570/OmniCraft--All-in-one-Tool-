import { createClient } from "@/lib/supabase/server";
import { CONFIG_LIMITS } from "@/lib/config";

export { CONFIG_LIMITS };

export async function getAuthenticatedUser() {
  const guestUser = {
    id: "guest_user",
    email: "guest@omnicraft.local",
    user_metadata: { full_name: "Guest User" },
  };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return { user, supabase, error: null };
    }
    return { user: guestUser, supabase, error: null };
  } catch {
    return { user: guestUser, supabase: null as any, error: null };
  }
}

export function sanitizeFilename(filename: string): string {
  const clean = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return clean.slice(0, 120);
}
