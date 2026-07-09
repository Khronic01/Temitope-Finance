'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/auth-layout'
import OTPInput from '@/components/form/otp-input'
import FormInput from '@/components/form/form-input'
import { Phone } from 'lucide-react'

export default function PhoneVerificationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [changePhone, setChangePhone] = useState(false)
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (otp.length === 6) {
        router.push('/kyb/step-1')
      } else {
        setError('Please enter a valid 6-digit code')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setResendCooldown(60)

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  if (changePhone) {
    return (
      <AuthLayout title="Update Phone Number" subtitle="Enter your new phone number">
        <form onSubmit={(e) => {
          e.preventDefault()
          if (newPhone) {
            setChangePhone(false)
            handleResend()
          }
        }} className="space-y-4">
          <FormInput
            label="Phone Number"
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="+234..."
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Code
          </button>
          <button
            type="button"
            onClick={() => setChangePhone(false)}
            className="w-full border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Back
          </button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Verify Your Phone" subtitle="We've sent a code to your phone number">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-blue-50 rounded-full">
              <Phone className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification code to <strong>+234 801 234 5678</strong>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Enter Verification Code</label>
          <OTPInput
            length={6}
            value={otp}
            onChange={setOtp}
            error={error ? 'Invalid code' : undefined}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify Phone'}
        </button>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-sm font-medium text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </button>
          <button
            type="button"
            onClick={() => setChangePhone(true)}
            className="block w-full text-sm font-medium text-primary hover:underline"
          >
            Use a Different Number
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
