import { describe, expect, it } from 'vitest'
import { buildMetadata } from '@/shared/lib/seo'

describe('buildMetadata', () => {
  it('builds a locale-scoped canonical URL', () => {
    const metadata = buildMetadata({ locale: 'es', path: '/blog/hola' })
    expect(metadata.alternates?.canonical).toBe('https://example.com/es/blog/hola')
  })

  it('declares every locale plus x-default as alternates', () => {
    const languages = buildMetadata({ locale: 'en', path: '/blog' }).alternates?.languages ?? {}
    expect(Object.keys(languages).sort()).toEqual(['en-US', 'es-CO', 'x-default'])
    expect(languages['x-default']).toBe('https://example.com/en/blog')
  })

  it('marks a page noindex on request', () => {
    const robots = buildMetadata({ locale: 'en', path: '/projects/unknown', noIndex: true }).robots
    expect(robots).toMatchObject({ index: false, follow: false })
  })
})
