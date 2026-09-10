'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAction, createFormAction } from '@/server/action'
import { getCurrentLocale } from '@/server/auth/session'
import type { Locale } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import { createPostSchema, deletePostSchema, updatePostSchema } from './domain/schemas'
import * as postsService from './server/posts.service'

/**
 * A post belongs to one language, so a write invalidates that language's blog
 * surfaces — not every locale's. The sitemap always changes, because a
 * publish adds or removes a URL.
 */
function revalidatePublicSurfaces(slug: string, locale: Locale): void {
  revalidatePath(routes.blog(locale))
  revalidatePath(routes.blogPost(locale, slug))
  revalidatePath('/sitemap.xml')
}

export const createPostAction = createFormAction({
  input: createPostSchema,
  auth: 'required',
  handler: async ({ input, ctx }): Promise<void> => {
    const created = await postsService.create(ctx.session, input)
    const locale = await getCurrentLocale()
    revalidatePath(routes.posts(locale))
    if (input.published) revalidatePublicSurfaces(created.slug, input.locale)
    redirect(routes.posts(locale))
  },
})

export const updatePostAction = createFormAction({
  input: updatePostSchema,
  auth: 'required',
  handler: async ({ input, ctx }): Promise<void> => {
    const updated = await postsService.update(ctx.session, input)
    const locale = await getCurrentLocale()
    revalidatePath(routes.posts(locale))
    revalidatePath(routes.editPost(locale, input.id))
    revalidatePublicSurfaces(updated.slug, updated.locale)
    redirect(routes.posts(locale))
  },
})

export const deletePostAction = createAction({
  input: deletePostSchema,
  auth: 'required',
  handler: async ({ input, ctx }) => {
    const existing = await postsService.getForEdit(ctx.session, input.id)
    await postsService.remove(ctx.session, input.id)
    const locale = await getCurrentLocale()
    revalidatePath(routes.posts(locale))
    revalidatePublicSurfaces(existing.slug, existing.locale)
    return { id: input.id }
  },
})
