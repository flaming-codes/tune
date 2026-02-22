import { describe, expect, it } from 'vitest'

import { normalizeAnalyticsEvent } from '@/lib/analytics/schema'

describe('analytics schema', () => {
  it('normalizes page events with defaults', () => {
    const result = normalizeAnalyticsEvent({
      eventType: 'page',
      path: '/homepage',
    })

    expect(result.eventName).toBe('page_view')
    expect(result.occurredAt).toBeDefined()
  })

  it('rejects track events without eventName', () => {
    expect(() =>
      normalizeAnalyticsEvent({
        eventType: 'track',
        path: '/homepage',
      }),
    ).toThrowError()
  })
})
