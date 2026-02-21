'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'motion/react'
import { PayloadImage } from '@/components/PayloadImage'
import type { GalleryImage, Media } from '@/payload-types'

interface GalleryTickerProps {
  images: GalleryImage[]
}

// Duplicate images to ensure seamless looping
function duplicateItems<T>(items: T[], minCount: number): T[] {
  const result: T[] = []
  while (result.length < minCount) {
    result.push(...items)
  }
  return result
}

/**
 * TickerItem - Individual image in the ticker with intrinsic aspect ratio
 */
function TickerItem({
  image,
  index,
}: {
  image: GalleryImage
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const imageData = image.image as Media

  // Quick transitions for hover effects
  const scale = useSpring(isHovered ? 1.03 : 1, { 
    stiffness: 400,
    damping: 30,
  })

  // Calculate aspect ratio from image dimensions if available
  const aspectRatio = imageData.width && imageData.height 
    ? `${imageData.width} / ${imageData.height}`
    : 'auto'

  return (
    <figure className="flex-shrink-0 relative">
      {/* Image container - defines the width */}
      <motion.div
        className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden cursor-pointer"
        style={{
          scale,
          aspectRatio,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <PayloadImage
          media={imageData}
          size="card"
          fill
          className="object-cover transition-transform duration-500"
          alt={image.title}
        />
      </motion.div>

      {/* Caption - absolutely positioned below image, translates in */}
      <figcaption className="absolute top-full left-0 right-0 mt-2 overflow-hidden">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : -10,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium theme-text-primary leading-tight break-words">
            {image.title}
          </p>
          {image.isFeatured && (
            <p className="text-xs theme-text-tertiary mt-0.5">
              Featured
            </p>
          )}
        </motion.div>
      </figcaption>
    </figure>
  )
}

/**
 * GalleryTicker - Edge-to-edge infinite scrolling ticker (single row)
 * 
 * Features:
 * - Full viewport width overflow (extends edge-to-edge)
 * - Single row with intrinsic aspect ratio images
 * - Seamless infinite loop
 * - Asymmetric pause/resume: slow pause, fast resume
 * - Text appears below image on hover (no overlay)
 * - Semantic HTML with figure/figcaption
 */
export function GalleryTicker({ images }: GalleryTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  // Animation state with asymmetric spring behavior
  const [isPaused, setIsPaused] = useState(false)
  const baseVelocity = useMotionValue(-70)
  
  // Use a motion value for target velocity to enable asymmetric transitions
  const targetVelocity = useMotionValue(-70)
  
  // Asymmetric spring: we manipulate this via useEffect for different speeds
  const velocity = useSpring(targetVelocity, { 
    stiffness: 50,
    damping: 20,
    mass: 1,
  })

  // Ensure we have enough items for seamless loop
  const displayImages = duplicateItems(images, 12)

  // Track position for infinite loop
  const x = useMotionValue(0)
  const [trackWidth, setTrackWidth] = useState(0)

  // Measure track width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [displayImages.length])

  // Handle pause with asymmetric spring
  useEffect(() => {
    if (isPaused) {
      // Slow deceleration (long slowdown)
      targetVelocity.set(0)
    } else {
      // Fast acceleration (quick speedup)
      targetVelocity.set(baseVelocity.get())
    }
  }, [isPaused, baseVelocity, targetVelocity])

  // Animation loop
  useEffect(() => {
    if (!trackWidth || !isInView) return

    let animationId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const currentVelocity = velocity.get()
      const newX = x.get() + currentVelocity * deltaTime

      // Reset position for seamless loop
      if (Math.abs(newX) >= trackWidth) {
        x.set(0)
      } else {
        x.set(newX)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [trackWidth, isInView, velocity, x])

  // Handle mouse interactions
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Gentle scroll-based velocity boost
  useEffect(() => {
    let lastScrollY = window.scrollY
    let rafId: number

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollDelta = currentScrollY - lastScrollY
        lastScrollY = currentScrollY

        // Gentle boost based on scroll speed
        const boost = Math.max(-40, Math.min(40, scrollDelta))
        const newVelocity = -70 - boost

        if (!isPaused) {
          baseVelocity.set(newVelocity)
          targetVelocity.set(newVelocity)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [baseVelocity, targetVelocity, isPaused])

  // Split images into two tracks for seamless loop
  const halfIndex = Math.ceil(displayImages.length / 2)
  const firstTrack = displayImages.slice(0, halfIndex)
  const secondTrack = displayImages.slice(halfIndex)

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 theme-bg-secondary" />

      {/* Content container - constrained width for text */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header - no fade-in animations */}
        <header className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Galerie
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Das sind unsere tierischen Patienten
          </h2>
          <p className="mt-6 theme-text-secondary leading-relaxed">
            Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.
          </p>
        </header>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 theme-text-secondary">
          Noch keine Bilder in der Galerie.
        </div>
      ) : (
        /* Single Ticker container - full viewport width with overflow visible */
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient masks for edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling track - single row */}
          <motion.div
            ref={trackRef}
            className="flex items-start gap-3 sm:gap-4 lg:gap-5 py-4"
            style={{ x }}
          >
            {/* First set of items */}
            {firstTrack.map((image, index) => (
              <TickerItem
                key={`first-${image.id}-${index}`}
                image={image}
                index={index}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {secondTrack.map((image, index) => (
              <TickerItem
                key={`second-${image.id}-${index}`}
                image={image}
                index={index + firstTrack.length}
              />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}
