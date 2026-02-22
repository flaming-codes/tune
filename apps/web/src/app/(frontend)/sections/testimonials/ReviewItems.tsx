'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { Testimonial } from '@/payload-types'
import { PayloadImage } from '@/components/PayloadImage'

function StarLine({ rating }: { rating: number }) {
  const rounded = Math.round(rating)

  return (
    <div
      className="flex items-center justify-center gap-0.5"
      aria-label={`${rating.toFixed(1)} von 5 Sternen`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rounded ? 'theme-text-primary' : 'theme-text-muted'}>
          ★
        </span>
      ))}
    </div>
  )
}

export function FloatingReviewItem({
  testimonial,
  truncatedText,
  reduceMotion,
}: {
  testimonial: Testimonial
  truncatedText: string
  reduceMotion: boolean
}) {
  return (
    <motion.blockquote
      className="w-48 sm:w-52 p-4 theme-bg-secondary pointer-events-none shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }
      }
    >
      <p className="text-base sm:text-lg leading-snug theme-text-primary text-center">
        {truncatedText}
      </p>
      <div className="mt-3">
        <StarLine rating={testimonial.rating} />
        <div className="mt-3 flex flex-col items-center">
          <div className="relative w-7 h-7 rounded-full overflow-hidden theme-bg-tertiary">
            <PayloadImage
              media={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="28px"
              placeholder="empty"
            />
          </div>
          <p className="mt-1 text-sm theme-text-primary font-medium">{testimonial.author}</p>
        </div>
      </div>
    </motion.blockquote>
  )
}

export function FeaturedReviewHero({
  testimonial,
  formatDate,
}: {
  testimonial: Testimonial
  formatDate: (value: string) => string
}) {
  return (
    <article>
      <div className="flex items-start justify-between gap-4">
        <StarLine rating={testimonial.rating} />
      </div>
      <p className="mt-3 text-xl sm:text-2xl font-semibold leading-snug theme-text-primary text-left">
        {testimonial.text}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden theme-bg-tertiary">
          <PayloadImage
            media={testimonial.avatar}
            alt={testimonial.author}
            fill
            className="object-cover"
            sizes="40px"
            placeholder="empty"
          />
        </div>
        <div>
          <p className="text-base font-semibold theme-text-primary">{testimonial.author}</p>
          <p className="text-xs theme-text-tertiary">
            {formatDate(testimonial.statementTimestamp)}
          </p>
        </div>
      </div>
    </article>
  )
}
