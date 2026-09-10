# Julian Ortiz Alviar — portfolio

The personal site of Julian David Ortiz Alviar: Senior FullStack Developer, DevOps
Specialist and AI Engineer, based in Cali, Colombia.

It is a **deployment of [next-stack](https://github.com/Jdavid0610/next-stack)**, his own
open-source Next.js 16 template — which is the point. The template's conventions run in
public, under his own name, on the site a visitor is reading.

```bash
pnpm install
cp .env.example .env   # set NEXT_PUBLIC_APP_URL
pnpm dev
```

Then open http://localhost:3000. Bare paths redirect to `/en`; the Spanish edition is at
`/es`.

---

## What this deployment is

A **fully prerendered static site**: no database, no authentication, no runtime data
access. Every page is HTML at build time, which is what makes the structured data and
the AI-crawler story work — a crawler that never runs JavaScript still receives the
complete page and the complete JSON-LD graph.

This is next-stack with two of its layers deleted rather than disabled. The template's
one-folder-per-feature rule is what made that a deletion instead of a refactor:

| Kept | Removed |
| --- | --- |
| routing, i18n (`en` + `es`), SEO helpers, JSON-LD, typed content, UI kit | authentication, RBAC, Postgres and Drizzle, the posts CRUD feature, mock mode |

---

## Architecture

One rule holds the whole thing together:

```
app/ (routing)  →  modules/ (features)  →  server/ (env)
                          ↘  shared/ (dumb UI, generic hooks, lib)
```

Dependencies point one way. `app/` never contains business logic — a page resolves its
params, reads a content module, and renders. See `docs/structure.md` for the full tree
and `docs/cookbook.md` for the recipes.

### Content is typed data

Every word on the site lives in a content module, never in a component and never in
markdown:

```
src/modules/<feature>/
├── domain/types.ts      the shape, including the slug union
├── content/meta.ts      locale-independent facts: URLs, dates, categories, relations
├── content/en.ts        English copy, keyed by slug
├── content/es.ts        Spanish copy, keyed by slug
└── content/index.ts     lookups that merge facts with copy
```

Two properties follow from that split:

- **A missing translation is a compile error.** `content/{en,es}.ts` are typed as
  `Record<Slug, Copy>` over a closed union of slugs, so a project written in English and
  forgotten in Spanish fails `tsc`.
- **The two languages cannot disagree about a fact.** A URL, a date or a rating exists
  once, in `meta.ts`.

The content modules are `profile`, `experience`, `projects`, `open-source`, `faq`,
`blog` and `pages` (per-route titles and descriptions).

---

## Routes

| Path | Notes |
| --- | --- |
| `/{locale}` | Hero, positioning pillars, featured work |
| `/{locale}/about` | Biography, skills taxonomy, education |
| `/{locale}/projects`, `/{locale}/projects/{slug}` | 7 projects |
| `/{locale}/open-source`, `/{locale}/open-source/{slug}` | 5 templates |
| `/{locale}/experience` | 5 roles, as overlapping bars drawn to scale |
| `/{locale}/faq` | 25 question-and-answer pairs, and the `FAQPage` payload |
| `/{locale}/contact` | Real `mailto:` and `tel:` links |
| `/{locale}/blog`, `/{locale}/blog/{slug}` | Typed posts |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Outside `[locale]` |
| `/api/health` | Liveness probe — the only non-static route |

`pnpm build` prints the rendering mode of each: `●` prerendered, `ƒ` per-request.

---

## Structured data

`src/shared/lib/json-ld.tsx` is the only place structured data is constructed. Every
page emits **one connected `@graph`** with `@id` cross-references rather than several
floating blocks, so an engine resolving "the Person who authored this" follows a
reference instead of guessing.

`Person` and `WebSite` are emitted in the root layout, so they are on every page and
every other entity can point at them. Per-route payloads add `ProfilePage`,
`CollectionPage`, `ContactPage`, `ItemList`, `WebApplication`, `MobileApplication`,
`SoftwareSourceCode`, `FAQPage`, `Article` and `BreadcrumbList`.

Three rules the code enforces:

- **Nothing is claimed that cannot be substantiated.** `Person.knowsAbout` is generated
  from the two evidence-backed tiers of the skills taxonomy only; `founder` is emitted
  for two organizations and deliberately omitted for a third; `aggregateRating` exists
  for exactly one project, restated from a third-party store listing with its date.
- **No origin is hardcoded.** Every URL, `@id` and `sameAs` derives from
  `NEXT_PUBLIC_APP_URL` through `siteConfig.url`, so one build serves preview and
  production correctly. A test asserts the absence of any literal origin in `src/`.
- **The markup mirrors the page.** The `FAQPage` block and the rendered questions come
  from the same strings, and a test compares them.

---

## Commands

```bash
pnpm dev          # development server
pnpm build        # production build; prints the rendering mode of every route
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm test         # vitest
```

---

## Content maintenance

Anything a visitor reads lives in a content module, so a change is a one-file edit —
but two invariants need holding:

1. **Edit both locales in the same commit.** The types will catch a missing key; they
   cannot catch a Spanish sentence left stale.
2. **Update the FAQ and the page copy together.** Those answers are the site's
   most-quoted text, and an answer engine that cached a stale one keeps serving it long
   after the page changes.
