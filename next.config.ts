import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fail the build on type errors instead of shipping broken code.
  typescript: { ignoreBuildErrors: false },
  experimental: {
    // Server Actions are the write path; keep payloads small on purpose.
    serverActions: { bodySizeLimit: '2mb' },
  },
  async redirects() {
    return [{ source: '/dashboard', destination: '/en/dashboard', permanent: false }]
  },
}

export default nextConfig
