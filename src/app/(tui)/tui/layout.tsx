import type { Metadata } from "next"
import localFont from "next/font/local"
import "../../../app/globals.css"
import TuiHeader from "@/components/layout/TuiLayout/TuiHeader"
import TuiFooter from "@/components/layout/TuiLayout/TuiFooter"
import { ServiceWorkerCleanup } from "@/components/layout/ServiceWorkerCleanup"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  // if (!hasLocale(routing.locales, locale)) {
  //   notFound()
  // }

  // Import messages for the current locale using the same pattern as request.ts
  const messages = (await import(`../../../../messages/en.json`)).default
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <ServiceWorkerCleanup />
          <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
            <TuiHeader />
            {children}
            <TuiFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
