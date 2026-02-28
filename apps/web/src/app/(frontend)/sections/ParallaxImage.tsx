'use client'

import React, { useRef, useSyncExternalStore } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface ParallaxImageProps {
  content: {
    image: Media | number
    headline?: string | null
    subtext?: string | null
    overlayOpacity?: number | null
    height?: 'medium' | 'tall' | 'fullscreen' | null
  }
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

const emptySubscribe = () => () => {}

const HEIGHT_MAP = {
  medium: 'h-[60vh]',
  tall: 'h-[80vh]',
  fullscreen: 'h-screen',
} as const

function StaticParallaxImage({
  content,
  media,
  height,
}: {
  content: ParallaxImageProps['content']
  media: Media
  height: 'medium' | 'tall' | 'fullscreen'
}) {
  const overlayOpacity = (content.overlayOpacity ?? 40) / 100
  const hasText = Boolean(content.headline || content.subtext)

  return (
    <section className={cn('relative overflow-hidden', HEIGHT_MAP[height])}>
      <div className="absolute inset-x-0 -top-[10%] h-[120%]">
        <PayloadImage
          media={media}
          size="hero"
          fill
          className="object-cover"
          alt={content.headline || ''}
        />
      </div>
      {hasText && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity * 0.3}) 50%, transparent 100%)`,
          }}
        />
      )}
      {hasText && (
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12 lg:pb-20">
            {content.headline && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight text-white mb-3">
                {content.headline}
              </h2>
            )}
            {content.subtext && (
              <p className="text-white/80 leading-relaxed max-w-xl">{content.subtext}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export function ParallaxImage({ content }: ParallaxImageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const media = isMedia(content.image) ? content.image : null
  const height = content.height || 'tall'
  const hasText = Boolean(content.headline || content.subtext)
  const overlayOpacity = (content.overlayOpacity ?? 40) / 100

  // Return static version during SSR to prevent hydration mismatch
  if (!media) return null

  if (!mounted || prefersReducedMotion) {
    return <StaticParallaxImage content={content} media={media} height={height} />
  }

  // Client-side animated version
  return (
    <ParallaxImageClient
      content={content}
      media={media}
      height={height}
      hasText={hasText}
      overlayOpacity={overlayOpacity}
      sectionRef={sectionRef}
    />
  )
}

function ParallaxImageClient({
  content,
  media,
  height,
  hasText,
  overlayOpacity,
  sectionRef,
}: {
  content: ParallaxImageProps['content']
  media: Media
  height: 'medium' | 'tall' | 'fullscreen'
  hasText: boolean
  overlayOpacity: number
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [20, 0])

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden', HEIGHT_MAP[height])}
    >
      {/* Parallax image container — 120% tall to allow movement */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[120%]"
        style={{ y }}
      >
        <PayloadImage
          media={media}
          size="hero"
          fill
          className="object-cover"
          alt={content.headline || ''}
        />
      </motion.div>

      {/* Gradient scrim */}
      {hasText && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity * 0.3}) 50%, transparent 100%)`,
          }}
        />
      )}

      {/* Text overlay */}
      {hasText && (
        <motion.div
          className="absolute inset-0 flex items-end"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12 lg:pb-20">
            {content.headline && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight text-white mb-3">
                {content.headline}
              </h2>
            )}
            {content.subtext && (
              <p className="text-white/80 leading-relaxed max-w-xl">{content.subtext}</p>
            )}
          </div>
        </motion.div>
      )}
    </section>
  )
}
