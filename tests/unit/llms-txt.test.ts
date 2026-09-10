// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { GET as llms } from '@/app/llms.txt/route'
import { GET as llmsFull } from '@/app/llms-full.txt/route'
import { siteConfig } from '@/shared/config/site'
import { locales } from '@/shared/i18n/config'
import { getProjects, projectSlugs } from '@/modules/projects/content'
import { templateSlugs } from '@/modules/open-source/content'
import { faqIds, getFaq } from '@/modules/faq/content'
import { getProfile } from '@/modules/profile/content'

async function textOf(response: Response) {
  return await response.text()
}

describe('llms.txt', () => {
  it('is served as plain UTF-8 text, not markdown', async () => {
    const response = llms()
    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8')
  })

  it('interpolates the configured origin and hardcodes none', async () => {
    const body = await textOf(llms())
    expect(body).toContain(`${siteConfig.url}/en`)
    expect(body).toContain(`${siteConfig.url}/es`)
    expect(body).not.toMatch(/julianortiz\.dev|localhost/)
  })

  it('lives outside the locale segment, so it never self-references a prefixed copy', async () => {
    const body = await textOf(llms())
    expect(body).toContain(`${siteConfig.url}/llms-full.txt`)
    expect(body).not.toContain('/en/llms.txt')
  })

  it('lists every project and every template', async () => {
    const body = await textOf(llms())
    for (const slug of projectSlugs) expect(body, slug).toContain(`/en/projects/${slug}`)
    for (const slug of templateSlugs) expect(body, slug).toContain(`/en/open-source/${slug}`)
  })

  it('publishes the contact details unobfuscated', async () => {
    const body = await textOf(llms())
    expect(body).toContain(siteConfig.email)
    expect(body).toContain(siteConfig.phone.display)
  })

  it('keeps the UTF-8 characters intact', async () => {
    const body = await textOf(llms())
    expect(body).toContain('TALENTÜ')
  })

  it('says the site is bilingual and how to swap the locale', async () => {
    const body = await textOf(llms())
    expect(body).toMatch(/Spanish/)
    expect(body).toContain('`/es/`')
  })

  it('names no skill the taxonomy marks as merely working', async () => {
    const body = await textOf(llms())
    const skillsSection = body.split('## Skills')[1]?.split('##')[0] ?? ''
    expect(skillsSection.length).toBeGreaterThan(50)
    const working = getProfile('en').skillGroups.flatMap((group) =>
      group.skills.filter((skill) => skill.tier === 'working').map((skill) => skill.name),
    )
    // MongoDB is `working`: résumé-named, no public artefact.
    expect(working).toContain('MongoDB')
    expect(skillsSection).not.toContain('MongoDB')
  })
})

describe('llms-full.txt', () => {
  it('is served as plain UTF-8 text', () => {
    expect(llmsFull().headers.get('content-type')).toBe('text/plain; charset=utf-8')
  })

  it('carries the full corpus for every locale the site serves', async () => {
    const body = await textOf(llmsFull())
    for (const locale of locales) expect(body, locale).toContain(`LOCALE: ${locale}`)
  })

  it('includes every project narrative and every question and answer', async () => {
    const body = await textOf(llmsFull())
    for (const project of getProjects('en')) {
      expect(body, project.slug).toContain(project.narrative[0]!)
    }
    for (const entry of getFaq('en')) {
      expect(body, entry.id).toContain(entry.answer)
    }
    expect(faqIds.length).toBeGreaterThan(20)
  })

  it('states that it is generated from the typed content', async () => {
    const body = await textOf(llmsFull())
    expect(body).toMatch(/generated from the same typed content/)
  })

  it('stays under the 200 KB budget', async () => {
    const bytes = new TextEncoder().encode(await textOf(llmsFull())).length
    expect(bytes).toBeLessThan(200_000)
  })

  it('hardcodes no origin', async () => {
    expect(await textOf(llmsFull())).not.toMatch(/julianortiz\.dev|localhost/)
  })
})
