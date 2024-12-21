import type { Metadata } from "next"
import localFont from "next/font/local"
import "../../../app/globals.css"
import TuiHeader from "@/components/layout/TuiLayout/TuiHeader"
import TuiFooter from "@/components/layout/TuiLayout/TuiFooter"
import { ServiceWorkerCleanup } from "@/components/layout/ServiceWorkerCleanup"

const geistSans = localFont({
  src: "../../(root)/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../../(root)/fonts/GeistMonoVF.woff",
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
    index: false,
    follow: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "noindex",
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
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerCleanup />
        <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
          <TuiHeader />
          {children}
          <TuiFooter />
        </div>
      </body>
    </html>
  )
}
