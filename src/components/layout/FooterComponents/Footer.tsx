import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import "@/styles/footer/footer.css"
import SocialMedia from "./SocialMedia"
import Copyright from "./Copyright"
import Signature from "./Signature"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { getCachedSiteLogo } from "@/sanity/queries/SiteSettings/siteSettings"
import { BUSINESS } from "@/lib/business"

const TrustBadges = dynamic(() => import("./TrustBadges"))

const linkClass =
  "text-[14.5px] text-white/70 transition-colors hover:text-white"

const Footer = async () => {
  const t = await getTranslations("Navbar")
  const tc = await getTranslations("ContactInfo")
  const tf = await getTranslations("Footer")
  const logo = await getCachedSiteLogo()

  // Display the logo at ~48px tall (2× intrinsic ratio for retina), width auto.
  const logoH = logo ? Math.min(logo.intrinsicHeight, 96) : 0
  const logoW = logo
    ? Math.max(1, Math.round((logoH * logo.intrinsicWidth) / logo.intrinsicHeight))
    : 0

  return (
    <footer className="w-full bg-ink-deep text-white/70">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + NAP */}
          <div>
            <div className="mb-4 flex items-center gap-[11px] text-white">
              {logo?.src && (
                <Image
                  src={logo.src}
                  alt={BUSINESS.name}
                  width={logoW}
                  height={logoH}
                  sizes="120px"
                  quality={75}
                  className="h-12 w-auto flex-none object-contain"
                />
              )}
              <span className="whitespace-nowrap font-display text-[17px] font-bold tracking-tight">
                {BUSINESS.name}
              </span>
            </div>
            <address className="not-italic text-[14px] leading-relaxed">
              <p className="max-w-[34ch]">
                {`${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion}, `}
                {tc("country")}.
              </p>
              <p className="mt-3">
                {BUSINESS.phoneDisplay}
                <br />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="border-b border-white/25 hover:text-white"
                >
                  {BUSINESS.email}
                </a>
                <br />
                {tc("hoursValue")}
              </p>
              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3.5 inline-block font-semibold text-accent"
              >
                {tc("mapLink")} →
              </a>
            </address>
          </div>

          {/* Dive links */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white">
              {tf("columnDive")}
            </h4>
            <div className="flex flex-col gap-[11px]">
              <Link href="/" className={linkClass}>
                {t("home")}
              </Link>
              <Link href="/courses" className={linkClass}>
                {t("scubaClasses")}
              </Link>
              <Link href="/sites" className={linkClass}>
                {t("divePackages")}
              </Link>
              <Link href="/trips" className={linkClass}>
                {t("diveTrips")}
              </Link>
              <Link href="/shark-dive-punta-cana" className={linkClass}>
                {t("sharkDive")}
              </Link>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white">
              {tf("columnExplore")}
            </h4>
            <div className="flex flex-col gap-[11px]">
              <Link href="/scuba-diving-punta-cana" className={linkClass}>
                {t("scubaDivingPuntaCana")}
              </Link>
              <Link href="/fishing-punta-cana" className={linkClass}>
                {t("deepSeaFishing")}
              </Link>
              <Link
                href="/liveaboard-dominican-republic"
                className={linkClass}
              >
                {t("liveAboards")}
              </Link>
              <Link href="/species" className={linkClass}>
                {t("speciesGuide")}
              </Link>
              <Link href="/photo-gallery" className={linkClass}>
                {t("photoGallery")}
              </Link>
              <Link href="/about-us" className={linkClass}>
                {t("aboutUs")}
              </Link>
              <Link href="/blog" className={linkClass}>
                {t("blog")}
              </Link>
              {/* Static file — plain anchor so it isn't prefixed to /es/sitemap.xml */}
              <a href="/sitemap.xml" className={linkClass}>
                {t("siteMap")}
              </a>
            </div>
          </div>

          {/* Book with confidence */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white">
              {tf("columnConfidence")}
            </h4>
            <a
              href={BUSINESS.padiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-white/[0.12] bg-white/[0.06] px-3.5 py-3 text-[13.5px] text-white transition-colors hover:border-white/25"
            >
              {tf("padiVerified")} · #{BUSINESS.padiNumber}
            </a>
            <div className="mt-1">
              <SocialMedia />
            </div>
            <div className="mt-6">
              <LanguageSwitcher color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges: Kayak + PADI + Google reviews (lazy iframe) */}
      <div className="mx-auto max-w-[1280px] px-6">
        <TrustBadges />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[1280px] border-t border-white/10 px-6 py-6">
        <div className="flex justify-center gap-6 text-[13px]">
          <Link
            href="/terms-and-conditions"
            className="transition-colors hover:text-white"
          >
            {t("cancellationPolicy")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            {t("contactUs")}
          </Link>
        </div>
        <Copyright />
      </div>
      <Signature />
    </footer>
  )
}

export default Footer
