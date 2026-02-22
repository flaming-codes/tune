import React from 'react'

const baseFieldClasses =
  'w-full px-0 py-2.5 bg-transparent border-0 border-b theme-text-primary placeholder:theme-text-tertiary focus:outline-none focus:border-current transition-colors'

const defaultBorderClass = 'theme-border-primary'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export function TextField({ invalid = false, className = '', ...props }: TextFieldProps) {
  const borderClass = invalid ? 'border-red-300' : defaultBorderClass

  return <input {...props} className={`${baseFieldClasses} ${borderClass} ${className}`.trim()} />
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function TextAreaField({ invalid = false, className = '', ...props }: TextAreaFieldProps) {
  const borderClass = invalid ? 'border-red-300' : defaultBorderClass

  return (
    <textarea
      {...props}
      className={`${baseFieldClasses} resize-none ${borderClass} ${className}`.trim()}
    />
  )
}

interface Option<T extends string> {
  value: T
  label: string
}

interface SegmentedFieldProps<T extends string> {
  name: string
  ariaLabel: string
  options: Option<T>[]
  value: T | ''
  onChange: (value: T) => void
  invalid?: boolean
  required?: boolean
}

export function SegmentedField<T extends string>({
  name,
  ariaLabel,
  options,
  value,
  onChange,
  invalid = false,
  required = false,
}: SegmentedFieldProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-invalid={invalid}
      className={`inline-flex overflow-hidden border ${invalid ? 'border-red-300' : defaultBorderClass}`}
    >
      {options.map((option, index) => (
        <label
          key={option.value}
          className={`cursor-pointer ${index < options.length - 1 ? 'border-r theme-border-primary' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only peer"
            required={required}
          />
          <span className="block px-4 py-2 text-sm font-medium theme-text-secondary transition-colors peer-checked:bg-neutral-200 peer-checked:theme-text-primary hover:theme-bg-secondary dark:peer-checked:bg-neutral-700">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}
