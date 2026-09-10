import type { Locale } from '@/shared/i18n/config'
import type { OpenSourceCopy, Template } from '../domain/types'
import { openSourceEn } from './en'
import { openSourceEs } from './es'
import { templateMeta, templateSlugs } from './meta'

const copy: Record<Locale, OpenSourceCopy> = { en: openSourceEn, es: openSourceEs }

export function getOpenSourceCopy(locale: Locale): OpenSourceCopy {
  return copy[locale]
}

export function getTemplates(locale: Locale): Template[] {
  return templateMeta.map((meta) => ({ ...meta, ...copy[locale].templates[meta.slug] }))
}

export function getTemplate(locale: Locale, slug: string): Template | null {
  const meta = templateMeta.find((template) => template.slug === slug)
  if (!meta) return null
  return { ...meta, ...copy[locale].templates[meta.slug] }
}

export { templateMeta, templateSlugs }
