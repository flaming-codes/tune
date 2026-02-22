import { describe, expect, it, vi } from 'vitest'

import { getAnalyticsRangeCounts, getTopViewedPages } from '@/lib/analytics/dashboardStats'

describe('analytics dashboard stats', () => {
  it('aggregates counts across all date buckets', async () => {
    const count = vi
      .fn()
      .mockResolvedValueOnce({ totalDocs: 3 })
      .mockResolvedValueOnce({ totalDocs: 9 })
      .mockResolvedValueOnce({ totalDocs: 5 })

    const result = await getAnalyticsRangeCounts({ count })

    expect(result).toEqual({
      last24Hours: 3,
      last7Days: 9,
      thisWeek: 5,
    })
    expect(count).toHaveBeenCalledTimes(3)
  })

  it('includes eventType filtering when provided', async () => {
    const count = vi
      .fn()
      .mockResolvedValueOnce({ totalDocs: 1 })
      .mockResolvedValueOnce({ totalDocs: 2 })
      .mockResolvedValueOnce({ totalDocs: 4 })

    await getAnalyticsRangeCounts({ count }, 'page')

    const firstCall = count.mock.calls[0]?.[0]
    expect(firstCall.where).toHaveProperty('and')
  })

  it('aggregates top viewed pages sorted by views', async () => {
    const find = vi
      .fn()
      .mockResolvedValueOnce({
        docs: [{ path: '/' }, { path: '/about' }, { path: '/' }],
        hasNextPage: false,
        nextPage: null,
      })
      .mockResolvedValueOnce({
        docs: [{ path: '/about' }, { path: '/about' }, { path: '/' }, { path: '/services' }],
        hasNextPage: false,
        nextPage: null,
      })

    const result = await getTopViewedPages({ count: vi.fn(), find }, 3)

    expect(result.last24Hours[0]).toEqual({ path: '/', views: 2 })
    expect(result.last7Days[0]).toEqual({ path: '/about', views: 2 })
    expect(find).toHaveBeenCalledTimes(2)
  })
})
