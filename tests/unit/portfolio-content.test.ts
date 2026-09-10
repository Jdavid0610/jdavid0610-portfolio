// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { locales } from '@/shared/i18n/config'
import { getProjects, getProjectsCopy, projectSlugs } from '@/modules/projects/content'
import { getRoles, roleSlugs } from '@/modules/experience/content'
import { getTemplates, templateSlugs } from '@/modules/open-source/content'
import { faqIds, getFaq } from '@/modules/faq/content'
import { getPosts, postSlugs } from '@/modules/blog/content'
import { getProfile } from '@/modules/profile/content'

/**
 * Portfolio content is typed data held to one rule: it must exist, in the same
 * shape, in every language the site serves. The `Record<Slug, Copy>` types make
 * a *missing* entry a compile error; these assertions cover what a type cannot
 * — that the Spanish text was actually written rather than copied from English,
 * and that paired arrays did not drift apart.
 */
describe('projects content', () => {
  it('ships the same projects, in the same order, in every locale', () => {
    for (const locale of locales) {
      expect(getProjects(locale).map((project) => project.slug)).toEqual([...projectSlugs])
    }
  })

  it('gives every project the copy each page renders', () => {
    for (const locale of locales) {
      for (const project of getProjects(locale)) {
        const where = `${locale}/${project.slug}`
        expect(project.tagline.length, `${where} tagline`).toBeGreaterThan(0)
        expect(project.definition.length, `${where} definition`).toBeGreaterThan(0)
        expect(project.role.length, `${where} role`).toBeGreaterThan(0)
        expect(project.problem.length, `${where} problem`).toBeGreaterThan(0)
        expect(project.contribution.length, `${where} contribution`).toBeGreaterThan(0)
        expect(project.features.length, `${where} features`).toBeGreaterThan(0)
        expect(project.narrative.length, `${where} narrative`).toBeGreaterThanOrEqual(3)
        expect(project.stack.length, `${where} stack`).toBeGreaterThan(0)
      }
    }
  })

  it('translates the prose rather than copying English across', () => {
    for (const slug of projectSlugs) {
      const en = getProjects('en').find((project) => project.slug === slug)!
      const es = getProjects('es').find((project) => project.slug === slug)!
      expect(es.definition, slug).not.toBe(en.definition)
      expect(es.problem, slug).not.toBe(en.problem)
      expect(es.contribution, slug).not.toBe(en.contribution)
    }
  })

  it('keeps paired arrays the same length in both locales', () => {
    for (const slug of projectSlugs) {
      const en = getProjects('en').find((project) => project.slug === slug)!
      const es = getProjects('es').find((project) => project.slug === slug)!
      expect(es.features.length, `${slug} features`).toBe(en.features.length)
      expect(es.narrative.length, `${slug} narrative`).toBe(en.narrative.length)
      expect(es.facts?.length ?? 0, `${slug} facts`).toBe(en.facts?.length ?? 0)
      expect(Boolean(es.note), `${slug} note`).toBe(Boolean(en.note))
    }
  })

  it('ships seven projects, including Marea Verde as freelance client work', () => {
    expect(projectSlugs).toHaveLength(7)
    const mareaVerde = getProjects('en').find((project) => project.slug === 'mareaverde')!
    expect(mareaVerde.bucket).toBe('freelance')
    // Freelance client work: no owned organization is claimed for it.
    expect(mareaVerde.organization).toBeUndefined()
  })

  it('never labels a project bucket the locale files do not name', () => {
    for (const locale of locales) {
      const copy = getProjectsCopy(locale)
      for (const project of getProjects(locale)) {
        expect(copy.bucketLabels[project.bucket]).toBeTruthy()
        expect(copy.statusLabels[project.status]).toBeTruthy()
      }
    }
  })

  it('emits an aggregateRating for HerbaFit only, dated and sourced', () => {
    const rated = getProjects('en').filter((project) => project.aggregateRating)
    expect(rated.map((project) => project.slug)).toEqual(['herbafit'])
    expect(rated[0]!.aggregateRating).toMatchObject({ source: 'Google Play', asOf: '2026-09' })
  })

  it('attaches HerbaFit to no experience entry, because BTi Group is not on the résumé', () => {
    const herbafit = getProjects('en').find((project) => project.slug === 'herbafit')!
    expect(herbafit.experienceSlug).toBeUndefined()
  })

  it('cross-links a project to a template only in both directions', () => {
    for (const project of getProjects('en')) {
      if (!project.relatedTemplateSlug) continue
      const template = getTemplates('en').find(
        (candidate) => candidate.slug === project.relatedTemplateSlug,
      )
      expect(template, project.slug).toBeDefined()
      expect(template!.relatedProjectSlug, project.slug).toBe(project.slug)
    }
  })
})

describe('experience content', () => {
  it('ships the same roles, reverse chronologically, in every locale', () => {
    for (const locale of locales) {
      expect(getRoles(locale).map((role) => role.slug)).toEqual([...roleSlugs])
    }
  })

  it('leads with the current role, then orders the rest newest first', () => {
    const roles = getRoles('en')
    expect(roles[0]!.end).toBeNull()
    const starts = roles.slice(1).map((role) => role.start)
    expect([...starts].sort().reverse()).toEqual(starts)
  })

  it('uses YYYY-MM dates and never invents a day', () => {
    for (const role of getRoles('en')) {
      expect(role.start, role.slug).toMatch(/^\d{4}-\d{2}$/)
      if (role.end !== null) expect(role.end, role.slug).toMatch(/^\d{4}-\d{2}$/)
    }
  })

  it('keeps exactly one current role', () => {
    expect(getRoles('en').filter((role) => role.end === null)).toHaveLength(1)
  })

  it('links only to projects that exist', () => {
    for (const role of getRoles('en')) {
      for (const slug of role.projectSlugs) {
        expect(projectSlugs, `${role.slug} -> ${slug}`).toContain(slug)
      }
    }
  })

  it('no longer links Rebus Technology or DevInMotion to HerbaFit', () => {
    for (const slug of ['rebus-technology-devops', 'devinmotion-software-engineer'] as const) {
      const role = getRoles('en').find((candidate) => candidate.slug === slug)!
      expect(role.projectSlugs, slug).not.toContain('herbafit')
    }
  })

  it('translates every role rather than copying English across', () => {
    for (const slug of roleSlugs) {
      const en = getRoles('en').find((role) => role.slug === slug)!
      const es = getRoles('es').find((role) => role.slug === slug)!
      expect(es.summary, slug).not.toBe(en.summary)
      expect(es.achievements.length, slug).toBe(en.achievements.length)
    }
  })
})

