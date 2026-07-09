'use client'

import React, { useState, useRef, useEffect } from 'react'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setOtp(value.split('').slice(0, length))
  }, [value, length])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)
    onChange(newOtp.join(''))

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, length).split('')
      setOtp(digits)
      onChange(digits.join(''))
      inputRefs.current[Math.min(digits.length, length - 1)]?.focus()
    }
  }

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none transition-all ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-border focus:border-primary focus:ring-2 focus:ring-primary'
            }`}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
