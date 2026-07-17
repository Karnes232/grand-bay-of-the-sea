"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { submitLeadForm } from "@/app/(root)/actions"

/**
 * Homepage "Request a booking" lead form. Mirrors ContactForm's React-19
 * `<form action>` + Netlify Forms capture pattern, but shows an inline success
 * state (no redirect) to match the design. PayPal deposit flow is untouched and
 * lives on the course/trip detail pages.
 */
const BookingLeadForm = () => {
  const t = useTranslations("Home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedName, setSubmittedName] = useState<string | null>(null)

  const inputClass =
    "w-full rounded-[11px] border-[1.5px] border-[#d7e0e0] px-[15px] py-[13px] text-[15px] text-ink outline-none transition-colors focus:border-accent"
  const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#12303a]"

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const payload = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      date: formData.get("date")?.toString() || "",
      certification: formData.get("certification")?.toString() || "",
      guestCount: formData.get("guestCount")?.toString() || "",
    }

    const result = await submitLeadForm(payload)

    if (result.success) {
      try {
        await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(result.data).toString(),
        })
      } catch (error) {
        console.error("Netlify capture error:", error)
      }
      setSubmittedName(payload.name)
    } else {
      setIsSubmitting(false)
    }
  }

  if (submittedName !== null) {
    return (
      <div className="rounded-[22px] bg-white p-[34px] text-ink shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
        <div className="px-2 py-[26px] text-center">
          <div className="mx-auto mb-[18px] grid h-[60px] w-[60px] place-items-center rounded-full bg-accent/[0.14] text-[30px] text-accent">
            ✓
          </div>
          <h3 className="mb-2.5 font-display text-2xl font-bold tracking-tight">
            {t("booking.successTitle")}
          </h3>
          <p className="text-[15.5px] leading-relaxed text-[#4a5f63]">
            {t("booking.successBody", { name: submittedName })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[22px] bg-white p-[34px] text-ink shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
      <form
        action={handleSubmit}
        name="booking"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="booking" />
        <h3 className="mb-5 font-display text-[1.4rem] font-bold tracking-tight">
          {t("booking.requestTitle")}
        </h3>
        <div className="flex flex-col gap-[15px]">
          <div>
            <label htmlFor="lead-name" className={labelClass}>
              {t("booking.fullName")}
            </label>
            <input
              id="lead-name"
              name="name"
              required
              placeholder={t("booking.namePlaceholder")}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-email" className={labelClass}>
                {t("booking.email")}
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lead-date" className={labelClass}>
                {t("booking.date")}
              </label>
              <input
                id="lead-date"
                name="date"
                type="date"
                required
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-cert" className={labelClass}>
                {t("booking.experience")}
              </label>
              <select
                id="lead-cert"
                name="certification"
                className={`${inputClass} bg-white`}
                defaultValue={t("booking.expFirst")}
              >
                <option>{t("booking.expFirst")}</option>
                <option>{t("booking.expCert")}</option>
                <option>{t("booking.expCertified")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="lead-guests" className={labelClass}>
                {t("booking.divers")}
              </label>
              <select
                id="lead-guests"
                name="guestCount"
                className={`${inputClass} bg-white`}
                defaultValue="1"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1.5 rounded-xl bg-accent py-4 text-base font-bold text-ink shadow-[0_10px_26px_rgba(255,106,61,0.3)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(255,106,61,0.42)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t("booking.submitting") : t("booking.submit")}
          </button>
          <p className="text-center text-[12.5px] text-[#7c8f93]">
            {t("booking.disclaimer")}
          </p>
        </div>
      </form>
    </div>
  )
}

export default BookingLeadForm
