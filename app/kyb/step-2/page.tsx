'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import KYBLayout from '@/components/kyb/kyb-layout'
import FormInput from '@/components/form/form-input'
import FormSelect from '@/components/form/form-select'
import DocumentUpload from '@/components/form/document-upload'

const STEPS = ['Business Info', 'Director', 'Documents', 'Review']

const NATIONALITIES = [
  { value: 'ng', label: 'Nigeria' },
  { value: 'gh', label: 'Ghana' },
  { value: 'ke', label: 'Kenya' },
  { value: 'za', label: 'South Africa' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'cn', label: 'China' },
  { value: 'other', label: 'Other' },
]

const ID_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'drivers_license', label: "Driver's License" },
]

export default function KYBStep2Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    identityNumber: '',
    identityType: '',
    email: '',
  })
  const [idFile, setIdFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.nationality) newErrors.nationality = 'Nationality is required'
    if (!formData.identityNumber) newErrors.identityNumber = 'Identity number is required'
    if (!formData.identityType) newErrors.identityType = 'Identity type is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!idFile) newErrors.idFile = 'Identity document is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const kybData = JSON.parse(sessionStorage.getItem('kybFormData') || '{}')
      sessionStorage.setItem('kybFormData', JSON.stringify({ ...kybData, director: formData }))
      router.push('/kyb/step-3')
    } catch (err) {
      console.error('[v0] Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KYBLayout currentStep={2} totalSteps={4} steps={STEPS}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Director Verification</h2>
          <p className="text-sm text-muted-foreground mb-6">Tell us about your company director</p>
        </div>

        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.fullName}
          required
        />

        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
          required
        />

        <FormSelect
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          options={NATIONALITIES}
          error={errors.nationality}
          required
        />

        <FormSelect
          label="Identity Type"
          name="identityType"
          value={formData.identityType}
          onChange={handleChange}
          options={ID_TYPES}
          error={errors.identityType}
          required
        />

        <FormInput
          label="Identity Number"
          name="identityNumber"
          value={formData.identityNumber}
          onChange={handleChange}
          placeholder="Enter identity number"
          error={errors.identityNumber}
          required
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="director@company.com"
          error={errors.email}
          required
        />

        <DocumentUpload
          label="Identity Document Photo"
          onFileSelect={setIdFile}
          file={idFile}
          acceptedFormats={['jpg', 'png', 'pdf']}
          error={errors.idFile}
          required
        />

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push('/kyb/step-1')}
            className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Saving...' : 'Continue to Documents'}
          </button>
        </div>
      </form>
    </KYBLayout>
  )
}
