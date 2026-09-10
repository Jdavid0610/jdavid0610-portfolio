import { relations, sql } from 'drizzle-orm'
import { boolean, index, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

/** Reference feature table: public (SEO) reads + authenticated writes. */
export const post = pgTable(
  'post',
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull(),
    /**
     * Content language. A post is written in one language; the blog shows the
     * visitor only the posts written in theirs, and hreflang advertises a
     * translation only where one actually exists.
     */
    locale: text({ enum: ['en', 'es'] })
      .notNull()
      .default('en'),
    title: text().notNull(),
    excerpt: text().notNull().default(''),
    content: text().notNull().default(''),
    published: boolean().notNull().default(false),
    publishedAt: timestamp(),
    authorId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index('post_author_id_idx').on(t.authorId),
    // Feed query: a locale's published posts, newest first.
    index('post_feed_idx').on(t.published, t.locale, sql`${t.publishedAt} DESC`),
    // Translations of one another share a slug, so it is unique *per locale*.
    uniqueIndex('post_slug_locale_idx').on(t.slug, t.locale),
  ],
)

export const postRelations = relations(post, ({ one }) => ({
  author: one(user, { fields: [post.authorId], references: [user.id] }),
}))
