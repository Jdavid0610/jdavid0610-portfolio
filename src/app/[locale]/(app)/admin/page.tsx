import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'
import { Alert } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Card, CardHeader } from '@/shared/ui/card'
import * as authService from '@/modules/auth/server/auth.service'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: '/admin',
    title: getDictionary(locale).nav.admin,
    noIndex: true,
  })
}

/**
 * RBAC at the page level.
 *
 * A page renders a proper 403 instead of throwing, because a signed-in user
 * clicking a stale link deserves an explanation rather than a crash screen.
 * Actions and services still use `requireRole`, where throwing is correct —
 * hiding the page is UX, refusing the mutation is the actual control.
 */
export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()
  const t = getDictionary(locale)

  if (session.user.role !== 'admin') {
    return (
      <Alert tone="info">
        <strong className="block text-fg">{t.errors.forbiddenTitle}</strong>
        {t.errors.forbiddenBody}
      </Alert>
    )
  }

  const users = await authService.listUsers()

  return (
    <Card>
      <CardHeader title={t.nav.admin} description={`${users.length} ${t.admin.accounts}`} />
      <ul className="flex flex-col divide-y divide-border">
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <Badge tone={user.role === 'admin' ? 'success' : 'neutral'}>{t.roles[user.role]}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}
