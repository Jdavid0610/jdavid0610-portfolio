import type { Locale } from '@/shared/i18n/config'
import type { ExperienceCopy, Role } from '../domain/types'
import { experienceEn } from './en'
import { experienceEs } from './es'
import { roleMeta, roleSlugs } from './meta'

const copy: Record<Locale, ExperienceCopy> = { en: experienceEn, es: experienceEs }

export function getExperienceCopy(locale: Locale): ExperienceCopy {
  return copy[locale]
}

/** Reverse chronological, which is both the render order and the list order. */
export function getRoles(locale: Locale): Role[] {
  return roleMeta.map((meta) => ({ ...meta, ...copy[locale].roles[meta.slug] }))
}

export function getRole(locale: Locale, slug: string): Role | null {
  const meta = roleMeta.find((role) => role.slug === slug)
  if (!meta) return null
  return { ...meta, ...copy[locale].roles[meta.slug] }
}

export { roleMeta, roleSlugs }
