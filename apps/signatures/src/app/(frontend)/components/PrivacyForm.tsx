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
        className="min-h-screen flex items-center justify-center theme-bg-primary theme-text-primary font-sans"
      >
        <div className="text-center max-w-2xl px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6">
            <span className="theme-text-primary">Vielen Dank.</span>{' '}
            <span className="theme-text-tertiary">Ihre Daten wurden erfolgreich übermittelt.</span>
          </h2>
          <p className="text-xl theme-text-secondary leading-relaxed">{state.message}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen md:h-screen flex theme-bg-primary theme-text-primary font-sans">
      {/* Left Navigation - Ruler Style */}
      <div className="w-20 lg:w-28 shrink-0 relative hidden md:block">
        {/* Faint ticks */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-8">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-px w-2 theme-bg-secondary" />
          ))}
        </div>

        {/* Active steps */}
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

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-hidden md:ml-6 lg:ml-8">
        <div className="max-w-3xl mx-auto w-full h-full px-6 md:px-8 lg:px-12">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto py-8 md:py-10">
              <div className="space-y-10">
                {/* Error message */}
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

                {/* Form Steps */}
                <div className="min-h-80">
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
                        className="space-y-10"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                          <span className="theme-text-primary">Besitzer.</span>{' '}
                          <span className="theme-text-tertiary">
                            Bitte geben Sie Ihre Daten ein.
                          </span>
                        </h2>

                        <div className="space-y-6">
                          {/* Name Row */}
                          <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-2">
                              <input
                                type="text"
                                value={formData.ownerTitle}
                                onChange={(e) => updateField('ownerTitle', e.target.value)}
                                aria-label="Titel"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors"
                                placeholder="Titel"
                              />
                            </div>
                            <div className="col-span-5">
                              <input
                                type="text"
                                value={formData.ownerFirstName}
                                onChange={(e) => updateField('ownerFirstName', e.target.value)}
                                aria-label="Vorname"
                                aria-invalid={isFieldInvalid('ownerFirstName')}
                                className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
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
                                aria-label="Nachname"
                                aria-invalid={isFieldInvalid('ownerLastName')}
                                className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
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
                              aria-label="Geburtsdatum Besitzer"
                              className="w-full sm:w-64 px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-current transition-colors"
                            />
                            <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum</p>
                          </div>

                          {/* Address */}
                          <div>
                            <input
                              type="text"
                              value={formData.ownerStreet}
                              onChange={(e) => updateField('ownerStreet', e.target.value)}
                              aria-label="Straße und Hausnummer"
                              aria-invalid={isFieldInvalid('ownerStreet')}
                              className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
                                isFieldInvalid('ownerStreet')
                                  ? 'border-red-300'
                                  : 'theme-border-primary'
                              }`}
                              placeholder="Straße, Hausnummer *"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <input
                                type="text"
                                value={formData.ownerPostalCode}
                                onChange={(e) => updateField('ownerPostalCode', e.target.value)}
                                aria-label="Postleitzahl"
                                aria-invalid={isFieldInvalid('ownerPostalCode')}
                                className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
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
                                aria-label="Ort"
                                aria-invalid={isFieldInvalid('ownerCity')}
                                className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
                                  isFieldInvalid('ownerCity')
                                    ? 'border-red-300'
                                    : 'theme-border-primary'
                                }`}
                                placeholder="Ort *"
                              />
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <input
                                type="tel"
                                value={formData.ownerPhone}
                                onChange={(e) => updateField('ownerPhone', e.target.value)}
                                aria-label="Telefon"
                                aria-invalid={isFieldInvalid('ownerPhone')}
                                className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
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
                                aria-label="E-Mail"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors"
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
                        className="space-y-10"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                          <span className="theme-text-primary">Patient.</span>{' '}
                          <span className="theme-text-tertiary">Informationen zu Ihrem Tier.</span>
                        </h2>

                        <div className="space-y-6">
                          {/* Patient Name */}
                          <div>
                            <input
                              type="text"
                              value={formData.patientName}
                              onChange={(e) => updateField('patientName', e.target.value)}
                              aria-label="Name des Tieres"
                              aria-invalid={isFieldInvalid('patientName')}
                              className={`w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors ${
                                isFieldInvalid('patientName')
                                  ? 'border-red-300'
                                  : 'theme-border-primary'
                              }`}
                              placeholder="Name des Tieres *"
                            />
                          </div>

                          {/* Animal Type */}
                          <fieldset className="space-y-3">
                            <legend className="text-sm theme-text-tertiary">
                              Tierart{' '}
                              {isFieldInvalid('patientAnimalType') && (
                                <span className="text-red-400">*</span>
                              )}
                            </legend>
                            <div
                              role="radiogroup"
                              aria-label="Tierart"
                              aria-invalid={isFieldInvalid('patientAnimalType')}
                              className={`inline-flex overflow-hidden border ${
                                isFieldInvalid('patientAnimalType')
                                  ? 'border-red-300'
                                  : 'theme-border-primary'
                              }`}
                            >
                              {[
                                { value: 'dog', label: 'Hund' },
                                { value: 'cat', label: 'Katze' },
                                { value: 'other', label: 'Andere' },
                              ].map((option, index, list) => (
                                <label
                                  key={option.value}
                                  className={`cursor-pointer ${
                                    index < list.length - 1 ? 'border-r theme-border-primary' : ''
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="patientAnimalType"
                                    value={option.value}
                                    checked={formData.patientAnimalType === option.value}
                                    onChange={() =>
                                      updateField(
                                        'patientAnimalType',
                                        option.value as FormData['patientAnimalType'],
                                      )
                                    }
                                    className="sr-only peer"
                                    required
                                  />
                                  <span className="block px-4 py-2 text-sm font-medium theme-text-secondary transition-colors peer-checked:theme-bg-secondary peer-checked:theme-text-primary hover:theme-bg-secondary">
                                    {option.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </fieldset>

                          {/* Breed & Color */}
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <input
                                type="text"
                                value={formData.patientBreed}
                                onChange={(e) => updateField('patientBreed', e.target.value)}
                                aria-label="Rasse"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors"
                                placeholder="Rasse"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={formData.patientColor}
                                onChange={(e) => updateField('patientColor', e.target.value)}
                                aria-label="Farbe"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors"
                                placeholder="Farbe"
                              />
                            </div>
                          </div>

                          {/* Gender */}
                          <fieldset className="space-y-3">
                            <legend className="text-sm theme-text-tertiary">Geschlecht</legend>
                            <div
                              role="radiogroup"
                              aria-label="Geschlecht"
                              className="inline-flex overflow-hidden border theme-border-primary"
                            >
                              {[
                                { value: 'male', label: 'Männlich' },
                                { value: 'female', label: 'Weiblich' },
                                { value: 'neutered', label: 'Kastriert' },
                              ].map((option, index, list) => (
                                <label
                                  key={option.value}
                                  className={`cursor-pointer ${
                                    index < list.length - 1 ? 'border-r theme-border-primary' : ''
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="patientGender"
                                    value={option.value}
                                    checked={formData.patientGender === option.value}
                                    onChange={() =>
                                      updateField(
                                        'patientGender',
                                        option.value as FormData['patientGender'],
                                      )
                                    }
                                    className="sr-only peer"
                                  />
                                  <span className="block px-4 py-2 text-sm font-medium theme-text-secondary transition-colors peer-checked:theme-bg-secondary peer-checked:theme-text-primary hover:theme-bg-secondary">
                                    {option.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </fieldset>

                          {/* Birth Date & Weight */}
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <input
                                type="date"
                                value={formData.patientDateOfBirth}
                                onChange={(e) => updateField('patientDateOfBirth', e.target.value)}
                                aria-label="Geburtsdatum Tier"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-current transition-colors"
                              />
                              <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum</p>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={formData.patientWeight}
                                onChange={(e) => updateField('patientWeight', e.target.value)}
                                aria-label="Gewicht"
                                className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors"
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
                              aria-label="Besondere Hinweise"
                              className="w-full px-0 py-2.5 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors resize-none"
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
                        className="space-y-10"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                          <span className="theme-text-primary">Einverständnis.</span>{' '}
                          <span className="theme-text-tertiary">
                            Bitte unterschreiben Sie hier.
                          </span>
                        </h2>

                        {/* Consent Text */}
                        <div className="py-8 border-y theme-border-primary">
                          <p className="theme-text-secondary leading-relaxed">
                            Ich bestätige hiermit mit meiner Unterschrift, dass es sich um mein
                            eigenes Tier handelt oder, dass die Behandlung vom Tierhalter
                            ausdrücklich gewünscht wird. Ich erkläre mich einverstanden, dass meine
                            Daten im Rahmen der Praxistätigkeit unter Wahrung der DSGVO elektronisch
                            verarbeitet werden dürfen.
                          </p>
                        </div>

                        {/* Signature */}
                        <div className="space-y-4">
                          <p className="text-sm theme-text-tertiary">
                            Unterschrift{' '}
                            {isFieldInvalid('signatureDataUrl') && (
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
                        <p className="theme-text-secondary">
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
              </div>
            </div>

            {/* Navigation */}
            <div className="sticky bottom-0 z-10 flex items-center justify-between border-t theme-border-primary theme-bg-primary py-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || isPending}
                className={`text-sm theme-text-tertiary hover:theme-text-primary transition-colors ${
                  currentStep === 1 ? 'invisible' : ''
                }`}
              >
                Zurück
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center px-6 py-2 theme-bg-primary theme-text-primary border border-current text-sm font-medium hover:opacity-80 transition-opacity duration-200 rounded-none"
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center px-6 py-2 theme-bg-primary theme-text-primary border border-current text-sm font-medium hover:opacity-80 transition-opacity duration-200 rounded-none disabled:opacity-50"
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
          </form>
        </div>
      </div>
    </div>
  )
}
