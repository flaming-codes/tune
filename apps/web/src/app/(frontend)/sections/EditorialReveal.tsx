'use client'

import React, { useRef, useMemo, useSyncExternalStore } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface EditorialRevealProps {
  content: {
    text: string
    authorName?: string | null
    authorRole?: string | null
    authorPhoto?: Media | number | null
    alignment?: 'left' | 'center' | null
    showDivider?: boolean | null
  }
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in (value as Record<string, unknown>)
}

const SCROLL_PER_LINE = 120

function RevealLine({
  text,
  index,
  totalLines,
  progress,
}: {
  text: string
  index: number
  totalLines: number
  progress: MotionValue<number>
}) {
  const lineStart = index / (totalLines + 2)
  const lineEnd = (index + 1.5) / (totalLines + 2)

  const lineProgress = useTransform(progress, [lineStart, lineEnd], [0, 1])
  const opacity = useTransform(lineProgress, [0, 1], [0, 1])
  const y = useTransform(lineProgress, [0, 1], [30, 0])
  const filter = useTransform(lineProgress, [0, 0.5, 1], ['blur(4px)', 'blur(1px)', 'blur(0px)'])

  return (
    <motion.span className="block" style={{ opacity, y, filter }}>
      {text}
    </motion.span>
  )
}

function StaticEditorial({ content }: EditorialRevealProps) {
  const alignment = content.alignment || 'center'
  const authorPhoto = isMedia(content.authorPhoto) ? content.authorPhoto : null

  return (
    <section className="py-24 lg:py-36">
      <div
        className={cn('max-w-7xl mx-auto px-6 lg:px-12', alignment === 'center' && 'text-center')}
      >
        <p
          className={cn(
            'text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight-custom leading-relaxed theme-text-primary',
            alignment === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl',
          )}
        >
          {content.text}
        </p>

        {content.showDivider && <hr className="theme-border-primary mt-12 mb-8 max-w-xs mx-auto" />}

        {(content.authorName || authorPhoto) && (
          <div
            className={cn(
              'mt-8 flex items-center gap-4',
              alignment === 'center' && 'justify-center',
            )}
          >
            {authorPhoto && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <PayloadImage
                  media={authorPhoto}
                  size="thumbnail"
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
            )}
            <div className={alignment === 'center' ? 'text-center' : ''}>
              {content.authorName && (
                <p className="text-sm font-medium theme-text-primary">{content.authorName}</p>
              )}
              {content.authorRole && (
                <p className="text-sm theme-text-tertiary">{content.authorRole}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const emptySubscribe = () => () => {}

interface AnimatedEditorialProps extends EditorialRevealProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
  lines: string[]
}

function AnimatedEditorial({ content, sectionRef, lines }: AnimatedEditorialProps) {
  const alignment = content.alignment || 'center'
  const authorPhoto = isMedia(content.authorPhoto) ? content.authorPhoto : null
  const scrollPx = lines.length * SCROLL_PER_LINE

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Divider width animation
  const dividerWidth = useTransform(scrollYProgress, [0.6, 0.9], ['0%', '100%'])

  // Author fade-in
  const authorOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])
  const authorY = useTransform(scrollYProgress, [0.75, 0.9], [16, 0])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${scrollPx}px)` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div
          className={cn(
            'max-w-7xl mx-auto px-6 lg:px-12 w-full',
            alignment === 'center' && 'text-center',
          )}
        >
          <p
            className={cn(
              'text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight-custom leading-relaxed theme-text-primary',
              alignment === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl',
            )}
          >
            {lines.map((line, index) => (
              <RevealLine
                key={index}
                text={line}
                index={index}
                totalLines={lines.length}
                progress={scrollYProgress}
              />
            ))}
          </p>

          {content.showDivider && (
            <div className={cn('mt-12 mb-8', alignment === 'center' ? 'flex justify-center' : '')}>
              <motion.div
                className="h-px theme-bg-primary bg-[var(--border-primary)]"
                style={{ width: dividerWidth, maxWidth: '20rem' }}
              />
            </div>
          )}

          {(content.authorName || authorPhoto) && (
            <motion.div
              className={cn(
                'mt-8 flex items-center gap-4',
                alignment === 'center' && 'justify-center',
              )}
              style={{ opacity: authorOpacity, y: authorY }}
            >
              {authorPhoto && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <PayloadImage
                    media={authorPhoto}
                    size="thumbnail"
                    fill
                    className="object-cover"
                    alt=""
                  />
                </div>
              )}
              <div className={alignment === 'center' ? 'text-center' : ''}>
                {content.authorName && (
                  <p className="text-sm font-medium theme-text-primary">{content.authorName}</p>
                )}
                {content.authorRole && (
                  <p className="text-sm theme-text-tertiary">{content.authorRole}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export function EditorialReveal({ content }: EditorialRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  // Split text into lines by sentence boundaries for natural reading rhythm
  const lines = useMemo(() => {
    return content.text.split(/(?<=[.!?])\s+/).filter((line) => line.trim().length > 0)
  }, [content.text])

  // Return static version during SSR to prevent hydration mismatch
  if (lines.length <= 1 || !mounted || prefersReducedMotion) {
    return <StaticEditorial content={content} />
  }

  return <AnimatedEditorial content={content} sectionRef={sectionRef} lines={lines} />
}
