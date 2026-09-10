'use client'

import { useTranslations } from '@/shared/i18n/i18n-provider'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useProfileForm } from '../hooks/use-profile-form'
import type { SessionUser } from '../domain/types'

export function ProfileForm({ user }: { user: SessionUser }) {
  const t = useTranslations()
  const { defaultName, email, formAction, isPending, error, errorsFor } = useProfileForm(user)

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {error ? <Alert>{error}</Alert> : null}

      <Field id="name" label={t.auth.name} errors={errorsFor('name')} required>
        {(props) => <Input {...props} name="name" defaultValue={defaultName} required />}
      </Field>

      <Field id="email" label={t.auth.email} hint={t.auth.emailLocked}>
        {(props) => <Input {...props} value={email} disabled readOnly />}
      </Field>

      <div>
        <Button type="submit" loading={isPending}>
          {t.common.save}
        </Button>
      </div>
    </form>
  )
}
