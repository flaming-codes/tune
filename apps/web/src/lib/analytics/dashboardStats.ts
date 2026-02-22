import { startOfWeek, subDays, subHours } from 'date-fns'

type CountResult = {
  totalDocs: number
}

type PayloadLike = {
  count: (...args: any[]) => Promise<CountResult>
  find?: (...args: any[]) => Promise<any>
}

type AnalyticsEventType = 'page' | 'track' | 'identify'

type RangeCounts = {
  last24Hours: number
  last7Days: number
  thisWeek: number
}

type TopPageEntry = {
  path: string
  views: number
}

type TopPagesResult = {
  last24Hours: TopPageEntry[]
  last7Days: TopPageEntry[]
}

function createSinceDates(now = new Date()) {
  return {
    last24Hours: subHours(now, 24).toISOString(),
    last7Days: subDays(now, 7).toISOString(),
    thisWeek: startOfWeek(now, { weekStartsOn: 1 }).toISOString(),
  }
}

function buildWhere(sinceISO: string, eventType?: AnalyticsEventType) {
  const occurredAtFilter = {
    occurredAt: {
      greater_than_equal: sinceISO,
    },
  }

  if (!eventType) return occurredAtFilter

  return {
    and: [occurredAtFilter, { eventType: { equals: eventType } }],
  }
}

export async function getAnalyticsRangeCounts(
  payload: PayloadLike,
  eventType?: AnalyticsEventType,
): Promise<RangeCounts> {
  const sinceDates = createSinceDates()

  const [last24Hours, last7Days, thisWeek] = await Promise.all([
    payload.count({
      collection: 'analytics-events',
      where: buildWhere(sinceDates.last24Hours, eventType),
    }),
    payload.count({
      collection: 'analytics-events',
      where: buildWhere(sinceDates.last7Days, eventType),
    }),
    payload.count({
      collection: 'analytics-events',
      where: buildWhere(sinceDates.thisWeek, eventType),
    }),
  ])

  return {
    last24Hours: last24Hours.totalDocs,
    last7Days: last7Days.totalDocs,
    thisWeek: thisWeek.totalDocs,
  }
}

function aggregateTopPages(events: Array<{ path?: unknown }>, take: number): TopPageEntry[] {
  const byPath = new Map<string, number>()

  for (const event of events) {
    const rawPath = event.path
    if (typeof rawPath !== 'string') continue

    const path = rawPath.trim()
    if (!path) continue

    byPath.set(path, (byPath.get(path) ?? 0) + 1)
  }

  return Array.from(byPath.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, take)
    .map(([path, views]) => ({ path, views }))
}

async function fetchPageEventsSince(payload: PayloadLike, sinceISO: string) {
  if (!payload.find) return []

  const events: Array<{ path?: unknown }> = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection: 'analytics-events',
      depth: 0,
      limit: 200,
      page,
      pagination: true,
      where: {
        and: [{ eventType: { equals: 'page' } }, { occurredAt: { greater_than_equal: sinceISO } }],
      },
    })

    events.push(...result.docs)

    hasNextPage = Boolean(result.hasNextPage)
    page = result.nextPage ?? page + 1
  }

  return events
}

export async function getTopViewedPages(payload: PayloadLike, take = 5): Promise<TopPagesResult> {
  const sinceDates = createSinceDates()

  const [events24h, events7d] = await Promise.all([
    fetchPageEventsSince(payload, sinceDates.last24Hours),
    fetchPageEventsSince(payload, sinceDates.last7Days),
  ])

  return {
    last24Hours: aggregateTopPages(events24h, take),
    last7Days: aggregateTopPages(events7d, take),
  }
}
