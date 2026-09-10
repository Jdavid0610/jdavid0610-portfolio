'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { routes } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { useCurrentUser } from '../hooks/use-current-user'
import { UserMenu } from './user-menu'

/**
 * The header's auth corner on public pages. It reserves its own height while
 * the session resolves so the layout never shifts.
 */
export function AuthActions() {
  const t = useTranslations()
  const locale = useLocale()
  const { user, isPending } = useCurrentUser()

  if (isPending) return <div className="size-9 animate-pulse rounded-full bg-border" aria-hidden />
  if (user) return <UserMenu user={user} />

  return (
    <>
      <Link href={routes.signIn(locale)} className="text-sm text-muted hover:text-fg">
        {t.common.signIn}
      </Link>
      <Link href={routes.signUp(locale)}>
        <Button size="sm">{t.common.signUp}</Button>
      </Link>
    </>
  )
}
