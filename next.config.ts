import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  eslint: {
    // Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during builds
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "104mb",
      allowedOrigins: [
        'localhost:3000',                                       // your local dev URL
        'legendary-orbit-g47rrw7prq95394q7-3000.app.github.dev' // your Codespace host
      ],
    },
  },
  output: 'standalone',
  // Configure redirects for compatibility
  // async redirects() {
  //   return [
  //     {
  //       source: '/signin',
  //       destination: '/signin',
  //       permanent: true,
  //     },
  //     {
  //       source: '/signup',
  //       destination: '/signup',
  //       permanent: true,
  //     },
  //     {
  //       source: '/home',
  //       destination: '/home',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
