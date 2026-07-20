import Image from "next/image"

import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import type { TeamMember } from "@/sanity/queries/AboutUs/AboutUs"

type Locale = "en" | "es"
type L = { en: string; es: string }

/** "Meet your dive crew" cards. The whole section hides when there are no members. */
const TeamGrid = ({
  eyebrow,
  heading,
  intro,
  members,
  locale,
}: {
  eyebrow?: L
  heading?: L
  intro?: L
  members?: TeamMember[]
  locale: Locale
}) => {
  if (!members?.length) return null

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-14">
      <div className="mb-10 max-w-[640px]">
        {eyebrow?.[locale] && (
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
            {eyebrow[locale]}
          </span>
        )}
        {heading?.[locale] && (
          <h2 className="mb-3 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance text-fg">
            {heading[locale]}
          </h2>
        )}
        {intro?.[locale] && (
          <p className="text-base leading-relaxed text-muted">
            {intro[locale]}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => {
          const photoSrc =
            sanityCropUrl(member.photo, 640, 800) ||
            member.photo?.asset?.url ||
            ""
          return (
            <div
              key={i}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-card"
            >
              {photoSrc && (
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-soft">
                  <Image
                    src={photoSrc}
                    alt={member.photo?.alt || member.name || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={75}
                    placeholder={
                      member.photo?.asset?.metadata?.lqip ? "blur" : "empty"
                    }
                    blurDataURL={member.photo?.asset?.metadata?.lqip}
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    style={
                      hotspotPosition(member.photo)
                        ? { objectPosition: hotspotPosition(member.photo) }
                        : undefined
                    }
                  />
                </div>
              )}
              <div className="px-[22px] pb-[26px] pt-[22px]">
                <h3 className="mb-[3px] font-display text-[1.25rem] font-bold tracking-[-0.02em] text-fg">
                  {member.name}
                </h3>
                {member.role?.[locale] && (
                  <div className="mb-3 text-[13.5px] font-semibold text-accent">
                    {member.role[locale]}
                  </div>
                )}
                {member.bio?.[locale] && (
                  <p className="text-sm leading-relaxed text-muted">
                    {member.bio[locale]}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TeamGrid