describe('open-source content', () => {
  it('ships the same five templates in every locale', () => {
    expect(templateSlugs).toHaveLength(5)
    for (const locale of locales) {
      expect(getTemplates(locale).map((template) => template.slug)).toEqual([...templateSlugs])
    }
  })

  it('marks exactly one template as the one this site runs on', () => {
    const dogfooded = getTemplates('en').filter((template) => template.poweringThisSite)
    expect(dogfooded.map((template) => template.slug)).toEqual(['next-stack'])
  })

  it('labels every repository figure with the date it was read', () => {
    for (const template of getTemplates('en')) {
      expect(template.asOf, template.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(template.created, template.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(template.lastPush, template.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('states the absence of a license rather than hiding it', () => {
    for (const template of getTemplates('en')) {
      expect(template.license, template.slug).toBeNull()
    }
  })

  it('translates every template rather than copying English across', () => {
    for (const slug of templateSlugs) {
      const en = getTemplates('en').find((template) => template.slug === slug)!
      const es = getTemplates('es').find((template) => template.slug === slug)!
      expect(es.definition, slug).not.toBe(en.definition)
      expect(es.includes.length, slug).toBe(en.includes.length)
      expect(es.narrative.length, slug).toBe(en.narrative.length)
    }
  })
})

describe('FAQ content', () => {
  it('answers every question, in the same order, in every locale', () => {
    for (const locale of locales) {
      expect(getFaq(locale).map((entry) => entry.id)).toEqual([...faqIds])
    }
  })

  it('names the entity instead of opening an answer with a pronoun', () => {
    for (const entry of getFaq('en')) {
      const firstSentence = entry.answer.split('. ')[0] ?? ''
      expect(firstSentence, entry.id).not.toMatch(/^(He|She|They|It|His|Her)\b/)
    }
  })

  it('keeps every answer self-contained: two or more sentences, entity named', () => {
    for (const entry of getFaq('en')) {
      expect(entry.answer.length, entry.id).toBeGreaterThan(120)
      expect(entry.answer, entry.id).toMatch(/Julian|ClinPsia|PhenoScience|TALENT|HerbaFit|Riwin|Novapp|next-stack|Let/)
    }
  })

  it('uses no relative time expressions, which decay in a cache', () => {
    const banned = /\b(recently|nowadays|lately|currently for|years of experience)\b/i
    for (const locale of locales) {
      for (const entry of getFaq(locale)) {
        expect(entry.answer, `${locale}/${entry.id}`).not.toMatch(banned)
      }
    }
  })

  it('translates every answer rather than copying English across', () => {
    for (const id of faqIds) {
      const en = getFaq('en').find((entry) => entry.id === id)!
      const es = getFaq('es').find((entry) => entry.id === id)!
      expect(es.question, id).not.toBe(en.question)
      expect(es.answer, id).not.toBe(en.answer)
    }
  })
})

describe('blog content', () => {
  it('ships every post in both locales', () => {
    for (const locale of locales) {
      expect(getPosts(locale).map((post) => post.slug)).toEqual([...postSlugs])
    }
  })

  it('requires a description on every post rather than slicing the body', () => {
    for (const locale of locales) {
      for (const post of getPosts(locale)) {
        expect(post.description.length, `${locale}/${post.slug}`).toBeGreaterThan(40)
        expect(post.blocks.length, `${locale}/${post.slug}`).toBeGreaterThan(3)
      }
    }
  })

  it('translates every post rather than copying English across', () => {
    for (const slug of postSlugs) {
      const en = getPosts('en').find((post) => post.slug === slug)!
      const es = getPosts('es').find((post) => post.slug === slug)!
      expect(es.title, slug).not.toBe(en.title)
      expect(es.blocks.map((block) => block.type), slug).toEqual(
        en.blocks.map((block) => block.type),
      )
    }
  })
})

describe('profile content', () => {
  it('ships the same skill groups in every locale, with a label for each', () => {
    for (const locale of locales) {
      const profile = getProfile(locale)
      for (const group of profile.skillGroups) {
        expect(profile.categoryLabels[group.key], `${locale}/${group.key}`).toBeTruthy()
        expect(group.skills.length, `${locale}/${group.key}`).toBeGreaterThan(0)
      }
    }
  })

  it('emits a real, unobfuscated mailto: and a tel: link', () => {
    const channels = getProfile('en').channels
    expect(channels.find((channel) => channel.key === 'email')?.href).toBe(
      'mailto:jdavidortizy2k@gmail.com',
    )
    expect(channels.find((channel) => channel.key === 'phone')?.href).toBe('tel:+573164344625')
  })

  it('translates the biography rather than copying English across', () => {
    expect(getProfile('es').longBio).not.toEqual(getProfile('en').longBio)
    expect(getProfile('es').longBio.length).toBe(getProfile('en').longBio.length)
  })
})
