/**
 * The projects catalogue as typed data.
 *
 * Two rules govern this module and are encoded in its shape:
 *
 * 1. **Facts and copy are separated.** Anything a machine reads — a URL, a
 *    category, a rating, a relationship between entities — lives in
 *    `content/meta.ts` exactly once, so the English page and the Spanish page
 *    can never disagree about a fact. Prose lives in `content/{en,es}.ts`.
 * 2. **Attribution is scoped.** `role` says what Julian Ortiz Alviar did;
 *    `problem` and `features` describe the product. A verified product feature
 *    is never phrased as a personal authorship claim.
 */

/**
 * The slugs, as a closed union. This is what makes a missing translation a
 * compile error: `ProjectsCopy.projects` is a `Record` over this union, so a
 * project present in `en.ts` and absent from `es.ts` fails `tsc`.
 */
export type ProjectSlug =
  | 'phenoscience'
  | 'clinpsia'
  | 'talentu'
  | 'riwin'
  | 'lukiao-novapp'
  | 'mareaverde'
  | 'herbafit'

export type ProjectBucket = 'venture' | 'employment' | 'freelance'

export type ProjectStatus = 'live' | 'live-early' | 'store-listed'

export type ProjectLinkKey = 'live' | 'store' | 'api'

export type ProjectLink = {
  key: ProjectLinkKey
  /** Machine-readable target. Punycode where the brand uses a non-ASCII domain. */
  href: string
  /** Human-readable label. May differ from `href` — see TALENTÜ. */
  display: string
}

export type OrganizationKey = 'phenoscience' | 'clinpsia' | 'talentu' | 'riwin'

export type OrganizationMeta = {
  key: OrganizationKey
  name: string
  url: string
  /** `YYYY-MM`. Omitted where no founding date is verifiable. */
  foundingDate?: string
  /**
   * Whether to emit `founder: #person`. False for TALENTÜ: its own site
   * credits sports scientist Julián González as the founder, so this site
   * claims a technical co-founder role in prose and stays out of the
   * machine-readable founder claim.
   */
  founder: boolean
  employee?: boolean
  country?: string
  locality?: string
  region?: string
  areaServed?: readonly string[]
  parentKey?: OrganizationKey
  subKey?: OrganizationKey
}

export type AggregateRatingMeta = {
  ratingValue: string
  /** schema.org types `ratingCount` as an Integer, so it is a number here. */
  ratingCount: number
  bestRating: string
  worstRating: string
  /** Named so the number is never presented as a self-review. */
  source: string
  /** `YYYY-MM`: every number carries a unit, a date and a source. */
  asOf: string
}

export type ProjectMeta = {
  slug: ProjectSlug
  /** A proper noun: identical in every locale. */
  name: string
  bucket: ProjectBucket
  status: ProjectStatus
  /** `MobileApplication` is a subtype of `SoftwareApplication`. */
  schemaType: 'WebApplication' | 'MobileApplication'
  applicationCategory: string
  applicationSubCategory?: string
  operatingSystem: string
  /** BCP-47 tag of the product itself, not of this page. */
  inLanguage: string
  links: readonly ProjectLink[]
  organization?: OrganizationMeta
  /** A second organization to emit, e.g. ClinPsia's parent PhenoScience. */
  relatedOrganization?: OrganizationMeta
  /** Sibling project this one is a product of. */
  parentSlug?: ProjectSlug
  /** Role in `/experience` that produced this project, when there is one. */
  experienceSlug?: string
  /**
   * Template in `/open-source` built on the same stack. The claim is "the same
   * stack in production and a public starter for it", never "the template was
   * extracted from this project".
   */
  relatedTemplateSlug?: string
  stack: readonly string[]
  aggregateRating?: AggregateRatingMeta
}

export type ProjectFact = { label: string; value: string }

export type ProjectCopy = {
  /** One sentence, no marketing adjectives. */
  tagline: string
  /** What Julian Ortiz Alviar's capacity on this project was. */
  role: string
  /** Definition-style opener: `<Project> is a <category> that <does what>`. */
  definition: string
  /** ≤ 155 characters, for `<meta name="description">`. */
  metaTitle: string
  metaDescription: string
  /** Why the product exists. */
  problem: string
  /** Scoped to the actual contributor. */
  contribution: string
  /** Verified product surface. Feeds `featureList` and the visible list. */
  features: readonly string[]
  /** Three paragraphs. */
  narrative: readonly string[]
  /** JSON-LD `description`. Mirrored by the visible copy on the page. */
  description: string
  facts?: readonly ProjectFact[]
  /** Stated caveats, rendered as a note rather than buried. */
  note?: string
  /** Description for this project's `Organization`, when it emits one. */
  organizationDescription?: string
  relatedOrganizationDescription?: string
}

export type Project = ProjectMeta & ProjectCopy

export type ProjectsCopy = {
  projects: Record<ProjectSlug, ProjectCopy>
  bucketLabels: Record<ProjectBucket, string>
  statusLabels: Record<ProjectStatus, string>
  linkLabels: Record<ProjectLinkKey, string>
  indexTitle: string
  indexIntro: string
  sectionLabels: {
    problem: string
    contribution: string
    features: string
    stack: string
    facts: string
    role: string
    relatedRole: string
  }
}
