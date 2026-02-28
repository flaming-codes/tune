'use client'

import React, { useRef, useSyncExternalStore } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface TimelineEvent {
  id?: string | null
  year: string
  title: string
  description?: string | null
  image?: Media | number | null
}

interface TimelineProps {
  content: {
    eyebrow: string
    headline: string
    events: TimelineEvent[]
  }
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

const emptySubscribe = () => () => {}

function TimelineEventCard({
  event,
  isLeft,
}: {
  event: TimelineEvent
  index: number
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()
  const imageMedia = isMedia(event.image) ? event.image : null

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8',
      )}
      initial={prefersReducedMotion ? undefined : { opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Left content (or empty on right-side events) */}
      <div
        className={cn(
          'lg:text-right',
          !isLeft && 'lg:order-1 hidden lg:block',
          isLeft && 'lg:order-1',
        )}
      >
        {isLeft ? (
          <EventContent event={event} imageMedia={imageMedia} />
        ) : (
          <div className="hidden lg:block" />
        )}
      </div>

      {/* Center marker */}
      <div className="hidden lg:flex lg:order-2 flex-col items-center relative">
        <motion.div
          className={cn(
            'w-3 h-3 rounded-full border-2 z-10',
            'border-[var(--text-primary)] theme-bg-primary',
          )}
          initial={prefersReducedMotion ? undefined : { scale: 0 }}
          animate={isInView ? { scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </div>

      {/* Right content (or empty on left-side events) */}
      <div
        className={cn(
          !isLeft && 'lg:order-3',
          isLeft && 'lg:order-3 hidden lg:block',
        )}
      >
        {!isLeft ? (
          <EventContent event={event} imageMedia={imageMedia} />
        ) : (
          <div className="hidden lg:block" />
        )}
      </div>

      {/* Mobile: always show content below (lg hidden) */}
      {isLeft && (
        <div className="lg:hidden col-span-1">
          {/* Already shown in left column on mobile since it's grid-cols-1 */}
        </div>
      )}
    </motion.div>
  )
}

function EventContent({
  event,
  imageMedia,
}: {
  event: TimelineEvent
  imageMedia: Media | null
}) {
  return (
    <div className="pb-12 lg:pb-16">
      <span className="text-sm tabular-nums font-medium theme-text-muted mb-2 block">
        {event.year}
      </span>
      <h3 className="text-xl sm:text-2xl font-medium tracking-tight-custom theme-text-primary mb-3">
        {event.title}
      </h3>
      {event.description && (
        <p className="theme-text-secondary leading-relaxed mb-4">{event.description}</p>
      )}
      {imageMedia && (
        <div className="relative aspect-[16/10] overflow-hidden mt-4">
          <PayloadImage
            media={imageMedia}
            size="card"
            fill
            className="object-cover"
            alt={event.title}
          />
        </div>
      )}
    </div>
  )
}

function StaticTimeline({ content }: TimelineProps) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative w-px h-full theme-border-primary bg-[var(--border-primary)]" />
          </div>
          <div className="lg:hidden absolute left-0 top-0 bottom-0">
            <div className="relative w-px h-full theme-border-primary bg-[var(--border-primary)]" />
          </div>
          <div className="pl-8 lg:pl-0">
            {content.events.map((event, index) => (
              <TimelineEventCard
                key={event.id || index}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface AnimatedTimelineProps extends TimelineProps {
  sectionRef: React.RefObject<HTMLElement | null>
}

function AnimatedTimeline({ content, sectionRef }: AnimatedTimelineProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative w-px h-full theme-border-primary bg-[var(--border-primary)]">
              <motion.div
                className="absolute inset-x-0 top-0 bg-[var(--text-primary)] origin-top"
                style={{ scaleY: lineScaleY, height: '100%', width: '1px' }}
              />
            </div>
          </div>

          {/* Left line (mobile only) */}
          <div className="lg:hidden absolute left-0 top-0 bottom-0">
            <div className="relative w-px h-full theme-border-primary bg-[var(--border-primary)]">
              <motion.div
                className="absolute inset-x-0 top-0 bg-[var(--text-primary)] origin-top"
                style={{ scaleY: lineScaleY, height: '100%', width: '1px' }}
              />
            </div>
          </div>

          {/* Events */}
          <div className="pl-8 lg:pl-0">
            {content.events.map((event, index) => (
              <TimelineEventCard
                key={event.id || index}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Timeline({ content }: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  // Return static version during SSR to prevent hydration mismatch
  if (!mounted) {
    return <StaticTimeline content={content} />
  }

  return <AnimatedTimeline content={content} sectionRef={sectionRef} />
}
