/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Temporarily ignore build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = withPWA(nextConfig);
