/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  async redirects() {
    // Old near-duplicate DR Web Studio post; the newer 2026 article is canonical.
    return [
      {
        source: "/blog/local-businesses/dr-web-studio-punta-cana-web-design",
        destination:
          "/blog/local-businesses/dr-web-studio-punta-cana-website-design",
        permanent: true,
      },
      {
        source:
          "/es/blog/local-businesses/dr-web-studio-punta-cana-web-design",
        destination:
          "/es/blog/local-businesses/dr-web-studio-punta-cana-website-design",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          // Security headers (applied to the Next SSR responses; netlify.toml
          // [[headers]] don't reliably reach the SSR function output).
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Clickjacking protection only. A full content CSP is intentionally
          // omitted — the site loads many third parties (GTM/GA, Ahrefs, PayPal,
          // Cloudinary, Sanity, Contentful, PADI + SociableKit iframes, Maps)
          // and would need a report-only rollout first.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          // Explicitly welcome AI search/training/retrieval (contentsignals.org).
          {
            key: 'Content-Signal',
            value: 'search=yes, ai-train=yes, ai-retrieval=yes',
          },
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
  webpack: config => {
    // Silence noisy webpack persistent-cache infra warnings. next-intl's
    // extractor uses a dynamic import(t) webpack can't statically parse
    // (benign — that node_modules file never changes). Real errors and
    // compile warnings are unaffected.
    config.infrastructureLogging = { level: "error" }
    return config
  },
  // Optimize for static generation and better performance
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    qualities: [65, 70, 75, 80, 85, 90, 95, 100],
    // Cap srcsets at w=1920 (default adds 2048/3840): the full-bleed heroes use
    // sizes="100vw", so high-DPR clients were fetching 3840px variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
    // Inline page CSS into the HTML — removes render-blocking stylesheet
    // requests that PSI attributed ~660ms of LCP render delay to.
    inlineCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@headlessui/react',
      '@heroicons/react',
      'react-icons',
    ],
  },
};

export default withNextIntl(nextConfig);


  