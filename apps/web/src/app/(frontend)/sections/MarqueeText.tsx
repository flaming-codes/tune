'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

interface MarqueeTextProps {
  content: {
    text: string
    separator?: 'dot' | 'diamond' | 'paw' | 'none' | null
    style?: 'filled' | 'outlined' | 'alternating' | null
    speed?: 'slow' | 'normal' | 'fast' | null
    direction?: 'left' | 'right' | null
  }
}

const SPEED_MAP = {
  slow: 40,
  normal: 70,
  fast: 120,
} as const

const SEPARATOR_MAP = {
  dot: '\u00B7',
  diamond: '\u25C6',
  paw: '\uD83D\uDC3E',
  none: '',
} as const

function MarqueeItem({
  text,
  separator,
  style,
  index,
}: {
  text: string
  separator: string
  style: 'filled' | 'outlined' | 'alternating'
  index: number
}) {
  const isOutlined = style === 'outlined' || (style === 'alternating' && index % 2 === 1)

  return (
    <span className="flex items-center shrink-0" aria-hidden={index > 0}>
      <span
        className={cn(
          'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight-custom whitespace-nowrap select-none',
          isOutlined
            ? 'text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)]'
            : 'theme-text-primary',
        )}
      >
        {text}
      </span>
      {separator && (
        <span className="mx-6 sm:mx-8 md:mx-10 lg:mx-12 text-2xl sm:text-3xl theme-text-muted shrink-0">
          {separator}
        </span>
      )}
    </span>
  )
}

export function MarqueeText({ content }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  const speed = SPEED_MAP[content.speed || 'normal']
  const directionMultiplier = content.direction === 'right' ? 1 : -1
  const baseSpeed = speed * directionMultiplier

  const [isPaused, setIsPaused] = useState(false)
  const baseVelocity = useMotionValue(baseSpeed)
  const targetVelocity = useMotionValue(baseSpeed)

  const velocity = useSpring(targetVelocity, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  })

  const x = useMotionValue(0)
  const [trackWidth, setTrackWidth] = useState(0)

  const separator = SEPARATOR_MAP[content.separator || 'dot']
  const style = content.style || 'filled'

  // Repeat enough times to fill viewport seamlessly
  const repeatCount = 8

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [content.text, repeatCount])

  // Asymmetric pause/resume
  useEffect(() => {
    if (isPaused) {
      targetVelocity.set(0)
    } else {
      targetVelocity.set(baseVelocity.get())
    }
  }, [isPaused, baseVelocity, targetVelocity])

  // Animation loop
  useEffect(() => {
    if (!trackWidth || !isInView) return

    let animationId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const currentVelocity = velocity.get()
      const newX = x.get() + currentVelocity * deltaTime

      if (Math.abs(newX) >= trackWidth) {
        x.set(0)
      } else {
        x.set(newX)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [trackWidth, isInView, velocity, x])

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  return (
    <section
      ref={containerRef}
      className="py-12 lg:py-16 overflow-hidden"
      aria-label={content.text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div ref={trackRef} className="flex items-center" style={{ x }}>
        {Array.from({ length: repeatCount }).map((_, i) => (
          <MarqueeItem key={i} text={content.text} separator={separator} style={style} index={i} />
        ))}
        {/* Duplicate set for seamless loop */}
        {Array.from({ length: repeatCount }).map((_, i) => (
          <MarqueeItem
            key={`dup-${i}`}
            text={content.text}
            separator={separator}
            style={style}
            index={i + repeatCount}
          />
        ))}
      </motion.div>
    </section>
  )
}
