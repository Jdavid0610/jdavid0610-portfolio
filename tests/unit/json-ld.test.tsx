// @vitest-environment node
import { describe, expect, it } from 'vitest'
import type { Graph } from 'schema-dts'
import { locales } from '@/shared/i18n/config'
import { siteConfig } from '@/shared/config/site'
import {
  applicationJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  graph,
  ids,
  itemListJsonLd,
  JsonLd,
  organizationJsonLd,
  personJsonLd,
  profilePageJsonLd,
  softwareSourceCodeJsonLd,
  websiteJsonLd,
} from '@/shared/lib/json-ld'
import { getProfile, education, knowsAbout } from '@/modules/profile/content'
import { getProjects } from '@/modules/projects/content'
import { getTemplates } from '@/modules/open-source/content'
import { getFaq } from '@/modules/faq/content'

const profile = getProfile('en')

/**
 * The builders are annotated with the schema-dts types on purpose — that is
 * what makes a misspelled property a compile error. Those types are broad
 * unions, so reading a property back in a test needs one deliberate widening.
 */
function fields(entity: unknown): Record<string, unknown> {
  return entity as Record<string, unknown>
}

function person() {
  return personJsonLd({
    locale: 'en',
    description: profile.oneLineBio,
    jobTitles: profile.titles,
    knowsAbout: knowsAbout(),
    degreeName: profile.education.degree,
    institution: education.institution,
    mainEntityOfPagePath: '/about',
  })
}

describe('the Person entity', () => {
  it('anchors the graph at one stable, origin-derived @id', () => {
    expect(fields(person())['@id']).toBe('https://example.com/#person')
    expect(ids.person()).toBe(`${siteConfig.url}/#person`)
  })

  it('publishes a real, unobfuscated mailto: and the phone number', () => {
    expect(fields(person()).email).toBe('mailto:jdavidortizy2k@gmail.com')
    expect(fields(person()).telephone).toBe('+573164344625')
  })

  it('declares all three job titles, because the three titles are the positioning', () => {
    expect(fields(person()).jobTitle).toEqual([
      'Senior FullStack Developer',
      'DevOps Specialist',
      'AI Engineer',
    ])
  })

  it('names both languages without claiming a proficiency level', () => {
    expect(JSON.stringify(fields(person()).knowsLanguage)).not.toMatch(/proficiency/i)
  })

  it('keeps knowsAbout to the defensible tiers only', () => {
    const claimed = knowsAbout()
    // Bare résumé labels never enter the graph.
    for (const label of profile.alsoListed) expect(claimed).not.toContain(label)
    // Neither does anything the taxonomy only marks as `working`.
    const working = profile.skillGroups.flatMap((group) =>
      group.skills.filter((skill) => skill.tier === 'working').map((skill) => skill.name),
    )
    for (const name of working) expect(claimed, name).not.toContain(name)
    expect(claimed).toContain('TypeScript')
    expect(claimed).toContain('Amazon Web Services')
  })

  it('keeps sameAs identical to the one list in siteConfig', () => {
    expect(fields(person()).sameAs).toEqual([
      'https://www.linkedin.com/in/julian-ortiz-alviar',
      'https://github.com/Jdavid0610',
      'https://phenoscience.com.co',
      'https://clinpsia.com',
    ])
  })
})

describe('the WebSite entity', () => {
  it('points at the Person three ways, so the site has an author', () => {
    const site = fields(websiteJsonLd('en', siteConfig.description))
    expect(site.publisher).toEqual({ '@id': ids.person() })
    expect(site.author).toEqual({ '@id': ids.person() })
    expect(site.copyrightHolder).toEqual({ '@id': ids.person() })
  })

  it('declares no SearchAction, because the site ships no search route', () => {
    expect(JSON.stringify(websiteJsonLd('en', 'x'))).not.toMatch(/SearchAction|potentialAction/)
  })
})

