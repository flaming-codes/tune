import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('creates normalized analytics page events', async () => {
    const created = await payload.create({
      collection: 'analytics-events',
      draft: false,
      data: {
        eventType: 'page',
        eventName: 'manual_page',
        path: '/test-page',
        occurredAt: new Date().toISOString(),
      },
    })

    expect(created.eventName).toBe('manual_page')
    expect(created.path).toBe('/test-page')
    expect(created.occurredAt).toBeDefined()
  })

  it('rejects invalid track events without eventName', async () => {
    await expect(
      payload.create({
        collection: 'analytics-events',
        draft: false,
        data: {
          eventType: 'track',
          eventName: '',
          path: '/test-page',
          occurredAt: new Date().toISOString(),
        },
      }),
    ).rejects.toThrowError()
  })
})
