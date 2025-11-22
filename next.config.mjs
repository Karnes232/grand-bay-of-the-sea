/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/messages/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
    ]
  },
  reactStrictMode: true,
  // Optimize for static generation and better performance
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    qualities: [65, 70, 75, 80, 85, 90, 95, 100],
    // unoptimized: true,
    loader: 'default',
    // domains: ['images.ctfassets.net', 'www.kayak.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.kayak.com',
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Optimize bundle for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withNextIntl(nextConfig);


  