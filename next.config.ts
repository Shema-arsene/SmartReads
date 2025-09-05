import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "assets.production.scribd.com",
      },
      {
        protocol: "http",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

export default nextConfig
