import 'server-only'

import { z } from 'zod'

/**
 * Server-side environment variables schema
 * These are only available on the server
 */
const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  PAYLOAD_SEED: z.enum(['true', 'false']).optional(),
  PAYLOAD_SEED_OVERWRITE: z.enum(['true', 'false']).optional(),
})

/**
 * Validate and parse server-side environment variables
 * Only safe to import in server-side code (API routes, server components, config files, etc.)
 */
function getServerEnv() {
  return serverSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_SEED: process.env.PAYLOAD_SEED,
    PAYLOAD_SEED_OVERWRITE: process.env.PAYLOAD_SEED_OVERWRITE,
  })
}

/**
 * Typed server-side environment variables
 * Only use this in server-side code (API routes, server components, config files, etc.)
 *
 * Importing this in client code will throw a build-time error thanks to 'server-only'
 */
export const envServer = getServerEnv()

/** Server environment variables type */
export type ServerEnv = z.infer<typeof serverSchema>
