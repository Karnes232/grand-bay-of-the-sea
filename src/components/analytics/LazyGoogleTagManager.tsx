"use client"

import Script from "next/script"

const GTM_ID = "GTM-KGLHKQW"

/**
 * Loads GTM after window load to cut main-thread contention during LCP.
 * Do not also mount @next/third-parties GoogleAnalytics — that loads gtag.js
 * again. Fire GA4 (one or both streams) from inside this GTM container only.
 */
export function LazyGoogleTagManager() {
  return (
    <>
      <Script id="gtm-datalayer" strategy="lazyOnload">
        {`(function(w,l){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});})(window,'dataLayer');`}
      </Script>
      <Script
        id="gtm-js"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
    </>
  )
}
