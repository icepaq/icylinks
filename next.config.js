/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allow images from githubusercontent.com
  images: {
    domains: ['avatars.githubusercontent.com'],
  }
}

module.exports = nextConfig
