/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/snapshot/:path*',
        destination: 'http://localhost:3002/snapshot/:path*',
      },
    ]
  },
}

module.exports = nextConfig
