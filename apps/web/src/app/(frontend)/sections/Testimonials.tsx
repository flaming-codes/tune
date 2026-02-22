'use client'

import React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Testimonial } from '@/payload-types'
import { FeaturedReviewHero, FloatingReviewItem } from './testimonials/ReviewItems'

interface TestimonialsProps {
  content: {
    eyebrow: string
    headline: string
    description: string
    googleReviewUrl: string
    reviewCount: number
  }
  testimonials: Testimonial[]
}

interface FloatingReviewState {
  reviewIndex: number
  left: number
  top: number
  rotate: number
  scale: number
  zIndex: number
  cycle: number
  visible: boolean
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1))
}

function getSlotCount(width: number): number {
  if (width < 640) return 5
  if (width < 1024) return 8
  return 12
}

function createState(totalReviews: number, cycle: number): FloatingReviewState {
  return {
    reviewIndex: randomInt(0, Math.max(0, totalReviews - 1)),
    left: randomBetween(8, 92),
    top: randomBetween(10, 90),
    rotate: randomBetween(-8, 8),
    scale: randomBetween(0.9, 1.08),
    zIndex: randomInt(1, 30),
    cycle,
    visible: true,
  }
}

function FloatingReviewCard({
  slotId,
  testimonials,
  active,
  reduceMotion,
}: {
  slotId: number
  testimonials: Testimonial[]
  active: boolean
  reduceMotion: boolean
}) {
  const timerRef = React.useRef<number | null>(null)
  const [state, setState] = React.useState<FloatingReviewState>(() =>
    createState(testimonials.length, slotId),
  )

  const clearTimer = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const runCycle = React.useCallback(
    function runCycleInternal() {
      setState((previous) => createState(testimonials.length, previous.cycle + 1))

      const visibleFor = reduceMotion ? 4200 : randomInt(3800, 7600)
      timerRef.current = window.setTimeout(() => {
        setState((previous) => ({ ...previous, visible: false }))

        const hiddenFor = reduceMotion ? 900 : randomInt(500, 2400)
        timerRef.current = window.setTimeout(() => {
          runCycleInternal()
        }, hiddenFor)
      }, visibleFor)
    },
    [reduceMotion, testimonials.length],
  )

  React.useEffect(() => {
    clearTimer()

    if (!active || testimonials.length === 0) {
      setState((previous) => ({ ...previous, visible: false }))
      return
    }

    const initialDelay = reduceMotion ? 80 * slotId : randomInt(0, 1200)
    timerRef.current = window.setTimeout(() => {
      runCycle()
    }, initialDelay)

    return clearTimer
  }, [active, clearTimer, reduceMotion, runCycle, slotId, testimonials.length])

  if (testimonials.length === 0) return null

  const testimonial = testimonials[state.reviewIndex]
  const truncatedText =
    testimonial.text.length > 140 ? `${testimonial.text.slice(0, 140).trim()}…` : testimonial.text

  return (
    <AnimatePresence>
      {active && state.visible && (
        <motion.blockquote
          key={`${slotId}-${state.cycle}`}
          className="absolute cursor-default pointer-events-none"
          style={{
            left: `${state.left}%`,
            top: `${state.top}%`,
            zIndex: state.zIndex,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: state.scale * 0.84, rotate: state.rotate - 6 }}
          animate={{ opacity: 1, scale: state.scale, rotate: state.rotate }}
          exit={{ opacity: 0, scale: state.scale * 0.88, rotate: state.rotate + 5 }}
        >
          <FloatingReviewItem
            testimonial={testimonial}
            truncatedText={truncatedText}
            reduceMotion={reduceMotion}
          />
        </motion.blockquote>
      )}
    </AnimatePresence>
  )
}

export function Testimonials({ content, testimonials }: TestimonialsProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  const [slotCount, setSlotCount] = React.useState(12)
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    const updateActiveState = () => {
      const section = sectionRef.current
      if (!section) {
        setIsActive(false)
        return
      }

      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionBottom = sectionTop + rect.height
      const viewportCenter = window.scrollY + window.innerHeight / 2

      setIsActive(viewportCenter >= sectionTop && viewportCenter <= sectionBottom)
    }

    updateActiveState()

    window.addEventListener('scroll', updateActiveState, { passive: true })
    window.addEventListener('resize', updateActiveState)

    return () => {
      window.removeEventListener('scroll', updateActiveState)
      window.removeEventListener('resize', updateActiveState)
    }
  }, [])

  React.useEffect(() => {
    const updateSlotCount = () => {
      setSlotCount(getSlotCount(window.innerWidth))
    }

    updateSlotCount()
    window.addEventListener('resize', updateSlotCount)
    return () => window.removeEventListener('resize', updateSlotCount)
  }, [])

  const slots = React.useMemo(
    () => Array.from({ length: slotCount }, (_, index) => index),
    [slotCount],
  )

  const highRated = testimonials
    .filter((item) => item.rating >= 4.7)
    .sort((a, b) => b.rating - a.rating)

  const featuredReviews =
    highRated.length >= 3
      ? highRated.slice(0, 3)
      : [...testimonials]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, Math.min(3, testimonials.length))

  const formatDate = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat('de-AT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
          <p className="mt-6 theme-text-secondary leading-relaxed">{content.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="theme-text-secondary">{content.reviewCount} Google-Bewertungen</p>
            <a
              href={content.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium theme-button-primary"
            >
              Bewertung schreiben
            </a>
          </div>
        </div>

        <div className="h-24 sm:h-28 lg:h-36">
          {testimonials.length === 0 ? (
            <div className="h-full flex items-center justify-center px-6 text-center">
              <p className="theme-text-secondary">Aktuell sind noch keine Bewertungen verfügbar.</p>
            </div>
          ) : null}
        </div>

        {featuredReviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-6 lg:mt-10">
            {featuredReviews.map((review) => (
              <FeaturedReviewHero key={review.id} testimonial={review} formatDate={formatDate} />
            ))}
          </div>
        ) : null}

        {testimonials.length > 0 ? (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {slots.map((slotId) => (
              <FloatingReviewCard
                key={slotId}
                slotId={slotId}
                testimonials={testimonials}
                active={isActive}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
