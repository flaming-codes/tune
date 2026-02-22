'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px] bg-neutral-100 animate-pulse" />,
})

export function MapLoader() {
  return <Map />
}
