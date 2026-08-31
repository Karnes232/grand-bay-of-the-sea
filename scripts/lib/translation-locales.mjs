import { LOCALES, DEFAULT_LOCALE } from "../../src/i18n/locales.ts"

/**
 * Per-locale metadata the translation tooling needs and the app does not.
 *
 * The locale *list* is not duplicated here — it is imported from the app's
 * registry, which Node can load directly since it strips TypeScript types
 * natively. Only the things the site itself has no use for live here: the
 * English name (used in file names, CSV headers and console prose) and the
 * brief handed to whoever writes the translation.
 *
 * This file exists because the whole pipeline was written for German and said
 * so in its literals: an `xml:lang="de"` in the XLIFF, a CSV column named
 * `german`, `translations/de-<date>` paths, and `node.de` reads in the segment
 * collector. Running it for a second language meant editing five scripts.
 */
export const TRANSLATION_LOCALES = {
  es: {
    name: "Spanish",
    brief:
      "Dominican Spanish, not neutral LatAm — buceo / centro de buceo, and " +
      "PADI's official Spanish course names.",
  },
  de: {
    name: "German",
    brief:
      "German dive terminology, not transliteration — tauchen / Tauchkurs / " +
      "Tauchbasis and PADI's official German course names. Address the reader " +
      "with du, as the existing German copy does.",
  },
  fr: {
    name: "French",
    brief:
      "French dive terminology, not transliteration — plongée / centre de " +
      "plongée / baptême de plongée, and PADI's official French course names. " +
      "Address the reader with vous. One generic French serving France, " +
      "Québec, Belgium and Switzerland, so avoid France-only idiom.",
  },
}

/** The name used in CSV headers and file stems, e.g. "german". */
export const columnFor = locale =>
  TRANSLATION_LOCALES[locale].name.toLowerCase()

/** English name of a locale, for console output. */
export const nameFor = locale => TRANSLATION_LOCALES[locale].name

/**
 * Read `--locale <code>` from argv.
 *
 * Required, deliberately: every one of these scripts used to assume German,
 * and a tool that silently picks a language is how `messages/de.json` shipped
 * as a copy of the English one. Better to refuse than to guess.
 */
export function parseLocaleArg(argv) {
  const index = argv.indexOf("--locale")
  const value = index === -1 ? undefined : argv[index + 1]

  const targets = LOCALES.filter(l => l !== DEFAULT_LOCALE)
  const usable = targets.filter(l => l in TRANSLATION_LOCALES)

  if (!value) {
    fail(`--locale is required. Available: ${usable.join(", ")}`)
  }
  if (!LOCALES.includes(value)) {
    fail(
      `Unknown locale "${value}". The site's registry has: ${LOCALES.join(", ")}. ` +
        `Add it to LOCALES in src/i18n/locales.ts first.`,
    )
  }
  if (value === DEFAULT_LOCALE) {
    fail(`"${value}" is the source language, not a translation target.`)
  }
  if (!(value in TRANSLATION_LOCALES)) {
    fail(
      `No translation brief for "${value}". Add it to TRANSLATION_LOCALES in ` +
        `scripts/lib/translation-locales.mjs.`,
    )
  }
  return value
}

function fail(message) {
  console.error(`[i18n] ${message}`)
  process.exit(1)
}
