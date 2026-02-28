'use client'

import React, { useRef, useSyncExternalStore } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface StepItem {
  id?: string | null
  title: string
  description: string
  icon?: Media | number | null
}

interface StackingCardsProps {
  content: {
    eyebrow: string
    headline: string
    description?: string | null
    steps: StepItem[]
  }
}

const SCROLL_STEP = 300

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

function StackingCard({
  step,
  index,
  totalSteps,
  progress,
}: {
  step: StepItem
  index: number
  totalSteps: number
  progress: MotionValue<number>
}) {
  const span = Math.max(totalSteps - 1, 1)

  // Each card has a range where it enters, holds, then gets pushed back
  const cardStart = index / totalSteps
  const cardEnd = (index + 1) / totalSteps

  const y = useTransform(progress, [cardStart, cardEnd], [100, 0])
  const scale = useTransform(progress, (p) => {
    // Cards above the current one scale down
    const cardProgress = p * span - index
    if (cardProgress > 1) {
      return Math.max(0.92, 1 - (cardProgress - 1) * 0.03)
    }
    return 1
  })
  const opacity = useTransform(progress, (p) => {
    const cardProgress = p * span - index
    if (cardProgress > 2) {
      return Math.max(0, 1 - (cardProgress - 2) * 0.5)
    }
    return cardProgress < -0.2 ? 0 : 1
  })

  const iconMedia = isMedia(step.icon) ? step.icon : null

  return (
    <motion.div
      className="absolute inset-x-0 mx-auto w-full max-w-3xl px-6 lg:px-0"
      style={{
        y,
        scale,
        opacity,
        zIndex: index,
        transformOrigin: 'top center',
      }}
    >
      <div
        className={cn(
          'theme-bg-primary p-8 sm:p-10 lg:p-12',
          'border theme-border-primary',
          'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
        )}
      >
        <div className="flex items-start gap-6">
          {iconMedia && (
            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative">
              <PayloadImage
                media={iconMedia}
                size="thumbnail"
                fill
                className="object-contain"
                alt=""
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-sm tabular-nums theme-text-muted font-medium">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight-custom theme-text-primary">
                {step.title}
              </h3>
            </div>
            <p className="theme-text-secondary leading-relaxed">{step.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StaticCards({ content }: StackingCardsProps) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-6">
            {content.headline}
          </h2>
          {content.description && (
            <p className="theme-text-secondary leading-relaxed">{content.description}</p>
          )}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {content.steps.map((step, index) => {
            const iconMedia = isMedia(step.icon) ? step.icon : null
            return (
              <div
                key={step.id || index}
                className="p-8 sm:p-10 lg:p-12 border theme-border-primary"
              >
                <div className="flex items-start gap-6">
                  {iconMedia && (
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative">
                      <PayloadImage
                        media={iconMedia}
                        size="thumbnail"
                        fill
                        className="object-contain"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-sm tabular-nums theme-text-muted font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight-custom theme-text-primary">
                        {step.title}
                      </h3>
                    </div>
                    <p className="theme-text-secondary leading-relaxed">{step.description}</p>
                  </div>
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

interface AnimatedStackingCardsProps extends StackingCardsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

function AnimatedStackingCards({ content, sectionRef }: AnimatedStackingCardsProps) {
  const scrollPx = content.steps.length * SCROLL_STEP

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
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 lg:pt-36">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-6 theme-text-secondary leading-relaxed">{content.description}</p>
            )}
          </div>
        </div>

        {/* Cards container */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            {content.steps.map((step, index) => (
              <StackingCard
                key={step.id || index}
                step={step}
                index={index}
                totalSteps={content.steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function StackingCards({ content }: StackingCardsProps) {
  const prefersReducedMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  // Return static version during SSR to prevent hydration mismatch
  if (content.steps.length < 2 || !mounted || prefersReducedMotion) {
    return <StaticCards content={content} />
  }

  return <AnimatedStackingCards content={content} sectionRef={sectionRef} />
}
