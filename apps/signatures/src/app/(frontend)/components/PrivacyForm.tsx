'use client'

import React, {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { submitPrivacyForm, type PrivacyFormState } from '../actions/privacy-form'
import { PrivacyFormConsentStep } from './privacy-form/PrivacyFormConsentStep'
import { PrivacyFormFooterNavigation } from './privacy-form/PrivacyFormFooterNavigation'
import { PrivacyFormOwnerStep } from './privacy-form/PrivacyFormOwnerStep'
import { PrivacyFormPatientStep } from './privacy-form/PrivacyFormPatientStep'
import { PrivacyFormSuccessState } from './privacy-form/PrivacyFormSuccessState'
import { initialFormData, privacyFormSteps, type PrivacyFormData } from './privacy-form/types'
import { validatePrivacyForm, validatePrivacyStep } from './privacy-form/validation'
import { useWakeLock } from '../hooks/useWakeLock'

const initialState: PrivacyFormState = {}

const easeOut = [0.4, 0, 0.2, 1] as const

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
  }),
}

export function PrivacyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<PrivacyFormData>(initialFormData)
  const [showValidation, setShowValidation] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
  const [lastActivityAt, setLastActivityAt] = useState(() => Date.now())
  const [isIdleWarningOpen, setIsIdleWarningOpen] = useState(false)
  const [idleSecondsRemaining, setIdleSecondsRemaining] = useState(10)

  const [state, formAction, isPending] = useActionState(submitPrivacyForm, initialState)

  const totalSteps = privacyFormSteps.length
  const isFormDirty = useMemo(
    () =>
      (Object.keys(initialFormData) as Array<keyof PrivacyFormData>).some(
        (key) => formData[key] !== initialFormData[key],
      ),
    [formData],
  )

  // Prevent device from sleeping.
  useWakeLock({ enabled: true /* isFormDirty && !successMessage */ })

  const resetForm = useCallback(() => {
    setCurrentStep(1)
    setDirection(0)
    setFormData(initialFormData)
    setShowValidation(false)
    setValidationErrors({})
    setSuccessMessage(undefined)
    setIsIdleWarningOpen(false)
    setIdleSecondsRemaining(10)
    setLastActivityAt(Date.now())
  }, [])

  const handleUserActivity = useCallback(() => {
    if (successMessage) {
      return
    }
    setIsIdleWarningOpen(false)
    setIdleSecondsRemaining(10)
    setLastActivityAt(Date.now())
  }, [successMessage])

  const handleProlongSession = useCallback(() => {
    setIsIdleWarningOpen(false)
    setIdleSecondsRemaining(10)
    setLastActivityAt(Date.now())
  }, [])

  const updateField = useCallback(
    <K extends keyof PrivacyFormData>(field: K, value: PrivacyFormData[K]) => {
      handleUserActivity()
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [handleUserActivity],
  )

  const handleNext = useCallback(() => {
    handleUserActivity()
    setShowValidation(true)
    const stepErrors = validatePrivacyStep(formData, currentStep as 1 | 2 | 3)
    setValidationErrors(stepErrors)

    if (Object.keys(stepErrors).length === 0 && currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
      setShowValidation(false)
      setValidationErrors({})
    }
  }, [currentStep, formData, handleUserActivity, totalSteps])

  const handleBack = useCallback(() => {
    handleUserActivity()
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
      setShowValidation(false)
      setValidationErrors({})
    }
  }, [currentStep, handleUserActivity])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      handleUserActivity()
      setShowValidation(true)
      const formErrors = validatePrivacyForm(formData)
      setValidationErrors(formErrors)

      if (Object.keys(formErrors).length === 0) {
        const submissionData = {
          ...formData,
          patientAnimalType:
            formData.patientAnimalType === '' ? undefined : formData.patientAnimalType,
          patientGender: formData.patientGender === '' ? undefined : formData.patientGender,
        }

        startTransition(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formAction(submissionData as any)
        })
      }
    },
    [formAction, formData, handleUserActivity],
  )

  const isFieldInvalid = useCallback(
    (field: keyof PrivacyFormData) =>
      showValidation &&
      (Boolean(validationErrors[field]?.length) || Boolean(state.errors?.[field]?.length)),
    [showValidation, state.errors, validationErrors],
  )

  useEffect(() => {
    if (!state.success) {
      return
    }

    /* eslint-disable react-hooks/set-state-in-effect */
    setSuccessMessage(state.message)
    /* eslint-enable react-hooks/set-state-in-effect */

    const resetTimer = window.setTimeout(() => {
      resetForm()
    }, 4000)

    return () => {
      window.clearTimeout(resetTimer)
    }
  }, [resetForm, state.message, state.success])

  useEffect(() => {
    if (successMessage || !isFormDirty) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setIsIdleWarningOpen(false)
      setIdleSecondsRemaining(10)
      /* eslint-enable react-hooks/set-state-in-effect */
      return
    }

    const warningTimer = window.setTimeout(() => {
      setIdleSecondsRemaining(10)
      setIsIdleWarningOpen(true)
    }, 50000)

    const resetTimer = window.setTimeout(() => {
      resetForm()
    }, 60000)

    return () => {
      window.clearTimeout(warningTimer)
      window.clearTimeout(resetTimer)
    }
  }, [isFormDirty, lastActivityAt, resetForm, successMessage])

  useEffect(() => {
    if (!isIdleWarningOpen) {
      return
    }

    const countdownInterval = window.setInterval(() => {
      setIdleSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      window.clearInterval(countdownInterval)
    }
  }, [isIdleWarningOpen])

  if (successMessage) {
    return <PrivacyFormSuccessState message={successMessage} />
  }

  return (
    <div className="min-h-screen md:h-screen flex theme-bg-primary theme-text-primary font-sans">
      <div className="flex-1 h-screen overflow-hidden">
        <div className="max-w-2xl w-full h-full px-6 md:px-8 lg:px-12 mx-auto md:mx-0 md:ml-[5vw] lg:ml-[10vw] xl:ml-[15vw]">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-[20svh] pb-8 md:pb-10">
              <div className="space-y-10">
                <AnimatePresence>
                  {state.message && !state.success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      aria-live="polite"
                      className="text-sm text-red-500"
                    >
                      {state.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="min-h-80 overflow-hidden relative">
                  <AnimatePresence mode="wait" custom={direction}>
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="px-2"
                      >
                        <PrivacyFormOwnerStep
                          formData={formData}
                          updateField={updateField}
                          isFieldInvalid={isFieldInvalid}
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="px-2"
                      >
                        <PrivacyFormPatientStep
                          formData={formData}
                          updateField={updateField}
                          isFieldInvalid={isFieldInvalid}
                        />
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="px-2"
                      >
                        <PrivacyFormConsentStep
                          formData={formData}
                          updateField={updateField}
                          isFieldInvalid={isFieldInvalid}
                          isPending={isPending}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <PrivacyFormFooterNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPending={isPending}
              onBack={handleBack}
              onNext={handleNext}
              onReset={resetForm}
            />
          </form>
        </div>
      </div>

      <AlertDialog.Root open={isIdleWarningOpen} onOpenChange={setIsIdleWarningOpen}>
        <AnimatePresence>
          {isIdleWarningOpen && (
            <AlertDialog.Portal forceMount>
              <AlertDialog.Overlay asChild>
                <motion.div
                  key="idle-overlay"
                  className="fixed inset-0 z-40 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AlertDialog.Overlay>

              <AlertDialog.Content asChild>
                <motion.div
                  key="idle-content"
                  className="fixed left-1/2 top-1/2 z-50 w-[min(34rem,92vw)] -translate-x-1/2 -translate-y-1/2 border theme-border-primary theme-bg-primary p-6 shadow-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertDialog.Title className="text-lg font-medium theme-text-primary">
                    Sitzung läuft gleich ab
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mt-2 text-sm theme-text-secondary">
                    Keine Eingabe erkannt. In {idleSecondsRemaining} Sekunden wird das Formular
                    zurückgesetzt.
                  </AlertDialog.Description>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <AlertDialog.Cancel asChild>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border theme-border-primary theme-text-secondary hover:theme-text-primary hover:theme-bg-secondary transition-colors duration-200 rounded-none"
                      >
                        Jetzt zurücksetzen
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        type="button"
                        onClick={handleProlongSession}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium theme-bg-dark-offset theme-text-white hover:opacity-90 transition-opacity duration-200 rounded-none"
                      >
                        1 Minute verlängern
                      </button>
                    </AlertDialog.Action>
                  </div>
                </motion.div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          )}
        </AnimatePresence>
      </AlertDialog.Root>
    </div>
  )
}
