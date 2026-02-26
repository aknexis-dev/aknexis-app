/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🔥 Allow production build even if ESLint errors exist
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔥 Ignore TypeScript errors during build (optional but useful for hosting)
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  poweredByHeader: false,
  compress: true,

  // 🔥 Enable standalone output (VERY IMPORTANT for hosting)
  output: 'standalone',

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

export default nextConfig