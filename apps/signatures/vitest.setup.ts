import 'dotenv/config'

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL ?? 'file:./signatures.test.db'
process.env.PAYLOAD_SECRET = process.env.TEST_PAYLOAD_SECRET ?? 'test-payload-secret'
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3001'
process.env.NEXT_PUBLIC_PAYLOAD_URL ??= 'http://localhost:3001'
