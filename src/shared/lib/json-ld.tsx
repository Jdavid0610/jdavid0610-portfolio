import type {
  Article,
  BreadcrumbList,
  CollectionPage,
  ContactPage,
  FAQPage,
  Graph,
  ItemList,
  MobileApplication,
  Organization,
  Person,
  ProfilePage,
  SoftwareSourceCode,
  Thing,
  WebApplication,
  WebSite,
  WithContext,
} from 'schema-dts'
import { sameAs, siteConfig } from '@/shared/config/site'
import { localeTags, type Locale } from '@/shared/i18n/config'

/**
 * Every entity this site emits. The prop type is widened once, here, so a page
 * that needs a new type does not have to edit a union in a component file.
 */
type PortfolioSchema =
  | Article
  | BreadcrumbList
  | CollectionPage
  | ContactPage
  | FAQPage
  | ItemList
  | MobileApplication
  | Organization
  | Person
  | ProfilePage
  | SoftwareSourceCode
  | WebApplication
  | WebSite

/**
 * Structured data. Rendered from a server component so it costs zero client
 * JavaScript and is present in the initial HTML for crawlers — several AI
 * crawlers do not execute JavaScript at all, so anything injected from an
 * effect is invisible to them.
 */
export function JsonLd({ data }: { data: WithContext<PortfolioSchema> | Graph }) {
  return (
    <script
      type="application/ld+json"
      // Built server-side from our own data; `<` is escaped to close the
      // classic </script> injection hole regardless.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/**
 * Wraps several entities in one `@graph`. One graph with `@id`
 * cross-references lets an engine resolve "the Person who authored this
 * software" by following a reference, instead of guessing from proximity the
 * way it must with several disconnected script blocks.
 */
export function graph(...entities: readonly Thing[]): Graph {
  return { '@context': 'https://schema.org', '@graph': entities }
}

// --- Stable identifiers -----------------------------------------------------
// Every `@id` derives from `siteConfig.url`, which derives from
// NEXT_PUBLIC_APP_URL. No origin is ever hardcoded.

export const ids = {
  person: () => `${siteConfig.url}/#person`,
  website: () => `${siteConfig.url}/#website`,
  organization: (key: string) => `${siteConfig.url}/#org-${key}`,
  page: (locale: Locale, path: string) => `${siteConfig.url}/${locale}${path}#page`,
  breadcrumb: (locale: Locale, path: string) => `${siteConfig.url}/${locale}${path}#breadcrumb`,
  list: (locale: Locale, path: string) => `${siteConfig.url}/${locale}${path}#list`,
  project: (locale: Locale, slug: string) =>
    `${siteConfig.url}/${locale}/projects/${slug}#project`,
  template: (locale: Locale, slug: string) =>
    `${siteConfig.url}/${locale}/open-source/${slug}#project`,
  faq: (locale: Locale) => `${siteConfig.url}/${locale}/faq#faq`,
} as const

function url(locale: Locale, path = ''): string {
  return `${siteConfig.url}/${locale}${path}`
}

// --- Root entities ----------------------------------------------------------

type PersonArgs = {
  locale: Locale
  description: string
  jobTitles: readonly string[]
  knowsAbout: readonly string[]
  degreeName: string
  institution: string
  /** Path of the page that is *about* this person, e.g. `/about`. */
  mainEntityOfPagePath?: string
}

/**
 * The root entity, emitted on every page as the anchor of the graph. It is
 * what an engine resolves "Who is Julian Ortiz Alviar?" against, so it carries
 * the identity, the contact details and the defensible skill list — and
 * nothing that cannot be substantiated.
 */
export function personJsonLd(args: PersonArgs): Person {
  return {
    '@type': 'Person',
    '@id': ids.person(),
    name: siteConfig.fullName,
    alternateName: ['Julian Ortiz Alviar', 'Julian Ortiz', siteConfig.handle],
    givenName: 'Julian David',
    familyName: 'Ortiz Alviar',
    // An array is valid here — it is Text repeated — and the three titles are
    // the positioning, so all three are declared.
    jobTitle: [...args.jobTitles],
    description: args.description,
    url: url(args.locale),
    ...(args.mainEntityOfPagePath
      ? { mainEntityOfPage: { '@id': ids.page(args.locale, args.mainEntityOfPagePath) } }
      : {}),
    image: `${siteConfig.url}/${args.locale}/opengraph-image`,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone.e164,
    // Naming a language is safe; a proficiency level is not verifiable, so
    // none is claimed.
    knowsLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    nationality: { '@type': 'Country', name: siteConfig.location.countryName },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: args.institution,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.location.locality,
        addressCountry: siteConfig.location.country,
      },
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      name: args.degreeName,
      recognizedBy: { '@type': 'CollegeOrUniversity', name: args.institution },
    },
    worksFor: { '@id': ids.organization('phenoscience') },
    hasOccupation: {
      '@type': 'Occupation',
      name: args.jobTitles[0],
      occupationLocation: {
        '@type': 'City',
        name: `${siteConfig.location.locality}, ${siteConfig.location.countryName}`,
      },
      skills: args.knowsAbout.slice(0, 12).join(', '),
    },
    // Drawn only from the defensible tiers of the skills taxonomy.
    knowsAbout: [...args.knowsAbout],
    sameAs: [...sameAs],
  }
}

