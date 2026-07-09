'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/auth/auth-layout'
import FormInput from '@/components/form/form-input'
import { Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email) {
        setSubmitted(true)
      } else {
        setError('Please enter your email address')
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <AuthLayout title="Check Your Email" subtitle="We've sent you a password reset link">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-green-50 rounded-full">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <p className="text-muted-foreground mb-6">
            We&apos;ve sent a password reset link to <strong>{email}</strong>. Click the link in your email to reset your password.
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            If you don&apos;t see the email, check your spam folder or try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            Back to Login
          </button>

          <button
            onClick={() => setSubmitted(false)}
            className="w-full border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Try Another Email
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a password reset link">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
        />

        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link href="/auth/login" className="block text-center text-sm font-medium text-primary hover:underline">
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  )
}
