"use client"

import React, { useState } from "react"
import BlockContent from "@/components/BlockContent/BlockContent"
import type { Faqs as FaqsType } from "@/sanity/queries/Faqs/Faqs"

const SECTION_TITLE = {
  en: "Frequently Asked Questions",
  es: "Preguntas frecuentes",
} as const

type Locale = "en" | "es"

interface FaqsProps {
  faqs: FaqsType["faqs"]
  structuredData: FaqsType["structuredData"]
  locale: Locale
}

const Faqs = ({ faqs, structuredData, locale }: FaqsProps) => {
  const lang = locale === "es" ? "es" : "en"
  const structuredDataString = structuredData?.[lang]
  const [openKey, setOpenKey] = useState<string | null>(null)

  if (!faqs?.length) {
    return null
  }

  return (
    <>
      {/* FAQ structured data (JSON-LD) for SEO */}
      {structuredDataString && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataString,
          }}
        />
      )}

      <section
        className="flex flex-col lg:max-w-3xl xl:max-w-4xl mx-5 lg:mx-auto lg:p-2 xl:mx-auto py-10 md:py-14"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center font-semibold"
        >
          {SECTION_TITLE[lang]}
        </h2>

        <div className="mt-6 space-y-2">
          {faqs.map(faq => {
            const question = faq.question?.[lang] ?? ""
            const answer = faq.answer
            const isOpen = openKey === faq._key

            if (!question || !answer?.[lang]) return null

            return (
              <div
                key={faq._key}
                className={`border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/30 ${isOpen ? "ring-1 ring-neutral-300 dark:ring-neutral-600" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : faq._key)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 md:px-5 md:py-4 text-left font-medium text-base md:text-lg hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq._key}`}
                  id={`faq-question-${faq._key}`}
                >
                  <span className="pr-2">{question}</span>
                  <span
                    className={`shrink-0 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${faq._key}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq._key}`}
                  className={`border-t border-neutral-200 dark:border-neutral-700 px-4 py-4 md:px-5 md:py-4 bg-white dark:bg-neutral-900/20 ${isOpen ? "block" : "hidden"}`}
                >
                  <BlockContent content={answer} locale={locale} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Faqs
