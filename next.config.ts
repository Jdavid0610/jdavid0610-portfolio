import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fail the build on type errors instead of shipping broken code.
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
