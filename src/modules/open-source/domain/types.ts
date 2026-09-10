/**
 * The open-source template catalogue as typed data.
 *
 * Repository metadata — stars, forks, dates — is held as typed data with an
 * explicit "as of" date rather than fetched live. A number that drifts is
 * acceptable when it is labelled with the date it was read; an unlabelled
 * number rendered from stale data and looking live is not. This keeps every
 * `/open-source` page fully prerendered with no runtime data access.
 */
/** The template slugs, as a closed union — see `ProjectSlug` for the reason. */
export type TemplateSlug =
  | 'next-stack'
  | 'react-native-expo-stack'
  | 'vite-stack'
  | 'fastapi-lambda-cdk-template'
  | 'express-hexagonal'

export type TemplateMeta = {
  slug: TemplateSlug
  /** Repository name. A proper noun: identical in every locale. */
  name: string
  repository: string
  /** Live demo, where the repository declares a homepage. */
  homepage?: string
  programmingLanguage: string
  runtimePlatform: string
  stars: number
  forks: number
  /** `YYYY-MM-DD`. */
  created: string
  /** `YYYY-MM-DD` of the last push. */
  lastPush: string
  /** The date the repository metadata above was read. */
  asOf: string
  /** None of the five declares a license. Stated, not hidden. */
  license: string | null
  /** Canonical technology names, for the tag list and `keywords`. */
  tags: readonly string[]
  /** True for the one template this site itself runs on. */
  poweringThisSite?: boolean
  /**
   * A project in `/projects` shipped on this same stack. The claim is "the
   * same stack in production and a public starter for it", never "this
   * template was extracted from that project".
   */
  relatedProjectSlug?: string
}

export type TemplateCopy = {
  tagline: string
  /** Definition-style opener. */
  definition: string
  metaTitle: string
  metaDescription: string
  problem: string
  /** What the template ships, as a checkable list. */
  includes: readonly string[]
  narrative: readonly string[]
  /** JSON-LD `description`, mirrored by the visible copy. */
  description: string
  /** Maintenance state in plain factual terms. */
  maintenance: string
  note?: string
}

export type Template = TemplateMeta & TemplateCopy

export type OpenSourceCopy = {
  templates: Record<TemplateSlug, TemplateCopy>
  indexTitle: string
  indexIntro: string
  dogfoodLine: string
  labels: {
    repository: string
    demo: string
    language: string
    stars: string
    created: string
    lastPush: string
    license: string
    noLicense: string
    asOf: string
    includes: string
    maintenance: string
    tags: string
    relatedProject: string
    poweringThisSite: string
      /** The GitHub profile picture shown on every repository card. */
    avatarAlt: string
}
}
