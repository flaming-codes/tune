'use client'

import React, { useActionState, useCallback, useEffect, useRef, useState } from 'react'
import { useForm, getFormProps } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { AnimatePresence, motion } from 'motion/react'
import { submitPrivacyForm, type PrivacyFormActionResult } from '../actions/privacy-form'
import { PrivacyFormConsentStep } from './privacy-form/PrivacyFormConsentStep'
import { PrivacyFormFooterNavigation } from './privacy-form/PrivacyFormFooterNavigation'
import { PrivacyFormOwnerStep } from './privacy-form/PrivacyFormOwnerStep'
import { PrivacyFormPatientStep } from './privacy-form/PrivacyFormPatientStep'
import { PrivacyFormSuccessState } from './privacy-form/PrivacyFormSuccessState'
import { initialFormData, privacyFormSteps } from './privacy-form/types'
import { basePrivacySchema, stepSchemas, type PrivacyStep } from './privacy-form/validation'
import { useWakeLock } from '../hooks/useWakeLock'

const easeOut = [0.4, 0, 0.2, 1] as const

const stepFieldNames: Record<PrivacyStep, string[]> = {
  1: [
    'ownerLastName',
    'ownerFirstName',
    'ownerTitle',
    'ownerDateOfBirth',
    'ownerStreet',
    'ownerPostalCode',
    'ownerCity',
    'ownerPhone',
    'ownerEmail',
  ],
  2: [
    'patientName',
    'patientAnimalType',
    'patientBreed',
    'patientColor',
    'patientGender',
    'patientDateOfBirth',
    'patientWeight',
    'patientSpecialNotes',
  ],
  3: ['signatureDataUrl'],
}

export interface PrivacyFormProps {
  /** Callback when user performs any activity on the form */
  onActivity?: () => void
}

export function PrivacyForm({ onActivity }: PrivacyFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  const [lastResult, action, isPending] = useActionState(submitPrivacyForm, undefined)
  const [form, fields] = useForm({
    lastResult:
      lastResult && 'status' in lastResult && lastResult.status === 'success'
        ? undefined
        : (lastResult as PrivacyFormActionResult | undefined),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: basePrivacySchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    defaultValue: initialFormData,
  })

  const totalSteps = privacyFormSteps.length

  // Prevent device from sleeping while form is being filled
  useWakeLock({ enabled: form.dirty && !successMessage })

  const resetForm = useCallback(() => {
    setSuccessMessage(undefined)
    setCurrentStep(1)
    // The <form> element is unmounted while the success view is shown.
    // Defer to the next frame so the element is back in the DOM.
    // Use native reset (not conform's form.reset()) to avoid triggering
    // state changes that would re-fire the success effect in a loop.
    requestAnimationFrame(() => {
      formRef.current?.reset()
    })
  }, [])

  const handleUserActivity = useCallback(() => {
    if (successMessage) {
      return
    }
    onActivity?.()
  }, [onActivity, successMessage])

  const handleNext = useCallback(() => {
    handleUserActivity()

    if (!formRef.current || currentStep >= totalSteps) return

    const nativeFormData = new FormData(formRef.current)
    const stepSchema = stepSchemas[currentStep as PrivacyStep]
    const result = parseWithZod(nativeFormData, { schema: stepSchema })

    if (result.status !== 'success') {
      // Trigger error display on each field in this step
      for (const name of stepFieldNames[currentStep as PrivacyStep]) {
        form.validate({ name })
      }
      return
    }

    setCurrentStep((prev) => prev + 1)
  }, [currentStep, form, handleUserActivity, totalSteps])

  const handleBack = useCallback(() => {
    handleUserActivity()
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep, handleUserActivity])

  // Track which result we already handled so resetForm doesn't re-trigger the effect
  const handledResult = useRef<typeof lastResult>(undefined)

  // Detect server success
  useEffect(() => {
    if (
      lastResult &&
      lastResult !== handledResult.current &&
      'status' in lastResult &&
      lastResult.status === 'success' &&
      'message' in lastResult
    ) {
      handledResult.current = lastResult

      /* eslint-disable react-hooks/set-state-in-effect */
      setSuccessMessage(lastResult.message)
      /* eslint-enable react-hooks/set-state-in-effect */

      const resetTimer = window.setTimeout(() => {
        resetForm()
      }, 4000)

      return () => {
        window.clearTimeout(resetTimer)
      }
    }
  }, [lastResult, resetForm])

  if (successMessage) {
    return <PrivacyFormSuccessState message={successMessage} />
  }

  // Derive server error message for display
  const serverErrorMessage =
    lastResult &&
    'error' in lastResult &&
    typeof (lastResult as Record<string, unknown>).error === 'string'
      ? ((lastResult as Record<string, unknown>).error as string)
      : lastResult && 'status' in lastResult && lastResult.status === 'error' && form.errors?.length
        ? form.errors.join(', ')
        : undefined

  return (
    <div className="min-h-screen md:h-screen flex theme-bg-primary theme-text-primary font-sans">
      <div className="flex-1 h-screen overflow-hidden">
        <div className="max-w-2xl w-full h-full px-6 md:px-8 lg:px-12 mx-auto md:mx-0 md:ml-[5vw] lg:ml-[10vw] xl:ml-[15vw]">
          <form
            ref={formRef}
            {...getFormProps(form)}
            action={action}
            onInput={handleUserActivity}
            className="h-full flex flex-col"
          >
            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-[20svh] pb-8 md:pb-10">
              <div className="space-y-10">
                <AnimatePresence>
                  {serverErrorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      aria-live="polite"
                      className="text-sm text-red-500"
                    >
                      {serverErrorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="min-h-80 overflow-hidden">
                  <div className="grid">
                    {privacyFormSteps.map(({ id }) => {
                      const isActive = id === currentStep

                      return (
                        <motion.div
                          key={`step-${id}`}
                          className="col-start-1 row-start-1 px-2"
                          aria-hidden={!isActive}
                          inert={!isActive}
                          initial={false}
                          animate={{
                            x: isActive ? '0%' : id < currentStep ? '-12%' : '12%',
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: easeOut }}
                          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                        >
                          {id === 1 && <PrivacyFormOwnerStep fields={fields} />}
                          {id === 2 && <PrivacyFormPatientStep fields={fields} />}
                          {id === 3 && (
                            <PrivacyFormConsentStep
                              fields={fields}
                              isPending={isPending}
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
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
    </div>
  )
}
