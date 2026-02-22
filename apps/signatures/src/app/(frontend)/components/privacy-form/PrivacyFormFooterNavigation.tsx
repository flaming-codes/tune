interface PrivacyFormFooterNavigationProps {
  currentStep: number
  totalSteps: number
  isPending: boolean
  onBack: () => void
  onNext: () => void
}

export function PrivacyFormFooterNavigation({
  currentStep,
  totalSteps,
  isPending,
  onBack,
  onNext,
}: PrivacyFormFooterNavigationProps) {
  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-between theme-bg-primary-glass backdrop-blur-sm py-4">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1 || isPending}
        className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium border theme-border-primary theme-text-secondary hover:theme-text-primary hover:theme-bg-secondary transition-colors duration-200 rounded-none disabled:opacity-50 ${
          currentStep === 1 ? 'invisible' : ''
        }`}
      >
        Zurück
      </button>

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center px-6 py-2 theme-bg-dark theme-text-inverse text-sm font-medium hover:opacity-90 transition-opacity duration-200 rounded-none"
        >
          Weiter
        </button>
      ) : (
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center px-6 py-2 theme-bg-dark theme-text-inverse text-sm font-medium hover:opacity-90 transition-opacity duration-200 rounded-none disabled:opacity-50"
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
  )
}
