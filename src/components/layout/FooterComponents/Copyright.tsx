"use client"

import React from "react"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { toLocale } from "@/i18n/locales"
import Script from "next/script"
import Image from "next/image"
const Copyright = () => {
  const t = useTranslations("Footer")
  const locale = toLocale(useLocale())

  /**
   * The builder's own site publishes English and Spanish only — a fact about
   * dr-webstudio.com, not about our locale list, so it deliberately does not
   * follow the registry. It used to be `"https://www.dr-webstudio.com/" + locale`,
   * which on every German page produced /de → 307 → /es/de → 404.
   */
  const creatorUrl =
    locale === "es"
      ? "https://www.dr-webstudio.com/es"
      : "https://www.dr-webstudio.com/en"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t("attribution"),
    inLanguage: locale,
    creator: {
      "@type": "Organization",
      "@id": "https://www.dr-webstudio.com/#organization",
      name: "DR Web Studio",
      url: creatorUrl,
    },
  }

  return (
    <div className="flex flex-col justify-between py-4 md:items-center md:mx-auto w-full">
      <div className="flex-1"></div>
      <Link href="/" className="flex-1 text-center">
        <p className="footerSitemap">
          &copy; {new Date().getFullYear()} Grand Bay of the Sea
        </p>
      </Link>
      <p className="text-sm text-gray-400 flex flex-col sm:flex-row items-center gap-2 flex-1 justify-center md:justify-end md:mr-8">
        {t("builtBy")}
        <a
          href={creatorUrl}
          className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
        >
          <Image
            src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
            alt="DR Web Studio"
            width={16}
            height={16}
            className="h-4"
          />
          DR Web Studio
        </a>
        <span className="hidden sm:inline"> —</span> {t("developedBy")}.
      </p>
      <Script
        id="dr-webstudio-builtby-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  )
}

export default Copyright
