import type { Metadata } from "next"
import localFont from "next/font/local"
import "../globals.css"
import Header from "@/components/layout/HeaderComponents/Header"
import Footer from "@/components/layout/FooterComponents/Footer"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import { generateStructuredData } from "@/components/StructuredData/StructuredData"
import RemoveSW from "@/components/layout/RemoveSW"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grandbay-puntacana.com"),
  openGraph: {
    siteName: "Grand Bay of the Sea",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  // alternates: {
  //   types: {
  //     "application/rss+xml": "https://dminhvu.com/rss.xml"
  //   }
  // },
  applicationName: "Grand Bay of the Sea",
  appleWebApp: {
    title: "Grand Bay of the Sea",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "QNQfgD0iQIbuHkuZ5fb8hKEYbV6iCN_TvIyRdnAu7yg",
    // yandex: ["YOUR_DATA"],
    other: {
      "google-site-verification": [
        "_73Leg9k9ryZXyP10IC8Nb2dxu3mfjpQG_zxN69KQCs",
      ],
      // "facebook-domain-verification": ["YOUR_DATA"],
    },
  },
  icons: {
    icon: [
      {
        url: "../favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: [
      {
        url: "../favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KGLHKQW" />
      <GoogleAnalytics gaId="G-6MJLJ90SSM" />
      <GoogleAnalytics gaId="G-JDL6KCYRYD" />
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RemoveSW />
        <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
