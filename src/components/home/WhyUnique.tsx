import dynamicImport from "next/dynamic"
import BlockContent from "@/components/BlockContent/BlockContent"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)

type Locale = "en" | "es"

/**
 * Split section: new heading + existing Sanity `paragraph2` on the left, the
 * live coral-reef video (kept from the old page) on the right.
 */
const WhyUnique = ({
  heading,
  content,
  locale,
}: {
  heading?: string
  content: { en: any[]; es: any[] }
  locale: Locale
}) => {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[72px]">
      <div className="grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[1.05fr_1fr]">
        <div>
          {heading && (
            <h2 className="mb-[22px] font-display text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance text-fg">
              {heading}
            </h2>
          )}
          <BlockContent content={content} locale={locale} variant="prose" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
          <CloudinaryBackgroundVideo
            className="!absolute inset-0 !min-h-full"
            videoId="coral-cut_lyykuw"
          />
        </div>
      </div>
    </section>
  )
}

export default WhyUnique
