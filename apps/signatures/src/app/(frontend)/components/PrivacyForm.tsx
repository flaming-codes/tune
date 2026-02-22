'use client'

import React, { useActionState, useCallback, useState, startTransition } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { submitPrivacyForm, type PrivacyFormState } from '../actions/privacy-form'
import { PrivacyFormConsentStep } from './privacy-form/PrivacyFormConsentStep'
import { PrivacyFormFooterNavigation } from './privacy-form/PrivacyFormFooterNavigation'
import { PrivacyFormOwnerStep } from './privacy-form/PrivacyFormOwnerStep'
import { PrivacyFormPatientStep } from './privacy-form/PrivacyFormPatientStep'
import { PrivacyFormSuccessState } from './privacy-form/PrivacyFormSuccessState'
import { initialFormData, privacyFormSteps, type PrivacyFormData } from './privacy-form/types'

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

  const [state, formAction, isPending] = useActionState(submitPrivacyForm, initialState)

  const totalSteps = privacyFormSteps.length

  const updateField = useCallback(
    <K extends keyof PrivacyFormData>(field: K, value: PrivacyFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const validateStep = useCallback(
    (step: number): boolean => {
      const errors: string[] = []

      if (step === 1) {
        if (!formData.ownerLastName.trim()) errors.push('ownerLastName')
        if (!formData.ownerFirstName.trim()) errors.push('ownerFirstName')
        if (!formData.ownerStreet.trim()) errors.push('ownerStreet')
        if (!formData.ownerPostalCode.trim()) errors.push('ownerPostalCode')
        if (!formData.ownerCity.trim()) errors.push('ownerCity')
        if (!formData.ownerPhone.trim()) errors.push('ownerPhone')
      } else if (step === 2) {
        if (!formData.patientName.trim()) errors.push('patientName')
        if (!formData.patientAnimalType) errors.push('patientAnimalType')
      } else if (step === 3) {
        if (!formData.signatureDataUrl) errors.push('signature')
      }

      return errors.length === 0
    },
    [formData],
  )

  const handleNext = useCallback(() => {
    setShowValidation(true)
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
      setShowValidation(false)
    }
  }, [currentStep, totalSteps, validateStep])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
      setShowValidation(false)
    }
  }, [currentStep])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      setShowValidation(true)

      if (validateStep(currentStep)) {
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
    [currentStep, formAction, formData, validateStep],
  )

  const isFieldInvalid = useCallback(
    (field: keyof PrivacyFormData) => showValidation && !formData[field],
    [formData, showValidation],
  )

  if (state.success) {
    return <PrivacyFormSuccessState message={state.message} />
  }

  return (
    <div className="min-h-screen md:h-screen flex theme-bg-primary theme-text-primary font-sans">
      <div className="flex-1 h-screen overflow-hidden">
        <div className="max-w-2xl w-full h-full px-6 md:px-8 lg:px-12 mx-auto md:mx-0 md:ml-[5vw] lg:ml-[10vw] xl:ml-[15vw]">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pt-[20svh] pb-8 md:pb-10">
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
                  <AnimatePresence mode="popLayout" custom={direction}>
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="px-2 w-full absolute inset-0"
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
                        className="px-2 w-full absolute inset-0"
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
                        className="px-2 w-full absolute inset-0"
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
