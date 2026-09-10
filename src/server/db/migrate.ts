/**
 * Applies pending migrations. Used by `pnpm db:migrate` and by deploys, so the
 * same code path runs locally and in CI.
 */
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 })

try {
  await migrate(drizzle(pool), { migrationsFolder: './drizzle' })
  console.log('Migrations applied.')
} catch (error) {
  console.error('Migration failed:', error)
  process.exitCode = 1
} finally {
  await pool.end()
}
