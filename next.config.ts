// cms-dashboard/next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Method 1: Use specific domains (list domains explicitly)
    // domains: ["example.com", "another-domain.com"],

    // Method 2: Allow all domains using remotePatterns
    remotePatterns: [
      {
        protocol: "http", // Allow HTTP protocol
        hostname: "**", // Allows all hostnames
      },
      {
        protocol: "https", // Allow HTTPS protocol
        hostname: "**", // Allows all hostnames
      },
    ],
  },
};

export default nextConfig;
