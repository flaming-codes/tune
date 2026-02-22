'use client'

import { useRef, useState, type FC, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/payload-types'
import { PayloadImage } from '@/components/PayloadImage'

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
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

interface QuoteAuthorProps {
  author: TeamMember | number
}

function QuoteAuthor({ author }: QuoteAuthorProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const citeRef = useRef<HTMLElement>(null)
  const isTeamMember = typeof author === 'object'
  const authorName = isTeamMember ? author.name : `Teammitglied #${author}`
  const authorPhoto =
    isTeamMember && author.photos && author.photos.length > 0 ? author.photos[0] : null

  const updateMousePosition = (e: React.MouseEvent<HTMLElement>) => {
    if (!citeRef.current) return
    const rect = citeRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    updateMousePosition(e)
    setIsHovered(true)
  }

  return (
    <footer className="mt-12">
      <motion.cite
        ref={citeRef}
        className="not-italic text-sm tracking-wide-custom uppercase theme-text-muted relative inline-block cursor-default px-4 py-2 -mx-4 -my-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={updateMousePosition}
      >
        {authorName}
        <AnimatePresence>
          {isHovered && authorPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { type: 'spring', stiffness: 200, damping: 20 },
              }}
              style={{ x: mousePosition.x - 48, y: mousePosition.y - 140 }}
              className="absolute top-0 left-0 z-10 pointer-events-none"
            >
              <div className="w-24 h-32 overflow-hidden shadow-lg">
                <PayloadImage
                  media={authorPhoto}
                  size="thumbnail"
                  className="w-full h-full object-cover"
                  alt={`${authorName} Portrait`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.cite>
    </footer>
  )
}

interface QuoteProps {
  quote: {
    text: string
    author?: TeamMember | number | null
  }
}

export function Quote({ quote }: QuoteProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 45%', 'end 65%'],
  })

  const words = quote.text?.split(' ') ?? []

  return (
    <section ref={targetRef} className="relative theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-44">
        <div className="max-w-5xl mx-auto text-center">
          {/* Quote mark */}
          <div className="mb-8">
            <svg
              className="w-12 h-12 mx-auto theme-text-tertiary"
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
                'flex flex-wrap justify-center',
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
            {quote.author && <QuoteAuthor author={quote.author} />}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
