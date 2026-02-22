import { motion } from 'motion/react'

const easeOut = [0.4, 0, 0.2, 1] as const

interface PrivacyFormSuccessStateProps {
  message?: string
}

export function PrivacyFormSuccessState({ message }: PrivacyFormSuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="fixed inset-0 z-30 h-dvh overflow-hidden overscroll-none flex items-center justify-center theme-bg-primary theme-text-primary font-sans"
    >
      <div className="text-center max-w-2xl px-8">
        <h2 className="text-4xl md:text-4xl lg:text-4xl font-medium tracking-tight leading-tight mb-6">
          <span className="theme-text-primary">Danke!</span>{' '}
          <span className="theme-text-tertiary">Alles erledigt.</span>
        </h2>
        <p className="text-xl theme-text-secondary leading-relaxed">{message}</p>
      </div>
    </motion.div>
  )
}
