/**
 * Utility functions for language switching and i18n performance
 */

export const LANGUAGES = ['en', 'es'] as const
export type Language = typeof LANGUAGES[number]

export const FALLBACK_LANGUAGE = 'en' as const

/**
 * Validates if a locale is supported
 */
export function isValidLocale(locale: string): locale is Language {
  return LANGUAGES.includes(locale as Language)
}

/**
 * Gets a safe locale, falling back to the default if invalid
 */
export function getSafeLocale(locale: string | undefined | null): Language {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return FALLBACK_LANGUAGE
}

/**
 * Creates a language switch URL with proper path handling
 */
export function createLanguageSwitchUrl(
  currentPath: string,
  newLocale: Language
): string {
  // Remove existing locale prefix
  const pathWithoutLocale = currentPath.replace(/^\/(en|es)/, '') || '/'
  
  // Add new locale prefix
  if (newLocale === FALLBACK_LANGUAGE) {
    return pathWithoutLocale
  }
  
  return `/${newLocale}${pathWithoutLocale}`
}

/**
 * Debounce function for language switching to prevent rapid clicks
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
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
