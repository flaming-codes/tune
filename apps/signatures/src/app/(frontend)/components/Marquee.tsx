'use client'

import { motion } from 'motion/react'
import { useMemo } from 'react'
import clsx from 'clsx'

export interface MarqueeProps {
  /** Content to animate */
  children: React.ReactNode
  /** Animation direction */
  direction?: 'left' | 'right' | 'up' | 'down'
  /** Speed of animation in seconds per loop */
  duration?: number
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Additional CSS classes */
  className?: string
  /** Additional container CSS classes */
  containerClassName?: string
  /** Number of duplicates for seamless loop */
  repeat?: number
}

/**
 * Infinite marquee/scroll animation component.
 * Creates a seamless looping animation for content.
 *
 * Inspired by https://www.framer.com/marketplace/components/parallax-marquee/
 */
export function Marquee({
  children,
  direction = 'left',
  duration = 30,
  pauseOnHover = false,
  className,
  containerClassName,
  repeat = 2,
}: MarqueeProps) {
  const isHorizontal = direction === 'left' || direction === 'right'

  const animationProps = useMemo(() => {
    switch (direction) {
      case 'left':
        return {
          x: ['0%', `${-100 * repeat}%`],
        }
      case 'right':
        return {
          x: [`${-100 * repeat}%`, '0%'],
        }
      case 'up':
        return {
          y: ['0%', `${-100 * repeat}%`],
        }
      case 'down':
        return {
          y: [`${-100 * repeat}%`, '0%'],
        }
      default:
        return { x: ['0%', `${-100 * repeat}%`] }
    }
  }, [direction, repeat])

  const containerClasses = clsx(
    'flex',
    isHorizontal ? 'flex-row' : 'flex-col',
    'overflow-hidden',
    containerClassName,
  )

  const trackClasses = clsx(
    'flex',
    isHorizontal ? 'flex-row' : 'flex-col',
    'shrink-0',
    'gap-4',
    pauseOnHover && 'hover:[animation-play-state:paused]',
    className,
  )

  return (
    <div className={containerClasses}>
      <motion.div
        className={trackClasses}
        animate={animationProps}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
