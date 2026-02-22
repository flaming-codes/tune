import type { WidgetServerProps } from 'payload'

import KPIWidgetCard from './KPIWidgetCard'
import { getAnalyticsRangeCounts } from '@/lib/analytics/dashboardStats'

export default async function TrackEventsWidget({ req }: WidgetServerProps) {
  const counts = await getAnalyticsRangeCounts(req.payload, 'track')

  return (
    <KPIWidgetCard
      title="Track Events"
      badge="track"
      metrics={[
        { label: 'Last 24h', value: counts.last24Hours },
        { label: 'Last 7 days', value: counts.last7Days },
        { label: 'This week', value: counts.thisWeek },
      ]}
    />
  )
}
