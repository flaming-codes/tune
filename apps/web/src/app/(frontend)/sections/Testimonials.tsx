'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { Testimonial } from '@/payload-types'
import { PayloadImage } from '@/components/PayloadImage'

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

export function Testimonials({ content, testimonials }: TestimonialsProps) {
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
    <section className="py-24 lg:py-36 theme-bg-primary">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              className="flex flex-col justify-between p-8 theme-bg-secondary cursor-default"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <p className="theme-text-primary leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden theme-bg-tertiary">
                  <PayloadImage
                    media={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    sizes="48px"
                    placeholder="empty"
                  />
                </div>
                <div>
                  <p className="text-sm theme-text-primary font-medium">{testimonial.author}</p>
                  <p className="text-xs theme-text-tertiary">
                    {testimonial.rating.toFixed(1)} ★ • {formatDate(testimonial.statementTimestamp)}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
