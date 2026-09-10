export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}

/** BCP-47 tags for <html lang>, hreflang and OpenGraph. */
export const localeTags: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-CO',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Negotiates a locale from an Accept-Language header. Used by the proxy. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag = '', q = 'q=1'] = part.trim().split(';')
      return { tag: tag.toLowerCase(), q: Number.parseFloat(q.replace('q=', '')) || 0 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }
  return defaultLocale
}
