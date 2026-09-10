import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/server/auth/config'

/**
 * Every Better Auth endpoint — sign-in, callbacks, session, sign-out — is
 * served from this one catch-all. It lives outside `[locale]` on purpose:
 * OAuth callback URLs must not change when the user switches language.
 */
export const { GET, POST } = toNextJsHandler(auth)
