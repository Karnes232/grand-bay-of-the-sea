"use client"

import React from "react"
import { Link } from "@/i18n/navigation"
import PaymentPopupTrip from "../PaymentComponents/PaymentPopupTrip"
import { useTranslations } from "next-intl"

/**
 * Trip booking card (2026 redesign). Dark sticky card with price, deposit note,
 * and an extras checklist.
 *
 * CRITICAL: the PayPal trip-deposit flow is driven entirely by
 * `<PaymentPopupTrip tour={tour} />` — it must stay mounted with the full tour
 * object (needs tour.page, tour.price, tour.depositPrice). Everything else here
 * is presentational.
 */
const SanityTripOverview = ({
  tour,
  locale,
}: {
  tour: any
  locale: string
}) => {
  const t = useTranslations("TripOverview")

  const bullets: string[] = [
    `${t("2tankDive")} · ${tour.duration?.[locale] ?? ""}`,
    ...(tour.extras || []).map((extra: any) => extra?.[locale]).filter(Boolean),
  ]

  return (
    <div className="rounded-[22px] bg-ink p-[30px] text-white shadow-[0_24px_60px_rgba(11,33,41,0.22)] lg:sticky lg:top-24">
      <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.08em] text-accent">
        {t("tripOverview")}
      </span>
      {tour.price != null && (
        <div className="mb-1 flex items-baseline gap-2">
          <span className="font-display text-[2.6rem] font-extrabold tracking-[-0.03em]">
            ${tour.price}
          </span>
          <span className="text-[14.5px] text-white/60">{t("perPerson")}</span>
        </div>
      )}
      {tour.depositPrice != null && (
        <div className="mb-[22px] text-[14px] font-semibold text-accent">
          {t("onlyADeposit")}: ${tour.depositPrice} {t("deposit")}
        </div>
      )}

      <ul className="mb-6 flex flex-col gap-[13px]">
        {bullets.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-[11px] text-[14.5px] text-white/90"
          >
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/[0.16] text-[13px] text-accent">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* PayPal booking trigger — DO NOT change these props. */}
      <div className="flex justify-center [&_button]:w-full">
        <PaymentPopupTrip tour={tour} />
      </div>

      <p className="mt-4 text-center text-[13px] text-white/60">
        {t("reserveNow")} ·{" "}
        <Link href="/contact" className="underline hover:text-white">
          {t("contactUs")}
        </Link>
      </p>
    </div>
  )
}

export default SanityTripOverview
