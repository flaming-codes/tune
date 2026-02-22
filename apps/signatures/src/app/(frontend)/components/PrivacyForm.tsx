'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SignaturePad } from './SignaturePad'
import { submitPrivacyForm, type PrivacyFormState } from '../actions/privacy-form'

const initialState: PrivacyFormState = {}

const easeOut = [0.4, 0, 0.2, 1] as const

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
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

export function PrivacyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showValidation, setShowValidation] = useState(false)

  const [state, formAction, isPending] = useActionState(submitPrivacyForm, initialState)

  const totalSteps = 3

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
  }, [currentStep, validateStep])

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
        // Filter out empty string values for enum fields
        const submissionData = {
          ...formData,
          patientAnimalType:
            formData.patientAnimalType === '' ? undefined : formData.patientAnimalType,
          patientGender: formData.patientGender === '' ? undefined : formData.patientGender,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formAction(submissionData as any)
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
        transition={{ duration: 0.5, ease: easeOut }}
        className="max-w-xl mx-auto text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium tracking-tight-custom mb-4">Vielen Dank!</h2>
        <p className="theme-text-secondary leading-relaxed">{state.message}</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {['Besitzer', 'Patient', 'Unterschrift'].map((label, index) => {
            const step = index + 1
            const isActive = step === currentStep
            const isCompleted = step < currentStep

            return (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : isActive
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'theme-bg-tertiary theme-text-tertiary'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:block ${
                    isActive || isCompleted ? 'theme-text-primary' : 'theme-text-tertiary'
                  }`}
                >
                  {label}
                </span>
                {step < totalSteps && (
                  <div
                    className={`w-12 sm:w-24 h-px ml-4 transition-colors duration-300 ${
                      isCompleted ? 'bg-neutral-900 dark:bg-white' : 'theme-border-primary'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Error message */}
      {state.message && !state.success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
        >
          {state.message}
        </motion.div>
      )}

      {/* Form Steps */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Owner Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-medium tracking-tight-custom mb-2">
                  Patientenbesitzer
                </h2>
                <p className="text-sm theme-text-secondary">
                  Bitte geben Sie Ihre persönlichen Daten ein.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1">
                  <label htmlFor="ownerTitle" className="block text-sm font-medium mb-2">
                    Titel <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="ownerTitle"
                    value={formData.ownerTitle}
                    onChange={(e) => updateField('ownerTitle', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="Dr./Mag."
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="ownerFirstName" className="block text-sm font-medium mb-2">
                    Vorname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ownerFirstName"
                    value={formData.ownerFirstName}
                    onChange={(e) => updateField('ownerFirstName', e.target.value)}
                    className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                      isFieldInvalid('ownerFirstName') ? 'border-red-500' : 'theme-border-primary'
                    }`}
                    placeholder="Max"
                  />
                  {isFieldInvalid('ownerFirstName') && (
                    <p className="mt-1 text-xs text-red-500">Vorname ist erforderlich</p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="ownerLastName" className="block text-sm font-medium mb-2">
                    Nachname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ownerLastName"
                    value={formData.ownerLastName}
                    onChange={(e) => updateField('ownerLastName', e.target.value)}
                    className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                      isFieldInvalid('ownerLastName') ? 'border-red-500' : 'theme-border-primary'
                    }`}
                    placeholder="Mustermann"
                  />
                  {isFieldInvalid('ownerLastName') && (
                    <p className="mt-1 text-xs text-red-500">Nachname ist erforderlich</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="ownerDateOfBirth" className="block text-sm font-medium mb-2">
                  Geburtsdatum <span className="theme-text-tertiary">(optional)</span>
                </label>
                <input
                  type="date"
                  id="ownerDateOfBirth"
                  value={formData.ownerDateOfBirth}
                  onChange={(e) => updateField('ownerDateOfBirth', e.target.value)}
                  className="w-full sm:w-auto px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="ownerStreet" className="block text-sm font-medium mb-2">
                  Straße/Hausnummer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ownerStreet"
                  value={formData.ownerStreet}
                  onChange={(e) => updateField('ownerStreet', e.target.value)}
                  className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                    isFieldInvalid('ownerStreet') ? 'border-red-500' : 'theme-border-primary'
                  }`}
                  placeholder="Musterstraße 123"
                />
                {isFieldInvalid('ownerStreet') && (
                  <p className="mt-1 text-xs text-red-500">Straße ist erforderlich</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ownerPostalCode" className="block text-sm font-medium mb-2">
                    PLZ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ownerPostalCode"
                    value={formData.ownerPostalCode}
                    onChange={(e) => updateField('ownerPostalCode', e.target.value)}
                    className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                      isFieldInvalid('ownerPostalCode') ? 'border-red-500' : 'theme-border-primary'
                    }`}
                    placeholder="1010"
                  />
                  {isFieldInvalid('ownerPostalCode') && (
                    <p className="mt-1 text-xs text-red-500">PLZ ist erforderlich</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ownerCity" className="block text-sm font-medium mb-2">
                    Ort <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ownerCity"
                    value={formData.ownerCity}
                    onChange={(e) => updateField('ownerCity', e.target.value)}
                    className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                      isFieldInvalid('ownerCity') ? 'border-red-500' : 'theme-border-primary'
                    }`}
                    placeholder="Wien"
                  />
                  {isFieldInvalid('ownerCity') && (
                    <p className="mt-1 text-xs text-red-500">Ort ist erforderlich</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ownerPhone" className="block text-sm font-medium mb-2">
                    Telefon/Mobil <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={(e) => updateField('ownerPhone', e.target.value)}
                    className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                      isFieldInvalid('ownerPhone') ? 'border-red-500' : 'theme-border-primary'
                    }`}
                    placeholder="+43 123 4567890"
                  />
                  {isFieldInvalid('ownerPhone') && (
                    <p className="mt-1 text-xs text-red-500">Telefon ist erforderlich</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ownerEmail" className="block text-sm font-medium mb-2">
                    E-Mail <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={(e) => updateField('ownerEmail', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="max@beispiel.at"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Patient Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-medium tracking-tight-custom mb-2">Patient</h2>
                <p className="text-sm theme-text-secondary">
                  Bitte geben Sie die Daten Ihres Tieres ein.
                </p>
              </div>

              <div>
                <label htmlFor="patientName" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => updateField('patientName', e.target.value)}
                  className={`w-full px-0 py-2 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
                    isFieldInvalid('patientName') ? 'border-red-500' : 'theme-border-primary'
                  }`}
                  placeholder="Bello"
                />
                {isFieldInvalid('patientName') && (
                  <p className="mt-1 text-xs text-red-500">Name ist erforderlich</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Tierart <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'dog', label: 'Hund' },
                    { value: 'cat', label: 'Katze' },
                    { value: 'other', label: 'Andere' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        updateField('patientAnimalType', option.value as FormData['patientAnimalType'])
                      }
                      className={`px-6 py-2 border text-sm font-medium transition-all duration-200 ${
                        formData.patientAnimalType === option.value
                          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                          : 'border-gray-200 theme-text-secondary hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {isFieldInvalid('patientAnimalType') && (
                  <p className="mt-2 text-xs text-red-500">Tierart ist erforderlich</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientBreed" className="block text-sm font-medium mb-2">
                    Rasse <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="patientBreed"
                    value={formData.patientBreed}
                    onChange={(e) => updateField('patientBreed', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="Labrador"
                  />
                </div>
                <div>
                  <label htmlFor="patientColor" className="block text-sm font-medium mb-2">
                    Farbe <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="patientColor"
                    value={formData.patientColor}
                    onChange={(e) => updateField('patientColor', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="Schwarz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Geschlecht <span className="theme-text-tertiary">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'male', label: 'Männlich' },
                    { value: 'female', label: 'Weiblich' },
                    { value: 'neutered', label: 'Kastriert' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        updateField('patientGender', option.value as FormData['patientGender'])
                      }
                      className={`px-6 py-2 border text-sm font-medium transition-all duration-200 ${
                        formData.patientGender === option.value
                          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                          : 'border-gray-200 theme-text-secondary hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientDateOfBirth" className="block text-sm font-medium mb-2">
                    Geburtsdatum <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="date"
                    id="patientDateOfBirth"
                    value={formData.patientDateOfBirth}
                    onChange={(e) => updateField('patientDateOfBirth', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="patientWeight" className="block text-sm font-medium mb-2">
                    Gewicht <span className="theme-text-tertiary">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="patientWeight"
                    value={formData.patientWeight}
                    onChange={(e) => updateField('patientWeight', e.target.value)}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="25 kg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="patientSpecialNotes" className="block text-sm font-medium mb-2">
                  Besondere Hinweise <span className="theme-text-tertiary">(optional)</span>
                </label>
                <textarea
                  id="patientSpecialNotes"
                  rows={3}
                  value={formData.patientSpecialNotes}
                  onChange={(e) => updateField('patientSpecialNotes', e.target.value)}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                  placeholder="Allergien, Unverträglichkeiten, Verhaltensauffälligkeiten..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Consent & Signature */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-medium tracking-tight-custom mb-2">
                  Datenschutzerklärung
                </h2>
                <p className="text-sm theme-text-secondary">
                  Bitte bestätigen Sie mit Ihrer Unterschrift.
                </p>
              </div>

              {/* Consent Text */}
              <div className="p-6 theme-bg-secondary rounded-lg">
                <p className="text-sm theme-text-secondary leading-relaxed">
                  Ich bestätige hiermit mit meiner Unterschrift, dass es sich um mein eigenes Tier
                  handelt oder, dass die Behandlung vom Tierhalter ausdrücklich gewünscht wird. Ich
                  erkläre mich einverstanden, dass meine Daten im Rahmen der Praxistätigkeit
                  (Rechnungen, Laborbefunde, Überweisungen und Impferinnerungen) unter Wahrung der
                  DSGVO elektronisch verarbeitet werden dürfen.
                </p>
              </div>

              {/* Signature */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Unterschrift <span className="text-red-500">*</span>
                </label>
                <SignaturePad
                  value={formData.signatureDataUrl}
                  onChange={(value) => updateField('signatureDataUrl', value)}
                  error={isFieldInvalid('signatureDataUrl') ? 'Unterschrift ist erforderlich' : undefined}
                  disabled={isPending}
                />
              </div>

              {/* Date */}
              <div className="pt-4 border-t theme-border-primary">
                <p className="text-sm theme-text-secondary">
                  Datum:{' '}
                  <span className="font-medium theme-text-primary">
                    {new Date().toLocaleDateString('de-AT', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-8 mt-8 border-t theme-border-primary">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1 || isPending}
          className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
            currentStep === 1
              ? 'invisible'
              : 'theme-text-secondary hover:theme-text-primary link-underline'
          }`}
        >
          Zurück
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Weiter
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    strokeWidth="4"
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
  )
}
