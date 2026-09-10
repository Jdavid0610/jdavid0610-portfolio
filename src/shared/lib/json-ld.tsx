import type { Article, BreadcrumbList, Organization, WebSite, WithContext } from 'schema-dts'
import { siteConfig } from '@/shared/config/site'
import { localeTags, type Locale } from '@/shared/i18n/config'

/**
 * Structured data. Rendered from a server component so it costs zero client
 * JavaScript and is present in the initial HTML for crawlers.
 */
export function JsonLd({ data }: { data: WithContext<Article | BreadcrumbList | Organization | WebSite> }) {
  return (
    <script
      type="application/ld+json"
      // Built server-side from our own data; `<` is escaped to close the
      // classic </script> injection hole regardless.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function organizationJsonLd(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
  }
}

export function websiteJsonLd(locale: Locale): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    inLanguage: localeTags[locale],
    description: siteConfig.description,
  }
}

export function articleJsonLd(args: {
  locale: Locale
  title: string
  description: string
  slug: string
  authorName: string
  publishedAt: Date | null
  updatedAt: Date
}): WithContext<Article> {
  const url = `${siteConfig.url}/${args.locale}/blog/${args.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    inLanguage: localeTags[args.locale],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: { '@type': 'Person', name: args.authorName },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/icon.svg` },
    },
    datePublished: (args.publishedAt ?? args.updatedAt).toISOString(),
    dateModified: args.updatedAt.toISOString(),
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
