// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createPostSchema, slugify } from '@/modules/posts/domain/schemas'
import { formDataToObject } from '@/server/action'

function form(fields: Record<string, string>): FormData {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) data.append(key, value)
  return data
}

const base = {
  locale: 'en',
  title: 'A perfectly good title',
  slug: 'a-perfectly-good-title',
  content: 'Body text.',
}

describe('createPostSchema', () => {
  /**
   * Regression: an unchecked checkbox is absent from FormData, and a union
   * containing `z.undefined()` does not make an object key optional in Zod —
   * so saving a draft failed validation with "This field is required".
   */
  it('treats an absent checkbox as false, not as a missing field', () => {
    const result = createPostSchema.safeParse(formDataToObject(form(base)))

    expect(result.success).toBe(true)
    expect(result.data?.published).toBe(false)
  })

  it('treats a checked checkbox ("on") as true', () => {
    const result = createPostSchema.safeParse(formDataToObject(form({ ...base, published: 'on' })))

    expect(result.success).toBe(true)
    expect(result.data?.published).toBe(true)
  })

  it('requires a locale the app actually serves', () => {
    expect(createPostSchema.safeParse({ ...base, locale: 'fr' }).success).toBe(false)
    expect(createPostSchema.safeParse({ ...base, locale: 'es' }).success).toBe(true)
  })
})

describe('slugify', () => {
  it('strips accents so Spanish titles produce clean URLs', () => {
    expect(slugify('Dónde va realmente la autorización')).toBe(
      'donde-va-realmente-la-autorizacion',
    )
  })

  it('collapses punctuation and trims stray hyphens', () => {
    expect(slugify('  Hello, World! -- again  ')).toBe('hello-world-again')
  })
})
