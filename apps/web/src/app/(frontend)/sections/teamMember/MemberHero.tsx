'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

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

type VariantProps = {
  memberName: string
  memberRole: string
  content: MemberHeroProps['content']
  shouldReduceMotion: boolean | null
}

function CoverImage({
  media,
  memberName,
  className,
  objectFit = 'cover',
  size = 'hero',
  dynamicAspect = false,
  children,
}: {
  media: Media | number | null | undefined
  memberName: string
  className: string
  objectFit?: 'cover' | 'contain'
  size?: 'hero' | 'thumbnail'
  dynamicAspect?: boolean
  children?: React.ReactNode
}) {
  if (media) {
    const style =
      dynamicAspect && typeof media !== 'number' && media.width && media.height
        ? { aspectRatio: `${media.width}/${media.height}` }
        : undefined

    return (
      <div className={clsx('relative', className)} style={style}>
        <PayloadImage
          media={media}
          size={size}
          fill
          className={`object-${objectFit}`}
          priority
          alt={`${memberName} - Portrait`}
        />
        {children}
      </div>
    )
  }

  return (
    <div
      className={clsx('image-placeholder', className)}
      aria-label={`${memberName} - Platzhalter`}
    />
  )
}

function CtaPrimary({
  href,
  label,
  shouldReduceMotion,
  className,
}: {
  href: string
  label: string
  shouldReduceMotion: boolean | null
  className?: string
}) {
  return (
    <motion.a
      href={href}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx(
        'inline-flex items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium',
        className,
      )}
    >
      {label}
    </motion.a>
  )
}

function EditorialVariant({ memberName, memberRole, content, shouldReduceMotion }: VariantProps) {
  return (
    <section className="pt-24 lg:pt-32 theme-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-baseline mb-6 lg:mb-8">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary">
            {content.eyebrow}
          </p>
          <p className="text-sm theme-text-tertiary hidden lg:block">
            {memberName} · {memberRole}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-end">
          <motion.div
            className="lg:col-span-7 relative"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <CoverImage
              media={content.coverImage}
              memberName={memberName}
              className="aspect-3/4 lg:aspect-4/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
            </CoverImage>
          </motion.div>

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
                <CtaPrimary
                  href={content.ctaHref}
                  label={content.ctaLabel}
                  shouldReduceMotion={shouldReduceMotion}
                  className="px-8 py-3.5 tracking-wide"
                />
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

function ImmersiveVariant({ memberName, content, shouldReduceMotion }: VariantProps) {
  return (
    <section className="pt-12 lg:pt-20 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <CoverImage
            media={content.coverImage}
            memberName={memberName}
            className={content.coverImage ? 'w-full' : 'w-full aspect-video'}
            objectFit="contain"
            dynamicAspect
          />
        </motion.div>

        <motion.div
          className="max-w-xl mt-10 lg:mt-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] theme-text-primary mb-3">
            {memberName}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight leading-[1.2] theme-text-secondary">
            {content.headline}
          </p>
          <CtaPrimary
            href={content.ctaHref}
            label={content.ctaLabel}
            shouldReduceMotion={shouldReduceMotion}
            className="mt-6 px-6 py-2.5"
          />
        </motion.div>
      </div>

      <div className="h-16 lg:h-24" />
    </section>
  )
}

function MinimalVariant({ memberName, memberRole, content, shouldReduceMotion }: VariantProps) {
  return (
    <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 theme-bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-[0.2em] uppercase theme-text-tertiary mb-8">
            {content.eyebrow}
          </p>

          <motion.div
            className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-10"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CoverImage
              media={content.coverImage}
              memberName={memberName}
              size="thumbnail"
              className="w-full h-full rounded-full overflow-hidden border-2 border-current/10"
            />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95]">
            {content.headline}
          </h1>
          <p className="mt-6 text-xl lg:text-2xl theme-text-secondary leading-relaxed max-w-2xl mx-auto">
            {content.subheadline}
          </p>
          <p className="mt-6 text-base theme-text-tertiary leading-relaxed max-w-xl mx-auto">
            {content.description}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-current/20" />
            <p className="text-sm theme-text-secondary">
              {memberName} <span className="theme-text-tertiary mx-2">·</span> {memberRole}
            </p>
            <div className="h-px w-12 bg-current/20" />
          </div>

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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const VARIANTS = {
  editorial: EditorialVariant,
  immersive: ImmersiveVariant,
  minimal: MinimalVariant,
} as const

export function MemberHero({ memberName, memberRole, content }: MemberHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const Variant = VARIANTS[content.variant ?? 'editorial']

  return (
    <Variant
      memberName={memberName}
      memberRole={memberRole}
      content={content}
      shouldReduceMotion={shouldReduceMotion}
    />
  )
}
