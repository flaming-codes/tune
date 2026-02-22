'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useMemo, useCallback } from 'react'
import type { ScreensaverImage } from '@/payload-types'

export interface ScreensaverProps {
  /** Array of screensaver images to display */
  images: ScreensaverImage[]
  /** Whether the screensaver is currently active */
  isActive: boolean
  /** Callback when user interacts with screensaver (to reset timer) */
  onInteraction: () => void
  /** Base velocity multiplier (lower = slower) */
  velocityMultiplier?: number
  /** Minimum image width in pixels */
  minImageWidth?: number
  /** Maximum image width in pixels */
  maxImageWidth?: number
  /** Image height in pixels */
  imageHeight?: number
  /** Padding from screen edges */
  padding?: number
  /** Hint text displayed at bottom */
  hintText?: string
}

/** Generate deterministic pseudo-random number from seed */
const seededRandom = (seed: number, offset = 0): number => {
  const x = Math.sin(seed * 9999 + offset * 1234) * 10000
  return x - Math.floor(x)
}

/** Get image URL from screensaver image */
const getImageUrl = (image: ScreensaverImage): string | null => {
  return image.sizes?.fullscreen?.url ?? image.url ?? null
}

/** Animated image item */
interface AnimatedImage {
  id: number
  url: string
  title: string
  width: number
  y: number
  duration: number
  delay: number
}

/**
 * Screensaver component with independently animated images.
 * Each image moves right-to-left at its own randomized speed and vertical position.
 */
export function Screensaver({
  images,
  isActive,
  onInteraction,
  velocityMultiplier = 0.7,
  minImageWidth = 200,
  maxImageWidth = 400,
  imageHeight = 300,
  padding = 40,
  hintText = 'Zum Fortfahren Berühren',
}: ScreensaverProps) {
  const animatedImages = useMemo<AnimatedImage[]>(() => {
    const validImages = images.filter(getImageUrl)
    const widthRange = maxImageWidth - minImageWidth
    const maxY = typeof window !== 'undefined' 
      ? window.innerHeight - imageHeight - padding * 2 
      : 800

    return validImages.map((image) => {
      const width = Math.round(minImageWidth + seededRandom(image.id, 0) * widthRange)
      const y = Math.round(padding + seededRandom(image.id, 1) * maxY)
      // Random duration between 20-40s (slower base) adjusted by multiplier
      const baseDuration = 30 + seededRandom(image.id, 2) * 20
      const duration = baseDuration / velocityMultiplier
      // Stagger start positions so they don't all begin at once
      const delay = -seededRandom(image.id, 3) * duration

      return {
        id: image.id,
        url: getImageUrl(image)!,
        title: image.title,
        width,
        y,
        duration,
        delay,
      }
    })
  }, [images, velocityMultiplier, minImageWidth, maxImageWidth, imageHeight, padding])

  const handleInteraction = useCallback(() => {
    onInteraction()
  }, [onInteraction])

  if (animatedImages.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden"
          onClick={handleInteraction}
          onTouchStart={handleInteraction}
        >
          {/* Animated Images */}
          {animatedImages.map((image) => (
            <AnimatedImageItem
              key={image.id}
              image={image}
              imageHeight={imageHeight}
            />
          ))}

          {/* Hint Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <p className="text-sm font-medium tracking-wider text-white/60">
              {hintText}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Individual animated image component */
interface AnimatedImageItemProps {
  image: AnimatedImage
  imageHeight: number
}

function AnimatedImageItem({ image, imageHeight }: AnimatedImageItemProps) {
  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        width: image.width,
        height: imageHeight,
        top: image.y,
      }}
      initial={{ x: '100vw' }}
      animate={{ x: '-100%' }}
      transition={{
        duration: image.duration,
        repeat: Infinity,
        ease: 'linear',
        delay: image.delay,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.title}
        className="h-full w-full object-contain"
        loading="lazy"
        draggable={false}
      />
    </motion.div>
  )
}
