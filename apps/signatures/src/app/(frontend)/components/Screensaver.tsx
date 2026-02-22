'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useCallback, useMemo, useReducer, useEffect, useRef, useLayoutEffect } from 'react'
import type { ScreensaverImage } from '@/payload-types'

export interface ScreensaverProps {
  /** Array of screensaver images to display */
  images: ScreensaverImage[]
  /** Whether the screensaver is currently active */
  isActive: boolean
  /** Callback when user interacts with screensaver (to reset timer) */
  onInteraction: () => void
  /** Maximum image height as percentage of viewport height */
  maxImageHeight?: number
  /** Interval between new images in ms */
  interval?: number
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

/** Stack item with randomized transform */
interface StackItem {
  id: number
  url: string
  title: string
  rotation: number
  scale: number
}

interface State {
  stack: StackItem[]
  isRunning: boolean
  seedCounter: number
}

type Action =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'ADD_IMAGE'; image: StackItem }
  | { type: 'CLEAR' }
  | { type: 'INCREMENT_SEED' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true }
    case 'STOP':
      return { ...state, isRunning: false }
    case 'ADD_IMAGE':
      return { ...state, stack: [...state.stack, action.image].slice(-10) }
    case 'CLEAR':
      return { ...state, stack: [] }
    case 'INCREMENT_SEED':
      return { ...state, seedCounter: state.seedCounter + 1 }
    default:
      return state
  }
}

/**
 * Screensaver component with a stack animation.
 * Images appear one at a time in the center with randomized rotation and scale,
 * stacking on top of each other every few seconds.
 */
export function Screensaver({
  images,
  isActive,
  onInteraction,
  maxImageHeight = 50,
  interval = 3000,
}: ScreensaverProps) {
  const [state, dispatch] = useReducer(reducer, {
    stack: [],
    isRunning: false,
    seedCounter: 0,
  })

  const { stack, isRunning } = state

  // Refs for accessing latest state in interval
  const stateRef = useRef(state)
  const imagesRef = useRef(images)

  // Update refs in layout effect
  useLayoutEffect(() => {
    stateRef.current = state
    imagesRef.current = images
  })

  // Filter valid images
  const validImages = useMemo(() => {
    return images.filter(getImageUrl)
  }, [images])

  // Handle activation/deactivation
  useEffect(() => {
    if (isActive && !isRunning) {
      dispatch({ type: 'START' })
    } else if (!isActive && isRunning) {
      dispatch({ type: 'STOP' })
      dispatch({ type: 'CLEAR' })
    }
  }, [isActive, isRunning])

  // Manage interval
  useEffect(() => {
    if (!isRunning || validImages.length === 0) {
      return
    }

    // Initialize with first image if stack is empty
    if (stack.length === 0) {
      const timer = setTimeout(() => {
        const currentState = stateRef.current
        const currentImages = imagesRef.current.filter(getImageUrl)
        if (currentImages.length === 0) return

        const seed = currentState.seedCounter + 1
        dispatch({ type: 'INCREMENT_SEED' })

        const firstImage = currentImages[0]
        const firstItem: StackItem = {
          id: seed,
          url: getImageUrl(firstImage)!,
          title: firstImage.title,
          rotation: (seededRandom(seed, 0) - 0.5) * 12,
          scale: 0.9 + seededRandom(seed, 1) * 0.2,
        }
        dispatch({ type: 'ADD_IMAGE', image: firstItem })
      }, 0)

      return () => clearTimeout(timer)
    }

    // Set up interval for subsequent images
    const timer = setInterval(() => {
      const currentState = stateRef.current
      const currentImages = imagesRef.current.filter(getImageUrl)
      if (currentImages.length === 0) return

      const seed = currentState.seedCounter + 1
      dispatch({ type: 'INCREMENT_SEED' })

      const nextIndex = currentState.stack.length % currentImages.length
      const image = currentImages[nextIndex]

      const newItem: StackItem = {
        id: seed,
        url: getImageUrl(image)!,
        title: image.title,
        rotation: (seededRandom(seed, 0) - 0.5) * 12,
        scale: 0.9 + seededRandom(seed, 1) * 0.2,
      }
      dispatch({ type: 'ADD_IMAGE', image: newItem })
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [isRunning, validImages, interval, stack.length])

  const handleInteraction = useCallback(() => {
    onInteraction()
  }, [onInteraction])

  if (validImages.length === 0) {
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
          {/* Image Stack - Centered with generous negative space */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div className="relative w-full h-full max-w-[70vw] max-h-[70vh]">
              <AnimatePresence mode="popLayout">
                {stack.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layoutId={`image-${item.id}`}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: item.rotation - 2,
                    }}
                    animate={{
                      opacity: 1,
                      scale: item.scale,
                      rotate: item.rotation,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      zIndex: index,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                      style={{
                        maxHeight: `${maxImageHeight}vh`,
                      }}
                      loading="lazy"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Hint Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <p className="text-sm font-medium tracking-wider text-white/60">
              zum Fortfahren berühren
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
