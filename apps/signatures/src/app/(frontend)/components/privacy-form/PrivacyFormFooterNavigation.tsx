import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AnimatePresence, motion } from 'motion/react'

interface PrivacyFormFooterNavigationProps {
  currentStep: number
  totalSteps: number
  isPending: boolean
  onBack: () => void
  onNext: () => void
  onReset: () => void
}

export function PrivacyFormFooterNavigation({
  currentStep,
  totalSteps,
  isPending,
  onBack,
  onNext,
  onReset,
}: PrivacyFormFooterNavigationProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  return (
    <>
      <div className="sticky bottom-0 z-10 flex items-center justify-between theme-bg-primary-glass backdrop-blur-sm py-4">
        <div className="flex items-center gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              disabled={isPending}
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium border theme-border-primary theme-text-secondary hover:theme-text-primary hover:theme-bg-secondary transition-colors duration-200 rounded-none disabled:opacity-50"
            >
              Zurück
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsResetDialogOpen(true)}
            disabled={isPending}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium border theme-border-primary theme-text-secondary hover:theme-text-primary hover:theme-bg-secondary transition-colors duration-200 rounded-none disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center px-6 py-2 theme-bg-dark-offset theme-text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200 rounded-none"
          >
            Weiter
          </button>
        ) : (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center px-6 py-2 theme-bg-dark-offset theme-text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200 rounded-none disabled:opacity-50"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Wird gesendet...</span>
              </>
            ) : (
              <span>Absenden</span>
            )}
          </button>
        )}
      </div>

      <AlertDialog.Root open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AnimatePresence>
          {isResetDialogOpen && (
            <AlertDialog.Portal forceMount>
              <AlertDialog.Overlay asChild>
                <motion.div
                  key="reset-overlay"
                  className="fixed inset-0 z-40 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AlertDialog.Overlay>

              <AlertDialog.Content asChild>
                <motion.div
                  key="reset-content"
                  className="fixed left-1/2 top-1/2 z-50 w-[min(32rem,92vw)] -translate-x-1/2 -translate-y-1/2 border theme-border-primary theme-bg-primary p-6 shadow-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertDialog.Title className="text-lg font-medium theme-text-primary">
                    Formular zurücksetzen?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mt-2 text-sm theme-text-secondary">
                    Alle bisher eingegebenen Daten werden verworfen und das Formular beginnt wieder
                    beim ersten Schritt.
                  </AlertDialog.Description>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <AlertDialog.Cancel asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border theme-border-primary theme-text-secondary hover:theme-text-primary hover:theme-bg-secondary transition-colors duration-200 rounded-none"
                      >
                        Abbrechen
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium theme-bg-dark-offset theme-text-white hover:opacity-90 transition-opacity duration-200 rounded-none"
                      >
                        Zurücksetzen
                      </button>
                    </AlertDialog.Action>
                  </div>
                </motion.div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          )}
        </AnimatePresence>
      </AlertDialog.Root>
    </>
  )
}
