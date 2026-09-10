'use client'

import { useTranslations } from '@/shared/i18n/i18n-provider'
import { localeNames } from '@/shared/i18n/config'
import { Badge } from '@/shared/ui/badge'
import { useRuntimeStatus } from '../hooks/use-runtime-status'

/** A row per fact, so the panel reads as a table of the deployment's state. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  )
}

export function RuntimePanel() {
  const t = useTranslations()
  const status = useRuntimeStatus()

  return (
    <div className="rounded-card border border-border bg-surface px-4 py-2">
      <Row label={t.docs.runtimeLanguage}>
        {localeNames[status.locale]} · {status.availableLocales.join(', ')}
      </Row>

      <Row label={t.docs.runtimeSession}>
        {status.isSessionPending ? (
          <span className="text-muted">{t.common.loading}</span>
        ) : status.user ? (
          <span className="flex items-center gap-2">
            {status.user.email}
            <Badge tone={status.user.role === 'admin' ? 'success' : 'neutral'}>
              {t.roles[status.user.role]}
            </Badge>
          </span>
        ) : (
          <span className="text-muted">{t.docs.runtimeSignedOut}</span>
        )}
      </Row>

      <Row label={t.docs.runtimeData}>
        {status.isHealthPending ? (
          <span className="text-muted">{t.common.loading}</span>
        ) : status.isHealthError || !status.dataSource ? (
          <Badge>{t.docs.runtimeUnknown}</Badge>
        ) : status.dataSource === 'mocked' ? (
          <Badge>{t.docs.runtimeMocked}</Badge>
        ) : status.dataSource === 'up' ? (
          <Badge tone="success">{t.docs.runtimeDatabase}</Badge>
        ) : (
          <Badge>{t.docs.runtimeDown}</Badge>
        )}
      </Row>
    </div>
  )
}
