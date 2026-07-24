import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: [
      "https://fouqlwwzsvkishvhuhyb.storage.supabase.co",
      "https://fouqlwwzsvkishvhuhyb.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fouqlwwzsvkishvhuhyb.storage.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fouqlwwzsvkishvhuhyb.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
