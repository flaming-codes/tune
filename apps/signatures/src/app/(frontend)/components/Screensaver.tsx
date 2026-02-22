'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useCallback } from 'react'

export interface ScreensaverProps {
  /** Whether the screensaver is currently active */
  isActive: boolean
  /** Callback when user interacts with screensaver (to reset timer) */
  onInteraction: () => void
}

/**
 * Screensaver component - temporarily simplified without image stack.
 */
export function Screensaver({ isActive, onInteraction }: ScreensaverProps) {
  const handleInteraction = useCallback(() => {
    onInteraction()
  }, [onInteraction])

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
          {/* Same container as the form for perfect alignment */}
          <div className="h-full">
            <div className="max-w-2xl w-full h-full px-6 md:px-8 lg:px-12 mx-auto md:mx-0 md:ml-[5vw] lg:ml-[10vw] xl:ml-[15vw]">
              <div className="h-full flex flex-col">
                <div className="flex-1 pt-[20svh] pb-8 md:pb-10 px-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="pointer-events-none"
                  >
                    <h2 className="text-3xl md:text-3xl lg:text-3xl font-medium tracking-tight leading-tight text-left">
                      <span className="text-white">Bitte berühren Sie den Bildschirm,</span>{' '}
                      <span className="text-white/60">
                        um Ihre Einwilligung zur Datenschutzerklärung zu geben.
                      </span>
                    </h2>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
