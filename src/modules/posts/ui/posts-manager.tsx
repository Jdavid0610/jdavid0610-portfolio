'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { formatDate } from '@/shared/lib/format'
import { routes } from '@/shared/lib/routes'
import { Alert } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { usePostFilters } from '../hooks/use-post-filters'
import { usePostsQuery } from '../hooks/use-posts-query'
import { useDeletePost } from '../hooks/use-delete-post'
import type { Paginated, SerializedPost } from '../domain/types'

/**
 * Composition only. Three hooks supply filtering, data and deletion; this file
 * decides nothing except what the result looks like.
 */
export function PostsManager({ initialData }: { initialData: Paginated<SerializedPost> }) {
  const t = useTranslations()
  const locale = useLocale()
  const filters = usePostFilters()
  const { data, isFetching, isError } = usePostsQuery(
    { search: filters.searchDraft, status: filters.status, page: filters.page },
    initialData,
  )
  const deletion = useDeletePost()

  const page = data ?? initialData
  const visible = page.items.filter((post) => !deletion.isRemoved(post.id))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="search"
          value={filters.searchDraft}
          onChange={(e) => filters.setSearchDraft(e.target.value)}
          placeholder={t.common.search}
          aria-label={t.common.search}
          className="max-w-xs"
        />
        <div className="flex gap-1">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <Button
              key={status}
              size="sm"
              variant={filters.status === status ? 'primary' : 'secondary'}
              onClick={() => filters.setStatus(status)}
            >
              {status === 'all'
                ? t.posts.filterAll
                : status === 'published'
                  ? t.posts.published
                  : t.posts.draft}
            </Button>
          ))}
        </div>
        <span aria-live="polite" className="ml-auto text-xs text-muted">
          {isFetching ? t.common.loading : `${page.total} ${t.posts.countLabel}`}
        </span>
      </div>

      {/* The query throws a message key; this is where it becomes prose. */}
      {isError ? <Alert>{t.messages['error.postsLoadFailed']}</Alert> : null}

      {visible.length === 0 ? (
        <p className="rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
          {t.posts.empty}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{post.title}</p>
                <p className="truncate text-xs text-muted">
                  {formatDate(post.updatedAt, locale)} · /{post.slug}
                </p>
              </div>
              <Badge tone={post.published ? 'success' : 'neutral'}>
                {post.published ? t.posts.published : t.posts.draft}
              </Badge>
              <Link
                href={routes.editPost(locale, post.id)}
                className="text-sm text-brand hover:underline"
              >
                {t.common.edit}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(t.posts.deleteConfirm)) deletion.remove(post.id)
                }}
              >
                {t.common.delete}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {page.totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
          <Button
            size="sm"
            variant="secondary"
            disabled={filters.page <= 1}
            onClick={() => filters.setPage(filters.page - 1)}
          >
            ←
          </Button>
          <span className="text-sm text-muted">
            {page.page} / {page.totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={filters.page >= page.totalPages}
            onClick={() => filters.setPage(filters.page + 1)}
          >
            →
          </Button>
        </nav>
      ) : null}
    </div>
  )
}
