/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this line
  trailingSlash: true,
    reactStrictMode: true,
    images: {
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


  