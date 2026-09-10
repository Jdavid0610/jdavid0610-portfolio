# Next Stack

A Next.js 16 template that is also its own backend: server-rendered, SEO-complete,
authenticated, internationalised, and organised so a feature lives in one folder.

```bash
pnpm install
pnpm dev:mock          # runs on in-memory data — no database required
```

Then open http://localhost:3000. Sign in with any password as `admin@example.com`
(admin) or `user@example.com` (regular user).

To run against a real database instead:

```bash
cp .env.example .env
pnpm db:up             # Postgres 17 in Docker, on host port 5433
pnpm db:migrate
pnpm db:seed           # admin@example.com / password123
pnpm dev
```

---

## Architecture

One rule holds the whole thing together:

```
app/ (routing)  →  modules/ (features)  →  server/ (db, auth, env)
                          ↘  shared/ (dumb UI, generic hooks, lib)
```

Dependencies point one way. `app/` never contains business logic — a page resolves
its params, calls a feature service, and renders a feature component. `server/`
never imports a feature.

### Documentation

Two audiences, two places.

**Anyone who opens the deployed site** gets `/en/docs` (and `/es/docs`) — six
pages explaining what the app is, how it behaves, how content and languages
work, how it is built, how access is controlled, and how to run it. It includes
a live status panel reporting the deployment's actual language, session and
data source, so the docs describe the running system rather than an idealised
one. The content lives in `src/modules/docs/content/` as typed data — no
markdown parser, and a missing translation is a compile error.

**Anyone working on the code** gets these two files:

| Document | Covers |
| --- | --- |
| [docs/structure.md](docs/structure.md) | every folder, what belongs in it, route groups, request lifecycles |
| [docs/cookbook.md](docs/cookbook.md) | implementation recipes with code: features, forms, SEO, RBAC, mocks, locales |

### Global toasts

