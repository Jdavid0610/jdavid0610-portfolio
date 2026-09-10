import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { Card } from '@/shared/ui/card'
import { PostForm } from '@/modules/posts/ui/post-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/posts/new',
    title: getDictionary(locale).posts.newPost,
    noIndex: true,
  })
}

export default async function NewPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  await requireSession()

  const t = getDictionary(locale)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t.posts.newPost}</h1>
      <Card>
        <PostForm />
      </Card>
    </div>
  )
}
