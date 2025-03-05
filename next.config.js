
const nextConfig = {
  eslint: {
    // Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during builds
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable App directory routing
    appDir: true,
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
