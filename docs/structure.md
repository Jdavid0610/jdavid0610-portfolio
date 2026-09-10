# Folder structure

Four top-level folders under `src/`, and one rule that decides where anything goes:

```
app/        routing        →  modules/    features   →  server/   infrastructure
                                    ↘  shared/  primitives, i18n, SEO
```

**Dependencies point one way.** `app/` may import from `modules/`, `shared/` and
`server/`. `modules/` may import from `server/` and `shared/`. `server/` and
`shared/` import from neither of the two above them. If you ever need
`server/` to reach into a feature, the thing you are reaching for belongs in
`server/`.

Two practical consequences:

- A feature is one folder you can delete.
- Nothing in `app/` decides anything, so re-organising URLs never touches logic.

---

## The annotated tree

```
src/
├── app/                                ROUTING ONLY — thin, no logic
│   ├── [locale]/                       locale is a root parameter
│   │   ├── layout.tsx                  root layout: <html>, fonts, providers, metadataBase
│   │   ├── error.tsx                   route error boundary (client)
│   │   ├── global-error.tsx            catches failures in the root layout itself
│   │   ├── not-found.tsx               404 — client, see "Why it is a client component"
│   │   ├── opengraph-image.tsx         per-locale social card, generated
│   │   │
│   │   ├── (marketing)/                PUBLIC · static + ISR · indexed
│   │   │   ├── layout.tsx              header/footer + Organization & WebSite JSON-LD
│   │   │   ├── page.tsx                /en
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx            feed, revalidate 3600
│   │   │   │   └── [slug]/page.tsx     generateStaticParams + Article JSON-LD
│   │   │   └── docs/                   in-app documentation, fully prerendered
│   │   │       ├── layout.tsx          sidebar + content
│   │   │       ├── page.tsx            index
│   │   │       └── [slug]/page.tsx     one section per page, per locale
│   │   │
│   │   ├── (auth)/                     PUBLIC · minimal shell · noindex
│   │   │   ├── layout.tsx
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   │
│   │   └── (app)/                      AUTHENTICATED · dynamic · noindex
│   │       ├── layout.tsx              ← requireSession() — the real gate
│   │       ├── dashboard/{page,loading}.tsx
│   │       ├── posts/{page.tsx,new/page.tsx,[id]/edit/page.tsx}
│   │       ├── settings/profile/page.tsx
│   │       └── admin/page.tsx          RBAC
│   │
│   ├── api/
│   │   ├── auth/[...all]/route.ts      every auth endpoint (outside [locale] on purpose)
│   │   ├── posts/route.ts              REST backing the client-side list
│   │   └── health/route.ts             liveness + database reachability
│   │
│   ├── robots.ts  sitemap.ts  manifest.ts  icon.svg
│
├── modules/                            THE BACKEND + FEATURE LOGIC
│   ├── auth/
│   │   ├── domain/{schemas,types}.ts   Zod schemas, DTOs, pure helpers
│   │   ├── server/auth.service.ts      provider calls → our error taxonomy
│   │   ├── lib/auth-client.ts          browser auth client (OAuth redirects)
│   │   ├── actions.ts                  'use server'
│   │   ├── hooks/use-*.ts              ALL client behaviour
│   │   └── ui/*.tsx                    presentation only
│   │
│   ├── docs/                           the in-app documentation at /[locale]/docs
│   │   ├── domain/types.ts             DocBlock union — content as typed data
│   │   ├── content/{en,es}.ts          the pages themselves, one file per locale
│   │   ├── hooks/use-runtime-status.ts live deployment facts (client)
│   │   └── ui/                         block renderer, nav, runtime panel
│   │
│   └── posts/                          reference CRUD feature
│       ├── domain/{schemas,types}.ts    schemas emit message *keys*, not prose
│       ├── server/
│       │   ├── posts.repository.contract.ts   the port both impls satisfy
│       │   ├── posts.repository.db.ts         Postgres — the only SQL in the app
│       │   ├── posts.repository.mock.ts       in-memory
│       │   ├── posts.repository.ts            ← the swap point
│       │   ├── posts.fixtures.ts              deterministic mock data
│       │   └── posts.service.ts               rules + authorization
│       ├── actions.ts  hooks/  ui/
│
├── server/                             INFRASTRUCTURE — knows no features
│   ├── env.ts                          Zod-validated, fails at boot
│   ├── errors.ts                       AppError taxonomy
│   ├── action.ts                       validate → auth → run → typed result
│   ├── auth/{config,session}.ts        provider config + the session DAL
│   ├── db/{index,migrate,seed}.ts + schema/
│   └── mocks/{config,auth.mock}.ts
│
├── shared/                             GENERIC — knows no features
│   ├── ui/                             button, input, field, card, alert, badge, toaster
│   ├── hooks/                          use-debounced-value, use-disclosure, use-query-state,
│   │                                   use-toasts (useSyncExternalStore binding)
│   ├── layout/                         site-header, site-footer, app-nav, locale-switcher
│   ├── i18n/                           config, dictionaries, provider
│   ├── lib/                            seo, json-ld, routes, action-state, format, cn, cookies,
│   │                                   messages (key → text), zod-config (global error map),
│   │                                   toast (global store — no React, callable anywhere)
│   ├── config/site.ts                  single source of truth for <head> data
│   └── providers.tsx                   QueryClient + I18nProvider + Toaster
│
├── proxy.ts                            Next 16's middleware: locale + optimistic auth
└── styles/globals.css                  Tailwind v4 theme tokens
```

