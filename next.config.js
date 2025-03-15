
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ideaboar.firebasestorage.app'],
  },
  experimental: {
    optimizeCss: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
