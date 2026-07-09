import React, { useId } from 'react'

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export default function FormCheckbox({ label, error, className, ...props }: FormCheckboxProps) {
  const fallbackId = useId()
  const inputId = props.id ?? fallbackId
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={inputId}
          className={`w-5 h-5 border-2 border-border rounded focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer accent-primary ${
            className || ''
          }`}
          {...props}
        />
        <label htmlFor={inputId} className="text-sm text-foreground cursor-pointer">
          {label}
        </label>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
