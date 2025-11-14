export function generateHreflangUrls(path: string, locale: string) {
  const baseUrl = "https://www.grandbay-puntacana.com"

  // Remove leading slash if present and ensure proper path format
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Generate URLs for each locale
  const urls = {
    en: `${baseUrl}/${cleanPath}`,
    es: `${baseUrl}/es/${cleanPath}`,
    "x-default": `${baseUrl}/${cleanPath}`,
  }

  return urls
}

export function getHreflangAlternates(path: string, locale: string) {
  const urls = generateHreflangUrls(path, locale)

  return {
    canonical: locale === "es" ? urls.es : urls.en,
    languages: urls,
  }
}
