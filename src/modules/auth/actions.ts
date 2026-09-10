'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createFormAction } from '@/server/action'
import { getCurrentLocale } from '@/server/auth/session'
import { routes } from '@/shared/lib/routes'
import { signInSchema, signUpSchema, updateProfileSchema } from './domain/schemas'
import * as authService from './server/auth.service'

/** Blocks open redirects: only same-origin absolute paths are honoured. */
function safeCallback(callbackUrl: string | undefined, fallback: string): string {
  if (!callbackUrl) return fallback
  if (!callbackUrl.startsWith('/') || callbackUrl.startsWith('//')) return fallback
  return callbackUrl
}

export const signInAction = createFormAction({
  input: signInSchema,
  handler: async ({ input }): Promise<void> => {
    await authService.signIn(input)
    const locale = await getCurrentLocale()
    redirect(safeCallback(input.callbackUrl, routes.dashboard(locale)))
  },
})

export const signUpAction = createFormAction({
  input: signUpSchema,
  handler: async ({ input }): Promise<void> => {
    await authService.signUp(input)
    const locale = await getCurrentLocale()
    redirect(safeCallback(input.callbackUrl, routes.dashboard(locale)))
  },
})

export async function signOutAction(): Promise<void> {
  await authService.signOut()
  const locale = await getCurrentLocale()
  redirect(routes.home(locale))
}

export const updateProfileAction = createFormAction({
  input: updateProfileSchema,
  auth: 'required',
  handler: async ({ input, ctx }) => {
    const updated = await authService.updateProfile(ctx.session.user.id, input)
    const locale = await getCurrentLocale()
    revalidatePath(routes.settings(locale))
    return updated
  },
})
