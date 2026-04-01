import type { Metadata } from "next"
import localFont from "next/font/local"
import "../../globals.css"
import Header from "@/components/layout/HeaderComponents/Header"
import Footer from "@/components/layout/FooterComponents/Footer"
import Script from "next/script"
import { LazyGoogleTagManager } from "@/components/analytics/LazyGoogleTagManager"
import { DeferredClientWidgets } from "@/components/layout/DeferredClientWidgets"
import { generateStructuredData } from "@/components/StructuredData/StructuredData"
import { Crimson_Pro } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "400 700",
})
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "400 700",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson-pro",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grandbay-puntacana.com"),
  openGraph: {
    siteName: "Grand Bay of the Sea",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GrandBayOfTheS1",
    creator: "@GrandBayOfTheS1",
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

// Add caching headers for better performance
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Import messages for the current locale
  let messages
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    // Fallback to English messages
    messages = (await import(`../../../../messages/en.json`)).default
  }

  return (
    <html lang={locale} className={`${crimsonPro.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
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
        <LazyGoogleTagManager />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="lz4+RbNFN0cfKi0THRMTNw"
          strategy="lazyOnload"
        />
        {" "}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <DeferredClientWidgets />
          <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
            <Header />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
