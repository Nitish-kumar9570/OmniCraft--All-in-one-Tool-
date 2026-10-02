import { NextRequest, NextResponse } from "next/server";
import { TOOLS_REGISTRY } from "@/tools/registry";
import { CATEGORY_LIST } from "@/tools/categories";
import { BLOG_ARTICLES } from "@/lib/blogData";
import { siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");

  let baseUrl = siteConfig.url.replace(/\/+$/, "");
  if (host && (baseUrl.includes("localhost") || baseUrl === "https://omnicraft.dev")) {
    baseUrl = `${proto}://${host}`;
  }

  const currentDate = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { path: "", changefreq: "daily", priority: "1.0" },
    { path: "/tools", changefreq: "daily", priority: "0.9" },
    { path: "/categories", changefreq: "weekly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "monthly", priority: "0.6" },
    { path: "/terms", changefreq: "monthly", priority: "0.6" },
    { path: "/cookies", changefreq: "monthly", priority: "0.6" },
    { path: "/disclaimer", changefreq: "monthly", priority: "0.6" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls
    .map(
      (item) => `
    <url>
      <loc>${baseUrl}${item.path}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${item.changefreq}</changefreq>
      <priority>${item.priority}</priority>
    </url>`
    )
    .join("")}
  ${CATEGORY_LIST.map(
    (cat) => `
    <url>
      <loc>${baseUrl}/categories/${cat.slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
  ).join("")}
  ${TOOLS_REGISTRY.map(
    (tool) => `
    <url>
      <loc>${baseUrl}/tools/${tool.slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
  ).join("")}
  ${BLOG_ARTICLES.map(
    (art) => `
    <url>
      <loc>${baseUrl}/blog/${art.slug}</loc>
      <lastmod>${art.dateModified.split("T")[0] || currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
  ).join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
