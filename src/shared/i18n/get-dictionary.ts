import { cache } from 'react'
import type { Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { es } from './dictionaries/es'

export const dictionaries: Record<Locale, Dictionary> = { en, es }

/**
 * Server-side translation lookup. Memoized per request so a page and its
 * nested server components share one object.
 */
export const getDictionary = cache((locale: Locale): Dictionary => dictionaries[locale])

export type { Dictionary }
