'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

interface MemberHeroProps {
  memberName: string
  memberRole: string
  content: {
    eyebrow: string
    headline: string
    subheadline: string
    description: string
    coverImage?: Media | number | null
    ctaLabel: string
    ctaHref: string
  }
}

export function MemberHero({ memberName, memberRole, content }: MemberHeroProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="pt-24 lg:pt-32 theme-bg-primary overflow-hidden">
      {/* Editorial Layout: Full-bleed image with overlapping text */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top eyebrow row */}
        <div className="flex justify-between items-baseline mb-6 lg:mb-8">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary">
            {content.eyebrow}
          </p>
          <p className="text-sm theme-text-tertiary hidden lg:block">
            {memberName} · {memberRole}
          </p>
        </div>
      </div>

      {/* Main editorial grid: Large image dominant */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-end">
          {/* Image: Takes 7 columns on desktop, full height */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {content.coverImage ? (
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                <PayloadImage
                  media={content.coverImage}
                  size="hero"
                  fill
                  className="object-cover"
                  priority
                  alt={`${memberName} - Portrait`}
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            ) : (
              <div
                className="image-placeholder aspect-[3/4] lg:aspect-[4/5]"
                aria-label={`${memberName} - Platzhalter`}
              />
            )}
          </motion.div>

          {/* Text content: Overlaps image on desktop, positioned to the right */}
          <div className="lg:col-span-6 lg:col-start-7 lg:-ml-24 relative z-10">
            <motion.div
              className="theme-bg-primary lg:p-8 lg:pb-0"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              {/* Large headline with tight leading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight-custom leading-[0.95]">
                {content.headline}
              </h1>

              {/* Subheadline - larger, more editorial */}
              <p className="mt-5 lg:mt-6 text-lg lg:text-xl xl:text-2xl theme-text-secondary leading-relaxed">
                {content.subheadline}
              </p>

              {/* Description */}
              <p className="mt-4 lg:mt-5 text-base lg:text-lg leading-relaxed theme-text-secondary max-w-xl">
                {content.description}
              </p>

              {/* CTA Row */}
              <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-4 lg:gap-6">
                <motion.a
                  href={content.ctaHref}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium tracking-wide"
                >
                  {content.ctaLabel}
                </motion.a>
              </div>

              {/* Mobile-only name/role */}
              <p className="mt-6 text-sm theme-text-tertiary lg:hidden">
                {memberName} · {memberRole}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 lg:h-24" />
    </section>
  )
}
