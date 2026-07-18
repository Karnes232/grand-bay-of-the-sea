import DiveSiteCard from "./DiveSiteCard"
import { getDiveSites } from "@/sanity/queries/Sites/DiveSites"
import { getTranslations } from "next-intl/server"

const DiveSites = async ({ locale }: { locale: "en" | "es" }) => {
  const [diveSites, t] = await Promise.all([
    getDiveSites(),
    getTranslations("DiveSites"),
  ])

  const list = [...diveSites].reverse()

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-16">
      <div className="mb-9 max-w-[640px]">
        <h2 className="mb-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance text-ink">
          {t("heading")}
        </h2>
        <p className="text-base leading-relaxed text-[#3d5459]">{t("intro")}</p>
      </div>
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {list.map((diveSite, index) => (
          <DiveSiteCard diveSite={diveSite} key={index} locale={locale} />
        ))}
      </div>
    </section>
  )
}

export default DiveSites
