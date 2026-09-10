import type { Locale } from '@/shared/i18n/config'
import type { PageKey, PageMeta, PagesCopy } from '../domain/types'
import { pagesEn } from './en'
import { pagesEs } from './es'

const copy: Record<Locale, PagesCopy> = { en: pagesEn, es: pagesEs }

export function getPageMeta(locale: Locale, key: PageKey): PageMeta {
  return copy[locale][key]
}

export function getPagesCopy(locale: Locale): PagesCopy {
  return copy[locale]
}
