import { z } from 'zod'

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3001'),
  NEXT_PUBLIC_PAYLOAD_URL: z.url().default('http://localhost:3001'),
})

function getClientEnv() {
  return clientSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  })
}

export const envClient = getClientEnv()

export type ClientEnv = z.infer<typeof clientSchema>
