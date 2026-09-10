import type { Locale } from '@/shared/i18n/config'
import type { FaqCopy, FaqEntry } from '../domain/types'
import { faqEn } from './en'
import { faqEs } from './es'
import { faqIds } from './meta'

const copy: Record<Locale, FaqCopy> = { en: faqEn, es: faqEs }

export function getFaqIntro(locale: Locale): string {
  return copy[locale].intro
}

/**
 * One ordered list drives the rendered page and the `FAQPage` JSON-LD, so the
 * two cannot drift — mismatched structured data and visible content is a
 * policy violation, not just an inconsistency.
 */
export function getFaq(locale: Locale): FaqEntry[] {
  return faqIds.map((id) => ({ id, ...copy[locale].entries[id] }))
}

export { faqIds }
