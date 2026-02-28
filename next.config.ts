// next.config.ts - Konfigurasi Next.js untuk portfolio Wahid Nurhisyam
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aktifkan React strict mode untuk deteksi masalah lebih awal
  reactStrictMode: true,

  // Konfigurasi domain gambar yang diizinkan (ImageKit + placeholder)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Konfigurasi header untuk keamanan
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
