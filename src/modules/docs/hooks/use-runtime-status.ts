'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@/shared/i18n/i18n-provider'
import { locales } from '@/shared/i18n/config'
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user'

type Health = { status: string; database: 'up' | 'down' | 'mocked'; time: string }

/**
 * Live facts about the deployment the visitor is looking at.
 *
 * It runs on the client on purpose: reading the session on the server would
 * make the docs pages render per request and lose their prerendering, and a
 * status panel is not worth that trade.
 */
export function useRuntimeStatus() {
  const locale = useLocale()
  const { user, isPending: isSessionPending } = useCurrentUser()

  const health = useQuery({
    queryKey: ['health'],
    queryFn: async (): Promise<Health> => {
      const response = await fetch('/api/health')
      if (!response.ok) throw new Error('error.generic')
      return response.json()
    },
    staleTime: 30_000,
  })

  return {
    locale,
    availableLocales: locales,
    isSessionPending,
    user,
    dataSource: health.data?.database,
    isHealthPending: health.isPending,
    isHealthError: health.isError,
  }
}
