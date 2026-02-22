import { motion } from 'motion/react'

const easeOut = [0.4, 0, 0.2, 1] as const

interface PrivacyFormStepNavigationProps {
  currentStep: number
  steps: Array<{ id: number; label: string }>
}

export function PrivacyFormStepNavigation({ currentStep, steps }: PrivacyFormStepNavigationProps) {
  return (
    <div className="w-20 lg:w-28 shrink-0 relative hidden md:block">
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-8">
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="h-px w-2 theme-bg-secondary" />
        ))}
      </div>

      <nav
        aria-label="Formularschritte"
        className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 pl-0"
      >
        {steps.map((step) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <div key={step.id} className="flex items-center relative h-5">
              <motion.div
                className="absolute left-0 h-px bg-current"
                initial={false}
                animate={{
                  width: isActive ? 28 : isCompleted ? 18 : 10,
                  opacity: isActive ? 1 : isCompleted ? 0.7 : 0.4,
                }}
                transition={{ duration: 0.4, ease: easeOut }}
              />
              <motion.span
                className="absolute left-8 text-xs font-medium theme-text-secondary"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : isCompleted ? 0.85 : 0.6,
                  x: isActive ? 0 : isCompleted ? 0 : -8,
                }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                {step.label}
              </motion.span>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
