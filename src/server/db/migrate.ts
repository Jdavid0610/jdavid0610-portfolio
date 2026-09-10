/**
 * Applies pending migrations. Used by `pnpm db:migrate` and by deploys
 * (`vercel-build` runs it before `next build`), so the same code path runs
 * locally and in CI.
 */
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

// Mock mode has no database by design; a deploy running on fixtures should
// still build rather than fail here.
if (process.env.NEXT_PUBLIC_MOCK_MODE === 'on') {
  console.log('Mock mode is on — skipping migrations.')
  process.exit(0)
}

// Without this the pool silently falls back to libpq defaults and tries
// localhost, which on a build server means a timeout instead of a clear error.
if (!connectionString) {
  console.error('Migration failed: DATABASE_URL is not set.')
  process.exit(1)
}

const pool = new Pool({ connectionString, max: 1 })

try {
  await migrate(drizzle(pool), { migrationsFolder: './drizzle' })
  console.log('Migrations applied.')
} catch (error) {
  console.error('Migration failed:', error)
  process.exitCode = 1
} finally {
  await pool.end()
}
