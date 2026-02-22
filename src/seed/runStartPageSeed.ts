import { getPayload } from 'payload'

import config from '@/payload.config'
import { seedStartPage } from './startPage'

async function run() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const overwrite = process.env.PAYLOAD_SEED_OVERWRITE === 'true'

  await seedStartPage(payload, overwrite)
  payload.logger.info(`Startseite geseedet (overwrite=${overwrite})`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
