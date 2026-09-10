'use client'

import { useTranslations } from '@/shared/i18n/i18n-provider'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { useOAuthSignIn } from '../hooks/use-oauth-sign-in'

export function OAuthButtons({ callbackUrl }: { callbackUrl?: string }) {
  const t = useTranslations()
  const { signInWith, pendingProvider, error } = useOAuthSignIn(callbackUrl)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        {t.auth.or}
        <span className="h-px flex-1 bg-border" />
      </div>

      {error ? <Alert>{error}</Alert> : null}

      <Button
        type="button"
        variant="secondary"
        size="lg"
        loading={pendingProvider === 'github'}
        onClick={() => void signInWith('github')}
      >
        {t.auth.continueWithGithub}
      </Button>
    </div>
  )
}
