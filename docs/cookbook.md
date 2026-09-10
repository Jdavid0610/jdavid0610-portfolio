# Implementation cookbook

Copy-paste recipes that follow the conventions in [structure.md](./structure.md).
Every snippet is the same shape as working code in `src/modules/posts` — read
that feature alongside this document.

- [1. Add a feature, end to end](#1-add-a-feature-end-to-end)
- [2. A public page with full SEO](#2-a-public-page-with-full-seo)
- [3. A protected page](#3-a-protected-page)
- [4. A form: schema → action → hook → UI](#4-a-form-schema--action--hook--ui)
- [5. Client-side list: URL state + TanStack Query](#5-client-side-list-url-state--tanstack-query)
- [6. Authorization and RBAC](#6-authorization-and-rbac)
- [6b. Localised messages](#6b-localised-messages)
- [7. Errors](#7-errors)
- [8. Keep mock mode working](#8-keep-mock-mode-working)
- [9. Add a locale](#9-add-a-locale)
- [10. Toasts](#10-toasts)

---

## 1. Add a feature, end to end

A `comments` feature, seven files, in dependency order.

### 1.1 Schema — `src/server/db/schema/comments.ts`

```ts
import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'
import { post } from './posts'

export const comment = pgTable(
  'comment',
  {
    id: uuid().primaryKey().defaultRandom(),
    body: text().notNull(),
    postId: uuid()
      .notNull()
      .references(() => post.id, { onDelete: 'cascade' }),
    authorId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (t) => [index('comment_post_id_idx').on(t.postId)],
)

export const commentRelations = relations(comment, ({ one }) => ({
  post: one(post, { fields: [comment.postId], references: [post.id] }),
  author: one(user, { fields: [comment.authorId], references: [user.id] }),
}))
```

Export it from `src/server/db/schema/index.ts`, then:

```bash
pnpm db:generate && pnpm db:migrate
```

Column names come from the JS keys via `casing: 'snake_case'` — do not write
them out by hand.

### 1.2 Domain — `src/modules/comments/domain/`

```ts
// schemas.ts — one definition, used by the form AND the action
import { z } from 'zod'

export const createCommentSchema = z.object({
  postId: z.uuid(),
  body: z.string().trim().min(2, 'validation.commentMin').max(2000, 'validation.tooLong'),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>
```

> Messages are **message keys**, not prose. A schema is a module-level constant
> evaluated at import time, so it cannot know the locale of the request that
> will fail against it. Add the key to `shared/i18n/dictionaries/*.ts`; the
> action pipeline translates it on the way out. See
> [Localised messages](#localised-messages).

```ts
// types.ts — the DTO the UI receives. Never the raw row.
export type CommentView = {
  id: string
  body: string
  authorName: string
  createdAt: Date
}

/** Wire shape: Dates do not survive JSON, so serialize once, explicitly. */
export type SerializedComment = Omit<CommentView, 'createdAt'> & { createdAt: string }

export function serializeComment(c: CommentView): SerializedComment {
  return { ...c, createdAt: c.createdAt.toISOString() }
}
```

### 1.3 Repository — `src/modules/comments/server/comments.repository.db.ts`

The only place SQL lives. It returns DTOs, so a schema change stops here.

```ts
import 'server-only'

import { asc, eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { comment, user } from '@/server/db/schema'
import type { CommentView } from '../domain/types'

export async function findByPost(postId: string): Promise<CommentView[]> {
  return db
    .select({
      id: comment.id,
      body: comment.body,
      authorName: user.name,
      createdAt: comment.createdAt,
    })
    .from(comment)
    .innerJoin(user, eq(comment.authorId, user.id))
    .where(eq(comment.postId, postId))
    .orderBy(asc(comment.createdAt))
}

export async function insertComment(values: {
  postId: string
  authorId: string
  body: string
}): Promise<{ id: string }> {
  const [row] = await db.insert(comment).values(values).returning({ id: comment.id })
  return row!
}

export async function findOwner(id: string): Promise<{ authorId: string } | null> {
  const [row] = await db
    .select({ authorId: comment.authorId })
    .from(comment)
    .where(eq(comment.id, id))
    .limit(1)
  return row ?? null
}

export async function deleteComment(id: string): Promise<void> {
  await db.delete(comment).where(eq(comment.id, id))
}
```

### 1.4 Service — `src/modules/comments/server/comments.service.ts`

Business rules and authorization, next to the data they protect.

```ts
import 'server-only'

import { ForbiddenError, NotFoundError } from '@/server/errors'
import type { Session } from '@/server/auth/session'
import type { CreateCommentInput } from '../domain/schemas'
import type { CommentView } from '../domain/types'
import * as repo from './comments.repository'

export async function listForPost(postId: string): Promise<CommentView[]> {
  return repo.findByPost(postId)
}

export async function create(session: Session, input: CreateCommentInput) {
  return repo.insertComment({
    postId: input.postId,
    authorId: session.user.id,          // never trust an author id from the client
    body: input.body,
  })
}

export async function remove(session: Session, id: string): Promise<void> {
  const existing = await repo.findOwner(id)
  if (!existing) throw new NotFoundError('That comment no longer exists.')

  const isOwner = existing.authorId === session.user.id
  if (!isOwner && session.user.role !== 'admin') {
    throw new ForbiddenError('That comment belongs to someone else.')
  }
  await repo.deleteComment(id)
}
```

> **Rule:** ownership is checked here, not in the page. A layout does not
> protect a Server Action, and a hidden button does not protect a row.

### 1.5 Action — `src/modules/comments/actions.ts`

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { createFormAction } from '@/server/action'
import { getCurrentLocale } from '@/server/auth/session'
import { routes } from '@/shared/lib/routes'
import { createCommentSchema } from './domain/schemas'
import * as commentsService from './server/comments.service'

export const createCommentAction = createFormAction({
  input: createCommentSchema,
  auth: 'required',                     // 'public' | 'required' | 'admin'
  handler: async ({ input, ctx }): Promise<void> => {
    await commentsService.create(ctx.session, input)
    const locale = await getCurrentLocale()
    revalidatePath(routes.blogPost(locale, input.postId))
  },
})
```

`createFormAction` runs the whole pipeline for you:

```
FormData → Zod parse → auth check → handler → ActionState
```

It never throws at the UI. It returns a discriminated union, which is exactly
what `useActionState` renders.

### 1.6 Hook — `src/modules/comments/hooks/use-comment-form.ts`

All behaviour. No markup.

```ts
'use client'

import { useActionState } from 'react'
import { idleState, type ActionState } from '@/shared/lib/action-state'
import { createCommentAction } from '../actions'

export function useCommentForm(postId: string) {
  const [state, formAction, isPending] = useActionState<ActionState<void>, FormData>(
    createCommentAction,
    idleState,
  )

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  return {
    postId,
    formAction,
    isPending,
    isSaved: state.status === 'success',
    /** A form-level message is an error with no field to attach it to. */
    error: state.status === 'error' && !Object.keys(fieldErrors).length ? state.message : null,
    errorsFor: (field: string) => fieldErrors[field],
  }
}
```

> Import `ActionState` from `@/shared/lib/action-state`, **never** from
> `@/server/action`. The second pulls the Postgres driver into the browser
> bundle and breaks the build.

### 1.7 UI — `src/modules/comments/ui/comment-form.tsx`

Pure presentation over the hook.

```tsx
'use client'

import { useTranslations } from '@/shared/i18n/i18n-provider'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Textarea } from '@/shared/ui/input'
import { useCommentForm } from '../hooks/use-comment-form'

export function CommentForm({ postId }: { postId: string }) {
  const t = useTranslations()
  const { formAction, isPending, isSaved, error, errorsFor } = useCommentForm(postId)

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="postId" value={postId} />
      {error ? <Alert>{error}</Alert> : null}
      {isSaved ? <Alert tone="success">Posted.</Alert> : null}

      <Field id="body" label={t.common.create} errors={errorsFor('body')} required>
        {(props) => <Textarea {...props} name="body" required />}
      </Field>

      <Button type="submit" loading={isPending}>
        {t.common.save}
      </Button>
    </form>
  )
}
```

`Field` wires `aria-invalid` and `aria-describedby` for you — that is why every
form uses it. The `<form action={…}>` also submits without JavaScript.

---

## 2. A public page with full SEO

```tsx
// src/app/[locale]/(marketing)/changelog/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { buildMetadata } from '@/shared/lib/seo'

/** ISR: rebuilt hourly, and on demand via revalidatePath after a write. */
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>       // params is a Promise in Next 16
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, path: '/changelog', title: 'Changelog' })
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return <section className="mx-auto max-w-3xl px-4 py-16">…</section>
}
```

`buildMetadata` is the only place canonical URLs and hreflang are produced, so
no page can forget them. One call emits:

```html
<link rel="canonical" href="https://example.com/en/changelog"/>
<link rel="alternate" hrefLang="en-US" href="https://example.com/en/changelog"/>
<link rel="alternate" hrefLang="es-CO" href="https://example.com/es/changelog"/>
<link rel="alternate" hrefLang="x-default" href="https://example.com/en/changelog"/>
<meta property="og:image" content="https://example.com/en/opengraph-image"/>
```

Add the route to `sitemap.ts` — one line, all locales:

```ts
...withAlternates('/changelog', { priority: 0.8 }),
```

### Structured data

```tsx
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from '@/shared/lib/json-ld'

<JsonLd data={articleJsonLd({ locale, title, description, slug, authorName, publishedAt, updatedAt })} />
<JsonLd data={breadcrumbJsonLd([
  { name: t.nav.home, url: `${siteConfig.url}${routes.home(locale)}` },
  { name: post.title, url: `${siteConfig.url}${routes.blogPost(locale, post.slug)}` },
])} />
```

Rendered from a server component: zero client JavaScript, present in the
initial HTML.

### Prerendering a dynamic segment

```ts
export const dynamicParams = true   // posts published after the build render on demand

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    return (await postsService.listPublishedSlugs()).map((slug) => ({ slug }))
  } catch {
    return []                       // a CI build without a database still succeeds
  }
}
```

Return only *this* segment's params — the root layout already supplies `locale`.

---

## 3. A protected page

The `(app)` layout has already called `requireSession()`, so the page is
guaranteed a session. Call it again anyway when you need the value: it is
memoized with React `cache()`, so it costs nothing.

```tsx
// src/app/[locale]/(app)/reports/page.tsx
import { requireSession } from '@/server/auth/session'
import { buildMetadata } from '@/shared/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, path: '/reports', title: 'Reports', noIndex: true })
}

export default async function ReportsPage({ params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requireSession()
  const data = await reportsService.listMine(session)   // scoping happens in the service

  return <ReportList data={data} />
}
```

Add the URL segment to `protectedSegments` in `src/shared/lib/routes.ts` so the
proxy redirects signed-out visitors before the page renders:

```ts
export const protectedSegments = ['dashboard', 'posts', 'settings', 'admin', 'reports'] as const
```

Private pages pass `noIndex: true`, and `robots.ts` disallows them too.

### Streaming a slow section

```tsx
<Suspense fallback={<Card>{t.common.loading}</Card>}>
  <RecentPosts locale={locale} />        {/* async server component */}
</Suspense>
```

The shell paints immediately; the query fills in after. `loading.tsx` does the
same thing for a whole route.

---

## 4. A form: schema → action → hook → UI

The four files always come in this order, and each one has a single job.

| File | Job |
| --- | --- |
| `domain/schemas.ts` | what is valid — used by client and server |
| `actions.ts` | what happens on the server |
| `hooks/use-x-form.ts` | state, submission, derived values, errors, [toasts](#10-toasts) |
| `ui/x-form.tsx` | markup |

### Derived state belongs in the hook

`usePostForm` holds the rule that a slug auto-derives from the title *until*
the user edits it by hand — the kind of logic that becomes tangled `useEffect`s
when it lives in a component:

```ts
const slugTouched = useRef(isEditing)   // an existing post already has a slug

const setField = useCallback(<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) => {
  setValues((current) => {
    if (key === 'slug') slugTouched.current = true
    const next = { ...current, [key]: value }
    if (key === 'title' && !slugTouched.current) next.slug = slugify(value as string)
    return next
  })
}, [])
```

The component just calls `setField('title', e.target.value)`.

### One hook, create and edit

```ts
export function usePostForm(post?: PostDetail) {
  const isEditing = Boolean(post)
  const action = isEditing ? updatePostAction : createPostAction
  const [state, formAction, isPending] = useActionState(action, idleState)
  …
}
```

```tsx
<PostForm />              {/* create */}
<PostForm post={post} />  {/* edit   */}
```

### Coercing checkboxes

An unchecked box is **absent** from `FormData`; a checked one arrives as
`"on"`. `.optional()` is what permits the missing key — putting `z.undefined()`
inside the union does **not**, because the object schema still requires the key
to be present:

```ts
published: z
  .union([z.boolean(), z.literal('on'), z.literal('true'), z.literal('false')])
  .optional()
  .transform((value) => value === true || value === 'on' || value === 'true'),
```

Get this wrong and saving a draft fails with "This field is required" on a
field the user never sees. `tests/unit/post-schema.test.ts` pins it.

---

## 5. Client-side list: URL state + TanStack Query

The server renders page 1 so the first paint has real rows; the client hook
takes over for search and paging.

```tsx
// page.tsx (server)
const filters = postFiltersSchema.parse(await searchParams)
const page = await postsService.listMine(session, filters)
return <PostsManager initialData={serializePage(page)} />
```

```ts
// hooks/use-posts-query.ts (client)
export function usePostsQuery(filters: PostFilters, initialData: Paginated<SerializedPost>) {
  const isInitialQuery = filters.page === 1 && !filters.search && filters.status === 'all'

  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    initialData: isInitialQuery ? initialData : undefined,
    placeholderData: keepPreviousData,   // keep the old page visible while loading
  })
}
```

Filters live in the URL, not in React state, so a filtered view is shareable
and bookmarkable:

```ts
const search = useQueryState('search')
search.setValue(debouncedSearch, { resetKeys: ['page'] })   // a new search resets paging
```

The route handler behind it re-checks the session — a route handler is
reachable directly, so it defends itself:

```ts
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filters = postFiltersSchema.parse(Object.fromEntries(request.nextUrl.searchParams))
  const page = await postsService.listMine(session, filters)
  return NextResponse.json(serializePage(page), { headers: { 'Cache-Control': 'private, no-store' } })
}
```

### Optimistic deletion

```ts
function remove(id: string) {
  setRemovedIds((ids) => [...ids, id])              // disappears immediately
  startTransition(async () => {
    const result = await deletePostAction({ id })
    if (result.status === 'error') {
      setRemovedIds((ids) => ids.filter((r) => r !== id))   // comes back on failure
      setError(result.message)
      return
    }
    await queryClient.invalidateQueries({ queryKey: ['posts'] })
  })
}
```

---

## 6. Authorization and RBAC

Three layers, each doing only what it is good at.

```ts
// 1. proxy.ts — optimistic, cookie only, NOT security
const hasSessionCookie = Boolean(getSessionCookie(request))
if (isProtected && !hasSessionCookie) return NextResponse.redirect(signInUrl)

// 2. the session DAL — the real check, memoized per request
const session = await requireSession()          // redirects if absent
const admin   = await requireRole('admin')      // throws ForbiddenError

// 3. the service — the actual control, next to the data
if (resource.authorId !== session.user.id && session.user.role !== 'admin') {
  throw new ForbiddenError('This post belongs to someone else.')
}
```

In an action, ask the pipeline instead:

```ts
export const banUserAction = createAction({
  input: z.object({ userId: z.string() }),
  auth: 'admin',                       // ctx.session is typed non-null and role-checked
  handler: async ({ input, ctx }) => { … },
})
```

**Pages render a 403; actions throw one.** A signed-in user clicking a stale
link deserves an explanation, not a crash screen:

```tsx
const session = await requireSession()
if (session.user.role !== 'admin') {
  return (
    <Alert tone="info">
      <strong className="block text-fg">{t.errors.forbiddenTitle}</strong>
      {t.errors.forbiddenBody}
    </Alert>
  )
}
```

Adding a role: extend the `role` column enum in `schema/auth.ts` and the
`additionalFields.role` type in `server/auth/config.ts`. Keep `input: false` —
without it a client could pick its own role at sign-up.

---

## 6b. Localised messages

Anything a user can read must come from the dictionary. Three kinds of text,
three places they are resolved.

| Text | Carried as | Translated by |
| --- | --- | --- |
| Page copy, labels, buttons | dictionary key | `getDictionary(locale)` / `useTranslations()` |
| Validation failures | message key in the Zod schema | the action pipeline |
| Thrown errors | message key in the `AppError` | the action pipeline / route handler |

```ts
// a schema emits a key
password: z.string().min(8, 'validation.passwordMin')

// a service throws a key
throw new ForbiddenError('error.postForbidden')

// server/action.ts resolves both, once, where the locale is known
const locale = await getCurrentLocale()          // from the x-locale header
return { status: 'error', message: translateMessage(locale, error.message) }
```

Zod's own built-in failures (missing key, wrong type) would otherwise emit
English prose. `shared/lib/zod-config.ts` installs a global error map that
turns those into keys too, so nothing escapes the catalogue:

```ts
z.config({
  customError: (issue) => {
    if (issue.message) return issue.message        // ours: already a key
    if (issue.code === 'invalid_type')
      return issue.input === undefined ? 'validation.required' : 'validation.invalidType'
    …
  },
})
```

An unknown key passes through unchanged, so a message from a third-party
library still reaches the user rather than being swallowed.

**Content is not UI.** Blog posts live in the database with a `locale` column;
`/es/blog` lists Spanish posts and a slug that exists only in English 404s on
`/es` rather than serving English text under a Spanish URL. Translations of one
post share a slug — that pairing is what `hreflang` advertises, and only for
locales that really exist:

```ts
availableLocales: await postsService.listTranslations(post.slug)
```

---

## 7. Errors

Services throw from the taxonomy in `src/server/errors.ts`; the boundary maps
them. Nothing internal reaches a user.

| Throw | Status | Becomes |
| --- | --- | --- |
| `ValidationError(msg, fieldErrors)` | 422 | field errors under the inputs |
| `UnauthorizedError` | 401 | form-level message / 401 JSON |
| `ForbiddenError` | 403 | form-level message / 403 JSON |
| `NotFoundError` | 404 | `notFound()` in a page, 404 JSON in a route |
| anything else | 500 | logged in full, `"Something went wrong."` to the user |

```ts
// a field-level failure from deep inside a service
if (await repo.slugExists(input.slug)) {
  throw new ValidationError('That slug is taken.', { slug: ['That slug is already in use.'] })
}
```

Converting a thrown `NotFoundError` into a real 404 page:

```tsx
try {
  post = await postsService.getForEdit(session, id)
} catch (error) {
  if (error instanceof NotFoundError) notFound()
  throw error
}
```

`redirect()` and `notFound()` signal by throwing — the pipeline re-throws them
via `isFrameworkError()` instead of swallowing them as failures.

---

## 8. Keep mock mode working

A feature stays runnable with `pnpm dev:mock` if its repository is a port with
two implementations, selected once.

```ts
// comments.repository.contract.ts — declared explicitly, so both impls must satisfy it
export interface CommentsRepository {
  findByPost(postId: string): Promise<CommentView[]>
  insertComment(values: { postId: string; authorId: string; body: string }): Promise<{ id: string }>
  findOwner(id: string): Promise<{ authorId: string } | null>
  deleteComment(id: string): Promise<void>
}
```

```ts
// comments.repository.ts — the swap point; nothing above it knows which is live
import { isMockMode } from '@/server/mocks/config'
import * as postgres from './comments.repository.db'
import { mockCommentsRepository } from './comments.repository.mock'

const impl: CommentsRepository = isMockMode() ? mockCommentsRepository : postgres

export const findByPost: CommentsRepository['findByPost'] = (postId) => impl.findByPost(postId)
export const insertComment: CommentsRepository['insertComment'] = (v) => impl.insertComment(v)
export const findOwner: CommentsRepository['findOwner'] = (id) => impl.findOwner(id)
export const deleteComment: CommentsRepository['deleteComment'] = (id) => impl.deleteComment(id)
```

```ts
// comments.repository.mock.ts — stateful, so real CRUD flows work
const globalForMocks = globalThis as unknown as { __mockComments?: CommentView[] }

export const mockCommentsRepository: CommentsRepository = {
  findByPost: (postId) =>
    mockOperation('comments.list', () => store().filter((c) => c.postId === postId)),
  …
}
```

`mockOperation(name, run)` adds the simulated latency and the failure
injection, so these work for free:

```bash
MOCK_LATENCY_MS=600 pnpm dev:mock          # every loading state, visible
MOCK_FAIL=comments.list pnpm dev:mock      # every error state, on demand
```

Fixture dates must be **fixed literals**, never `new Date()` — that is what
keeps screenshots and end-to-end assertions stable.

---

## 9. Add a locale

Three edits. Everything else follows.

```ts
// 1. src/shared/i18n/config.ts
export const locales = ['en', 'es', 'pt'] as const
export const localeNames = { en: 'English', es: 'Español', pt: 'Português' }
export const localeTags  = { en: 'en-US',  es: 'es-CO',   pt: 'pt-BR' }
```

```ts
// 2. src/shared/i18n/dictionaries/pt.ts
import type { Dictionary } from './en'
export const pt: Dictionary = { … }   // a missing key is a compile error
```

```ts
// 3. src/shared/i18n/get-dictionary.ts
const dictionaries: Record<Locale, Dictionary> = { en, es, pt }
```

Sitemap entries, hreflang tags, `generateStaticParams`, the locale switcher and
the proxy's `Accept-Language` negotiation all read from `locales` and update
themselves. `tests/unit/i18n.test.ts` fails if the key sets drift apart.

### Using translations

```tsx
// server component
const t = getDictionary(locale)
<h1>{t.marketing.heroTitle}</h1>

// client component
const t = useTranslations()
const locale = useLocale()
```

Client components never import a dictionary file directly — the server resolves
it once and hands it to the provider, so only the active locale reaches the
browser.

### Linking

Always through the route helpers, never a hardcoded string:

```tsx
<Link href={routes.blogPost(locale, post.slug)}>…</Link>
```

---

## 10. Toasts

A global, transient notification. `toast.success(…)` works from anywhere on the
client — a hook, an event handler, a `catch` block, a plain utility — with no
provider to thread through and no props to pass down.

```ts
import { toast } from '@/shared/lib/toast'

toast.success('toast.postDeleted')
toast.error('Could not reach the server')
toast.info('Draft saved', { description: 'Only you can see it.' })
```

### API

| Call | Does |
| --- | --- |
| `toast.success(title, options?)` | green, 5s |
| `toast.error(title, options?)` | red, 8s, announced assertively |
| `toast.info(title, options?)` | neutral, 5s |
| `toast.show(tone, title, options?)` | when the tone is computed |
| `toast.dismiss(id)` | remove one |
| `toast.clear()` | remove all |

Every call returns the toast's `id`.

| Option | Meaning |
| --- | --- |
| `description` | a second line under the title |
| `duration` | milliseconds; `Infinity` requires a click |
| `id` | update an existing toast in place instead of stacking a new one |

### Titles are message keys

A title or description that matches a key in the message catalogue is
translated **at render time**, not when the toast is raised:

```ts
toast.success('toast.postDeleted', { description: 'toast.postDeletedDetail' })
```

Add the key to `shared/i18n/dictionaries/*.ts` under `messages`. Anything that
is not a known key renders verbatim, which is what makes this correct for
messages a Server Action already translated:

```ts
const result = await deletePostAction({ id })
if (result.status === 'error') toast.error(result.message)   // already prose
```

Storing the key rather than the resolved text means a toast raised before a
language switch does not render stale text after it.

### How it works

```
shared/lib/toast.ts        the store — no React, no context, no provider
shared/hooks/use-toasts.ts useSyncExternalStore binding
shared/ui/toaster.tsx      the single mount point, rendered by Providers
```

The store is plain module state with a `Set` of listeners. React reads it
through `useSyncExternalStore`, which keeps renders consistent under concurrent
rendering and supplies a server snapshot — a frozen empty array — so the
toaster prerenders empty instead of mismatching during hydration.

`getToasts()` returns a new array identity only when something actually
changed, so a no-op `dismiss` does not re-render every subscriber.

### Behaviour worth knowing

- **Duplicates refresh rather than stack.** Same tone, title and description as
  a toast already on screen restarts its timer and returns the existing id, so
  a double-clicked button does not produce two identical toasts.
- **The stack caps at four**, newest first; the oldest falls off.
- **Hover or focus pauses the timer**, and the remaining time survives the
  pause — a toast cannot vanish mid-read.
- **It survives client navigation**, because the store is module state rather
  than component state.

### Accessibility

The list is `aria-live="polite"`, so additions are announced without
interrupting. Error toasts additionally carry `role="alert"` — assertive —
because a failure is worth interrupting for. Each toast has a labelled dismiss
button, and the entrance animation is disabled under
`prefers-reduced-motion: reduce`; the announcement, not the motion, carries the
meaning.

### Never call it on the server

The store is module state, which on the server is shared by every concurrent
request. Calling `toast()` there is always a bug, so it no-ops and warns.

To signal from a Server Action, return an `ActionState` and let the calling
hook raise the toast:

```ts
// actions.ts — returns, never toasts
return { status: 'success', data: post }

// hooks/use-x.ts — raises it
useEffect(() => {
  if (state.status === 'success') toast.success('toast.profileSaved')
}, [state])
```

Raise it in an effect rather than during render: render can run many times for
the same state, an effect fires only when the state changes.

### When not to use a toast

A toast is for feedback the user does not have to act on and will not miss if
they blink. It is the wrong tool for:

| Situation | Use instead |
| --- | --- |
| A field is invalid | the `<Field>` error, next to the input |
| The whole form failed | an `<Alert>` above the submit button |
| A destructive confirmation | a dialog the user must answer |
| Something they must read | a page or an inline banner that persists |

`useDeletePost` is the case that earns one: by the time the server answers, the
row the message refers to is already gone from the list, so there is no longer
a sensible place to put it inline.
