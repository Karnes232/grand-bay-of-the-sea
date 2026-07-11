import React from "react"
import { getTranslations } from "next-intl/server"
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BUSINESS } from "@/lib/business"

/**
 * Visible NAP block. Values come from the same BUSINESS constants as the
 * site-wide LocalBusiness JSON-LD, so visible text and schema can't drift.
 */
const ContactInfo = async ({
  variant = "footer",
}: {
  variant?: "footer" | "page"
}) => {
  const t = await getTranslations("ContactInfo")

  const isFooter = variant === "footer"
  const textColor = isFooter ? "text-gray-300" : "text-neutral-800"
  const iconColor = isFooter ? "text-gray-400" : "text-cyan-700"
  const linkColor = isFooter
    ? "hover:text-white underline-offset-2 hover:underline"
    : "text-cyan-700 underline-offset-2 hover:underline"

  return (
    <section
      className={
        isFooter
          ? "border-b border-gray-500 py-4 md:mx-auto md:max-w-2xl"
          : "max-w-md mx-auto my-10 px-5"
      }
    >
      <h2
        className={`font-bold text-lg mb-3 text-center ${
          isFooter ? "text-gray-200" : "text-neutral-900"
        }`}
      >
        {t("title")}
      </h2>
      <address className={`not-italic flex flex-col gap-2 text-sm ${textColor}`}>
        <div className="flex items-start justify-center text-center gap-2">
          <FaMapMarkerAlt
            className={`mt-0.5 shrink-0 ${iconColor}`}
            aria-hidden
          />
          <span>
            <span className="font-semibold">{BUSINESS.name}</span>
            {`, ${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion}, `}
            {t("country")}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaPhoneAlt className={`shrink-0 ${iconColor}`} aria-hidden />
          <span
          >
            {BUSINESS.phoneDisplay}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <GrMail className={`shrink-0 ${iconColor}`} aria-hidden />
          <a
            href={`mailto:${BUSINESS.email}`}
            aria-label={t("emailLabel")}
            className={`break-all ${linkColor}`}
          >
            {BUSINESS.email}
          </a>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaClock className={`shrink-0 ${iconColor}`} aria-hidden />
          <span>{t("hoursValue")}</span>
        </div>
        <div className="text-center">
          <a
            href={BUSINESS.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={linkColor}
          >
            {t("mapLink")}
          </a>
        </div>
      </address>
    </section>
  )
}

export default ContactInfo
