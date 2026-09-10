import { dictionaries } from './get-dictionary'
import { defaultLocale, type Locale } from './config'
import type { Dictionary } from './dictionaries/en'

export type MessageKey = keyof Dictionary['messages']

/**
 * Turns a message key into text for a locale.
 *
 * Validation rules and thrown errors travel as keys — a Zod schema is a
 * module-level constant with no access to the request, and a service four
 * layers down should not have to thread a locale through its signature. This
 * is where keys become prose, called once at the boundary that knows the
 * locale.
 *
 * Anything that is not a known key is returned unchanged, so a message from a
 * third-party provider still reaches the user rather than being swallowed.
 */
export function translateMessage(locale: Locale, key: string): string {
  const messages = dictionaries[locale]?.messages ?? dictionaries[defaultLocale].messages
  return (messages as Record<string, string>)[key] ?? key
}

/** Translates a whole `fieldErrors` map in one call. */
export function translateFieldErrors(
  locale: Locale,
  fieldErrors: Record<string, string[]>,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, keys]) => [
      field,
      keys.map((key) => translateMessage(locale, key)),
    ]),
  )
}
