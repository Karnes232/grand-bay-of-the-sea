import { LOCALES } from "@/i18n/locales"

/**
 * Build a localized GROQ projection: one key per locale, each computed by
 * `expr(locale)`.
 *
 *   perLocale("desc", l => `pt::text(description.${l})`)
 *   // "desc": {"en": pt::text(description.en), "es": …, "de": …}
 *
 * Most localized fields need no projection at all — GROQ returns the whole
 * object, which is what phase 1.2 relied on. This is for the cases that must
 * *compute* something per locale, where a plain field reference won't do:
 * flattening Portable Text to a string with `pt::text`, for instance.
 *
 * Those cases used to be written as `"descEn"` / `"descEs"` pairs, one key per
 * language, with the reader picking between them via `locale === "es"`. German
 * hit the English branch, so liveaboard H1s and blog category descriptions
 * rendered in English on /de.
 *
 * Uses `LOCALES` rather than `ACTIVE_LOCALES`: the gate controls what is routed
 * and advertised, not what a query may read, and projecting a locale Sanity has
 * no content for simply yields null.
 */
export function perLocale(
  alias: string,
  expr: (locale: string) => string,
): string {
  return `"${alias}": {${LOCALES.map(l => `"${l}": ${expr(l)}`).join(", ")}}`
}
