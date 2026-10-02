import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking protection: only allow same origin framing
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // MIME type sniffing prevention
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referrer policy: send origin only when crossing origins
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Enforce modern TLS/HTTPS
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Permissions Policy: restrict sensor access except microphone for voice recorder tool
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), browsing-topics=()",
  },
  // Cross-Origin Opener Policy
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.37.131"],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
