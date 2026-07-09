'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/auth-layout'
import OTPInput from '@/components/form/otp-input'
import { Mail } from 'lucide-react'

export default function EmailVerificationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (otp.length === 6) {
        router.push('/verify/phone')
      } else {
        setError('Please enter a valid 6-digit code')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
      setAttempts((prev) => prev + 1)
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (err) {
      setError('Failed to resend code')
    }
  }

  return (
    <AuthLayout title="Verify Your Email" subtitle="We've sent a code to your email address">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-blue-50 rounded-full">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification code to <strong>company@business.com</strong>
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

        {attempts >= 3 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
            Too many attempts. Please request a new code.
          </div>
        )}

        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Didn&apos;t receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-sm font-medium text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
