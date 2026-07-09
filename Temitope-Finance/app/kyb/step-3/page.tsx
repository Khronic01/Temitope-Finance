'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import KYBLayout from '@/components/kyb/kyb-layout'
import DocumentUpload from '@/components/form/document-upload'

const STEPS = ['Business Info', 'Director', 'Documents', 'Review']

const DOCUMENT_CATEGORIES = [
  {
    title: 'Business Documents',
    required: true,
    documents: [
      { id: 'coi', label: 'Certificate of Incorporation', required: true },
      { id: 'maa', label: 'Memorandum & Articles of Association', required: true },
      { id: 'tax', label: 'Tax Registration Certificate', required: true },
    ],
  },
  {
    title: 'Financial Documents',
    required: false,
    documents: [
      { id: 'bank_stmt', label: 'Bank Statement (Last 3 months)', required: true },
      { id: 'financial', label: 'Annual Financial Statements', required: true },
      { id: 'tax_return', label: 'Tax Returns (Optional)', required: false },
    ],
  },
]

export default function KYBStep3Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<Record<string, File>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileSelect = (docId: string, file: File | null) => {
    if (file) {
      setFiles((prev) => ({ ...prev, [docId]: file }))
      if (errors[docId]) {
        setErrors((prev) => ({ ...prev, [docId]: '' }))
      }
    } else {
      setFiles((prev) => {
        const updated = { ...prev }
        delete updated[docId]
        return updated
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    DOCUMENT_CATEGORIES.forEach((category) => {
      category.documents.forEach((doc) => {
        if (doc.required && !files[doc.id]) {
          newErrors[doc.id] = `${doc.label} is required`
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (typeof window !== 'undefined') {
        const kybData = JSON.parse(sessionStorage.getItem('kybFormData') || '{}')
        sessionStorage.setItem('kybFormData', JSON.stringify({ ...kybData, documents: Object.keys(files) }))
      }
      router.push('/kyb/step-4')
    } catch (err) {
      console.error('[v0] Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KYBLayout currentStep={3} totalSteps={4} steps={STEPS}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Upload Documents</h2>
          <p className="text-sm text-muted-foreground mb-6">Upload the required documents for verification</p>
        </div>

        {DOCUMENT_CATEGORIES.map((category) => (
          <div key={category.title}>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">
              {category.title}
              {category.required && <span className="text-red-600 ml-2">*</span>}
            </h3>

            <div className="space-y-4">
              {category.documents.map((doc) => (
                <DocumentUpload
                  key={doc.id}
                  label={`${doc.label} ${doc.required ? '' : '(Optional)'}`}
                  onFileSelect={(file) => handleFileSelect(doc.id, file)}
                  file={files[doc.id] || null}
                  acceptedFormats={['pdf', 'jpg', 'png']}
                  error={errors[doc.id]}
                  required={doc.required}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> All documents must be clear, readable, and in English. Maximum file size is 10MB per document.
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push('/kyb/step-2')}
            className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Uploading...' : 'Review & Submit'}
          </button>
        </div>
      </form>
    </KYBLayout>
  )
}