/**
 * The site frame. A personal site whose `WebSite` has no author is a missed
 * connection, so this one points at the `Person` three ways.
 *
 * No `potentialAction`/`SearchAction` is declared: this site ships no search
 * route, and declaring a search box that does not exist is a false claim an
 * engine can test.
 */
export function websiteJsonLd(locale: Locale, description: string): WebSite {
  return {
    '@type': 'WebSite',
    '@id': ids.website(),
    url: url(locale),
    name: siteConfig.name,
    alternateName: `${siteConfig.name} — Senior FullStack Developer`,
    description,
    inLanguage: Object.values(localeTags),
    publisher: { '@id': ids.person() },
    author: { '@id': ids.person() },
    copyrightHolder: { '@id': ids.person() },
  }
}

// --- Page frames ------------------------------------------------------------

type PageArgs = {
  locale: Locale
  path: string
  name: string
  description?: string
  dateModified?: string
}

export function profilePageJsonLd(args: PageArgs): ProfilePage {
  return {
    '@type': 'ProfilePage',
    '@id': ids.page(args.locale, args.path),
    url: url(args.locale, args.path),
    name: args.name,
    ...(args.description ? { description: args.description } : {}),
    inLanguage: localeTags[args.locale],
    isPartOf: { '@id': ids.website() },
    mainEntity: { '@id': ids.person() },
    about: { '@id': ids.person() },
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    // The home page has no parent, so it emits no breadcrumb and must not
    // reference one: a dangling `@id` is worse than an absent property.
    ...(args.path ? { breadcrumb: { '@id': ids.breadcrumb(args.locale, args.path) } } : {}),
  }
}

export function collectionPageJsonLd(args: PageArgs & { listPath?: string }): CollectionPage {
  return {
    '@type': 'CollectionPage',
    '@id': ids.page(args.locale, args.path),
    url: url(args.locale, args.path),
    name: args.name,
    ...(args.description ? { description: args.description } : {}),
    inLanguage: localeTags[args.locale],
    isPartOf: { '@id': ids.website() },
    about: { '@id': ids.person() },
    mainEntity: { '@id': ids.list(args.locale, args.listPath ?? args.path) },
    breadcrumb: { '@id': ids.breadcrumb(args.locale, args.path) },
  }
}

