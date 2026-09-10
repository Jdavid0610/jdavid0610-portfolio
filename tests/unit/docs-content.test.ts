// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { docSlugs, getDocPage, getDocs } from '@/modules/docs/content'
import { locales } from '@/shared/i18n/config'

/**
 * The in-app documentation is content, so it is held to the same rule as blog
 * posts: it must exist in every language the site serves. These assertions are
 * what stop a section being added in English and silently missing in Spanish.
 */
describe('documentation content', () => {
  it('ships the same pages, in the same order, in every locale', () => {
    for (const locale of locales) {
      expect(getDocs(locale).pages.map((page) => page.slug)).toEqual(docSlugs())
    }
  })

  it('gives every page a title, a summary and some blocks', () => {
    for (const locale of locales) {
      for (const page of getDocs(locale).pages) {
        expect(page.title.length, `${locale}/${page.slug} title`).toBeGreaterThan(0)
        expect(page.summary.length, `${locale}/${page.slug} summary`).toBeGreaterThan(0)
        expect(page.blocks.length, `${locale}/${page.slug} blocks`).toBeGreaterThan(0)
      }
    }
  })

  it('actually translates the prose rather than copying English across', () => {
    for (const slug of docSlugs()) {
      const en = getDocPage('en', slug)!
      const es = getDocPage('es', slug)!
      expect(es.title, slug).not.toBe(en.title)
      expect(es.summary, slug).not.toBe(en.summary)
    }
  })

  it('keeps the same block structure in both locales', () => {
    for (const slug of docSlugs()) {
      const en = getDocPage('en', slug)!
      const es = getDocPage('es', slug)!
      expect(es.blocks.map((b) => b.type), slug).toEqual(en.blocks.map((b) => b.type))
    }
  })

  it('returns null for an unknown page instead of throwing', () => {
    expect(getDocPage('en', 'does-not-exist')).toBeNull()
  })
})
