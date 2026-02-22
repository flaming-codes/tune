'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { Testimonial } from '@/payload-types'

interface TestimonialsProps {
  content: {
    eyebrow: string
    headline: string
    description: string
  }
  testimonials: Testimonial[]
}

export function Testimonials({ content, testimonials }: TestimonialsProps) {
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
              <footer className="text-sm theme-text-tertiary">— {testimonial.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
