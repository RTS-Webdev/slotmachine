import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