export function contactPageJsonLd(args: PageArgs): ContactPage {
  return {
    '@type': 'ContactPage',
    '@id': ids.page(args.locale, args.path),
    url: url(args.locale, args.path),
    name: args.name,
    ...(args.description ? { description: args.description } : {}),
    inLanguage: localeTags[args.locale],
    isPartOf: { '@id': ids.website() },
    about: { '@id': ids.person() },
    mainEntity: { '@id': ids.person() },
    breadcrumb: { '@id': ids.breadcrumb(args.locale, args.path) },
  }
}

/**
 * `@id`-addressable so the page frame can point `breadcrumb` at it instead of
 * leaving a second, unrelated block floating on the page.
 */
export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
  options: { locale?: Locale; path?: string } = {},
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    ...(options.locale && options.path !== undefined
      ? { '@id': ids.breadcrumb(options.locale, options.path) }
      : {}),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// --- Lists ------------------------------------------------------------------

/**
 * Lets an engine answer "what has Julian Ortiz Alviar built?" as a complete
 * list rather than whichever page it happened to crawl. `numberOfItems` is
 * derived from the array, so the two cannot disagree.
 */
export function itemListJsonLd(args: {
  locale: Locale
  path: string
  name: string
  items: Array<{ name: string; url: string; id?: string }>
}): ItemList {
  return {
    '@type': 'ItemList',
    '@id': ids.list(args.locale, args.path),
    name: args.name,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: args.items.length,
    itemListElement: args.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.id ? { item: { '@id': item.id } } : {}),
    })),
  }
}

// --- Organizations ----------------------------------------------------------

export type OrganizationArgs = {
  key: string
  name: string
  url: string
  description: string
  foundingDate?: string
  /** Only where the founder claim is safe. */
  founder?: boolean
  employee?: boolean
  locality?: string
  region?: string
  country?: string
  areaServed?: readonly string[]
  parentKey?: string
  subKey?: string
}

export function organizationJsonLd(args: OrganizationArgs): Organization {
  return {
    '@type': 'Organization',
    '@id': ids.organization(args.key),
    name: args.name,
    url: args.url,
    description: args.description,
    ...(args.foundingDate ? { foundingDate: args.foundingDate } : {}),
    ...(args.founder ? { founder: { '@id': ids.person() } } : {}),
    ...(args.employee ? { employee: { '@id': ids.person() } } : {}),
    ...(args.country
      ? {
          address: {
            '@type': 'PostalAddress' as const,
            ...(args.locality ? { addressLocality: args.locality } : {}),
            ...(args.region ? { addressRegion: args.region } : {}),
            addressCountry: args.country,
          },
        }
      : {}),
    ...(args.areaServed
      ? { areaServed: args.areaServed.map((name) => ({ '@type': 'Place' as const, name })) }
      : {}),
    ...(args.parentKey ? { parentOrganization: { '@id': ids.organization(args.parentKey) } } : {}),
    ...(args.subKey ? { subOrganization: { '@id': ids.organization(args.subKey) } } : {}),
    sameAs: [args.url],
  }
}

// --- Products and source code ----------------------------------------------

export type ApplicationArgs = {
  locale: Locale
  slug: string
  type: 'WebApplication' | 'MobileApplication'
  name: string
  url: string
  description: string
  applicationCategory: string
  applicationSubCategory?: string
  operatingSystem: string
  inLanguage: string
  featureList: readonly string[]
  /** Emitted only for a rating restated from a verifiable third party. */
  aggregateRating?: {
    ratingValue: string
    ratingCount: number
    bestRating: string
    worstRating: string
  }
  publisherOrganizationKey?: string
  /** For an app published by a third party we do not model as an entity. */
  publisherName?: string
  installUrl?: string
  offer?: { description?: string; price?: string; priceCurrency?: string }
}

