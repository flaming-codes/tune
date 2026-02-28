'use client'

import React, { useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

interface MetricItem {
  id?: string | null
  value: number
  suffix?: string | null
  label: string
}

interface MetricsProps {
  content: {
    eyebrow?: string | null
    headline?: string | null
    description?: string | null
    items: MetricItem[]
    variant?: 'light' | 'dark' | null
  }
}

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string | null }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  })

  React.useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  const display = useTransform(spring, (current) => {
    if (Number.isInteger(value)) {
      return Math.round(current).toLocaleString('de-DE')
    }
    return current.toFixed(1).replace('.', ',')
  })

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

export function Metrics({ content }: MetricsProps) {
  const isDark = content.variant === 'dark'
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className={cn(
        'py-24 lg:py-36',
        isDark ? 'theme-bg-dark-section theme-text-white' : 'theme-bg-secondary',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {(content.eyebrow || content.headline || content.description) && (
          <div className="mb-16 lg:mb-20 max-w-2xl">
            {content.eyebrow && (
              <p
                className={cn(
                  'text-sm tracking-wide-custom uppercase mb-6',
                  isDark ? 'theme-text-muted-dark' : 'theme-text-tertiary',
                )}
              >
                {content.eyebrow}
              </p>
            )}
            {content.headline && (
              <h2
                className={cn(
                  'text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight',
                  content.description && 'mb-6',
                  isDark ? 'text-white' : 'theme-text-primary',
                )}
              >
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p
                className={cn(
                  'leading-relaxed',
                  isDark ? 'theme-text-muted-dark' : 'theme-text-secondary',
                )}
              >
                {content.description}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8 lg:gap-0',
            content.items.length === 2 && 'grid-cols-1 sm:grid-cols-2',
            content.items.length === 3 && 'grid-cols-1 sm:grid-cols-3',
            content.items.length >= 4 && 'grid-cols-2 sm:grid-cols-4',
          )}
        >
          {content.items.map((item, index) => (
            <motion.div
              key={item.id || index}
              className={cn(
                'relative py-8 lg:py-0',
                index !== 0 && 'lg:pl-8',
                index !== content.items.length - 1 && 'lg:pr-8',
              )}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Divider line between items on desktop */}
              {index !== 0 && (
                <motion.div
                  className={cn(
                    'hidden lg:block absolute left-0 top-0 bottom-0 w-px',
                    isDark ? 'bg-neutral-700' : 'theme-border-primary bg-[var(--border-primary)]',
                  )}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : undefined}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ transformOrigin: 'top' }}
                />
              )}

              <div className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight-custom mb-3">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </div>
              <p
                className={cn(
                  'text-sm lg:text-base',
                  isDark ? 'theme-text-muted-dark' : 'theme-text-secondary',
                )}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
