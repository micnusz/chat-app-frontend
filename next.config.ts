import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://chat-app-backend-45zf.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
