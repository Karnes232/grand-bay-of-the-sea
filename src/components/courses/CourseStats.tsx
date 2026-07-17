/**
 * Small stat cards (Level / Duration) shown beside the course lead paragraph.
 * Only renders the stats that have a value.
 */
const CourseStats = ({
  stats,
}: {
  stats: { label: string; value?: string }[]
}) => {
  const shown = stats.filter(s => s.value)
  if (!shown.length) return null

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {shown.map(stat => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#e2e9e9] bg-white p-[22px]"
        >
          <div className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-moss">
            {stat.label}
          </div>
          <div className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseStats
