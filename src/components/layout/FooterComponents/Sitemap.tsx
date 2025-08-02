"use client"

import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

const Sitemap = () => {
  const t = useTranslations("Navbar")
  return (
    <div className="border-b border-gray-500">
      <div className="mx-8 flex flex-col justify-between pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/">
          <p className="footerSitemap">{t("home")}</p>
        </Link>
        <Link href="/courses">
          <p className="footerSitemap">{t("scubaClasses")}</p>
        </Link>
        <Link href="/sites">
          <p className="footerSitemap">{t("divePackages")}</p>
        </Link>
        <Link href="/trips">
          <p className="footerSitemap">{t("diveTrips")}</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-around  md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/scuba-diving-punta-cana">
          <p className="footerSitemap">{t("scubaDivingPuntaCana")}</p>
        </Link>
        <Link href="/shark-dive-punta-cana">
          <p className="footerSitemap">{t("sharkDivingPuntaCana")}</p>
        </Link>

        <Link href="/fishing-punta-cana">
          <p className="footerSitemap">{t("deepSeaFishing")}</p>
        </Link>
        <Link href="/liveaboard-dominican-republic">
          <p className="footerSitemap">{t("liveAboards")}</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-center md:space-x-8 md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/species">
          <p className="footerSitemap">{t("speciesGuide")}</p>
        </Link>
        <Link href="/photo-gallery">
          <p className="footerSitemap">{t("photoGallery")}</p>
        </Link>

        <Link href="/terms-and-conditions">
          <p className="footerSitemap">{t("cancellationPolicy")}</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-center md:space-x-8 pb-4 md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/sitemap.xml">
          <p className="footerSitemap">{t("siteMap")}</p>
        </Link>
        <Link href="/blog">
          <p className="footerSitemap">{t("blog")}</p>
        </Link>
        <Link href="/contact">
          <p className="footerSitemap">{t("contactUs")}</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-center md:space-x-8 pb-4 md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default Sitemap
