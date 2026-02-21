'use client'

import React from 'react'
import { GalleryTicker } from './gallery/GalleryTicker'
import type { GalleryImage } from '@/payload-types'

interface GalleryProps {
  images: GalleryImage[]
}

/**
 * Gallery Section Component
 * 
 * Renders an infinite scrolling ticker gallery that extends edge-to-edge.
 * Features:
 * - Full viewport width overflow (items extend to screen edges)
 * - Seamless infinite loop animation
 * - Dual rows scrolling in opposite directions
 * - Pause on hover with smooth spring transitions
 * - Scroll velocity affects animation speed
 * - Gradient fade masks at edges
 */
export function Gallery({ images }: GalleryProps) {
  return <GalleryTicker images={images} />
}
