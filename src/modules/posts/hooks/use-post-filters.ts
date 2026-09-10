'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'
import { useQueryState } from '@/shared/hooks/use-query-state'
import type { PostFilters } from '../domain/schemas'

/**
 * Filter state lives in the URL, so the server component re-renders with the
 * new params and the result is shareable. The input stays snappy because the
 * local value updates immediately and only the debounced value hits the URL.
 */
export function usePostFilters() {
  const search = useQueryState('search')
  const status = useQueryState('status', 'all')
  const page = useQueryState('page', '1')

  const [searchDraft, setSearchDraft] = useState(search.value)
  const debouncedSearch = useDebouncedValue(searchDraft, 300)

  useEffect(() => {
    if (debouncedSearch !== search.value) {
      // A new search invalidates the current page number.
      search.setValue(debouncedSearch, { resetKeys: ['page'] })
    }
  }, [debouncedSearch, search])

  return {
    searchDraft,
    setSearchDraft,
    status: (status.value as PostFilters['status']) ?? 'all',
    setStatus: (next: PostFilters['status']) => status.setValue(next, { resetKeys: ['page'] }),
    page: Number(page.value) || 1,
    setPage: (next: number) => page.setValue(String(next)),
    isPending: search.isPending || status.isPending || page.isPending,
  }
}
