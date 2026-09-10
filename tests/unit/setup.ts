import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

/**
 * The site's only environment variable. Every canonical URL, `hreflang`,
 * sitemap entry and JSON-LD `@id` derives from it, so the tests assert against
 * this origin rather than a hardcoded one.
 */
process.env.NEXT_PUBLIC_APP_URL ??= 'https://example.com'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
