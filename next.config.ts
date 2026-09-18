import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets `next dev` be reached via the production subdomains (mapped to
  // 127.0.0.1 in /etc/hosts for local testing) instead of only localhost.
  // Dev-only — next build/start ignore this entirely.
  allowedDevOrigins: [
    "joviawebsite.com.ng",
    "admin.joviawebsite.com.ng",
    "dashboard.joviawebsite.com.ng",
  ],
};

export default nextConfig;
