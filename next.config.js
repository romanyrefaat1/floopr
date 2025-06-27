const nextConfig = {
  // ML config to work with transformers.js
  webpack: (config) => {
    // These fallbacks are necessary for transformers.js to work
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      crypto: false,
      worker_threads: false,
      stream: false,
    };

    return config;
  },

  swcMinify: false, // Disable SWC minification for better compatibility with certain libraries
  swcMinifyOptions: {
    compress: {
      drop_console: true, // Remove console logs in production
    },
  },
  

  // Increase the serverless function timeout for ML model loading
  experimental: {
    serverActions: {
      bodySizeLimit: "104mb",
      allowedOrigins: [
        'localhost:3000',                                       // your local dev URL
        'legendary-orbit-g47rrw7prq95394q7-3000.app.github.dev' // your Codespace host
      ],
    },
  },
  serverExternalPackages: ["@xenova/transformers"],

  images: {
    domains: [
      "img.clerk.com",
      "https://floopr.app",
      "https://floopr.vercel.app",
      "floopr.vercel.app",
      "floopr.app",
      "http://localhost:3000",
      "localhost",
      'legendary-orbit-g47rrw7prq95394q7-3000.app.github.dev'
    ],
  },
  eslint: {
    // Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during builds
    ignoreBuildErrors: true,
  },
  output: "standalone",
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
