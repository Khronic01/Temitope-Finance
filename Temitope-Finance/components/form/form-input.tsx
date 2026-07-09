import React from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
}

export default function FormInput({
  label,
  error,
  helperText,
  required,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className || ''}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-muted-foreground mt-1">{helperText}</p>}
    </div>
  )
}
