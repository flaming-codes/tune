import { z } from 'zod'

/**
 * Client-side environment variables schema
 * Must be prefixed with NEXT_PUBLIC_
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_PAYLOAD_URL: z.url().default('http://localhost:3000'),
})

/**
 * Validate and parse client-side environment variables
 */
function getClientEnv() {
  return clientSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  })
}

/**
 * Typed client-side environment variables
 * Safe to import in client components and frontend code
 */
export const envClient = getClientEnv()

/** Client environment variables type */
export type ClientEnv = z.infer<typeof clientSchema>
