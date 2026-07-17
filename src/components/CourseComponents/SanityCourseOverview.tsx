"use client"

import React from "react"
import { Link } from "@/i18n/navigation"
import PaymentPopupCourses from "../PaymentComponents/PaymentPopupCourses"
import { useTranslations } from "next-intl"
import { IndividualCourse } from "@/sanity/queries/Courses/IndividualCourses"

/**
 * Booking card (2026 redesign). Dark sticky card with price, deposit note, and
 * an includes checklist.
 *
 * CRITICAL: the PayPal deposit flow is entirely driven by
 * `<PaymentPopupCourses course={course.course} price={course.padiPrice} />`.
 * That line must stay mounted with those exact props — deposit (price/2),
 * tourSelect, guest-count scaling, and the PayPal amount are derived downstream.
 * Everything else here is presentational.
 */
const SanityCourseOverview = ({
  course,
  locale,
}: {
  course: IndividualCourse
  locale: string
}) => {
  const t = useTranslations("CourseOverview")
  const td = useTranslations("Courses")

  const includes = [
    td("detail.equipmentProvided"),
    td("detail.transportIncluded"),
    td("detail.smallGroups"),
  ]

  return (
    <div className="rounded-[22px] bg-ink p-[30px] text-white shadow-[0_24px_60px_rgba(11,33,41,0.22)] lg:sticky lg:top-24">
      {course.padiPrice != null && (
        <div className="mb-1 flex items-baseline gap-2">
          <span className="font-display text-[2.6rem] font-extrabold tracking-[-0.03em]">
            ${course.padiPrice}
          </span>
          <span className="text-[14.5px] text-white/60">{t("perPerson")}</span>
        </div>
      )}
      <div className="mb-[22px] text-[14px] font-semibold text-accent">
        {td("detail.depositNote")}
      </div>

      <ul className="mb-6 flex flex-col gap-[13px]">
        {includes.map(item => (
          <li
            key={item}
            className="flex items-center gap-[11px] text-[14.5px] text-white/90"
          >
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/[0.16] text-[13px] text-accent">
              ✓
            </span>
            {item}
          </li>
        ))}
        {course.extraInfo?.[locale] && (
          <li className="flex items-center gap-[11px] text-[14.5px] text-white/90">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/[0.16] text-[13px] text-accent">
              ✓
            </span>
            {course.extraInfo[locale]}
          </li>
        )}
      </ul>

      {/* PayPal booking trigger — DO NOT change these props. */}
      <div className="flex justify-center [&_button]:w-full">
        <PaymentPopupCourses course={course.course} price={course.padiPrice} />
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

export default SanityCourseOverview
