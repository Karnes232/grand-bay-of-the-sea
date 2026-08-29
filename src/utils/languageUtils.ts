/**
 * Language-switching helpers.
 *
 * The locale list itself lives in `@/i18n/locales` — this module only adds the
 * client-side behaviour on top of it. The aliases below are kept so existing
 * call sites don't have to change; new code should import from `@/i18n/locales`
 * directly.
 */
import {
  LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  toLocale,
  type Locale,
} from "@/i18n/locales"

export const LANGUAGES = LOCALES
export type Language = Locale
export const FALLBACK_LANGUAGE = DEFAULT_LOCALE

/** Validates if a locale is supported. */
export const isValidLocale = isLocale

/** Gets a safe locale, falling back to the default if invalid. */
export const getSafeLocale = toLocale

/**
 * Debounce function for language switching to prevent rapid clicks
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Preloads language messages for better performance
 */
export async function preloadLanguageMessages(locale: Language): Promise<void> {
  try {
    // Preload the messages file
    await import(`../../messages/${locale}.json`)
  } catch (error) {
    console.warn(`Failed to preload messages for locale: ${locale}`, error)
  }
}
