'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { routes } from '@/shared/lib/routes'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useSignUpForm } from '../hooks/use-sign-up-form'
import { OAuthButtons } from './oauth-buttons'

export function SignUpForm({
  callbackUrl,
  showOAuth = false,
}: {
  callbackUrl?: string
  showOAuth?: boolean
}) {
  const t = useTranslations()
  const locale = useLocale()
  const { formAction, isPending, error, errorsFor } = useSignUpForm({ callbackUrl })

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4" noValidate>
        {callbackUrl ? <input type="hidden" name="callbackUrl" value={callbackUrl} /> : null}

        {error ? <Alert>{error}</Alert> : null}

        <Field id="name" label={t.auth.name} errors={errorsFor('name')} required>
          {(props) => <Input {...props} name="name" autoComplete="name" required />}
        </Field>

        <Field id="email" label={t.auth.email} errors={errorsFor('email')} required>
          {(props) => (
            <Input {...props} name="email" type="email" autoComplete="email" required />
          )}
        </Field>

        <Field
          id="password"
          label={t.auth.password}
          hint={t.auth.passwordHint}
          errors={errorsFor('password')}
          required
        >
          {(props) => (
            <Input {...props} name="password" type="password" autoComplete="new-password" required />
          )}
        </Field>

        <Field
          id="confirmPassword"
          label={t.auth.confirmPassword}
          errors={errorsFor('confirmPassword')}
          required
        >
          {(props) => (
            <Input
              {...props}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
          )}
        </Field>

        <Button type="submit" loading={isPending} size="lg">
          {t.common.signUp}
        </Button>
      </form>

      {showOAuth ? <OAuthButtons callbackUrl={callbackUrl} /> : null}

      <p className="text-center text-sm text-muted">
        {t.auth.hasAccount}{' '}
        <Link href={routes.signIn(locale)} className="font-medium text-brand hover:underline">
          {t.common.signIn}
        </Link>
      </p>
    </div>
  )
}
