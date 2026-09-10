import type { DocsContent } from '../domain/types'

export const docsEn: DocsContent = {
  title: 'Documentation',
  intro:
    'What this deployment is, how it behaves, and how it is put together. Everything described here is running on this site right now — you can click it.',
  pages: [
    {
      slug: 'overview',
      title: 'What this is',
      summary: 'A Next.js template that is also its own backend.',
      blocks: [
        {
          type: 'paragraph',
          text: 'This is a starting point for applications that need to be found by search engines and to know who their users are — a marketing site and a product behind a login, in one repository, sharing one set of conventions.',
        },
        {
          type: 'paragraph',
          text: 'There is no separate API service. Data access, business rules and authorization live beside the pages that use them, and the browser talks to the server through Server Actions and a small number of route handlers.',
        },
        { type: 'heading', text: 'What is included' },
        {
          type: 'checklist',
          items: [
            {
              label: 'Server rendering',
              detail: 'Public pages are HTML first — crawlable and fast on a cold cache.',
            },
            {
              label: 'Complete SEO',
              detail:
                'Canonical URLs, hreflang, sitemap, robots, OpenGraph images and JSON-LD, generated from one source of truth.',
            },
            {
              label: 'Authentication',
              detail: 'Email and password, sessions, optional OAuth, and role-based access.',
            },
            {
              label: 'Two languages',
              detail:
                'English and Spanish, in the URL, covering both the interface and the content.',
            },
            {
              label: 'A reference feature',
              detail: 'Posts: create, edit, publish, delete, search and paginate.',
            },
            {
              label: 'A mock backend',
              detail: 'The whole app runs on in-memory data with no database at all.',
            },
          ],
        },
        { type: 'heading', text: 'Try it' },
        {
          type: 'paragraph',
          text: 'Two accounts exist on this deployment. Any password works when the mock backend is on; otherwise use the one shown.',
        },
        {
          type: 'table',
          head: ['Email', 'Password', 'Role'],
          rows: [
            ['admin@example.com', 'password123', 'admin'],
            ['user@example.com', 'password123', 'user'],
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'This is a demo. Do not put anything real in it, and change these credentials before using the template for anything.',
        },
        { type: 'heading', text: 'Live status' },
        {
          type: 'paragraph',
          text: 'What this particular deployment is doing at the moment you are reading it:',
        },
        { type: 'runtime' },
      ],
    },
    {
      slug: 'behavior',
      title: 'How it behaves',
      summary: 'Routing, redirects, and which pages are cached.',
      blocks: [
        { type: 'heading', text: 'Every URL carries a language' },
        {
          type: 'paragraph',
          text: 'Visiting the site root sends you to a language you can read. The choice comes from a cookie if you have picked one before, otherwise from your browser’s Accept-Language header, otherwise English.',
        },
        {
          type: 'code',
          caption: 'Try these in the address bar',
          code: '/            → redirects to /en or /es\n/en/blog     → the blog in English\n/es/blog     → the same page in Spanish\n/en/dashboard → redirects to sign-in when signed out',
        },
        {
          type: 'paragraph',
          text: 'Switching language with the control in the header keeps you on the page you were reading, and remembers the choice.',
        },
        { type: 'heading', text: 'Signed out versus signed in' },
        {
          type: 'paragraph',
          text: 'Asking for a private page while signed out sends you to sign-in with a callback, and you land back where you were aiming once you are in. Asking for the sign-in page while already signed in sends you to the dashboard.',
        },
        {
          type: 'table',
          head: ['Area', 'Who can see it', 'Indexed'],
          rows: [
            ['Home, blog, docs', 'Everyone', 'Yes'],
            ['Sign in, sign up', 'Signed-out visitors', 'No'],
            ['Dashboard, posts, settings', 'Signed-in users', 'No'],
            ['Admin', 'Administrators only', 'No'],
          ],
        },
        {
          type: 'note',
          tone: 'info',
          text: 'A non-administrator who opens the admin page gets a plain explanation, not an error screen. Hiding the link is not what protects the data — the check next to the data is.',
        },
        { type: 'heading', text: 'What is cached and what is not' },
        {
          type: 'paragraph',
          text: 'Public pages are rendered ahead of time and refreshed at most hourly, so they are fast and cheap to serve. Publishing a post refreshes the affected pages immediately rather than waiting for the hour.',
        },
        {
          type: 'table',
          head: ['Page', 'Rendering'],
          rows: [
            ['Home, blog, docs', 'Prerendered per language, revalidated hourly'],
            ['Blog post', 'Prerendered; new posts render on demand, then cache'],
            ['Dashboard, posts, settings, admin', 'Rendered per request'],
            ['Sitemap, robots, social images', 'Generated'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Because the public pages never read your session, the header’s account area fills in a moment after the page appears. That is the trade: a page that can be cached for everyone cannot also be personalised on the server.',
        },
      ],
    },
    {
      slug: 'content',
      title: 'Content and languages',
      summary: 'How posts, translations and search visibility fit together.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Translating the interface is the easy half. The harder half is content, and this template treats a post as being written in one language rather than pretending one row serves both.',
        },
        { type: 'heading', text: 'How a translation works' },
        {
          type: 'list',
          items: [
            'A post belongs to exactly one language.',
            'Translations of the same post share a slug, which is what pairs them.',
            'The blog shows you only the posts written in the language you are reading.',
            'A post that exists only in English returns "not found" on a Spanish URL, rather than showing English text under a Spanish address.',
          ],
        },
        {
          type: 'note',
          tone: 'info',
          text: 'Search engines are told about a translation only when one actually exists. Advertising a translation that returns "not found" is worse than saying nothing.',
        },
        { type: 'heading', text: 'What search engines receive' },
        {
          type: 'list',
          items: [
            'One canonical address per page, per language.',
            'hreflang links between the languages a page really exists in, plus a default.',
            'A sitemap listing every public page in every language it has.',
            'Structured data describing the site, each article and its breadcrumbs.',
            'A social preview image generated per language.',
            'Private pages excluded from indexing, in the page itself and in robots.',
          ],
        },
        {
          type: 'code',
          caption: 'Visible in the page source of any blog post',
          code: '<link rel="canonical"  href="…/es/blog/…" />\n<link rel="alternate" hreflang="en-US" href="…/en/blog/…" />\n<link rel="alternate" hreflang="es-CO" href="…/es/blog/…" />\n<script type="application/ld+json">{ "@type": "Article", … }</script>',
        },
      ],
    },
    {
      slug: 'architecture',
      title: 'How it is built',
      summary: 'Four folders and one rule about which way they point.',
      blocks: [
        {
          type: 'paragraph',
          text: 'The code is organised so that a feature is one folder you could delete, and so that changing a URL never means touching business logic.',
        },
        {
          type: 'layers',
          caption: 'Dependencies point one way',
          layers: [
            { folder: 'app/', label: 'Routing only: addresses, page metadata, layouts.' },
            {
              folder: 'modules/',
              label: 'One folder per feature: its rules, its data access, its screens.',
            },
            { folder: 'server/', label: 'Database, sessions, configuration.' },
          ],
          shared: {
            folder: 'shared/',
            label: 'Design system, languages, SEO helpers.',
            note: 'Available to every layer above, and knows about none of them.',
          },
          rule: 'Each layer may use the ones below it, never the ones above. That is what lets a feature be deleted as a single folder, and why changing a URL never means touching business logic.',
        },
        {
          type: 'table',
          head: ['Folder', 'Holds', 'Never holds'],
          rows: [
            ['app/', 'routes, page metadata, layouts', 'business logic or queries'],
            ['modules/', 'a feature: rules, data access, hooks, UI', 'infrastructure'],
            ['server/', 'database, sessions, configuration', 'anything feature-specific'],
            ['shared/', 'buttons, inputs, translations, SEO helpers', 'anything feature-specific'],
          ],
        },
        { type: 'heading', text: 'Logic and appearance are separate files' },
        {
          type: 'paragraph',
          text: 'Every interactive piece is split three ways: the page fetches on the server, a hook holds the behaviour, and a component draws it. The component decides nothing, which is what makes it safe to redesign.',
        },
        {
          type: 'code',
          caption: 'The shape of every feature',
          code: 'page.tsx        fetches data on the server, passes plain values down\n  ui/x-form.tsx   markup only — props in, elements out\n    hooks/use-x-form.ts   state, submission, validation errors',
        },
        { type: 'heading', text: 'What happens when you submit a form' },
        {
          type: 'code',
          code: 'the form posts to a Server Action\n  → the same validation rules the browser used run again on the server\n  → the session is checked\n  → business rules and ownership are checked next to the data\n  → affected pages are refreshed\n  → errors come back attached to the fields that caused them',
        },
        {
          type: 'note',
          tone: 'info',
          text: 'Forms work without JavaScript, because they post to the server the way forms always have. JavaScript makes them nicer, not functional.',
        },
      ],
    },
    {
      slug: 'security',
      title: 'Accounts and access',
      summary: 'Where the real checks happen, and where they only appear to.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Access is enforced in three places, and only one of them is actually security. Being explicit about which is which is the point.',
        },
        {
          type: 'table',
          head: ['Layer', 'What it does', 'Is it security?'],
          rows: [
            [
              'Request proxy',
              'Sees a session cookie and redirects, so you never watch a private page flash',
              'No — a cookie only proves a cookie exists',
            ],
            [
              'Page guard',
              'Verifies the session once per request before the private area renders',
              'Yes',
            ],
            [
              'Next to the data',
              'Re-checks the session and who owns the row, on every read and write',
              'Yes — this is the one that matters',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'The third layer exists because a page guard cannot protect a form submission, and a hidden button cannot protect a database row. Editing someone else’s post is refused by the service even if you reach the URL directly.',
        },
        { type: 'heading', text: 'Roles' },
        {
          type: 'list',
          items: [
            'Everyone signs up as a regular user.',
            'The role is set by the server and cannot be chosen at sign-up.',
            'Administrators can see the account list and edit any post.',
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'Email verification and password reset are deliberately switched off so the template runs with no mail provider configured. Turn both on before real users arrive.',
        },
      ],
    },
    {
      slug: 'running-it',
      title: 'Running it yourself',
      summary: 'Two commands with a database, one without.',
      blocks: [
        { type: 'heading', text: 'Without a database' },
        {
          type: 'paragraph',
          text: 'The whole application can run on in-memory data. Nothing to install, nothing to configure — useful for a first look, for design work, and for tests.',
        },
        { type: 'code', code: 'pnpm install\npnpm dev:mock' },
        {
          type: 'paragraph',
          text: 'Sign in with any password. Creating, editing and deleting all work; the data resets when the server restarts.',
        },
        { type: 'heading', text: 'With a database' },
        {
          type: 'code',
          code: 'cp .env.example .env\npnpm db:up        # PostgreSQL in Docker\npnpm db:migrate\npnpm db:seed\npnpm dev',
        },
        { type: 'heading', text: 'Seeing the states that are hard to catch' },
        {
          type: 'paragraph',
          text: 'Loading and failure states are usually invisible on a fast local machine, so they can be turned on deliberately:',
        },
        {
          type: 'code',
          code: 'MOCK_LATENCY_MS=600 pnpm dev:mock     # every spinner, visible\nMOCK_FAIL=posts.create pnpm dev:mock  # every error path, on demand',
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'A production build refuses to start with the mock backend enabled unless it is explicitly allowed, so a demo build cannot quietly reach real users.',
        },
        { type: 'heading', text: 'Checking a deployment' },
        {
          type: 'list',
          items: [
            '/api/health reports whether the database is reachable, or mocked.',
            '/sitemap.xml lists every public page in every language.',
            '/robots.txt keeps crawlers out of the private areas.',
          ],
        },
      ],
    },
  ],
}
