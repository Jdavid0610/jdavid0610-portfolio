import 'server-only'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db, schema } from '@/server/db'
import { env } from '@/server/env'

export const auth = betterAuth({
  appName: 'next-stack',
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Wire your mailer here; left off so the template runs with no email provider.
    requireEmailVerification: false,
  },
  socialProviders:
    env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          },
        }
      : undefined,
  user: {
    additionalFields: {
      role: {
        type: ['user', 'admin'],
        required: false,
        defaultValue: 'user',
        // Server-owned. Without this a client could sign up as an admin.
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // refresh the row at most once a day
    cookieCache: {
      // Lets `proxy.ts` and layouts read a session without a DB round-trip.
      // Short TTL so a revoked session stops working quickly.
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  // Must stay last: it flushes Set-Cookie into the Next cookie store.
  plugins: [nextCookies()],
})

export type Auth = typeof auth
