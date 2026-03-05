'use client'

import React, { useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform, animate } from 'motion/react'
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
  const handleRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [sliderPosition, setSliderPosition] = useState(50)
  const position = useMotionValue(50) // percentage

  const beforeMedia = isMedia(pair.beforeImage) ? pair.beforeImage : null
  const afterMedia = isMedia(pair.afterImage) ? pair.afterImage : null

  // Update position from pointer/mouse event
  const updatePositionFromEvent = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
      position.set(newPosition)
      setSliderPosition(newPosition)
    },
    [position],
  )

  // Mouse/Touch handlers for container
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only respond to primary pointer (left mouse button, touch)
      if (e.button !== 0 && e.pointerType === 'mouse') return

      e.preventDefault()
      containerRef.current?.setPointerCapture(e.pointerId)
      updatePositionFromEvent(e.clientX)
    },
    [updatePositionFromEvent],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!containerRef.current?.hasPointerCapture(e.pointerId)) return
      updatePositionFromEvent(e.clientX)
    },
    [updatePositionFromEvent],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (containerRef.current?.hasPointerCapture(e.pointerId)) {
        containerRef.current.releasePointerCapture(e.pointerId)
      }
    },
    [],
  )

  // Drag handlers for the handle
  const handleDrag = useCallback(
    (_: unknown, info: { delta: { x: number } }) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const deltaPercent = (info.delta.x / rect.width) * 100
      const currentPos = position.get()
      const newPosition = Math.max(0, Math.min(100, currentPos + deltaPercent))
      position.set(newPosition)
      setSliderPosition(newPosition)
    },
    [position],
  )

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = 5
      const currentPos = position.get()
      let newPosition = currentPos

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newPosition = Math.max(0, currentPos - step)
          break
        case 'ArrowRight':
        case 'ArrowUp':
          newPosition = Math.min(100, currentPos + step)
          break
        case 'Home':
          newPosition = 0
          break
        case 'End':
          newPosition = 100
          break
        default:
          return
      }

      e.preventDefault()
      animate(position, newPosition, {
        type: 'tween',
        duration: 0.2,
        onUpdate: (v) => setSliderPosition(v),
      })
    },
    [position],
  )

  const clipPath = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`)
  const handleX = useTransform(position, (p) => `${p}%`)

  if (!beforeMedia || !afterMedia) return null

  // Reduced motion: side-by-side static
  if (prefersReducedMotion) {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden">
            <PayloadImage
              media={beforeMedia}
              size="card"
              fill
              className="object-cover"
              alt={pair.beforeLabel || 'Vorher'}
            />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 px-2 py-1">
              {pair.beforeLabel || 'Vorher'}
            </span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <PayloadImage
              media={afterMedia}
              size="card"
              fill
              className="object-cover"
              alt={pair.afterLabel || 'Nachher'}
            />
            <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 px-2 py-1">
              {pair.afterLabel || 'Nachher'}
            </span>
          </div>
        </div>
        {pair.caption && <p className="text-sm theme-text-secondary">{pair.caption}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Vorher-Nachher-Vergleich"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% Vorher, ${Math.round(100 - sliderPosition)}% Nachher`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
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

        {/* Divider line and handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-white/80"
          style={{ left: handleX }}
        >
          {/* Draggable handle */}
          <motion.div
            ref={handleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            tabIndex={-1}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 0.95 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 px-2 py-1 pointer-events-none">
          {pair.beforeLabel || 'Vorher'}
        </span>
        <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 px-2 py-1 pointer-events-none">
          {pair.afterLabel || 'Nachher'}
        </span>
      </div>

      {pair.caption && <p className="text-sm theme-text-secondary">{pair.caption}</p>}
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
            content.pairs.length === 1 ? 'max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-2',
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
