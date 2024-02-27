/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  basePath: '',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        basePath: false,
        permanent: false,
      },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.lpk-harehare.id',
      },
    ],
  },
}

export default nextConfig
