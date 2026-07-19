"use client"
import { submitForm } from "@/app/(root)/actions"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { CgSpinner } from "react-icons/cg"
import CertificationLevel from "../PaymentComponents/CertificationLevel"

const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#12303a]"
const inputClass =
  "w-full rounded-[11px] border-[1.5px] border-[#d7e0e0] bg-white px-[15px] py-[13px] text-[15px] text-ink outline-none transition-colors focus:border-accent"

const ContactForm = ({
  onSubmit,
  stacked = false,
}: {
  onSubmit?: () => void
  stacked?: boolean
}) => {
  // Narrow contexts (e.g. the floating popup) opt into a single-column layout;
  // the full-width contact page keeps the responsive two-column rows.
  const rowClass = stacked
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 gap-4 sm:grid-cols-2"
  const [certificationData, setCertificationData] = useState({
    certification: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Synchronous guard: a ref updates immediately, so a second click fired before
  // React re-renders (and disables the button) still sees it set and bails out.
  const submittingRef = useRef(false)
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("ContactForm")
  const tc = useTranslations("CertificationLevel")

  const handleSubmit = async (formData: FormData) => {
    if (submittingRef.current) return
    submittingRef.current = true
    setIsSubmitting(true)
    const result = await submitForm(formData, certificationData)
    if (result.success) {
      try {
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(result.data).toString(),
        })

        if (response.ok) {
          onSubmit?.()
          router.push(`/thankyou/?name=${result.data.name}`)
        } else {
          // Submission failed — re-enable so the client can retry.
          submittingRef.current = false
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error("Submission error:", error)
        submittingRef.current = false
        setIsSubmitting(false)
      }
    } else {
      console.log("Submission error")
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-[22px] border border-[#e2e9e9] bg-white p-[clamp(28px,3vw,40px)] shadow-[0_20px_50px_rgba(11,33,41,0.06)]">
      <h2 className="mb-1.5 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-ink">
        {t("heading")}
      </h2>
      <p className="mb-6 text-[15px] text-[#4a5f63]">{t("subheading")}</p>

      <form
        action={handleSubmit}
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="contact"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        {/* Records which page the form was submitted from. */}
        <input type="hidden" name="page" value={pathname} />

        <div className={rowClass}>
          <div>
            <label htmlFor="name" className={labelClass}>
              {t("fullName")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              {t("emailAddress")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className={rowClass}>
          <div>
            <label htmlFor="hotel" className={labelClass}>
              {t("hotel")}
            </label>
            <input
              type="text"
              name="hotel"
              id="hotel"
              className={inputClass}
            />
          </div>
          <div>
            <span className={labelClass}>{tc("certificationLevel")}</span>
            <CertificationLevel
              setFormData={setCertificationData}
              formData={certificationData}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            {t("yourMessage")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${inputClass} resize-y`}
            placeholder={t("leaveAComment")}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 rounded-[12px] bg-accent px-4 py-4 text-[16px] font-bold text-ink shadow-[0_10px_26px_rgba(255,106,61,0.3)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <CgSpinner className="animate-spin" aria-hidden />
              {t("submitting")}
            </span>
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
