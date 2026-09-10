import { z } from 'zod'
import { locales } from '@/shared/i18n/config'

/** Messages are message keys — see `modules/auth/domain/schemas.ts` for why. */

export const slugSchema = z
  .string()
  .min(3, 'validation.slugMin')
  .max(120, 'validation.slugMax')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'validation.slugFormat')

export const createPostSchema = z.object({
  locale: z.enum(locales),
  title: z.string().min(3, 'validation.titleMin').max(160, 'validation.titleMax'),
  slug: slugSchema,
  excerpt: z.string().max(280, 'validation.excerptMax').default(''),
  content: z.string().min(1, 'validation.contentRequired'),
  /**
   * An unchecked checkbox is *absent* from FormData; a checked one arrives as
   * "on". `.optional()` is what allows the missing key — putting `z.undefined()`
   * inside the union does not, because the object schema still requires the
   * key to be present. See `tests/unit/post-schema.test.ts`.
   */
  published: z
    .union([z.boolean(), z.literal('on'), z.literal('true'), z.literal('false')])
    .optional()
    .transform((value) => value === true || value === 'on' || value === 'true'),
})

export const updatePostSchema = createPostSchema.extend({
  id: z.uuid(),
})

export const deletePostSchema = z.object({ id: z.uuid() })

export const postFiltersSchema = z.object({
  search: z.string().trim().max(80).optional().default(''),
  page: z.coerce.number().int().min(1).catch(1),
  status: z.enum(['all', 'published', 'draft']).catch('all'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostFilters = z.infer<typeof postFiltersSchema>

/** Turns a title into a URL-safe slug. Shared by the form hook and seeds. */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}