export function applicationJsonLd(args: ApplicationArgs): WebApplication | MobileApplication {
  const base = {
    '@id': ids.project(args.locale, args.slug),
    name: args.name,
    url: args.url,
    description: args.description,
    applicationCategory: args.applicationCategory,
    ...(args.applicationSubCategory
      ? { applicationSubCategory: args.applicationSubCategory }
      : {}),
    operatingSystem: args.operatingSystem,
    inLanguage: args.inLanguage,
    featureList: [...args.featureList],
    // Scoped deliberately: `contributor`, not `author`. The person contributed
    // to these products; he is not the sole author of any of them.
    contributor: { '@id': ids.person() },
    mainEntityOfPage: { '@id': `${siteConfig.url}/${args.locale}/projects/${args.slug}` },
    ...(args.publisherOrganizationKey
      ? { publisher: { '@id': ids.organization(args.publisherOrganizationKey) } }
      : {}),
    ...(args.publisherName
      ? { publisher: { '@type': 'Organization' as const, name: args.publisherName } }
      : {}),
    ...(args.installUrl ? { installUrl: args.installUrl } : {}),
    ...(args.aggregateRating
      ? { aggregateRating: { '@type': 'AggregateRating' as const, ...args.aggregateRating } }
      : {}),
    ...(args.offer ? { offers: { '@type': 'Offer' as const, ...args.offer } } : {}),
  }

  return args.type === 'MobileApplication'
    ? ({ '@type': 'MobileApplication', ...base } satisfies MobileApplication)
    : ({ '@type': 'WebApplication', ...base, browserRequirements: 'Requires JavaScript' } satisfies WebApplication)
}

/**
 * The templates are source repositories rather than running products, and
 * `SoftwareSourceCode` is the type that carries `codeRepository` and
 * `programmingLanguage` — which is exactly what they are.
 */
export function softwareSourceCodeJsonLd(args: {
  locale: Locale
  slug: string
  name: string
  repository: string
  description: string
  programmingLanguage: string
  runtimePlatform: string
  keywords: readonly string[]
  dateCreated: string
  dateModified: string
}): SoftwareSourceCode {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': ids.template(args.locale, args.slug),
    name: args.name,
    codeRepository: args.repository,
    url: args.repository,
    programmingLanguage: { '@type': 'ComputerLanguage', name: args.programmingLanguage },
    runtimePlatform: args.runtimePlatform,
    codeSampleType: 'template',
    author: { '@id': ids.person() },
    maintainer: { '@id': ids.person() },
    dateCreated: args.dateCreated,
    dateModified: args.dateModified,
    description: args.description,
    keywords: args.keywords.join(', '),
    isAccessibleForFree: true,
    mainEntityOfPage: { '@id': `${siteConfig.url}/${args.locale}/open-source/${args.slug}` },
  }
}

// --- FAQ --------------------------------------------------------------------

/**
 * Emitted once per locale, on `/faq` only. Its text is the same string the
 * page renders: structured data that contradicts the visible page is a spam
 * signal, not merely an inconsistency.
 */
export function faqPageJsonLd(args: {
  locale: Locale
  entries: ReadonlyArray<{ question: string; answer: string }>
}): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': ids.faq(args.locale),
    url: url(args.locale, '/faq'),
    inLanguage: localeTags[args.locale],
    isPartOf: { '@id': ids.website() },
    about: { '@id': ids.person() },
    breadcrumb: { '@id': ids.breadcrumb(args.locale, '/faq') },
    mainEntity: args.entries.map((entry) => ({
      '@type': 'Question' as const,
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer' as const, text: entry.answer },
    })),
  }
}

// --- Articles ---------------------------------------------------------------

export function articleJsonLd(args: {
  locale: Locale
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt: string
}): Article {
  const articleUrl = `${siteConfig.url}/${args.locale}/blog/${args.slug}`
  return {
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: args.title,
    description: args.description,
    inLanguage: localeTags[args.locale],
    mainEntityOfPage: { '@id': articleUrl },
    url: articleUrl,
    isPartOf: { '@id': ids.website() },
    author: { '@id': ids.person() },
    publisher: { '@id': ids.person() },
    datePublished: args.publishedAt,
    dateModified: args.updatedAt,
  }
}
