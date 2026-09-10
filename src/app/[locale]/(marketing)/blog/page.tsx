import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { buildMetadata } from '@/shared/lib/seo'
import { getPageMeta } from '@/modules/pages/content'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  graph,
  itemListJsonLd,
  JsonLd,
} from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { getPosts } from '@/modules/blog/content'
import { PostCard } from '@/modules/blog/ui/post-card'



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const meta = getPageMeta(locale, 'blog')
  return buildMetadata({
    locale,
    path: '/blog',
    title: meta.title,
    description: meta.description,
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const meta = getPageMeta(locale, 'blog')
  const t = getDictionary(locale)
  // Typed data, scoped to the visitor's language: no database, no fetch.
  const posts = getPosts(locale)
  const trail = breadcrumbs(locale, t, [{ name: t.nav.blog, path: routes.blog(locale) }])

  return (
    <div className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t.blog.title}</h1>
        <p className="mt-4 max-w-measure text-pretty text-muted">{t.blog.intro}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
          {t.blog.empty}
        </p>
      ) : (
        <div className="mt-12 flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}

      <JsonLd
        data={graph(
          collectionPageJsonLd({
            locale,
            path: '/blog',
            name: meta.title,
            description: meta.description,
          }),
          itemListJsonLd({
            locale,
            path: '/blog',
            name: meta.title,
            items: posts.map((post) => ({
              name: post.title,
              url: `${siteConfig.url}${routes.blogPost(locale, post.slug)}`,
            })),
          }),
          breadcrumbJsonLd(trail, { locale, path: '/blog' }),
        )}
      />
    </div>
  )
}
