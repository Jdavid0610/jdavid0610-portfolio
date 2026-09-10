// @vitest-environment node
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { siteConfig } from '@/shared/config/site'
import { locales } from '@/shared/i18n/config'
import { DESCRIPTION_MAX, TITLE_MAX, type PageKey } from '@/modules/pages/domain/types'
import { getPagesCopy } from '@/modules/pages/content'
import { getProjects, projectSlugs } from '@/modules/projects/content'
import { getTemplates, templateSlugs } from '@/modules/open-source/content'
import { getPosts, postSlugs } from '@/modules/blog/content'

describe('metadata budgets', () => {
  it('keeps every route title within the title budget', () => {
    for (const locale of locales) {
      const pages = getPagesCopy(locale)
      for (const key of Object.keys(pages) as PageKey[]) {
        expect(pages[key].title.length, `${locale}/${key}: ${pages[key].title}`).toBeLessThanOrEqual(
          TITLE_MAX,
        )
      }
    }
  })

  it('keeps every route description within the description budget', () => {
    for (const locale of locales) {
      const pages = getPagesCopy(locale)
      for (const key of Object.keys(pages) as PageKey[]) {
        const { description } = pages[key]
        expect(description.length, `${locale}/${key}: ${description}`).toBeLessThanOrEqual(
          DESCRIPTION_MAX,
        )
        expect(description.length, `${locale}/${key}`).toBeGreaterThan(60)
      }
    }
  })

  it('keeps every project page within budget', () => {
    for (const locale of locales) {
      for (const project of getProjects(locale)) {
        const where = `${locale}/${project.slug}`
        expect(project.metaTitle.length, `${where}: ${project.metaTitle}`).toBeLessThanOrEqual(
          TITLE_MAX,
        )
        expect(
          project.metaDescription.length,
          `${where}: ${project.metaDescription}`,
        ).toBeLessThanOrEqual(DESCRIPTION_MAX)
      }
    }
  })

  it('keeps every template page within budget', () => {
    for (const locale of locales) {
      for (const template of getTemplates(locale)) {
        const where = `${locale}/${template.slug}`
        expect(template.metaTitle.length, `${where}: ${template.metaTitle}`).toBeLessThanOrEqual(
          TITLE_MAX,
        )
        expect(
          template.metaDescription.length,
          `${where}: ${template.metaDescription}`,
        ).toBeLessThanOrEqual(DESCRIPTION_MAX)
      }
    }
  })

  it('keeps every blog post within budget', () => {
    for (const locale of locales) {
      for (const post of getPosts(locale)) {
        const where = `${locale}/${post.slug}`
        expect(post.title.length, `${where}: ${post.title}`).toBeLessThanOrEqual(TITLE_MAX)
        expect(post.description.length, `${where}`).toBeLessThanOrEqual(DESCRIPTION_MAX)
      }
    }
  })
})

describe('robots.txt', () => {
  const rules = () => {
    const value = robots().rules
    return Array.isArray(value) ? value : [value]
  }

  it('no longer disallows routes that do not exist', () => {
    const serialized = JSON.stringify(robots())
    for (const dead of ['dashboard', 'settings', 'admin', 'sign-in', 'sign-up', '/*/posts']) {
      expect(serialized, dead).not.toContain(dead)
    }
  })

  it('allows every answer-time retrieval agent, which is the whole GEO mechanism', () => {
    const serialized = JSON.stringify(robots())
    for (const agent of [
      'OAI-SearchBot',
      'ChatGPT-User',
      'Claude-SearchBot',
      'Claude-User',
      'PerplexityBot',
      'Perplexity-User',
    ]) {
      expect(serialized, agent).toContain(agent)
    }
  })

  it('allows the training agents too, and disallows none of the fifteen', () => {
    for (const rule of rules()) {
      const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent]
      if (agents.includes('GPTBot')) {
        expect(rule.allow).toBe('/')
        expect(rule.disallow).toBeUndefined()
      }
    }
    const serialized = JSON.stringify(robots())
    for (const agent of [
      'GPTBot',
      'ClaudeBot',
      'anthropic-ai',
      'Google-Extended',
      'Applebot-Extended',
      'CCBot',
      'Bytespider',
      'cohere-ai',
      'meta-externalagent',
    ]) {
      expect(serialized, agent).toContain(agent)
    }
  })

  it('never disallows llms.txt, which exists precisely to be fetched', () => {
    expect(JSON.stringify(robots())).not.toMatch(/disallow[^\]]*llms/i)
  })

  it('derives the sitemap and host from the configured origin', () => {
    expect(robots().sitemap).toBe('https://example.com/sitemap.xml')
    expect(robots().host).toBe('https://example.com')
  })
})

describe('sitemap.xml', () => {
  const entries = sitemap()

  it('is synchronous, because every entry comes from typed data', () => {
    expect(Array.isArray(entries)).toBe(true)
  })

  it('enumerates every content route in every locale', () => {
    const urls = entries.map((entry) => entry.url)
    const expected = [
      '',
      '/about',
      '/projects',
      ...projectSlugs.map((slug) => `/projects/${slug}`),
      '/open-source',
      ...templateSlugs.map((slug) => `/open-source/${slug}`),
      '/experience',
      '/faq',
      '/contact',
      '/blog',
      ...postSlugs.map((slug) => `/blog/${slug}`),
    ]
    for (const locale of locales) {
      for (const path of expected) {
        expect(urls, `${locale}${path}`).toContain(`${siteConfig.url}/${locale}${path}`)
      }
    }
    expect(urls).toHaveLength(expected.length * locales.length)
  })

  it('declares an alternate for every locale a page exists in', () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {}
      expect(Object.keys(languages).length, entry.url).toBeGreaterThan(0)
    }
  })

  it('mentions no removed surface', () => {
    const urls = entries.map((entry) => entry.url).join(' ')
    for (const dead of ['/docs', '/dashboard', '/sign-in', '/posts']) {
      expect(urls, dead).not.toContain(dead)
    }
  })
})

describe('no hardcoded origin anywhere in the source', () => {
  function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const path = join(dir, entry)
      if (statSync(path).isDirectory()) return sourceFiles(path)
      return /\.(ts|tsx|css|svg)$/.test(path) ? [path] : []
    })
  }

  it('never commits an illustrative or local origin', () => {
    for (const file of sourceFiles('src')) {
      const contents = readFileSync(file, 'utf8')
      expect(contents, file).not.toMatch(/julianortiz\.dev/)
      expect(contents, file).not.toMatch(/https?:\/\/localhost/)
      expect(contents, file).not.toMatch(/127\.0\.0\.1/)
    }
  })

  it('derives siteConfig.url from the environment', () => {
    expect(siteConfig.url).toBe(process.env.NEXT_PUBLIC_APP_URL)
  })
})
