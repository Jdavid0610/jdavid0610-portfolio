import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { NotFoundError } from '@/server/errors'
import { Card } from '@/shared/ui/card'
import { PostForm } from '@/modules/posts/ui/post-form'
import * as postsService from '@/modules/posts/server/posts.service'

type Props = { params: Promise<{ locale: string; id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: `/posts/${id}/edit`,
    title: getDictionary(locale).posts.editPost,
    noIndex: true,
  })
}

export default async function EditPostPage({ params }: Props) {
  const { locale, id } = await params
  if (!isLocale(locale)) notFound()

  // Ownership is enforced by the service, not by hiding the link.
  const session = await requireSession()
  const t = getDictionary(locale)

  let post
  try {
    post = await postsService.getForEdit(session, id)
  } catch (error) {
    if (error instanceof NotFoundError) notFound()
    throw error
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t.posts.editPost}</h1>
      <Card>
        <PostForm post={post} />
      </Card>
    </div>
  )
}
