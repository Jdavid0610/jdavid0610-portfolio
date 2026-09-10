import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { formatIsoDate } from '@/shared/lib/format'
import { routes } from '@/shared/lib/routes'
import { breadcrumbs } from '@/shared/lib/breadcrumbs'
import { articleJsonLd, breadcrumbJsonLd, graph, JsonLd } from '@/shared/lib/json-ld'
import { BreadcrumbTrail } from '@/shared/ui/breadcrumb-trail'
import { TagList } from '@/shared/ui/tag'
import { getPost, postLocales, postSlugsFor } from '@/modules/blog/content'
import { PostBlocks } from '@/modules/blog/ui/post-blocks'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * A nested `generateStaticParams` receives the parent segment's params, so
 * each locale prerenders only the posts published in that language.
 */
export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}): Promise<Array<{ slug: string }>> {
  if (!isLocale(params.locale)) return []
  return postSlugsFor(params.locale).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const post = getPost(locale, slug)
  if (!post) return buildMetadata({ locale, path: `/blog/${slug}`, noIndex: true })

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    type: 'article',
    publishedTime: post.publishedAt,
    // Only advertise translations that exist.
    availableLocales: postLocales(post.slug),
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const post = getPost(locale, slug)
  if (!post) notFound()

  const t = getDictionary(locale)
  const path = `/blog/${post.slug}`
  const trail = breadcrumbs(locale, t, [
    { name: t.nav.blog, path: routes.blog(locale) },
    { name: post.title, path: routes.blogPost(locale, post.slug) },
  ])

  return (
    <article className="py-10">
      <BreadcrumbTrail items={trail} label={t.nav.footerLabel} />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-faint">
          {t.blog.publishedOn}{' '}
          <time dateTime={post.publishedAt}>{formatIsoDate(post.publishedAt, locale)}</time>
        </p>
        <p className="mt-4 max-w-measure text-pretty text-lg text-muted">{post.description}</p>
      </header>

      <div className="mt-10">
        <PostBlocks blocks={post.blocks} />
      </div>

      <div className="mt-12 flex flex-col gap-6 rule-top pt-6">
        <TagList items={post.tags} label={t.blog.tagsTitle} />
        <p className="text-sm">
          <Link
            href={routes.blog(locale)}
            className="text-brand underline decoration-border underline-offset-4"
          >
            {t.blog.backToBlog}
          </Link>
        </p>
      </div>

      <JsonLd
        data={graph(
          articleJsonLd({
            locale,
            title: post.title,
            description: post.description,
            slug: post.slug,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbJsonLd(trail, { locale, path }),
        )}
      />
    </article>
  )
}
