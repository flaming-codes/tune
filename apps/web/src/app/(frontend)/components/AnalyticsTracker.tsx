'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { trackPage } from '@/lib/analytics/client'

export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.toString()
    const route = query ? `${pathname}?${query}` : pathname

    trackPage({
      route,
      title: document.title,
    })
  }, [pathname, searchParams])

  return null
}
