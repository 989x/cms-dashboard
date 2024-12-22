import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Method 1: Use specific domains (list domains explicitly)
    // domains: ["example.com", "another-domain.com"],

    // Method 2: Allow all domains using remotePatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all domains
      },
    ],
  },
};

export default nextConfig;
