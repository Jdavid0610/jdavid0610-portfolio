import type { Metadata } from 'next'
import { siteConfig } from '@/shared/config/site'
import { defaultLocale, locales, localeTags, type Locale } from '@/shared/i18n/config'

type BuildMetadataArgs = {
  title?: string
  description?: string
  /** Path *without* the locale prefix, e.g. `/blog/hello`. */
  path?: string
  locale: Locale
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  noIndex?: boolean
  /**
   * Locales this page actually exists in. Defaults to all of them, which is
   * right for UI pages; content pages pass the translations that really exist,
   * because an hreflang pointing at a 404 is worse than declaring nothing.
   */
  availableLocales?: readonly Locale[]
}

/**
 * Produces canonical URLs plus a complete hreflang set for every locale, which
 * is the part most i18n setups get wrong and search engines punish.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '',
  locale,
  image,
  type = 'website',
  publishedTime,
  noIndex = false,
  availableLocales = locales,
}: BuildMetadataArgs): Metadata {
  const cleanPath = path === '/' ? '' : path
  const canonical = `${siteConfig.url}/${locale}${cleanPath}`
  // Each locale renders its own OG card from `[locale]/opengraph-image.tsx`.
  const ogImage = image ?? `${siteConfig.url}/${locale}/opengraph-image`

  const alternates = locales.filter((l) => availableLocales.includes(l))
  const fallback = alternates.includes(defaultLocale) ? defaultLocale : alternates[0]

  const languages = Object.fromEntries([
    ...alternates.map((l) => [localeTags[l], `${siteConfig.url}/${l}${cleanPath}`]),
    ...(fallback ? [['x-default', `${siteConfig.url}/${fallback}${cleanPath}`]] : []),
  ])

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type,
      url: canonical,
      title: title ?? siteConfig.name,
      description,
      siteName: siteConfig.name,
      locale: localeTags[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? siteConfig.name }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? siteConfig.name,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
  }
}
