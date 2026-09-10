'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { routes } from '@/shared/lib/routes'
import { useDisclosure } from '@/shared/hooks/use-disclosure'
import { Button } from '@/shared/ui/button'
import { useSignOut } from '../hooks/use-sign-out'
import { initialsOf, isAdmin, type SessionUser } from '../domain/types'

/** The session arrives as a prop from a server component — never refetched. */
export function UserMenu({ user }: { user: SessionUser }) {
  const t = useTranslations()
  const locale = useLocale()
  const { isOpen, toggle, close } = useDisclosure()
  const { signOut, isPending } = useSignOut()

  return (
    <div className="relative" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-fg"
      >
        {initialsOf(user.name)}
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-56 rounded-card border border-border bg-surface p-2 shadow-lg"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>

          <nav className="flex flex-col py-1 text-sm">
            <Link role="menuitem" href={routes.dashboard(locale)} className="rounded px-3 py-2 hover:bg-bg">
              {t.common.dashboard}
            </Link>
            <Link role="menuitem" href={routes.settings(locale)} className="rounded px-3 py-2 hover:bg-bg">
              {t.nav.settings}
            </Link>
            {isAdmin(user) ? (
              <Link role="menuitem" href={routes.admin(locale)} className="rounded px-3 py-2 hover:bg-bg">
                {t.nav.admin}
              </Link>
            ) : null}
          </nav>

          <Button
            variant="ghost"
            className="w-full justify-start"
            loading={isPending}
            onClick={signOut}
          >
            {t.common.signOut}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
