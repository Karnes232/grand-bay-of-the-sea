/**
 * Format a date-only ("YYYY-MM-DD") or ISO value into a localized long date.
 * publishDate is parsed as UTC midnight; formatting in UTC keeps it from
 * shifting a day in negative-offset timezones.
 */
export function formatDate(
  value: string | undefined,
  locale: string,
): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}
