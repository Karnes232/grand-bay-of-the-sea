import React from "react"

function formatDate(value: string | undefined, locale: string): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // publishDate is a date-only ("YYYY-MM-DD") value parsed as UTC midnight;
    // format in UTC so it doesn't shift a day in negative-offset timezones.
    timeZone: "UTC",
  }).format(date)
}

const BlogMeta = ({
  author,
  publishDate,
  updatedAt,
  locale,
  labels,
}: {
  author: string
  publishDate?: string
  updatedAt?: string
  locale: string
  labels: { by: string; published: string; updated: string }
}) => {
  const published = formatDate(publishDate, locale)
  const updated = formatDate(updatedAt, locale)
  // Only surface "Updated" when it differs from the publish date.
  const showUpdated = updated && updated !== published

  return (
    <div className="max-w-6xl mx-5 md:mx-10 xl:mx-auto xl:min-w-[65rem] mt-6 mb-2 text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-semibold text-gray-800">
        {labels.by} {author}
      </span>
      {published && (
        <>
          <span aria-hidden>·</span>
          <span>
            {labels.published}{" "}
            <time dateTime={publishDate}>{published}</time>
          </span>
        </>
      )}
      {showUpdated && (
        <>
          <span aria-hidden>·</span>
          <span>
            {labels.updated}{" "}
            <time dateTime={updatedAt}>{updated}</time>
          </span>
        </>
      )}
    </div>
  )
}

export default BlogMeta
