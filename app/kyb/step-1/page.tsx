'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import KYBLayout from '@/components/kyb/kyb-layout'
import FormInput from '@/components/form/form-input'
import FormSelect from '@/components/form/form-select'

const STEPS = ['Business Info', 'Director', 'Documents', 'Review']

const INDUSTRIES = [
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'services', label: 'Professional Services' },
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'other', label: 'Other' },
]

const BUSINESS_TYPES = [
  { value: 'sole', label: 'Sole Proprietor' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'limited', label: 'Limited Company' },
  { value: 'corporation', label: 'Corporation' },
]

const TURNOVER_RANGES = [
  { value: '0-50k', label: 'Less than NGN 50,000' },
  { value: '50k-250k', label: 'NGN 50,000 - 250,000' },
  { value: '250k-1m', label: 'NGN 250,000 - 1,000,000' },
  { value: '1m-10m', label: 'NGN 1M - 10M' },
  { value: '10m+', label: 'Over NGN 10M' },
]

export default function KYBStep1Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    industry: '',
    customIndustry: '',
    businessType: '',
    address: '',
    website: '',
    turnover: '',
  })
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

    if (!formData.companyName) newErrors.companyName = 'Company name is required'
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (formData.industry === 'other' && !formData.customIndustry.trim()) {
      newErrors.customIndustry = 'Please enter your industry'
    }
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.turnover) newErrors.turnover = 'Annual turnover is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      sessionStorage.setItem('kybFormData', JSON.stringify(formData))
      router.push('/kyb/step-2')
    } catch (err) {
      console.error('[v0] Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KYBLayout currentStep={1} totalSteps={4} steps={STEPS}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Business Information</h2>
          <p className="text-sm text-muted-foreground mb-6">Tell us about your business</p>
        </div>

        <FormInput
          label="Company Legal Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter your company's legal name"
          error={errors.companyName}
          required
        />

        <FormInput
          label="Company Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          placeholder="RC number or equivalent"
          error={errors.registrationNumber}
          required
        />

        <FormSelect
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          options={INDUSTRIES}
          error={errors.industry}
          required
        />

        {formData.industry === 'other' && (
          <FormInput
            label="Enter Industry"
            name="customIndustry"
            value={formData.customIndustry}
            onChange={handleChange}
            placeholder="Describe your industry"
            error={errors.customIndustry}
            required
          />
        )}

        <FormSelect
          label="Business Type"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          options={BUSINESS_TYPES}
          error={errors.businessType}
          required
        />

        <FormInput
          label="Business Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your business address"
          error={errors.address}
          required
        />

        <FormInput
          label="Website (Optional)"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://www.yourcompany.com"
        />

        <FormSelect
          label="Annual Turnover"
          name="turnover"
          value={formData.turnover}
          onChange={handleChange}
          options={TURNOVER_RANGES}
          error={errors.turnover}
          required
        />

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Saving...' : 'Continue to Next Step'}
          </button>
        </div>
      </form>
    </KYBLayout>
  )
}
