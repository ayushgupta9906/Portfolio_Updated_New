import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laserx.vercel.app',
      },
    ],
  },
  experimental: {
    turbopack: {
      root: '..',
    },
  },
};

export default nextConfig;
