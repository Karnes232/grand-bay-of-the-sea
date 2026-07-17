import BlockContent from "@/components/BlockContent/BlockContent"

type Locale = "en" | "es"

/**
 * Intro lead prose — renders the existing Sanity `paragraph1` in the new
 * layout. Copy is preserved; only presentation changes (larger lead type).
 */
const HomeIntro = ({
  content,
  locale,
}: {
  content: { en: any[]; es: any[] }
  locale: Locale
}) => {
  return (
    <section className="mx-auto max-w-[1080px] px-6 pb-10 pt-24">
      <BlockContent
        content={content}
        locale={locale}
        variant="prose"
        wrapperClassName="[&_p]:text-[clamp(1.25rem,2.3vw,1.7rem)] [&_p]:leading-[1.5] [&_p]:tracking-[-0.01em] [&_p]:text-[#12303a] [&_p]:text-pretty"
      />
    </section>
  )
}

export default HomeIntro
