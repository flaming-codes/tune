import { getPayload } from 'payload'

import config from '@/payload.config'
import { seed } from './index'
import { envServer } from '@/env/server'

async function run() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const overwrite = envServer.PAYLOAD_SEED_OVERWRITE === 'true'

  await seed(payload, overwrite)
  payload.logger.info(`Seed abgeschlossen (overwrite=${overwrite})`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
