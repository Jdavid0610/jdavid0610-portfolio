/**
 * Seeds a local database with two accounts and a few posts.
 *
 * Accounts are created through Better Auth rather than raw inserts so the
 * password hashing and account rows match exactly what sign-up produces.
 *
 *   pnpm db:seed
 */
import 'dotenv/config'
import { and, eq } from 'drizzle-orm'
import { auth } from './../auth/config'
import { db } from './index'
import { post, user } from './schema'

const ACCOUNTS = [
  { name: 'Ada Admin', email: 'admin@example.com', password: 'password123', role: 'admin' as const },
  { name: 'Uma User', email: 'user@example.com', password: 'password123', role: 'user' as const },
]

/**
 * `slug` is shared between the translations of one post — that pairing is what
 * makes hreflang work, and the (slug, locale) unique index enforces it.
 */
const POSTS = [
  {
    slug: 'rendering-on-the-server-is-a-feature',
    locale: 'en' as const,
    title: 'Rendering on the server is a feature, not a constraint',
    excerpt: 'Why every public page in this template ships HTML before it ships JavaScript.',
    published: true,
  },
  {
    slug: 'rendering-on-the-server-is-a-feature',
    locale: 'es' as const,
    title: 'Renderizar en el servidor es una ventaja, no una limitación',
    excerpt: 'Por qué cada página pública de esta plantilla entrega HTML antes que JavaScript.',
    published: true,
  },
  {
    slug: 'where-authorization-actually-belongs',
    locale: 'en' as const,
    title: 'Where authorization actually belongs',
    excerpt: 'A cookie check in the proxy is UX. The data access layer is security.',
    published: true,
  },
  {
    slug: 'where-authorization-actually-belongs',
    locale: 'es' as const,
    title: 'Dónde va realmente la autorización',
    excerpt: 'Revisar una cookie en el proxy es UX. La capa de acceso a datos es seguridad.',
    published: true,
  },
  {
    slug: 'draft-things-i-have-not-finished',
    locale: 'en' as const,
    title: 'Draft: things I have not finished thinking about',
    excerpt: '',
    published: false,
  },
]

async function ensureUser(account: (typeof ACCOUNTS)[number]): Promise<string> {
  const existing = await db.query.user.findFirst({ where: eq(user.email, account.email) })
  if (existing) return existing.id

  await auth.api.signUpEmail({
    body: { name: account.name, email: account.email, password: account.password },
  })

  const created = await db.query.user.findFirst({ where: eq(user.email, account.email) })
  if (!created) throw new Error(`Failed to create ${account.email}`)

  // `role` is `input: false`, so it can only be set server-side, like this.
  if (account.role !== created.role) {
    await db.update(user).set({ role: account.role }).where(eq(user.id, created.id))
  }
  return created.id
}

async function main() {
  console.log('Seeding…')

  const [adminId] = await Promise.all(ACCOUNTS.map(ensureUser))
  if (!adminId) throw new Error('No admin id')

  for (const item of POSTS) {
    const existing = await db.query.post.findFirst({
      where: and(eq(post.slug, item.slug), eq(post.locale, item.locale)),
    })
    if (existing) continue

    const note =
      item.locale === 'es'
        ? 'Esta publicación la creó el script de datos de ejemplo. Edítala o elimínala desde el panel.'
        : 'This post was created by the seed script. Edit or delete it from the dashboard.'

    await db.insert(post).values({
      ...item,
      content: `${item.excerpt}\n\n${note}`,
      authorId: adminId,
      publishedAt: item.published ? new Date() : null,
    })
  }

  console.log('Done. Sign in with admin@example.com / password123')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
