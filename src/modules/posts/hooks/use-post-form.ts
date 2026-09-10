'use client'

import { useActionState, useCallback, useRef, useState } from 'react'
import { idleState, type ActionState } from '@/shared/lib/action-state'
import { useLocale } from '@/shared/i18n/i18n-provider'
import type { Locale } from '@/shared/i18n/config'
import { slugify } from '../domain/schemas'
import type { PostDetail } from '../domain/types'
import { createPostAction, updatePostAction } from '../actions'

type PostFormValues = {
  locale: Locale
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
}

function emptyValues(locale: Locale): PostFormValues {
  return {
    locale,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  }
}

/**
 * Owns everything the post editor does: which action to submit to, the
 * controlled values, the title→slug derivation, and server-side errors.
 *
 * The slug stops auto-deriving as soon as the user edits it by hand — the
 * kind of rule that turns into tangled `useEffect`s when it lives in the
 * component instead of a hook.
 */
export function usePostForm(post?: PostDetail) {
  // A new post defaults to the language the author is writing the app in.
  const uiLocale = useLocale()
  const isEditing = Boolean(post)
  const action = isEditing ? updatePostAction : createPostAction

  const [state, formAction, isPending] = useActionState<ActionState<void>, FormData>(
    action,
    idleState,
  )

  const [values, setValues] = useState<PostFormValues>(() =>
    post
      ? {
          locale: post.locale,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          published: post.published,
        }
      : emptyValues(uiLocale),
  )

  // An existing post already has a slug people may have linked to.
  const slugTouched = useRef(isEditing)

  const setField = useCallback(<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) => {
    setValues((current) => {
      if (key === 'slug') slugTouched.current = true
      const next = { ...current, [key]: value }
      if (key === 'title' && !slugTouched.current) {
        next.slug = slugify(value as string)
      }
      return next
    })
  }, [])

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  return {
    isEditing,
    postId: post?.id,
    values,
    setField,
    formAction,
    isPending,
    error: state.status === 'error' && !Object.keys(fieldErrors).length ? state.message : null,
    errorsFor: (field: keyof PostFormValues) => fieldErrors[field],
  }
}
