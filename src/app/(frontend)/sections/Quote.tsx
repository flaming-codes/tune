'use client'

import { useRef, type FC, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  const colorOpacity = useTransform(progress, range, [0, 1])

  return (
    <span className="relative mx-1 lg:mx-1.5">
      {/* Background word - always visible with low opacity */}
      <span className="theme-text-muted">{children}</span>
      {/* Foreground word - animates with scroll */}
      <motion.span
        style={{ opacity: colorOpacity }}
        className="absolute inset-0 theme-text-primary"
      >
        {children}
      </motion.span>
    </span>
  )
}

interface QuoteProps {
  quote: {
    text: string
    author?: string | null
  }
}

export function Quote({ quote }: QuoteProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const words = quote.text?.split(' ') ?? []

  return (
    <section ref={targetRef} className="relative theme-bg-dark-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-44">
        <div className="max-w-5xl mx-auto text-center">
          {/* Quote mark */}
          <div className="mb-8">
            <svg
              className="w-12 h-12 mx-auto theme-text-muted"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Animated Quote Text */}
          <blockquote>
            <p
              className={cn(
                'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight',
                'flex flex-wrap justify-center'
              )}
            >
              {words.map((word, i) => {
                const start = i / words.length
                const end = start + 1 / words.length
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                )
              })}
            </p>

            {/* Author */}
            {quote.author && (
              <footer className="mt-12">
                <cite className="not-italic text-sm tracking-wide-custom uppercase theme-text-muted">
                  — {quote.author}
                </cite>
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
