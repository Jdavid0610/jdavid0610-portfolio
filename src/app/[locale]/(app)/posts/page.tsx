import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { postFiltersSchema } from '@/modules/posts/domain/schemas'
import { serializePage } from '@/modules/posts/domain/types'
import { PostsManager } from '@/modules/posts/ui/posts-manager'
import * as postsService from '@/modules/posts/server/posts.service'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/posts',
    title: getDictionary(locale).posts.title,
    noIndex: true,
  })
}

/**
 * The first page is rendered on the server from the URL's filters, then handed
 * to the client hook as `initialData`. The user sees real rows on first paint;
 * searching and paging afterwards never round-trips through a full RSC render.
 */
export default async function PostsPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()
  const t = getDictionary(locale)
  const filters = postFiltersSchema.parse(await searchParams)
  const page = await postsService.listMine(session, filters)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t.posts.title}</h1>
          <p className="text-sm text-muted">{t.posts.subtitle}</p>
        </div>
        <Link href={routes.newPost(locale)} className="ml-auto">
          <Button>{t.posts.newPost}</Button>
        </Link>
      </header>

      <PostsManager initialData={serializePage(page)} />
    </div>
  )
}
