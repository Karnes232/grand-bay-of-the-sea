import { Globe, Shield, Users, Wrench } from "lucide-react"

import type { AboutValue } from "@/sanity/queries/AboutUs/AboutUs"

type Locale = "en" | "es"
type L = { en: string; es: string }

const ICONS = {
  shield: Shield,
  users: Users,
  globe: Globe,
  wrench: Wrench,
} as const

/** "Our values" cards — icon chip + title + body, themed via tokens. */
const ValuesGrid = ({
  eyebrow,
  heading,
  values,
  locale,
}: {
  eyebrow?: L
  heading?: L
  values?: AboutValue[]
  locale: Locale
}) => {
  if (!values?.length) return null

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-16">
      <div className="mb-10 max-w-[640px]">
        {eyebrow?.[locale] && (
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
            {eyebrow[locale]}
          </span>
        )}
        {heading?.[locale] && (
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance text-fg">
            {heading[locale]}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => {
          const Icon = ICONS[value.icon as keyof typeof ICONS] ?? Shield
          return (
            <div
              key={i}
              className="rounded-[18px] border border-line bg-card p-7"
            >
              <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-[12px] bg-accent/[0.14] text-accent">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              {value.title?.[locale] && (
                <h3 className="mb-2 font-display text-[1.2rem] font-bold tracking-[-0.02em] text-fg">
                  {value.title[locale]}
                </h3>
              )}
              {value.body?.[locale] && (
                <p className="text-[14.5px] leading-[1.65] text-muted">
                  {value.body[locale]}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ValuesGrid
