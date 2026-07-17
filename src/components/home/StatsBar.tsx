type Locale = "en" | "es"

interface Stat {
  value?: { en: string; es: string }
  label?: { en: string; es: string }
}

const StatsBar = ({
  stats,
  locale,
}: {
  stats?: Stat[]
  locale: Locale
}) => {
  if (!stats?.length) return null

  return (
    <div className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="border-white/10 px-5 py-7 [border-bottom-width:1px] last:border-b-0 sm:[border-bottom-width:0] lg:[border-right-width:1px] lg:last:border-r-0"
          >
            <div className="font-display text-[2rem] font-bold tracking-tight text-accent">
              {stat.value?.[locale]}
            </div>
            <div className="mt-0.5 text-[13.5px] text-white/60">
              {stat.label?.[locale]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsBar
