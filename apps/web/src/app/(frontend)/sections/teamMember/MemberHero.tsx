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
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-4">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight-custom leading-[0.96]">
              {content.headline}
            </h1>
            <p className="mt-5 text-lg lg:text-xl theme-text-secondary max-w-2xl">
              {content.subheadline}
            </p>
            <p className="mt-6 text-base lg:text-lg leading-relaxed theme-text-secondary max-w-2xl">
              {content.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href={content.ctaHref}
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium"
              >
                {content.ctaLabel}
              </motion.a>
              <p className="text-sm theme-text-tertiary">
                {memberName} · {memberRole}
              </p>
            </div>
          </div>

          <motion.div
            className="lg:col-span-5 order-1 lg:order-2"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {content.coverImage ? (
              <div className="relative aspect-[4/5] overflow-hidden">
                <PayloadImage
                  media={content.coverImage}
                  size="hero"
                  fill
                  className="object-cover"
                  priority
                  alt={`${memberName} - Portrait`}
                />
              </div>
            ) : (
              <div
                className="image-placeholder aspect-[4/5]"
                aria-label={`${memberName} - Platzhalter`}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
