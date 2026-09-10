import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/config/site'
import { locales, localeTags, type Locale } from '@/shared/i18n/config'
import { projectSlugs } from '@/modules/projects/content'
import { templateSlugs } from '@/modules/open-source/content'
import { postLocales, postSlugs } from '@/modules/blog/content'

/**
 * Every entry comes from typed content, so the sitemap is build-time static:
 * no `revalidate`, no database, no try/catch around a query that could fail.
 */
type Entry = MetadataRoute.Sitemap[number]

/**
 * Emits one entry per locale, each declaring the others as alternates.
 * `availableLocales` narrows that set for content that is not translated
 * everywhere — the sitemap must not advertise a URL that 404s.
 */
function withAlternates(
  path: string,
  options: Partial<Entry> = {},
  availableLocales: readonly Locale[] = locales,
): MetadataRoute.Sitemap {
  return locales
    .filter((locale) => availableLocales.includes(locale))
    .map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      ...options,
      alternates: {
        languages: Object.fromEntries(
          locales
            .filter((alt) => availableLocales.includes(alt))
            .map((alt) => [localeTags[alt], `${siteConfig.url}/${alt}${path}`]),
        ),
      },
    }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...withAlternates('', { priority: 1 }),
    ...withAlternates('/about', { priority: 0.9 }),
    ...withAlternates('/projects', { priority: 0.9 }),
    ...projectSlugs.flatMap((slug) => withAlternates(`/projects/${slug}`, { priority: 0.8 })),
    ...withAlternates('/open-source', { priority: 0.9 }),
    ...templateSlugs.flatMap((slug) =>
      withAlternates(`/open-source/${slug}`, { priority: 0.7, changeFrequency: 'weekly' }),
    ),
    ...withAlternates('/experience', { priority: 0.8, changeFrequency: 'yearly' }),
    ...withAlternates('/faq', { priority: 0.8 }),
    ...withAlternates('/contact', { priority: 0.7, changeFrequency: 'yearly' }),
    ...withAlternates('/blog', { priority: 0.6, changeFrequency: 'weekly' }),
    // A post published in only one language narrows its own alternate set.
    ...postSlugs.flatMap((slug) =>
      withAlternates(
        `/blog/${slug}`,
        { priority: 0.5, changeFrequency: 'yearly' },
        postLocales(slug),
      ),
    ),
  ]
}
