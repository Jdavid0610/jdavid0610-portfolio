/**
 * The employment timeline as typed data. Dates are `YYYY-MM` exactly as the
 * résumé prints them — no invented days — and `end: null` means the role is
 * current.
 *
 * The roles genuinely overlap: PhenoScience (from July 2023) runs alongside
 * Rebus Technology (October 2023 to July 2025) and DevInMotion (February to
 * November 2023), and Lukiao (October 2021 to November 2022) overlaps Fory App
 * (July 2020 to November 2021). The timeline therefore renders as overlapping
 * bars rather than a single track: concurrent founder and contract work read
 * as concurrent work when drawn honestly, and read as a mistake when flattened.
 */
/**
 * The role slugs, as a closed union, so `ExperienceCopy.roles` is a `Record`
 * over a finite key set and a role missing from one locale fails `tsc`.
 */
export type RoleSlug =
  | 'phenoscience-cofounder'
  | 'rebus-technology-devops'
  | 'devinmotion-software-engineer'
  | 'lukiao-fullstack'
  | 'fory-app-fullstack'

export type RoleBucket = 'venture' | 'employment'

/** Locale-independent role facts. */
export type RoleMeta = {
  slug: RoleSlug
  employer: string
  /** `YYYY-MM`. */
  start: string
  /** `YYYY-MM`, or `null` for the current role. */
  end: string | null
  remote: boolean
  bucket: RoleBucket
  /** Canonical technology names. Empty where the résumé names none. */
  technologies: readonly string[]
  /** Projects in `/projects` that this role produced. */
  projectSlugs: readonly string[]
}

/** Localized role copy, keyed by slug. */
export type RoleCopy = {
  title: string
  location: string
  /** Definition-style single sentence: `<Entity> is/was a <role> that <did what>`. */
  summary: string
  /** Impact first, one claim per sentence. */
  achievements: readonly string[]
}

export type Role = RoleMeta & RoleCopy

export type ExperienceCopy = {
  roles: Record<RoleSlug, RoleCopy>
  overlapNote: string
  presentLabel: string
  remoteLabel: string
  bucketLabels: Record<RoleBucket, string>
}
