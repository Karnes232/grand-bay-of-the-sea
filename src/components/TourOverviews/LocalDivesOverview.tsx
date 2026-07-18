"use client"
import { Link } from "@/i18n/navigation"
import React from "react"
import PaymentPopupLocalDives from "../PaymentComponents/PaymentPopupLocalDives"
import { useTranslations } from "next-intl"

declare global {
  interface Window {
    PADI?: {
      Widget: {
        init: () => void
      }
    }
  }
}

interface DiveInfo {
  packageTitle: {
    en: string
    es: string
  }
  twoTankDive: number
  fourTankPackage: number
  depositPrice: number
  duration: {
    en: string
    es: string
  }
}

/**
 * Local-dives packages + booking card (2026 redesign). Dark card: left column
 * lists the package price tiles, right column is the "Reserve now" panel.
 *
 * CRITICAL: the PayPal deposit flow is driven entirely by
 * `<PaymentPopupLocalDives tour={info} />` — it must stay mounted with the full
 * `info` (sitesLayout) object (needs packageTitle, twoTankDive, fourTankPackage,
 * depositPrice, duration). The PADI widget button (class/id/data-* + its script)
 * is a separate third-party flow and must keep those exact attributes.
 */
const LocalDivesOverview = ({
  info,
  sharkPrice,
  locale,
}: {
  info: DiveInfo
  sharkPrice: number
  locale: "en" | "es"
}) => {
  const t = useTranslations("LocalDivesOverview")

  const tileBase =
    "rounded-[16px] border border-white/12 bg-white/[0.05] p-5"
  const price =
    "font-display text-[1.9rem] font-extrabold leading-none tracking-[-0.03em]"

  return (
    <>
      <script
        src="https://travel.padi.com/widget/padi-widget-button.js"
        defer={false}
        async={false}
      ></script>
      <div className="grid overflow-hidden rounded-[24px] bg-ink text-white lg:grid-cols-[1.3fr_1fr]">
        {/* Left — packages */}
        <div className="p-[clamp(32px,4vw,56px)]">
          <span className="mb-4 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
            {t("packagesEyebrow")}
          </span>
          <h2 className="mb-[26px] font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">
            {info.packageTitle[locale]}
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* 2-tank */}
            <div className={tileBase}>
              <div className={`${price} text-white`}>${info.twoTankDive}</div>
              <div className="mt-0.5 text-[14px] text-white/70">
                {t("2tankDive")} · {t("perPerson")}
              </div>
              <div className="mt-1.5 text-[13px] font-semibold text-accent">
                {t("duration")}: {info.duration[locale]}
              </div>
            </div>
            {/* 4-tank */}
            <div className={tileBase}>
              <div className={`${price} text-white`}>
                ${info.fourTankPackage}
              </div>
              <div className="mt-0.5 text-[14px] text-white/70">
                {t("4tankPackage")}
              </div>
              <div className="mt-1.5 text-[13px] text-white/50">
                {t("bestValue")}
              </div>
            </div>
            {/* Shark dive → link */}
            <Link
              href="/shark-dive-punta-cana"
              className="rounded-[16px] border border-accent/[0.35] bg-accent/[0.12] p-5 no-underline transition-colors hover:bg-accent/20"
            >
              <div className={`${price} text-accent`}>${sharkPrice}</div>
              <div className="mt-0.5 text-[14px] text-white/80">
                {t("sharkDive")} →
              </div>
              <div className="mt-1.5 text-[13px] text-white/50">
                {t("advancedDivers")}
              </div>
            </Link>
            {/* Other packages */}
            <div className={`${tileBase} flex flex-col justify-center`}>
              <div className="text-[15px] font-semibold text-white/90">
                {t("otherPackages")}
              </div>
              <div className="mt-1 text-[13px] text-white/60">
                {t("otherPackagesAvailableUponRequest")}
              </div>
            </div>
          </div>
        </div>

        {/* Right — reserve now */}
        <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.04] p-[clamp(32px,4vw,56px)] lg:border-l lg:border-t-0">
          <h3 className="mb-2 font-display text-[1.5rem] font-bold tracking-[-0.02em]">
            {t("reserveNow")}
          </h3>
          <p className="mb-[22px] text-[15px] text-white/70">
            {t("reserveSubtitle", { price: info.depositPrice })}
          </p>

          {/* PayPal booking trigger — DO NOT change these props. */}
          <div className="mb-3 [&_button]:w-full">
            <PaymentPopupLocalDives tour={info} />
          </div>

          <Link
            href="/contact"
            className="mb-3 block rounded-[12px] border border-white/35 py-3.5 text-center text-[15px] font-semibold text-white no-underline transition-colors hover:bg-white/10"
          >
            {t("contactUs")}
          </Link>

          {/* <button
            className="padi-booking-button block w-full rounded-[12px] border border-white/35 py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            id="padi-widget-modal"
            data-aid="27147"
            data-language="en"
            data-currency="USD"
            data-shop-id="75625"
            data-widget-type="adventure_page"
            data-adventure-id="149070"
            data-source="widget_individual_adventure"
          >
            {t("bookNowViaPad")}
          </button> */}
        </div>
      </div>
    </>
  )
}

export default LocalDivesOverview
