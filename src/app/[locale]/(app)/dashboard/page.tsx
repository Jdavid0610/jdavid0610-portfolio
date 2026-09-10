import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { routes } from '@/shared/lib/routes'
import { formatDate } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import * as postsService from '@/modules/posts/server/posts.service'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/dashboard',
    title: getDictionary(locale).common.dashboard,
    noIndex: true,
  })
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()
  const t = getDictionary(locale)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t.common.dashboard}</h1>
          <p className="text-sm text-muted">{session.user.email}</p>
        </div>
        <Badge tone={session.user.role === 'admin' ? 'success' : 'neutral'}>
          {t.roles[session.user.role]}
        </Badge>
        <Link href={routes.newPost(locale)} className="ml-auto">
          <Button>{t.posts.newPost}</Button>
        </Link>
      </header>

      {/* Streamed: the shell paints immediately, the query fills in after. */}
      <Suspense fallback={<Card>{t.common.loading}</Card>}>
        <RecentPosts locale={locale} />
      </Suspense>
    </div>
  )
}

async function RecentPosts({ locale }: { locale: 'en' | 'es' }) {
  const session = await requireSession()
  const t = getDictionary(locale)
  const page = await postsService.listMine(session, { search: '', page: 1, status: 'all' })

  return (
    <Card>
      <CardHeader title={t.posts.title} description={t.posts.subtitle} />
      {page.items.length === 0 ? (
        <p className="text-sm text-muted">{t.posts.empty}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {page.items.slice(0, 5).map((post) => (
            <li key={post.id} className="flex items-center gap-3 py-3">
              <Link
                href={routes.editPost(locale, post.id)}
                className="min-w-0 flex-1 truncate text-sm hover:underline"
              >
                {post.title}
              </Link>
              <span className="text-xs text-muted">{formatDate(post.updatedAt, locale)}</span>
              <Badge tone={post.published ? 'success' : 'neutral'}>
                {post.published ? t.posts.published : t.posts.draft}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
