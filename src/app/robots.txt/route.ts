import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");

  let baseUrl = siteConfig.url.replace(/\/+$/, "");
  if (host && (baseUrl.includes("localhost") || baseUrl === "https://omnicraft.dev")) {
    baseUrl = `${proto}://${host}`;
  }

  const robots = `# OmniCraft Production robots.txt
User-agent: *
Allow: /
Allow: /tools
Allow: /categories
Allow: /blog
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms
Allow: /cookies
Allow: /disclaimer

# Disallow private user workspaces, internal dashboards, admin, and backend APIs
Disallow: /admin
Disallow: /admin/
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /chat
Disallow: /chat/
Disallow: /api/
Disallow: /profile
Disallow: /settings
Disallow: /library

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
