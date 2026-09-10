import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { formatDate } from '@/shared/lib/format'
import { routes } from '@/shared/lib/routes'
import type { SerializedPost } from '../domain/types'

/**
 * Server component: the blog feed ships zero JavaScript for this. Rendered as
 * an <article> so crawlers see a real content unit.
 */
export function PostCard({ post, locale }: { post: SerializedPost; locale: Locale }) {
  return (
    <article className="group rounded-card border border-border bg-surface p-6 transition hover:border-brand">
      <h2 className="text-lg font-semibold">
        <Link href={routes.blogPost(locale, post.slug)} className="after:absolute">
          {post.title}
        </Link>
      </h2>
      {post.excerpt ? <p className="mt-2 text-sm text-muted">{post.excerpt}</p> : null}
      <footer className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span>{post.authorName}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt, locale)}</time>
      </footer>
    </article>
  )
}
