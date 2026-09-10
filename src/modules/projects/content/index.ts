import type { Locale } from '@/shared/i18n/config'
import type { Project, ProjectsCopy } from '../domain/types'
import { projectsEn } from './en'
import { projectsEs } from './es'
import { projectMeta, projectSlugs } from './meta'

const copy: Record<Locale, ProjectsCopy> = { en: projectsEn, es: projectsEs }

export function getProjectsCopy(locale: Locale): ProjectsCopy {
  return copy[locale]
}

/**
 * Index order, identical in every locale, and identical to the order the
 * `ItemList` on `/projects` declares — a list whose order disagrees with the
 * page it describes is worse than no list.
 */
export function getProjects(locale: Locale): Project[] {
  return projectMeta.map((meta) => ({ ...meta, ...copy[locale].projects[meta.slug] }))
}

export function getProject(locale: Locale, slug: string): Project | null {
  const meta = projectMeta.find((project) => project.slug === slug)
  if (!meta) return null
  return { ...meta, ...copy[locale].projects[meta.slug] }
}

export { projectMeta, projectSlugs }
