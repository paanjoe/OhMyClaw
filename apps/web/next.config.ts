import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
};

// Only run OpenNext Cloudflare dev init when explicitly enabled (for testing Workers bindings).
// Default `pnpm dev` runs standard Next.js so the app works without Wrangler.
if (process.env.ENABLE_CLOUDFLARE_DEV === "1") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
