import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.62.232.61:8081/api/:path*',
      },
    ]
  },
}

export default nextConfig