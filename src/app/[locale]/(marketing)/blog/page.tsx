import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { serializePost } from '@/modules/posts/domain/types'
import { PostCard } from '@/modules/posts/ui/post-card'
import * as postsService from '@/modules/posts/server/posts.service'

/** ISR: rebuilt at most hourly, and immediately on publish via `revalidatePath`. */
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, path: '/blog', title: getDictionary(locale).nav.blog })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = getDictionary(locale)
  // Scoped to the visitor's language: /es/blog lists the Spanish posts.
  const posts = (await postsService.listPublished(locale, 50)).map(serializePost)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t.nav.blog}</h1>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
          {t.posts.empty}
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      )}
    </section>
  )
}
