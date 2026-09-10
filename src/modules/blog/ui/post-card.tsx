import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { formatIsoDate } from '@/shared/lib/format'
import { routes } from '@/shared/lib/routes'
import type { Post } from '../domain/types'

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <article className="group rule-top pt-6">
      <h2 className="text-lg font-semibold">
        <Link
          href={routes.blogPost(locale, post.slug)}
          className="underline decoration-transparent underline-offset-4 transition group-hover:decoration-border-strong"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-1 text-xs text-faint">
        <time dateTime={post.publishedAt}>{formatIsoDate(post.publishedAt, locale)}</time>
      </p>
      <p className="mt-2 max-w-measure text-pretty text-muted">{post.description}</p>
    </article>
  )
}