describe('page frames', () => {
  it('omits the breadcrumb reference on the home page rather than dangling it', () => {
    const home = fields(profilePageJsonLd({ locale: 'en', path: '', name: 'x' }))
    expect(home.breadcrumb).toBeUndefined()

    const about = fields(profilePageJsonLd({ locale: 'en', path: '/about', name: 'x' }))
    expect(about.breadcrumb).toEqual({ '@id': 'https://example.com/en/about#breadcrumb' })
  })

  it('gives a BreadcrumbList an @id the page frame can reference', () => {
    const crumbs = fields(
      breadcrumbJsonLd(
        [
          { name: 'Home', url: 'https://example.com/en' },
          { name: 'Projects', url: 'https://example.com/en/projects' },
        ],
        { locale: 'en', path: '/projects' },
      ),
    )
    expect(crumbs['@id']).toBe('https://example.com/en/projects#breadcrumb')
    expect(crumbs.itemListElement).toHaveLength(2)
  })
})

describe('the projects ItemList', () => {
  it('derives numberOfItems from the array, so the two cannot disagree', () => {
    const projects = getProjects('en')
    const list = fields(itemListJsonLd({
      locale: 'en',
      path: '/projects',
      name: 'Projects',
      items: projects.map((project) => ({
        name: project.name,
        url: `${siteConfig.url}/en/projects/${project.slug}`,
        id: ids.project('en', project.slug),
      })),
    }))
    expect(list.numberOfItems).toBe(projects.length)
    expect(list.numberOfItems).toBe(7)
    const elements = list.itemListElement as Array<{ position: number; name: string }>
    expect(elements.map((element) => element.name)).toEqual(projects.map((p) => p.name))
    expect(elements.map((element) => element.position)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})

describe('project entities', () => {
  it('uses MobileApplication only for the store-listed Android app', () => {
    const byType = getProjects('en').map((project) => [project.slug, project.schemaType])
    expect(byType).toContainEqual(['herbafit', 'MobileApplication'])
    expect(byType.filter(([, type]) => type === 'MobileApplication')).toHaveLength(1)
  })

  it('scopes the person as a contributor, never as the sole author', () => {
    const clinpsia = getProjects('en').find((project) => project.slug === 'clinpsia')!
    const entity = applicationJsonLd({
      locale: 'en',
      slug: clinpsia.slug,
      type: clinpsia.schemaType,
      name: clinpsia.name,
      url: clinpsia.links[0]!.href,
      description: clinpsia.description,
      applicationCategory: clinpsia.applicationCategory,
      operatingSystem: clinpsia.operatingSystem,
      inLanguage: clinpsia.inLanguage,
      featureList: clinpsia.features,
    })
    const json = JSON.stringify(entity)
    expect(json).toMatch(/"contributor":\{"@id":"https:\/\/example.com\/#person"\}/)
    expect(json).not.toMatch(/"author"/)
  })

  it('keeps ClinPsia free of any AI or LLM claim', () => {
    const clinpsia = getProjects('en').find((project) => project.slug === 'clinpsia')!
    for (const field of [clinpsia.tagline, clinpsia.description, clinpsia.definition]) {
      expect(field).not.toMatch(/AI-powered|AI-based|LLM-powered/i)
    }
  })
})

describe('organization entities', () => {
  it('claims founder only where the claim is safe', () => {
    const orgs = getProjects('en')
      .map((project) => project.organization)
      .filter((organization): organization is NonNullable<typeof organization> =>
        Boolean(organization),
      )
    const founded = orgs.filter((organization) => organization.founder).map((o) => o.key)
    expect(founded.sort()).toEqual(['phenoscience', 'riwin'])
  })

  it('omits founder from TALENTÜ, whose own site credits Julián González', () => {
    const talentu = getProjects('en').find((project) => project.slug === 'talentu')!
    const entity = organizationJsonLd({
      ...talentu.organization!,
      description: talentu.organizationDescription!,
    })
    expect(JSON.stringify(entity)).not.toMatch(/"founder"/)
  })

  it('links TALENTÜ by its punycode host and never by the unrelated bare domain', () => {
    const talentu = getProjects('en').find((project) => project.slug === 'talentu')!
    expect(talentu.links[0]!.href).toBe('https://www.xn--talent-8ya.com')
    expect(talentu.links[0]!.display).toBe('talentü.com')
    expect(JSON.stringify(talentu)).not.toMatch(/https:\/\/(www\.)?talentu\.com/)
  })

  it('emits no owned organization for third parties or client work', () => {
    for (const slug of ['lukiao-novapp', 'mareaverde', 'herbafit'] as const) {
      const project = getProjects('en').find((candidate) => candidate.slug === slug)!
      expect(project.organization, slug).toBeUndefined()
    }
  })
})

describe('template entities', () => {
  it('uses SoftwareSourceCode, which carries codeRepository', () => {
    const template = getTemplates('en')[0]!
    const entity = fields(softwareSourceCodeJsonLd({
      locale: 'en',
      slug: template.slug,
      name: template.name,
      repository: template.repository,
      description: template.description,
      programmingLanguage: template.programmingLanguage,
      runtimePlatform: template.runtimePlatform,
      keywords: template.tags,
      dateCreated: template.created,
      dateModified: template.lastPush,
    }))
    expect(entity['@type']).toBe('SoftwareSourceCode')
    expect(entity.codeRepository).toBe('https://github.com/Jdavid0610/next-stack')
    expect(entity.author).toEqual({ '@id': ids.person() })
    expect(entity.maintainer).toEqual({ '@id': ids.person() })
  })
})

describe('the FAQPage entity', () => {
  it('mirrors the rendered answers exactly, in every locale', () => {
    for (const locale of locales) {
      const entries = getFaq(locale)
      const faq = fields(faqPageJsonLd({ locale, entries }))
      const questions = faq.mainEntity as Array<{
        name: string
        acceptedAnswer: { text: string }
      }>
      expect(questions).toHaveLength(entries.length)
      questions.forEach((question, index) => {
        expect(question.name).toBe(entries[index]!.question)
        expect(question.acceptedAnswer.text).toBe(entries[index]!.answer)
      })
    }
  })

  it('declares the page language, so each locale answers its own queries', () => {
    expect(fields(faqPageJsonLd({ locale: 'es', entries: getFaq('es') })).inLanguage).toBe(
      'es-CO',
    )
  })
})

describe('the Article entity', () => {
  it('attributes a post to the Person in the graph rather than a loose name', () => {
    const article = fields(articleJsonLd({
      locale: 'en',
      title: 'x',
      description: 'y',
      slug: 'z',
      publishedAt: '2026-09-10',
      updatedAt: '2026-09-10',
    }))
    expect(article.author).toEqual({ '@id': ids.person() })
    expect(article.publisher).toEqual({ '@id': ids.person() })
  })
})

describe('serialization', () => {
  it('wraps several entities in one connected @graph', () => {
    const data = graph(person(), websiteJsonLd('en', 'x')) as Graph
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@graph']).toHaveLength(2)
  })

  it('escapes every `<` so a closing script tag cannot be injected', () => {
    const html = JSON.stringify({ name: '</script><script>alert(1)</script>' }).replace(
      /</g,
      '\\u003c',
    )
    expect(html).not.toContain('</script>')
    expect(html).toContain('\\u003c/script')
    // The component uses the same transform.
    expect(typeof JsonLd).toBe('function')
  })

  it('derives every URL from the configured origin, with none hardcoded', () => {
    const serialized = JSON.stringify(graph(person(), websiteJsonLd('en', 'x')))
    const origins = serialized.match(/https:\/\/[a-z0-9.-]+/g) ?? []
    const ours = origins.filter((origin) => origin.startsWith('https://example.com'))
    expect(ours.length).toBeGreaterThan(0)
    expect(serialized).not.toMatch(/julianortiz\.dev|localhost/)
  })
})
