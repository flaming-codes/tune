'use client'

import React, { useRef, useSyncExternalStore } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface SplitRevealItem {
  id?: string | null
  title: string
  description: string
  image?: Media | number | null
}

interface SplitRevealProps {
  content: {
    eyebrow: string
    headline: string
    items: SplitRevealItem[]
  }
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

const SCROLL_STEP = 400

/**
 * Image that cross-fades in via clip-path when its item becomes active
 */
function RevealImage({
  media,
  index,
  totalItems,
  progress,
}: {
  media: Media
  index: number
  totalItems: number
  progress: MotionValue<number>
}) {
  const span = Math.max(totalItems - 1, 1)

  const clipProgress = useTransform(progress, (p) => {
    const activeIndex = p * span
    const distance = activeIndex - index
    // Fully visible when this is the active item
    if (distance >= -0.5 && distance <= 0.5) return 1
    // Partially visible during transition
    if (distance > -1.5 && distance < -0.5) return Math.max(0, (distance + 1.5))
    if (distance > 0.5 && distance < 1.5) return Math.max(0, 1 - (distance - 0.5))
    return 0
  })

  const clipPath = useTransform(
    clipProgress,
    (p) => `inset(${(1 - p) * 100}% 0 0 0)`,
  )

  const opacity = useTransform(clipProgress, [0, 0.3, 1], [0, 1, 1])

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath,
        opacity,
        zIndex: index,
      }}
    >
      <PayloadImage
        media={media}
        size="hero"
        fill
        className="object-cover"
        alt=""
      />
    </motion.div>
  )
}

/**
 * Text item that transitions opacity based on scroll position
 */
function RevealTextItem({
  item,
  index,
  totalItems,
  progress,
}: {
  item: SplitRevealItem
  index: number
  totalItems: number
  progress: MotionValue<number>
}) {
  const span = Math.max(totalItems - 1, 1)

  const opacity = useTransform(progress, (p) => {
    const activeIndex = p * span
    const distance = Math.abs(activeIndex - index)
    if (distance < 0.3) return 1
    if (distance < 1) return 0.25
    return 0.15
  })

  const y = useTransform(progress, (p) => {
    const activeIndex = p * span
    const distance = activeIndex - index
    return distance * -8
  })

  return (
    <motion.div
      className="py-12 lg:py-16 border-t theme-border-primary first:border-t-0"
      style={{ opacity, y }}
    >
      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight-custom theme-text-primary mb-4">
        {item.title}
      </h3>
      <p className="theme-text-secondary leading-relaxed max-w-md">{item.description}</p>
    </motion.div>
  )
}

function StaticSplitReveal({ content }: SplitRevealProps) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
        </div>
        <div className="space-y-12">
          {content.items.map((item, index) => {
            const media = isMedia(item.image) ? item.image : null
            return (
              <div key={item.id || index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {media && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PayloadImage media={media} size="hero" fill className="object-cover" alt="" />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight-custom mb-4">
                    {item.title}
                  </h3>
                  <p className="theme-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const emptySubscribe = () => () => {}

interface AnimatedSplitRevealProps extends SplitRevealProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

function AnimatedSplitReveal({ content, sectionRef }: AnimatedSplitRevealProps) {
  const scrollPx = content.items.length * SCROLL_STEP

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${scrollPx}px)` }}
    >
      <div className="sticky top-0 h-screen">
        <div className="h-full max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="pt-20 lg:pt-28 mb-8 lg:mb-12">
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-4">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
              {content.headline}
            </h2>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-[calc(100vh-200px)] lg:h-[calc(100vh-220px)]">
            {/* Left: Pinned image */}
            <div className="relative overflow-hidden hidden lg:block">
              {content.items.map((item, index) => {
                const media = isMedia(item.image) ? item.image : null
                if (!media) return null
                return (
                  <RevealImage
                    key={item.id || index}
                    media={media}
                    index={index}
                    totalItems={content.items.length}
                    progress={scrollYProgress}
                  />
                )
              })}
              {/* First image as fallback base layer */}
              {(() => {
                const firstMedia = isMedia(content.items[0]?.image) ? content.items[0].image as Media : null
                if (!firstMedia) return null
                return (
                  <div className="absolute inset-0" style={{ zIndex: -1 }}>
                    <PayloadImage media={firstMedia} size="hero" fill className="object-cover" alt="" />
                  </div>
                )
              })()}
            </div>

            {/* Right: Scrolling text items */}
            <div className="flex flex-col justify-center overflow-hidden">
              {content.items.map((item, index) => (
                <RevealTextItem
                  key={item.id || index}
                  item={item}
                  index={index}
                  totalItems={content.items.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SplitReveal({ content }: SplitRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  // Return static version during SSR to prevent hydration mismatch
  if (content.items.length < 2 || !mounted || prefersReducedMotion) {
    return <StaticSplitReveal content={content} />
  }

  return <AnimatedSplitReveal content={content} sectionRef={sectionRef} />
}
