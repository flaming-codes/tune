'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface ComparisonPair {
  id?: string | null
  beforeImage: Media | number
  afterImage: Media | number
  beforeLabel?: string | null
  afterLabel?: string | null
  caption?: string | null
}

interface BeforeAfterProps {
  content: {
    eyebrow?: string | null
    headline?: string | null
    description?: string | null
    pairs: ComparisonPair[]
  }
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

function ComparisonSlider({ pair }: { pair: ComparisonPair }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const position = useMotionValue(50) // percentage
  const isDragging = useRef(false)

  const beforeMedia = isMedia(pair.beforeImage) ? pair.beforeImage : null
  const afterMedia = isMedia(pair.afterImage) ? pair.afterImage : null

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        position.set(Math.max(0, Math.min(100, (x / rect.width) * 100)))
      }
    },
    [position],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      position.set(Math.max(0, Math.min(100, (x / rect.width) * 100)))
    },
    [position],
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const clipPath = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`)
  const handleX = useTransform(position, (p) => `${p}%`)

  if (!beforeMedia || !afterMedia) return null

  // Reduced motion: side-by-side static
  if (prefersReducedMotion) {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden">
            <PayloadImage media={beforeMedia} size="card" fill className="object-cover" alt={pair.beforeLabel || 'Vorher'} />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 px-2 py-1">
              {pair.beforeLabel || 'Vorher'}
            </span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <PayloadImage media={afterMedia} size="card" fill className="object-cover" alt={pair.afterLabel || 'Nachher'} />
            <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 px-2 py-1">
              {pair.afterLabel || 'Nachher'}
            </span>
          </div>
        </div>
        {pair.caption && (
          <p className="text-sm theme-text-secondary">{pair.caption}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Vorher-Nachher-Vergleich"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
      >
        {/* After image (base layer) */}
        <div className="absolute inset-0">
          <PayloadImage
            media={afterMedia}
            size="hero"
            fill
            className="object-cover"
            alt={pair.afterLabel || 'Nachher'}
          />
        </div>

        {/* Before image (clipped layer) */}
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <PayloadImage
            media={beforeMedia}
            size="hero"
            fill
            className="object-cover"
            alt={pair.beforeLabel || 'Vorher'}
          />
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
          style={{ left: handleX }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="theme-text-primary"
            >
              <path
                d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 px-2 py-1 pointer-events-none">
          {pair.beforeLabel || 'Vorher'}
        </span>
        <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 px-2 py-1 pointer-events-none">
          {pair.afterLabel || 'Nachher'}
        </span>
      </div>

      {pair.caption && (
        <p className="text-sm theme-text-secondary">{pair.caption}</p>
      )}
    </div>
  )
}

export function BeforeAfter({ content }: BeforeAfterProps) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {(content.eyebrow || content.headline || content.description) && (
          <div className="max-w-2xl mb-16 lg:mb-20">
            {content.eyebrow && (
              <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
                {content.eyebrow}
              </p>
            )}
            {content.headline && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-6">
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p className="theme-text-secondary leading-relaxed">{content.description}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8 lg:gap-12',
            content.pairs.length === 1
              ? 'max-w-4xl mx-auto'
              : 'grid-cols-1 lg:grid-cols-2',
          )}
        >
          {content.pairs.map((pair, index) => (
            <ComparisonSlider key={pair.id || index} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}
