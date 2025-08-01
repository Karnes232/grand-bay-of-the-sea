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
    ]
  },
    reactStrictMode: true,
    images: {
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
      ],
    },
};

export default withNextIntl(nextConfig);


  