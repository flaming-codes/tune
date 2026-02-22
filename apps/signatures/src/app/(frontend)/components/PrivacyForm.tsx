'use client'

import React, { useState, useCallback, useActionState, startTransition } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SignaturePad } from './SignaturePad'
import { submitPrivacyForm, type PrivacyFormState } from '../actions/privacy-form'

const initialState: PrivacyFormState = {}

const easeOut = [0.4, 0, 0.2, 1] as const

const contentVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
}

interface FormData {
  ownerLastName: string
  ownerFirstName: string
  ownerTitle: string
  ownerDateOfBirth: string
  ownerStreet: string
  ownerPostalCode: string
  ownerCity: string
  ownerPhone: string
  ownerEmail: string

  patientName: string
  patientAnimalType: 'dog' | 'cat' | 'other' | ''
  patientBreed: string
  patientColor: string
  patientGender: 'male' | 'female' | 'neutered' | ''
  patientDateOfBirth: string
  patientWeight: string
  patientSpecialNotes: string

  signatureDataUrl: string
}

const initialFormData: FormData = {
  ownerLastName: '',
  ownerFirstName: '',
  ownerTitle: '',
  ownerDateOfBirth: '',
  ownerStreet: '',
  ownerPostalCode: '',
  ownerCity: '',
  ownerPhone: '',
  ownerEmail: '',

  patientName: '',
  patientAnimalType: '',
  patientBreed: '',
  patientColor: '',
  patientGender: '',
  patientDateOfBirth: '',
  patientWeight: '',
  patientSpecialNotes: '',

  signatureDataUrl: '',
}

const steps = [
  { id: 1, label: 'Besitzer', shortLabel: '01' },
  { id: 2, label: 'Patient', shortLabel: '02' },
  { id: 3, label: 'Einverständnis', shortLabel: '03' },
]

