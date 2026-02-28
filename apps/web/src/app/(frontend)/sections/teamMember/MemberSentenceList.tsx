'use client'

import React, { useRef, useSyncExternalStore } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

interface SentenceListItem {
  id?: string | null
  text: string
}

interface MemberSentenceListProps {
  content: {
    sentenceStart: string
    items: SentenceListItem[]
  }
}

const SCROLL_STEP = 250
const ITEM_GAP = 64
const BLUR_MAX = 8
const FADE_RANGE = 0.6

function ScrollItem({
  text,
  index,
  itemCount,
  progress,
}: {
  text: string
  index: number
  itemCount: number
  progress: MotionValue<number>
}) {
  const span = Math.max(itemCount - 1, 1)
  const y = useTransform(progress, (p) => (index - p * span) * ITEM_GAP)

  const opacity = useTransform(y, (yPx) => {
    const d = Math.abs(yPx) / ITEM_GAP
    return Math.max(0, 1 - d / FADE_RANGE)
  })

  const filter = useTransform(y, (yPx) => {
    const d = Math.abs(yPx) / ITEM_GAP
    return `blur(${Math.min((d / FADE_RANGE) * BLUR_MAX, BLUR_MAX)}px)`
  })

  return (
    <motion.span className="col-start-1 row-start-1 theme-text-tertiary" style={{ y, opacity, filter }}>
      {text}
    </motion.span>
  )
}

function StaticSentence({
  sentenceStart,
  items,
}: {
  sentenceStart: string
  items: SentenceListItem[]
}) {
  return (
    <section className="py-20 lg:py-32 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight-custom leading-tight theme-text-primary">
          {sentenceStart}{' '}
          {items.map((item, i) => (
            <React.Fragment key={item.id || `item-${i}`}>
              {item.text}
              {i < items.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}

const emptySubscribe = () => () => {}

export function MemberSentenceList({ content }: MemberSentenceListProps) {
  const prefersReducedMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const { sentenceStart, items } = content
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  if (items.length <= 1 || (mounted && prefersReducedMotion)) {
    return <StaticSentence sentenceStart={sentenceStart} items={items} />
  }

  const scrollPx = (items.length - 1) * SCROLL_STEP

  return (
    <section
      ref={sectionRef}
      className="relative theme-bg-primary"
      style={{ height: `calc(100vh + ${scrollPx}px)` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight-custom leading-tight theme-text-primary">
            {sentenceStart}{' '}
            <span className="inline-grid align-baseline">
              {items.map((item, i) => (
                <ScrollItem
                  key={item.id || `item-${i}`}
                  text={item.text}
                  index={i}
                  itemCount={items.length}
                  progress={scrollYProgress}
                />
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
