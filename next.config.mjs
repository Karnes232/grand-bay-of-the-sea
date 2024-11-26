/** @type {import('next').NextConfig} */
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

export default nextConfig;


  