export function PrivacyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showValidation, setShowValidation] = useState(false)

  const [state, formAction, isPending] = useActionState(submitPrivacyForm, initialState)

  const totalSteps = steps.length

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

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
  }, [currentStep, validateStep, totalSteps])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
      setShowValidation(false)
    }
  }, [currentStep])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
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
    [currentStep, formData, formAction, validateStep],
  )

  const isFieldInvalid = useCallback(
    (field: keyof FormData) => {
      return showValidation && !formData[field]
    },
    [showValidation, formData],
  )

  // Success state
  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="min-h-[60vh] flex items-center justify-center"
      >
        <div className="text-center max-w-md">
          <div className="w-12 h-12 mx-auto mb-8 rounded-full border border-neutral-200 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm theme-text-tertiary mb-3">Vielen Dank</p>
          <p className="text-lg theme-text-secondary leading-relaxed">
            {state.message}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-[70vh] flex">
      {/* Left Timeline */}
      <div className="w-24 lg:w-32 flex-shrink-0 relative">
        <div className="fixed top-1/2 -translate-y-1/2 w-24 lg:w-32 pl-6 lg:pl-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-neutral-200">
              <motion.div
                className="absolute top-0 left-0 w-full bg-neutral-900"
                initial={{ height: '0%' }}
                animate={{
                  height: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: easeOut }}
              />
            </div>

            {/* Steps */}
            <div className="relative space-y-12">
              {steps.map((step) => {
                const isActive = step.id === currentStep
                const isCompleted = step.id < currentStep
                const _isFuture = step.id > currentStep

                return (
                  <motion.div
                    key={step.id}
                    className="flex items-center gap-4"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : isCompleted ? 0.6 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Dot */}
                    <div className="relative">
                      <motion.div
                        className="w-[11px] h-[11px] rounded-full border transition-colors duration-300"
                        animate={{
                          borderColor: isActive || isCompleted ? '#171717' : '#d4d4d4',
                          backgroundColor: isCompleted ? '#171717' : '#ffffff',
                        }}
                      />
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border border-neutral-900"
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-xs tracking-wide transition-colors duration-300 ${
                        isActive
                          ? 'theme-text-primary'
                          : isCompleted
                            ? 'theme-text-secondary'
                            : 'theme-text-tertiary'
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full px-6 lg:px-12">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Error message */}
            <AnimatePresence>
              {state.message && !state.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-red-500"
                >
                  {state.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Steps */}
            <div className="min-h-[320px]">
              <AnimatePresence mode="wait" custom={direction}>
                {/* Step 1: Owner Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <p className="text-xs tracking-wide theme-text-tertiary uppercase">
                        Schritt 01
                      </p>
                      <h2 className="text-xl font-medium tracking-tight-custom">
                        Patientenbesitzer
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* Name Row */}
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={formData.ownerTitle}
                            onChange={(e) => updateField('ownerTitle', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                            placeholder="Titel"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={formData.ownerFirstName}
                            onChange={(e) => updateField('ownerFirstName', e.target.value)}
                            className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                              isFieldInvalid('ownerFirstName')
                                ? 'border-red-300'
                                : 'theme-border-primary'
                            }`}
                            placeholder="Vorname *"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={formData.ownerLastName}
                            onChange={(e) => updateField('ownerLastName', e.target.value)}
                            className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                              isFieldInvalid('ownerLastName')
                                ? 'border-red-300'
                                : 'theme-border-primary'
                            }`}
                            placeholder="Nachname *"
                          />
                        </div>
                      </div>

                      {/* Birth Date */}
                      <div>
                        <input
                          type="date"
                          value={formData.ownerDateOfBirth}
                          onChange={(e) => updateField('ownerDateOfBirth', e.target.value)}
                          className="w-full sm:w-48 px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                        />
                        <p className="text-xs theme-text-tertiary mt-1">Geburtsdatum</p>
                      </div>

                      {/* Address */}
                      <div>
                        <input
                          type="text"
                          value={formData.ownerStreet}
                          onChange={(e) => updateField('ownerStreet', e.target.value)}
                          className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                            isFieldInvalid('ownerStreet')
                              ? 'border-red-300'
                              : 'theme-border-primary'
                          }`}
                          placeholder="Straße, Hausnummer *"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            value={formData.ownerPostalCode}
                            onChange={(e) => updateField('ownerPostalCode', e.target.value)}
                            className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                              isFieldInvalid('ownerPostalCode')
                                ? 'border-red-300'
                                : 'theme-border-primary'
                            }`}
                            placeholder="PLZ *"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.ownerCity}
                            onChange={(e) => updateField('ownerCity', e.target.value)}
                            className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                              isFieldInvalid('ownerCity')
                                ? 'border-red-300'
                                : 'theme-border-primary'
                            }`}
                            placeholder="Ort *"
                          />
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="tel"
                            value={formData.ownerPhone}
                            onChange={(e) => updateField('ownerPhone', e.target.value)}
                            className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                              isFieldInvalid('ownerPhone')
                                ? 'border-red-300'
                                : 'theme-border-primary'
                            }`}
                            placeholder="Telefon *"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            value={formData.ownerEmail}
                            onChange={(e) => updateField('ownerEmail', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                            placeholder="E-Mail"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Patient Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <p className="text-xs tracking-wide theme-text-tertiary uppercase">
                        Schritt 02
                      </p>
                      <h2 className="text-xl font-medium tracking-tight-custom">Patient</h2>
                    </div>

                    <div className="space-y-6">
                      {/* Patient Name */}
                      <div>
                        <input
                          type="text"
                          value={formData.patientName}
                          onChange={(e) => updateField('patientName', e.target.value)}
                          className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm ${
                            isFieldInvalid('patientName')
                              ? 'border-red-300'
                              : 'theme-border-primary'
                          }`}
                          placeholder="Name des Tieres *"
                        />
                      </div>

                      {/* Animal Type */}
                      <div className="space-y-3">
                        <p className="text-xs theme-text-tertiary uppercase tracking-wide">
                          Tierart {isFieldInvalid('patientAnimalType') && (
                            <span className="text-red-400">*</span>
                          )}
                        </p>
                        <div className="flex gap-3">
                          {[
                            { value: 'dog', label: 'Hund' },
                            { value: 'cat', label: 'Katze' },
                            { value: 'other', label: 'Andere' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                updateField(
                                  'patientAnimalType',
                                  option.value as FormData['patientAnimalType'],
                                )
                              }
                              className={`px-4 py-2 text-sm border transition-all duration-200 ${
                                formData.patientAnimalType === option.value
                                  ? 'border-neutral-900 bg-neutral-900 text-white'
                                  : 'border-neutral-200 theme-text-secondary hover:border-neutral-400'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Breed & Color */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            value={formData.patientBreed}
                            onChange={(e) => updateField('patientBreed', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                            placeholder="Rasse"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.patientColor}
                            onChange={(e) => updateField('patientColor', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                            placeholder="Farbe"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className="space-y-3">
                        <p className="text-xs theme-text-tertiary uppercase tracking-wide">
                          Geschlecht
                        </p>
                        <div className="flex gap-3">
                          {[
                            { value: 'male', label: 'Männlich' },
                            { value: 'female', label: 'Weiblich' },
                            { value: 'neutered', label: 'Kastriert' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                updateField(
                                  'patientGender',
                                  option.value as FormData['patientGender'],
                                )
                              }
                              className={`px-4 py-2 text-sm border transition-all duration-200 ${
                                formData.patientGender === option.value
                                  ? 'border-neutral-900 bg-neutral-900 text-white'
                                  : 'border-neutral-200 theme-text-secondary hover:border-neutral-400'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Birth Date & Weight */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="date"
                            value={formData.patientDateOfBirth}
                            onChange={(e) => updateField('patientDateOfBirth', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                          />
                          <p className="text-xs theme-text-tertiary mt-1">Geburtsdatum</p>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.patientWeight}
                            onChange={(e) => updateField('patientWeight', e.target.value)}
                            className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors text-sm"
                            placeholder="Gewicht"
                          />
                        </div>
                      </div>

                      {/* Special Notes */}
                      <div>
                        <textarea
                          rows={3}
                          value={formData.patientSpecialNotes}
                          onChange={(e) => updateField('patientSpecialNotes', e.target.value)}
                          className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/40 focus:outline-none focus:border-neutral-400 transition-colors resize-none text-sm"
                          placeholder="Besondere Hinweise (Allergien, Unverträglichkeiten...)"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Consent & Signature */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <p className="text-xs tracking-wide theme-text-tertiary uppercase">
                        Schritt 03
                      </p>
                      <h2 className="text-xl font-medium tracking-tight-custom">
                        Datenschutzerklärung
                      </h2>
                    </div>

                    {/* Consent Text */}
                    <div className="py-6 border-y theme-border-primary">
                      <p className="text-sm theme-text-secondary leading-relaxed">
                        Ich bestätige hiermit mit meiner Unterschrift, dass es sich um mein eigenes
                        Tier handelt oder, dass die Behandlung vom Tierhalter ausdrücklich gewünscht
                        wird. Ich erkläre mich einverstanden, dass meine Daten im Rahmen der
                        Praxistätigkeit unter Wahrung der DSGVO elektronisch verarbeitet werden
                        dürfen.
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="space-y-3">
                      <p className="text-xs theme-text-tertiary uppercase tracking-wide">
                        Unterschrift {isFieldInvalid('signatureDataUrl') && (
                          <span className="text-red-400">*</span>
                        )}
                      </p>
                      <SignaturePad
                        value={formData.signatureDataUrl}
                        onChange={(value) => updateField('signatureDataUrl', value)}
                        error={isFieldInvalid('signatureDataUrl') ? 'Erforderlich' : undefined}
                        disabled={isPending}
                      />
                    </div>

                    {/* Date */}
                    <p className="text-sm theme-text-secondary">
                      <span className="theme-text-tertiary">Datum:</span>{' '}
                      {new Date().toLocaleDateString('de-AT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || isPending}
                className={`text-sm theme-text-secondary hover:theme-text-primary transition-colors ${
                  currentStep === 1 ? 'invisible' : ''
                }`}
              >
                Zurück
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
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
          </form>
        </div>
      </div>
    </div>
  )
}
