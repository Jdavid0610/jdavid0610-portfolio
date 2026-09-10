import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/config/site'
import { locales, localeTags, type Locale } from '@/shared/i18n/config'
import { docSlugs } from '@/modules/docs/content'
import * as postsService from '@/modules/posts/server/posts.service'

/** Rebuilt hourly, and on demand whenever a post's published state changes. */
export const revalidate = 3600

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
    changeFrequency: 'weekly',
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = [
    ...withAlternates('', { priority: 1, changeFrequency: 'daily' }),
    ...withAlternates('/blog', { priority: 0.9, changeFrequency: 'daily' }),
    ...withAlternates('/docs', { priority: 0.9 }),
    // Documentation exists in every locale, so no narrowing is needed here.
    ...docSlugs().flatMap((slug) => withAlternates(`/docs/${slug}`, { priority: 0.7 })),
  ]

  const postEntries: MetadataRoute.Sitemap = []
  try {
    // One pass per locale; a slug that exists in both is emitted once per
    // locale with the other declared as its alternate.
    const byLocale = await Promise.all(
      locales.map(async (locale) => ({ locale, posts: await postsService.listPublished(locale, 1000) })),
    )

    const localesBySlug = new Map<string, Locale[]>()
    for (const { locale, posts } of byLocale) {
      for (const post of posts) {
        localesBySlug.set(post.slug, [...(localesBySlug.get(post.slug) ?? []), locale])
      }
    }

    const seen = new Set<string>()
    for (const { posts } of byLocale) {
      for (const post of posts) {
        if (seen.has(post.slug)) continue
        seen.add(post.slug)
        postEntries.push(
          ...withAlternates(
            `/blog/${post.slug}`,
            { lastModified: post.updatedAt, priority: 0.6, changeFrequency: 'monthly' },
            localesBySlug.get(post.slug) ?? [],
          ),
        )
      }
    }
  } catch {
    // A database hiccup should degrade the sitemap, not break the route.
  }

  return [...staticEntries, ...postEntries]
}
