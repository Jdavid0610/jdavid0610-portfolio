import { z } from 'zod'

/**
 * Environment contract. Parsed once at module load so a misconfigured
 * deployment fails at boot instead of at the first request.
 *
 * Client-visible values must be listed explicitly: Next only inlines
 * `NEXT_PUBLIC_*` at build time, so `process.env` cannot be destructured.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // Optional in mock mode — that is the point of mock mode.
  DATABASE_URL: z.string().min(1).optional(),
  BETTER_AUTH_SECRET: z.string().min(16, 'BETTER_AUTH_SECRET must be at least 16 chars'),
  BETTER_AUTH_URL: z.url(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // --- Mock backend ------------------------------------------------------
  ALLOW_MOCKS_IN_PRODUCTION: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  MOCK_LATENCY_MS: z.coerce.number().int().min(0).max(10_000).default(0),
  /** Comma-separated operation names to force-fail, e.g. "posts.create". */
  MOCK_FAIL: z
    .string()
    .default('')
    .transform((value) => value.split(',').map((entry) => entry.trim()).filter(Boolean)),
})
  .refine((values) => values.DATABASE_URL || process.env.NEXT_PUBLIC_MOCK_MODE === 'on', {
    message: 'DATABASE_URL is required unless NEXT_PUBLIC_MOCK_MODE=on',
    path: ['DATABASE_URL'],
  })

/**
 * Next inlines `NEXT_PUBLIC_*` at build time, substituting `""` for anything
 * that is not defined. An unset public var therefore arrives as an empty
 * string, not `undefined`, which would defeat `.default()` and produce a
 * misleading "Invalid option" instead of "missing". Normalise first.
 */
const blankToUndefined = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === '' ? undefined : value), schema)

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: blankToUndefined(z.url()),
  /**
   * Public because the browser has to know too: the client-side session read
   * and the proxy both branch on it. It only ever *enables* fake data — it can
   * never grant access, so exposing it is safe.
   */
  NEXT_PUBLIC_MOCK_MODE: blankToUndefined(z.enum(['on', 'off']).default('off')),
})

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'
const isBrowser = typeof window !== 'undefined'

function parse<T extends z.ZodType>(schema: T, values: unknown, label: string): z.infer<T> {
  const parsed = schema.safeParse(values)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
    throw new Error(`Invalid ${label} environment variables:\n${issues}`)
  }
  return parsed.data
}

export const clientEnv = parse(
  clientSchema,
  {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_MOCK_MODE: process.env.NEXT_PUBLIC_MOCK_MODE,
  },
  'client',
)

/**
 * Server-only. Reading this from client code throws instead of silently
 * shipping an empty object to the browser.
 */
export const env = (() => {
  if (isBrowser) {
    return new Proxy({} as z.infer<typeof serverSchema>, {
      get(_t, key) {
        throw new Error(`Attempted to read server env "${String(key)}" in the browser.`)
      },
    })
  }
  // During `next build` pages are rendered without a runtime env; skip the
  // hard failure so CI can build without secrets, but keep it strict at runtime.
  if (isBuildPhase && !process.env.DATABASE_URL) {
    return {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://build:build@localhost:5432/build',
      BETTER_AUTH_SECRET: 'build-time-placeholder-secret',
      BETTER_AUTH_URL: clientEnv.NEXT_PUBLIC_APP_URL,
      ALLOW_MOCKS_IN_PRODUCTION: false,
      MOCK_LATENCY_MS: 0,
      MOCK_FAIL: [],
    } as z.infer<typeof serverSchema>
  }
  return parse(serverSchema, process.env, 'server')
})()
