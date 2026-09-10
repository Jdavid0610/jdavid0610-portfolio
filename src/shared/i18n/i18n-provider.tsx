'use client'

import { createContext, use, type ReactNode } from 'react'
import type { Locale } from './config'
import type { Dictionary } from './dictionaries/en'

type I18nValue = { locale: Locale; dictionary: Dictionary }

const I18nContext = createContext<I18nValue | null>(null)

/**
 * The dictionary is resolved on the server and handed down once. Client
 * components read it through `useTranslations()` and never import a locale
 * file directly, so only the active locale is ever sent to the browser.
 */
export function I18nProvider({ value, children }: { value: I18nValue; children: ReactNode }) {
  return <I18nContext value={value}>{children}</I18nContext>
}

export function useTranslations(): Dictionary {
  const ctx = use(I18nContext)
  if (!ctx) throw new Error('useTranslations must be used inside <I18nProvider>')
  return ctx.dictionary
}

/**
 * Resolves a message key against the active locale's catalogue, returning the
 * key's text or — for anything that is not a known key — the string unchanged.
 *
 * This is the client-side counterpart of `translateMessage`. It reads the
 * dictionary the provider already holds, so a component that renders message
 * keys does not pull every locale's dictionary into the browser bundle.
 */
export function useMessage(): (key: string) => string {
  const ctx = use(I18nContext)
  if (!ctx) throw new Error('useMessage must be used inside <I18nProvider>')
  const messages = ctx.dictionary.messages as Record<string, string>
  return (key: string) => messages[key] ?? key
}

export function useLocale(): Locale {
  const ctx = use(I18nContext)
  if (!ctx) throw new Error('useLocale must be used inside <I18nProvider>')
  return ctx.locale
}
