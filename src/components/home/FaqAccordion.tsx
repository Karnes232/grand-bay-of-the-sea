import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import type { Faqs as FaqsType } from "@/sanity/queries/Faqs/Faqs"

type Locale = "en" | "es"

/**
 * Redesign FAQ accordion (native <details>, no JS). Reads the same
 * `getFaqs("Home")` data as the shared Faqs component and keeps its JSON-LD.
 * The legacy Faqs component stays in place for courses/trips.
 */
const FaqAccordion = ({
  faqs,
  structuredData,
  locale,
  heading,
}: {
  faqs: FaqsType["faqs"]
  structuredData: FaqsType["structuredData"]
  locale: Locale
  heading: string
}) => {
  if (!faqs?.length) return null

  return (
    <>
      <JsonLd raw={structuredData?.[locale]} />
      <section
        className="mx-auto max-w-[920px] px-6 py-[88px]"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="mb-[34px] text-center font-display text-[clamp(2rem,3.8vw,2.8rem)] font-bold leading-[1.03] tracking-[-0.03em] text-fg"
        >
          {heading}
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map(faq => {
            const question = faq.question?.[locale]
            const answer = faq.answer
            if (!question || !answer?.[locale]) return null

            return (
              <details
                key={faq._key}
                className="faq-item rounded-[14px] border border-line bg-card px-[22px]"
              >
                <summary className="flex items-center justify-between gap-4 py-[18px] text-[16.5px] font-semibold text-fg">
                  <span>{question}</span>
                  <span
                    className="faq-plus text-[22px] font-normal text-accent"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5">
                  <BlockContent
                    content={answer}
                    locale={locale}
                    variant="prose"
                    wrapperClassName="[&_p]:mb-0 [&_p]:text-[15.5px] [&_p]:text-muted"
                  />
                </div>
              </details>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default FaqAccordion
