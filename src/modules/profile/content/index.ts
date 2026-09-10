import { siteConfig } from '@/shared/config/site'
import type { Locale } from '@/shared/i18n/config'
import type { ContactChannel, Profile, ProfileCopy, SkillTier } from '../domain/types'
import { profileEn } from './en'
import { profileEs } from './es'
import { alsoListedSkills, careerStart, education, skillGroups } from './meta'

const copy: Record<Locale, ProfileCopy> = { en: profileEn, es: profileEs }

function channels(locale: Locale): ContactChannel[] {
  const t = copy[locale]
  return [
    { key: 'email', display: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { key: 'phone', display: siteConfig.phone.display, href: `tel:${siteConfig.phone.e164}` },
    {
      key: 'linkedin',
      display: 'linkedin.com/in/julian-ortiz-alviar',
      href: siteConfig.profiles.linkedin,
    },
    { key: 'github', display: siteConfig.handle, href: siteConfig.profiles.github },
    { key: 'company', display: 'phenoscience.com.co', href: siteConfig.profiles.company },
    { key: 'location', display: t.location },
  ]
}

export function getProfile(locale: Locale): Profile {
  return {
    ...copy[locale],
    name: {
      full: siteConfig.fullName,
      display: siteConfig.name,
      handle: siteConfig.handle,
    },
    skillGroups,
    alsoListed: alsoListedSkills,
    channels: channels(locale),
  }
}

/** Locale-independent education facts, for `alumniOf` and the about page. */
export { careerStart, education, skillGroups }

/**
 * The defensible skill list: `core` and `strong` only. This is what
 * `Person.knowsAbout` emits, so it must never include a `working` entry and
 * must never include a bare résumé label.
 */
export function knowsAbout(): string[] {
  const promoted: SkillTier[] = ['core', 'strong']
  const names = skillGroups.flatMap((group) =>
    group.skills.filter((skill) => promoted.includes(skill.tier)).map((skill) => skill.name),
  )
  return [...new Set(names)]
}