`toast.success('toast.postDeleted')` works from anywhere on the client — a
hook, an event handler, a `catch` block — with no provider to thread through.
The store is plain module state read through `useSyncExternalStore`; titles are
message keys resolved at render time, so a toast raised before a language
switch cannot render stale text. Errors are announced assertively, hovering
pauses the timer, duplicates refresh instead of stacking, and calling it on the
server is a no-op because module state there is shared across requests. Full
API in [docs/cookbook.md](docs/cookbook.md#10-toasts).

### The hooks pattern

Logic and presentation are separated by file, not by convention:

```
page.tsx (server)      fetches data, passes plain props
   └── ui/x-form.tsx   pure: props in, markup out
         └── hooks/use-x-form.ts   state, submission, errors, derivations
```

`usePostForm` is the reference: it owns the action binding, the controlled
values, the title→slug derivation, and the rule that auto-slugging stops once
the user edits the slug by hand. `PostForm` renders inputs and nothing else.
The hook is testable without rendering; the component is swappable without
touching behaviour.

---

## Authentication

Three layers, each doing only what it is good at.

**1. `src/proxy.ts` — optimistic, not secure.**
Next 16 renamed `middleware` to `proxy` (Node runtime, no edge). It runs on
every request including prefetches, so it only reads a cookie: no database, no
session store. It puts a locale on every URL, bounces signed-out visitors away
from protected paths before they see a flash, and publishes `x-locale` /
`x-pathname` headers so server code can build locale-aware redirects.

**2. `src/server/auth/session.ts` — the real boundary.**
`getSession()` is wrapped in React's `cache()`, so a layout, a page and three
components share one lookup per request. `requireSession()` redirects;
`requireRole()` throws. The authenticated layout calls it once, which protects
every page beneath it.

**3. Services — the actual control.**
`assertCanEdit(session, post)` lives next to the query it guards. A layout does
not protect a Server Action, and a hidden button does not protect a row, so
ownership is re-checked where the data is touched. `/api/posts` re-checks too,
because a route handler is reachable directly.

RBAC is a `role` column with `input: false` in the auth config — a client cannot
set it at sign-up, only server code can.

### The Server Action pipeline

`createAction` / `createFormAction` wrap every action with the same steps:

```
FormData → Zod parse → auth check → handler → typed ActionState
```

Actions never throw at the UI. They return a discriminated union
(`idle | success | error`), which is exactly what `useActionState` renders — so
a form shows field errors without a single `try/catch` in a component. The
contract lives in `shared/lib/action-state.ts` (client-safe); the execution
lives in `server/action.ts` (server-only). Keeping those apart is what stops
the Postgres driver being pulled into the browser bundle.

---

## SEO

- **Static where it matters.** Every public route prerenders per locale with ISR.
  The marketing shell deliberately contains no `headers()`, `cookies()` or
  session read — one of those would make the whole subtree dynamic. The header's
  auth corner resolves on the client there, and on the server inside `(app)`.
- **Canonicals and hreflang** are generated for every locale plus `x-default` by
  `shared/lib/seo.ts`. One helper, so no page can forget.
- **`sitemap.ts`** emits per-locale entries with `xhtml:link` alternates, including
  published posts; `robots.ts` keeps crawlers out of private routes.
- **JSON-LD** for Organization, WebSite, Article and BreadcrumbList, rendered
  server-side at zero client cost.
- **Per-locale OG images** generated by `[locale]/opengraph-image.tsx`.
- Private pages are explicitly `noindex`.

Check it: `curl -s localhost:3000/en/blog/<slug> | grep canonical`.

---

## Mock mode

The whole application can run on in-memory fixtures — no Postgres, no auth
provider, no network:

```bash
pnpm dev:mock                     # or NEXT_PUBLIC_MOCK_MODE=on pnpm dev
MOCK_LATENCY_MS=600 pnpm dev:mock # see every loading state
MOCK_FAIL=posts.create pnpm dev:mock  # see the error states
```

**How it is wired.** The repository is a port (`posts.repository.contract.ts`)
with two implementations — Postgres and in-memory — selected once in
`posts.repository.ts`. Everything above that file is unaware. Sessions work the
same way: `getSession()` branches once, and mock sign-in/sign-out really do
toggle a cookie, so redirects, RBAC and the proxy behave identically.

The mock store is stateful, so create / edit / delete all work and slug
conflicts are real. Fixture dates are fixed, so screenshots and assertions stay
stable.

**Guards.** Mock mode is a server decision read from the environment at boot —
never from a request, header or query parameter a visitor could set. A
production build refuses to start with mocks on unless `ALLOW_MOCKS_IN_PRODUCTION=true`
is set explicitly, which a deploy pipeline can grep for. `/api/health` reports
`"database": "mocked"` so a misplaced demo build is visible from outside.

Use it for onboarding (one command, no Docker), for exercising loading and error
UI on demand, and for deterministic end-to-end runs.

---

## Internationalisation

Locales are a root route parameter (`/en/…`, `/es/…`), so language is part of
every URL, every canonical and every hreflang. The proxy negotiates from a
cookie then `Accept-Language`.

Dictionaries are plain typed objects: `en.ts` is the source of truth and `es.ts`
must satisfy its type, so a missing translation is a compile error. A test also
asserts the key sets match. The server resolves the dictionary once per request
and hands it to a provider — only the active locale ever reaches the browser.

**Messages are keys.** Zod schemas and thrown `AppError`s carry keys like
`validation.passwordMin`, not English prose: a schema is a module-level
constant that cannot know the request's locale. The action pipeline resolves
them at the boundary, so form errors appear in the visitor's language. A global
Zod error map covers the library's own built-in failures too.

**Content is localised, not just chrome.** Posts have a `locale` column;
`/es/blog` lists Spanish posts, translations of one post share a slug, and
`hreflang` advertises only the locales a post actually exists in.

To add a locale: add it to `shared/i18n/config.ts`, add a dictionary file. Every
sitemap entry, hreflang tag and route helper follows automatically.

---

## Commands

| Command | Does |
| --- | --- |
| `pnpm dev` / `pnpm dev:mock` | dev server, real DB / fixtures |
| `pnpm build` / `pnpm build:mock` | production build |
| `pnpm typecheck` · `pnpm lint` | strict TS, ESLint |
| `pnpm test` · `pnpm test:e2e` | Vitest units, Playwright end-to-end |
| `pnpm db:up` · `db:generate` · `db:migrate` · `db:seed` · `db:studio` | database lifecycle |

Postgres binds to host port **5433** so it never fights a locally installed one.

---

## Adding a feature

The full walkthrough — schema, repository, service, action, hook, UI, page — is
in [docs/cookbook.md](docs/cookbook.md#1-add-a-feature-end-to-end). The short
version:

1. `src/modules/<feature>/domain/` — Zod schema and types.
2. `server/<feature>.repository.db.ts` — queries returning DTOs, never rows.
3. `server/<feature>.service.ts` — rules and authorization.
4. `actions.ts` — wrap handlers in `createAction`, revalidate, redirect.
5. `hooks/` — behaviour. `ui/` — markup.
6. `app/[locale]/…/page.tsx` — resolve params, call the service, render the UI,
   export `generateMetadata` via `buildMetadata`.
