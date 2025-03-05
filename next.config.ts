// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure redirects to ensure all routes go to the waitlist page
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/waitlist',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'x-middleware-skip',
            value: 'true',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;