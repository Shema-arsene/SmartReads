import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "assets.production.scribd.com",
      "images.pexels.com",
      "res.cloudinary.com",
    ],
  },
}

export default nextConfig
