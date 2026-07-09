'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import KYBLayout from '@/components/kyb/kyb-layout'
import FormCheckbox from '@/components/form/form-checkbox'
import { Edit2, CheckCircle2 } from 'lucide-react'

const STEPS = ['Business Info', 'Director', 'Documents', 'Review']

interface KYBData {
  companyName?: string
  registrationNumber?: string
  industry?: string
  businessType?: string
  address?: string
  website?: string
  turnover?: string
  director?: {
    fullName?: string
    dateOfBirth?: string
    nationality?: string
    identityType?: string
    identityNumber?: string
    email?: string
    phone?: string
  }
  documents?: string[]
}

export default function KYBStep4Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [kybData, setKybData] = useState<KYBData>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    accuracy: false,
    terms: false,
  })

  useEffect(() => {
    const data = sessionStorage.getItem('kybFormData')
    if (data) {
      setKybData(JSON.parse(data))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.accuracy) newErrors.accuracy = 'You must confirm the information is accurate'
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      sessionStorage.removeItem('kybFormData')
      router.push('/kyb/pending')
    } catch (err) {
      console.error('[v0] Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (step: number) => {
    router.push(`/kyb/step-${step}`)
  }

  return (
    <KYBLayout currentStep={4} totalSteps={4} steps={STEPS}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Review Your Information</h2>
          <p className="text-sm text-muted-foreground mb-6">Please review all the information below before submitting</p>
        </div>

        {/* Business Information Section */}
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-foreground">Business Information</h3>
            <button
              type="button"
              onClick={() => handleEdit(1)}
              className="text-primary hover:text-blue-700 flex items-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Company Legal Name</p>
              <p className="font-medium text-foreground">{kybData.companyName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Registration Number</p>
              <p className="font-medium text-foreground">{kybData.registrationNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Industry</p>
                <p className="font-medium text-foreground capitalize">{kybData.industry}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Business Type</p>
                <p className="font-medium text-foreground capitalize">{kybData.businessType}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium text-foreground">{kybData.address}</p>
            </div>
            {kybData.website && (
              <div>
                <p className="text-muted-foreground">Website</p>
                <p className="font-medium text-foreground text-blue-600">{kybData.website}</p>
              </div>
            )}
          </div>
        </div>

        {/* Director Information Section */}
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-foreground">Director Information</h3>
            <button
              type="button"
              onClick={() => handleEdit(2)}
              className="text-primary hover:text-blue-700 flex items-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">{kybData.director?.fullName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-medium text-foreground">{kybData.director?.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Nationality</p>
                <p className="font-medium text-foreground capitalize">{kybData.director?.nationality}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Identity Type</p>
                <p className="font-medium text-foreground capitalize">{kybData.director?.identityType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Identity Number</p>
                <p className="font-medium text-foreground">{kybData.director?.identityNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-foreground">Documents</h3>
            <button
              type="button"
              onClick={() => handleEdit(3)}
              className="text-primary hover:text-blue-700 flex items-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {kybData.documents && kybData.documents.length > 0 ? (
              kybData.documents.map((doc) => (
                <div key={doc} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {doc}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No documents selected</p>
            )}
          </div>
        </div>

        {/* Confirmation Checkboxes */}
        <div className="space-y-4 mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <FormCheckbox
            label="I confirm that all the information above is accurate and complete"
            name="accuracy"
            checked={formData.accuracy}
            onChange={handleChange}
            error={errors.accuracy}
          />

          <FormCheckbox
            label={
              <>
                I accept the{' '}
                <Link href="#" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </>
            }
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            error={errors.terms}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push('/kyb/step-3')}
            className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </KYBLayout>
  )
}
