'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { routes } from '@/shared/lib/routes'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useSignInForm } from '../hooks/use-sign-in-form'
import { OAuthButtons } from './oauth-buttons'

/**
 * Presentation only. Every piece of behaviour arrives from `useSignInForm`,
 * and the form still submits without JavaScript because it posts to a
 * Server Action.
 */
export function SignInForm({
  callbackUrl,
  showOAuth = false,
}: {
  callbackUrl?: string
  showOAuth?: boolean
}) {
  const t = useTranslations()
  const locale = useLocale()
  const { formAction, isPending, error, errorsFor } = useSignInForm({ callbackUrl })

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4" noValidate>
        {callbackUrl ? <input type="hidden" name="callbackUrl" value={callbackUrl} /> : null}

        {error ? <Alert>{error}</Alert> : null}

        <Field id="email" label={t.auth.email} errors={errorsFor('email')} required>
          {(props) => (
            <Input
              {...props}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          )}
        </Field>

        <Field id="password" label={t.auth.password} errors={errorsFor('password')} required>
          {(props) => (
            <Input {...props} name="password" type="password" autoComplete="current-password" required />
          )}
        </Field>

        <Button type="submit" loading={isPending} size="lg">
          {t.common.signIn}
        </Button>
      </form>

      {showOAuth ? <OAuthButtons callbackUrl={callbackUrl} /> : null}

      <p className="text-center text-sm text-muted">
        {t.auth.noAccount}{' '}
        <Link href={routes.signUp(locale)} className="font-medium text-brand hover:underline">
          {t.common.signUp}
        </Link>
      </p>
    </div>
  )
}
