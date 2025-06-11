import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },

  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "/dashboard",
        },
      ],
    };
  },
};

export default nextConfig;
