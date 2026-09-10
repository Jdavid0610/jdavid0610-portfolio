import { z } from 'zod'

/**
 * Environment contract. Parsed once at module load so a misconfigured
 * deployment fails at boot instead of at the first request.
 *
 * This site is a fully prerendered static portfolio: it has no database, no
 * auth provider and no secrets. The only value it needs is its own canonical
 * origin, which every URL, `hreflang`, sitemap entry and JSON-LD `@id` derives
 * from — see `src/shared/config/site.ts`.
 *
 * Client-visible values must be listed explicitly: Next only inlines
 * `NEXT_PUBLIC_*` at build time, so `process.env` cannot be destructured.
 */

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
})

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
  { NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL },
  'client',
)
