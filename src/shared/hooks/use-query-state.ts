'use client'

import { useCallback, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Keeps a piece of UI state in the URL instead of in React state.
 *
 * That is what makes a filtered list shareable, bookmarkable, and — because
 * the server component re-renders with the new searchParams — server-rendered
 * rather than client-fetched.
 */
export function useQueryState(key: string, defaultValue = '') {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const value = searchParams.get(key) ?? defaultValue

  const setValue = useCallback(
    (next: string, options?: { resetKeys?: string[] }) => {
      const params = new URLSearchParams(searchParams.toString())
      if (next) params.set(key, next)
      else params.delete(key)
      for (const resetKey of options?.resetKeys ?? []) params.delete(resetKey)

      const queryString = params.toString()
      startTransition(() => {
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
      })
    },
    [key, pathname, router, searchParams],
  )

  return { value, setValue, isPending }
}
