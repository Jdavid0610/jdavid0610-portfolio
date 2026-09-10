'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PostFilters } from '../domain/schemas'
import type { Paginated, SerializedPost } from '../domain/types'

async function fetchPosts(filters: PostFilters): Promise<Paginated<SerializedPost>> {
  const params = new URLSearchParams({
    search: filters.search,
    status: filters.status,
    page: String(filters.page),
  })
  const response = await fetch(`/api/posts?${params}`, { credentials: 'same-origin' })
  // A key, not prose: the component that renders it knows the locale.
  if (!response.ok) throw new Error('error.postsLoadFailed')
  return response.json()
}

/**
 * The server component renders page 1 for the initial paint (fast, indexable,
 * no spinner); this hook takes over for subsequent searches and pages, keeping
 * the previous page visible while the next one loads.
 */
export function usePostsQuery(filters: PostFilters, initialData: Paginated<SerializedPost>) {
  const isInitialQuery = filters.page === 1 && !filters.search && filters.status === 'all'

  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    initialData: isInitialQuery ? initialData : undefined,
    placeholderData: keepPreviousData,
  })
}