---

## What belongs in each layer

| Layer | Holds | Never holds |
| --- | --- | --- |
| `app/` | routes, `generateMetadata`, layouts, boundaries | business logic, SQL, validation |
| `domain/` | Zod schemas, DTO types, pure functions (`slugify`) | I/O, React, `server-only` |
| `server/` *(in a module)* | repository (queries), service (rules + authz) | React, `FormData`, redirects |
| `actions.ts` | `'use server'`, revalidation, redirects | validation logic, SQL |
| `hooks/` | state, submission, derivations, URL sync | markup |
| `ui/` | markup | fetching, decisions, business rules |
| `src/server/` | db, auth, env, action pipeline, mocks | any feature name |
| `src/shared/` | primitives, i18n, SEO helpers, generic hooks | any feature name |

The two "never holds" rules that matter most in practice:

- **A repository returns DTOs, never rows.** A column rename stops at
  `posts.repository.db.ts` instead of rippling into components.
- **A component receives data and handlers, and decides nothing.** If a
  component needs an `if` about business state, that `if` belongs in a hook or
  a service.

---

## Naming conventions

| Pattern | Means |
| --- | --- |
| `*.repository.db.ts` / `*.repository.mock.ts` | interchangeable implementations of a port |
| `*.repository.ts` | the selector — what everything else imports |
| `*.service.ts` | business rules and authorization |
| `use-*.ts` | client hook; contains behaviour, no markup |
| `*-form.tsx`, `*-card.tsx`, `*-manager.tsx` | presentation |
| `domain/` | shared by client and server; safe to import anywhere |
| `import 'server-only'` at the top | this file must never reach the browser |

---

## Route groups and rendering

Route groups are parentheses in a folder name: they organise routes without
appearing in the URL. Each one here has a different rendering contract.

| Group | Rendering | Session read | Indexed |
| --- | --- | --- | --- |
| `(marketing)` | static + ISR (1h) | client-side only | yes |
| `(auth)` | dynamic | none | no (`noIndex`) |
| `(app)` | dynamic, per request | server, in the layout | no (`noIndex`) |

`(marketing)` contains **no** `headers()`, `cookies()` or server session read.
One of those anywhere in the subtree makes every page below it dynamic and
costs the prerendering. That is why the header takes its auth corner as a slot:

```tsx
// (marketing)/layout.tsx — stays static
<SiteHeader locale={locale} auth={<AuthActions />} />        // client component

// (app)/layout.tsx — already dynamic
<SiteHeader locale={locale} auth={<UserMenu user={session.user} />} />   // server
```

### Why `not-found.tsx` is a client component

`not-found.tsx` is part of every route's tree. An earlier version read the
locale from `headers()`, which silently made the whole site render dynamically.
It now reads the locale from the i18n provider the root layout already mounted:

```tsx
'use client'
export default function NotFound() {
  const t = useTranslations()
  const locale = useLocale()
  ...
}
```

Verify rendering modes at any time with `pnpm build` — `●` is prerendered,
`ƒ` is per-request.

---

## Request lifecycles

**Public page** (`/en/blog/hello`)

```
proxy.ts  → locale present, no session needed, sets x-locale header
page.tsx  → generateStaticParams prerendered this at build; served from cache
          → generateMetadata produced canonical + hreflang + OG
          → Article JSON-LD is already in the HTML
```

**Protected page** (`/en/posts`)

```
proxy.ts             → session cookie present? no  → redirect to sign-in (optimistic)
(app)/layout.tsx     → requireSession()            → the real check, memoized
posts/page.tsx       → postFiltersSchema.parse(searchParams)
                     → postsService.listMine(session, filters)   ← ownership scoped here
                     → <PostsManager initialData={…} />
```

**Form submission** (creating a post)

```
<PostForm/>              action={formAction}
usePostForm()            useActionState → server
createFormAction()       FormData → Zod → auth('required') → handler
postsService.create()    slug conflict? → ValidationError
actions.ts               revalidatePath per locale → redirect
                         ← returns ActionState; field errors render in <Field>
```
