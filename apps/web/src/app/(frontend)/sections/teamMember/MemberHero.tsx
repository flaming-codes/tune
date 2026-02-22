'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

type HeroVariant = 'editorial' | 'immersive' | 'minimal'

interface MemberHeroProps {
  memberName: string
  memberRole: string
  content: {
    variant?: HeroVariant | null
    eyebrow: string
    headline: string
    subheadline: string
    description: string
    coverImage?: Media | number | null
    ctaLabel: string
    ctaHref: string
  }
}

// ============================================================================
// VARIANT 1: EDITORIAL (Default)
// Large dominant image with overlapping text content
// ============================================================================
function EditorialVariant({
  memberName,
  memberRole,
  content,
  shouldReduceMotion,
}: {
  memberName: string
  memberRole: string
  content: MemberHeroProps['content']
  shouldReduceMotion: boolean | null
}) {
  return (
    <section className="pt-24 lg:pt-32 theme-bg-primary overflow-hidden">
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

      {/* Main editorial grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-end">
          {/* Image: Takes 7 columns */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            ) : (
              <div
                className="image-placeholder aspect-[3/4] lg:aspect-[4/5]"
                aria-label={`${memberName} - Platzhalter`}
              />
            )}
          </motion.div>

          {/* Text content: Overlaps image on desktop */}
          <div className="lg:col-span-6 lg:col-start-7 lg:-ml-24 relative z-10">
            <motion.div
              className="theme-bg-primary lg:p-8 lg:pb-0"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight-custom leading-[0.95]">
                {content.headline}
              </h1>

              <p className="mt-5 lg:mt-6 text-lg lg:text-xl xl:text-2xl theme-text-secondary leading-relaxed">
                {content.subheadline}
              </p>

              <p className="mt-4 lg:mt-5 text-base lg:text-lg leading-relaxed theme-text-secondary max-w-xl">
                {content.description}
              </p>

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

              <p className="mt-6 text-sm theme-text-tertiary lg:hidden">
                {memberName} · {memberRole}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-16 lg:h-24" />
    </section>
  )
}

// ============================================================================
// VARIANT 2: IMMERSIVE
// Full-bleed widescreen image with floating content card
// Best for: wide/landscape hero images, cinematic feel
// ============================================================================
function ImmersiveVariant({
  memberName,
  memberRole,
  content,
  shouldReduceMotion,
}: {
  memberName: string
  memberRole: string
  content: MemberHeroProps['content']
  shouldReduceMotion: boolean | null
}) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-screen theme-bg-primary">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        {content.coverImage ? (
          <>
            <PayloadImage
              media={content.coverImage}
              size="hero"
              fill
              className="object-cover"
              priority
              alt={`${memberName} - Portrait`}
            />
            {/* Stronger gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:from-black/60 lg:via-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 image-placeholder" aria-label={`${memberName} - Platzhalter`} />
        )}
      </div>

      {/* Floating content card - left aligned */}
      <div className="relative z-10 min-h-[85vh] lg:min-h-screen flex items-end lg:items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 lg:py-0">
          <motion.div
            className="max-w-xl lg:max-w-2xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow badge */}
            <div className="inline-block px-3 py-1.5 mb-6 border border-white/30 rounded-full">
              <p className="text-xs tracking-[0.15em] uppercase text-white/90">
                {content.eyebrow}
              </p>
            </div>

            {/* Large headline - white for contrast */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight-custom leading-[0.95] text-white">
              {content.headline}
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg">
              {content.subheadline}
            </p>

            <p className="mt-4 text-sm lg:text-base text-white/60 leading-relaxed max-w-md">
              {content.description}
            </p>

            {/* CTA and meta row */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <motion.a
                href={content.ctaHref}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-neutral-900 text-sm font-medium tracking-wide"
              >
                {content.ctaLabel}
              </motion.a>

              <p className="text-xs tracking-[0.1em] uppercase text-white/50">
                {memberName} · {memberRole}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/80"
            initial={{ height: 0, top: 0 }}
            animate={{ height: '100%', top: ['0%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// VARIANT 3: MINIMAL
// Centered layout with small circular image, typography-focused
// Best for: clean, modern, text-heavy presentations
// ============================================================================
function MinimalVariant({
  memberName,
  memberRole,
  content,
  shouldReduceMotion,
}: {
  memberName: string
  memberRole: string
  content: MemberHeroProps['content']
  shouldReduceMotion: boolean | null
}) {
  return (
    <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 theme-bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.2em] uppercase theme-text-tertiary mb-8">
            {content.eyebrow}
          </p>

          {/* Small circular image */}
          <motion.div
            className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-10"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {content.coverImage ? (
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-current/10">
                <PayloadImage
                  media={content.coverImage}
                  size="thumbnail"
                  fill
                  className="object-cover"
                  priority
                  alt={`${memberName} - Portrait`}
                />
              </div>
            ) : (
              <div
                className="w-full h-full rounded-full image-placeholder border-2 border-current/10"
                aria-label={`${memberName} - Platzhalter`}
              />
            )}
          </motion.div>

          {/* Typography stack */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95]">
            {content.headline}
          </h1>

          <p className="mt-6 text-xl lg:text-2xl theme-text-secondary leading-relaxed max-w-2xl mx-auto">
            {content.subheadline}
          </p>

          <p className="mt-6 text-base theme-text-tertiary leading-relaxed max-w-xl mx-auto">
            {content.description}
          </p>

          {/* Divider with name */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-current/20" />
            <p className="text-sm theme-text-secondary">
              {memberName} <span className="theme-text-tertiary mx-2">·</span> {memberRole}
            </p>
            <div className="h-px w-12 bg-current/20" />
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <a
              href={content.ctaHref}
              className="inline-flex items-center gap-2 text-sm font-medium theme-text-primary border-b border-current pb-1 hover:opacity-70 transition-opacity"
            >
              {content.ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function MemberHero({ memberName, memberRole, content }: MemberHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const variant = content.variant || 'editorial'

  switch (variant) {
    case 'immersive':
      return (
        <ImmersiveVariant
          memberName={memberName}
          memberRole={memberRole}
          content={content}
          shouldReduceMotion={shouldReduceMotion}
        />
      )
    case 'minimal':
      return (
        <MinimalVariant
          memberName={memberName}
          memberRole={memberRole}
          content={content}
          shouldReduceMotion={shouldReduceMotion}
        />
      )
    case 'editorial':
    default:
      return (
        <EditorialVariant
          memberName={memberName}
          memberRole={memberRole}
          content={content}
          shouldReduceMotion={shouldReduceMotion}
        />
      )
  }
}
