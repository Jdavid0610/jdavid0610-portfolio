'use client'

import { useState } from 'react'
import { useTranslations } from '@/shared/i18n/i18n-provider'
import { authClient } from '../lib/auth-client'

/**
 * OAuth is the one flow that cannot be a Server Action: the browser has to be
 * navigated to the provider, so it goes through the client SDK.
 */
export function useOAuthSignIn(callbackUrl?: string) {
  const t = useTranslations()
  const [pendingProvider, setPendingProvider] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function signInWith(provider: 'github') {
    setPendingProvider(provider)
    setError(null)
    try {
      await authClient.signIn.social({ provider, callbackURL: callbackUrl ?? '/' })
    } catch {
      setError(t.messages['error.oauthUnavailable'])
      setPendingProvider(null)
    }
  }

  return { signInWith, pendingProvider, error }
}
