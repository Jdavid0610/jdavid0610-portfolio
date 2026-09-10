'use client'

import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { Auth } from '@/server/auth/config'

/**
 * Browser-side auth client. It lives in the auth module rather than in
 * `server/` because it runs in the browser; the only thing it borrows from the
 * server config is a type, which is erased at build time. Only used for interactive flows (sign-in submits,
 * sign-out, OAuth redirects) — server components read sessions via the DAL.
 */
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<Auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
