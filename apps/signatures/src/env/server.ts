import { z } from 'zod'

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
})

function getServerEnv() {
  return serverSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  })
}

export const envServer = getServerEnv()

export type ServerEnv = z.infer<typeof serverSchema>
