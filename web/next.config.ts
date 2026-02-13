import type { NextConfig } from "next";

const nextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laserx.vercel.app',
      },
    ],
  },

};

export default nextConfig;
