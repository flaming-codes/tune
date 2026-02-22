'use client'

import React, { useActionState, useCallback, useEffect, useState, startTransition } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { submitPrivacyForm, type PrivacyFormState } from '../actions/privacy-form'
import { PrivacyFormConsentStep } from './privacy-form/PrivacyFormConsentStep'
import { PrivacyFormFooterNavigation } from './privacy-form/PrivacyFormFooterNavigation'
import { PrivacyFormOwnerStep } from './privacy-form/PrivacyFormOwnerStep'
import { PrivacyFormPatientStep } from './privacy-form/PrivacyFormPatientStep'
import { PrivacyFormSuccessState } from './privacy-form/PrivacyFormSuccessState'
import { initialFormData, privacyFormSteps, type PrivacyFormData } from './privacy-form/types'
import { validatePrivacyForm, validatePrivacyStep } from './privacy-form/validation'

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

  const [state, formAction, isPending] = useActionState(submitPrivacyForm, initialState)

  const totalSteps = privacyFormSteps.length

  const updateField = useCallback(
    <K extends keyof PrivacyFormData>(field: K, value: PrivacyFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const handleNext = useCallback(() => {
    setShowValidation(true)
    const stepErrors = validatePrivacyStep(formData, currentStep as 1 | 2 | 3)
    setValidationErrors(stepErrors)

    if (Object.keys(stepErrors).length === 0 && currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
      setShowValidation(false)
      setValidationErrors({})
    }
  }, [currentStep, formData, totalSteps])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
      setShowValidation(false)
      setValidationErrors({})
    }
  }, [currentStep])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
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
    [formAction, formData],
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

    setSuccessMessage(state.message)

    const resetTimer = window.setTimeout(() => {
      setCurrentStep(1)
      setDirection(0)
      setFormData(initialFormData)
      setShowValidation(false)
      setValidationErrors({})
      setSuccessMessage(undefined)
    }, 4000)

    return () => {
      window.clearTimeout(resetTimer)
    }
  }, [state.message, state.success])

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
            />
          </form>
        </div>
      </div>
    </div>
  )
}
