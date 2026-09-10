/**
 * Identity, positioning, education and the skills taxonomy — content as typed
 * data, the same rule the whole site follows: one file per locale, and a
 * missing translation is a compile error rather than an English string served
 * to a Spanish reader.
 */

/**
 * Proficiency tiers, assigned from evidence only. The bar each one clears:
 *
 * - `core`    shipped in production in more than one project **and**
 *             independently verified in a live bundle, a store listing or a repo
 * - `strong`  named with specifics in the résumé **and** corroborated by at
 *             least one verified artefact
 * - `working` résumé-attested with specifics, no independent verification
 * - `listed`  a bare résumé label with nothing behind it
 *
 * `listed` skills are never rendered as strengths and never enter
 * `Person.knowsAbout` — they live in one visually secondary row.
 */
export type SkillTier = 'core' | 'strong' | 'working' | 'listed'

export type SkillCategoryKey =
  | 'frontend'
  | 'backend'
  | 'cloud'
  | 'ai'
  | 'data'
  | 'languages'
  | 'practices'

export type Skill = {
  name: string
  tier: Exclude<SkillTier, 'listed'>
  /**
   * Locale-independent provenance note, rendered beside the skill. Present
   * only where one concrete artefact is worth naming next to the label.
   */
  note?: string
}

/** Locale-independent: technology names are proper nouns and are not translated. */
export type SkillGroup = { key: SkillCategoryKey; skills: readonly Skill[] }

export type ContactChannelKey =
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'github'
  | 'company'
  | 'location'

export type ContactChannel = {
  key: ContactChannelKey
  /** Human-readable value. The `href` carries the machine-readable form. */
  display: string
  href?: string
}

export type Pillar = { title: string; description: string }

/**
 * A number worth putting in front of a reader, with the words that make it
 * mean something. Every one has to be checkable from somewhere else on the
 * site — a statistic a visitor cannot verify is decoration.
 */
export type ProfileFact = { value: string; label: string }

export type ProfileCopy = {
  /** Canonical headline, title case. Do not upgrade it. */
  headline: string
  titles: readonly string[]
  /** ≤ 90 characters: `<title>` suffixes, OG cards, `Person.description`. */
  oneLineBio: string
  /** Hero subheading, three self-contained sentences. */
  heroBio: readonly string[]
  /** ~120 words, one paragraph per entry. */
  longBio: readonly string[]
  positioning: { statement: string; pillars: readonly Pillar[] }
  /** Floating beside the portrait. Three: a fourth crowds the photograph. */
  heroFacts: readonly ProfileFact[]
  /** The rail under the hero. Four, to divide a row evenly at every width. */
  stats: readonly ProfileFact[]
  location: string
  workMode: string
  education: {
    degree: string
    institution: string
    /** One self-contained sentence with absolute dates. */
    summary: string
  }
  languages: readonly string[]
  categoryLabels: Record<SkillCategoryKey, string>
  tierLabels: Record<SkillTier, string>
  tierNote: string
  alsoListedNote: string
  contactIntro: string
  contactLabels: Record<ContactChannelKey, string>
}

export type Profile = ProfileCopy & {
  name: { full: string; display: string; handle: string }
  /** Display order on `/about`, per the taxonomy's own rationale. */
  skillGroups: readonly SkillGroup[]
  /** Bare résumé labels, rendered in one secondary row and nowhere else. */
  alsoListed: readonly string[]
  channels: readonly ContactChannel[]
}
