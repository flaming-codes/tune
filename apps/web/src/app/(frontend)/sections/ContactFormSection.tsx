'use client'

import { useActionState } from 'react'
import type { FormEvent } from 'react'
import { submitContactForm, type ContactFormState } from '../actions/contact'
import { trackEvent } from '@/lib/analytics/client'

const initialState: ContactFormState = {
  message: '',
  errors: {},
}

interface ContactFormSectionProps {
  content: {
    eyebrow: string
    headline: string
    description: string
  }
}

export function ContactFormSection({ content }: ContactFormSectionProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const subject = formData.get('subject')

    trackEvent('contact_form_submit_attempt', {
      subject: typeof subject === 'string' ? subject : undefined,
    })
  }

  return (
    <section id="anfrage" className="py-24 lg:py-36 theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header - Left aligned like other sections */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
          <p className="mt-6 text-lg theme-text-secondary leading-relaxed">{content.description}</p>
        </div>

        {/* Form - Left aligned, max width constraint */}
        <div className="max-w-3xl">
          <form action={formAction} onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isPending}
                  aria-invalid={!!state.errors?.name}
                  aria-describedby={state.errors && state.errors.name ? 'name-error' : undefined}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  placeholder="Ihr Name"
                />
                {state.errors && state.errors.name && (
                  <p id="name-error" className="mt-2 text-xs theme-text-tertiary">
                    {state.errors.name.join(', ')}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isPending}
                  aria-invalid={!!state.errors?.email}
                  aria-describedby={state.errors && state.errors.email ? 'email-error' : undefined}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  placeholder="ihre@email.at"
                />
                {state.errors && state.errors.email && (
                  <p id="email-error" className="mt-2 text-xs theme-text-tertiary">
                    {state.errors.email.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Subject Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefon <span className="theme-text-tertiary">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  disabled={isPending}
                  aria-invalid={!!state.errors?.phone}
                  aria-describedby={state.errors && state.errors.phone ? 'phone-error' : undefined}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  placeholder="+43 123 4567890"
                />
                {state.errors && state.errors.phone && (
                  <p id="phone-error" className="mt-2 text-xs theme-text-tertiary">
                    {state.errors.phone.join(', ')}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Betreff
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  disabled={isPending}
                  aria-invalid={!!state.errors?.subject}
                  aria-describedby={
                    state.errors && state.errors.subject ? 'subject-error' : undefined
                  }
                  className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="">Bitte wählen</option>
                  <option value="termin">Terminvereinbarung</option>
                  <option value="notfall">Notfall</option>
                  <option value="beratung">Tierärztliche Beratung</option>
                  <option value="feedback">Feedback</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
                {state.errors && state.errors.subject && (
                  <p id="subject-error" className="mt-2 text-xs theme-text-tertiary">
                    {state.errors.subject.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                disabled={isPending}
                aria-invalid={!!state.errors?.message}
                aria-describedby={
                  state.errors && state.errors.message ? 'message-error' : undefined
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b theme-border-primary theme-text-primary placeholder:theme-text-tertiary/60 focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors resize-none"
                placeholder="Wie können wir Ihnen helfen?"
              />
              {state.errors && state.errors.message && (
                <p id="message-error" className="mt-2 text-xs theme-text-tertiary">
                  {state.errors.message.join(', ')}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
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
                  <span>Nachricht senden</span>
                )}
              </button>
            </div>

            {/* Success Message */}
            {state.message && (!state.errors || Object.keys(state.errors).length === 0) && (
              <div className="pt-4">
                <p className="text-sm theme-text-secondary">{state.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
