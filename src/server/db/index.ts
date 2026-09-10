import 'server-only'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/server/env'
import * as schema from './schema'

/**
 * One pool per process. Next's dev server re-evaluates modules on every HMR
 * pass, so the instance is cached on globalThis to avoid leaking connections.
 */
const globalForDb = globalThis as unknown as { __pool?: Pool }

/**
 * In mock mode there is no database and `DATABASE_URL` is unset. The pool is
 * still constructed (it connects lazily, so this costs nothing) with an
 * unroutable address: any query that slips past the mock repositories fails
 * loudly instead of silently reaching a real server.
 */
const connectionString = env.DATABASE_URL ?? 'postgresql://mock:mock@127.0.0.1:1/unused'

const pool = globalForDb.__pool ?? new Pool({ connectionString, max: 10 })
if (env.NODE_ENV !== 'production') globalForDb.__pool = pool

export const db = drizzle(pool, { schema, casing: 'snake_case' })
export { schema }
export type Database = typeof db
