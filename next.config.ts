import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://chat-app-backend-45zf.onrender.com/api/:path*",
      },
      {
        source: "/chat/:path*",
        destination: "https://chat-app-backend-45zf.onrender.com/chat/:path*",
      },
    ];
  },
};

export default nextConfig;
