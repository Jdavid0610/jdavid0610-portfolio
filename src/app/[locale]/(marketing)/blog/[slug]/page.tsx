import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { siteConfig } from '@/shared/config/site'
import { formatDate } from '@/shared/lib/format'
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from '@/shared/lib/json-ld'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { NotFoundError } from '@/server/errors'
import * as postsService from '@/modules/posts/server/posts.service'

export const revalidate = 3600
/** Posts published after the last build are rendered on demand, then cached. */
export const dynamicParams = true

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * Prerenders every published post at build time. The database may not be
 * reachable in CI, so a failure degrades to on-demand rendering instead of
 * failing the build.
 */
export async function generateStaticParams({
  params,
}: {
  // A nested generateStaticParams receives the parent segment's params, so
  // each locale is prerendered with only the posts written in that language.
  params: { locale: string }
}): Promise<Array<{ slug: string }>> {
  if (!isLocale(params.locale)) return []
  try {
    const slugs = await postsService.listPublishedSlugs(params.locale)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

async function loadPost(slug: string, locale: Locale) {
  try {
    return await postsService.getPublishedBySlug(slug, locale)
  } catch (error) {
    if (error instanceof NotFoundError) return null
    throw error
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const post = await loadPost(slug, locale)
  if (!post) return buildMetadata({ locale, path: `/blog/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt || post.content.slice(0, 155),
    type: 'article',
    publishedTime: (post.publishedAt ?? post.updatedAt).toISOString(),
    // Only advertise translations that exist.
    availableLocales: await postsService.listTranslations(post.slug),
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const post = await loadPost(slug, locale)
  if (!post) notFound()

  const t = getDictionary(locale)

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-balance">{post.title}</h1>
        <p className="text-sm text-muted">
          {post.authorName} ·{' '}
          <time dateTime={(post.publishedAt ?? post.updatedAt).toISOString()}>
            {formatDate(post.publishedAt, locale)}
          </time>
        </p>
      </header>

      {post.excerpt ? <p className="mt-6 text-lg text-muted text-pretty">{post.excerpt}</p> : null}

      <div className="mt-8 flex flex-col gap-4 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <JsonLd
        data={articleJsonLd({
          locale,
          title: post.title,
          description: post.excerpt || post.content.slice(0, 155),
          slug: post.slug,
          authorName: post.authorName,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, url: `${siteConfig.url}${routes.home(locale)}` },
          { name: t.nav.blog, url: `${siteConfig.url}${routes.blog(locale)}` },
          { name: post.title, url: `${siteConfig.url}${routes.blogPost(locale, post.slug)}` },
        ])}
      />
    </article>
  )
}
