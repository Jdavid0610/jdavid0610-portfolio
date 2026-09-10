'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from '@/shared/i18n/i18n-provider'
import { localeNames, locales } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Input, Textarea } from '@/shared/ui/input'
import { usePostForm } from '../hooks/use-post-form'
import type { PostDetail } from '../domain/types'

/** Pure presentation over `usePostForm` — create and edit share both. */
export function PostForm({ post }: { post?: PostDetail }) {
  const t = useTranslations()
  const locale = useLocale()
  const { isEditing, postId, values, setField, formAction, isPending, error, errorsFor } =
    usePostForm(post)

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {isEditing ? <input type="hidden" name="id" value={postId} /> : null}

      {error ? <Alert>{error}</Alert> : null}

      <Field id="locale" label={t.posts.fieldLocale} errors={errorsFor('locale')} required>
        {(props) => (
          <select
            {...props}
            name="locale"
            value={values.locale}
            onChange={(e) => setField('locale', e.target.value as (typeof locales)[number])}
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
          >
            {locales.map((option) => (
              <option key={option} value={option}>
                {localeNames[option]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="title" label={t.posts.fieldTitle} errors={errorsFor('title')} required>
        {(props) => (
          <Input
            {...props}
            name="title"
            value={values.title}
            onChange={(e) => setField('title', e.target.value)}
            required
          />
        )}
      </Field>

      <Field
        id="slug"
        label={t.posts.fieldSlug}
        hint={`/${values.locale}/blog/${values.slug || '…'}`}
        errors={errorsFor('slug')}
        required
      >
        {(props) => (
          <Input
            {...props}
            name="slug"
            value={values.slug}
            onChange={(e) => setField('slug', e.target.value)}
            required
          />
        )}
      </Field>

      <Field id="excerpt" label={t.posts.fieldExcerpt} errors={errorsFor('excerpt')}>
        {(props) => (
          <Input
            {...props}
            name="excerpt"
            value={values.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            maxLength={280}
          />
        )}
      </Field>

      <Field id="content" label={t.posts.fieldContent} errors={errorsFor('content')} required>
        {(props) => (
          <Textarea
            {...props}
            name="content"
            value={values.content}
            onChange={(e) => setField('content', e.target.value)}
            required
          />
        )}
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          checked={values.published}
          onChange={(e) => setField('published', e.target.checked)}
          className="size-4 accent-[var(--color-brand)]"
        />
        {t.posts.fieldPublished}
      </label>

      <div className="flex items-center gap-3">
        <Button type="submit" loading={isPending}>
          {t.common.save}
        </Button>
        <Link href={routes.posts(locale)} className="text-sm text-muted hover:underline">
          {t.common.cancel}
        </Link>
      </div>
    </form>
  )
}
