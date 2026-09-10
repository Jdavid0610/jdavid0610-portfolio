import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

process.env.NEXT_PUBLIC_APP_URL ??= 'https://example.com'
process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/test'
process.env.BETTER_AUTH_SECRET ??= 'test-secret-that-is-long-enough'
process.env.BETTER_AUTH_URL ??= 'https://example.com'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
