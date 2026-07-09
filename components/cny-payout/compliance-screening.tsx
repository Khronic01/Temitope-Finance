'use client'

import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type CheckStatus = 'pending' | 'completed' | 'failed'

interface ComplianceCheck {
  label: string
  status: CheckStatus
}

interface ComplianceScreeningProps {
  onComplete: (approved: boolean) => void
}

export default function ComplianceScreening({ onComplete }: ComplianceScreeningProps) {
  const [checks, setChecks] = useState<ComplianceCheck[]>([
    { label: 'Identity Verification', status: 'pending' },
    { label: 'AML Screening', status: 'pending' },
    { label: 'Sanctions Screening', status: 'pending' },
    { label: 'Risk Assessment', status: 'pending' },
    { label: 'Beneficiary Validation', status: 'pending' },
  ])

  const [allCompleted, setAllCompleted] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < checks.length) {
        setChecks((prev) => {
          const updated = [...prev]
          updated[currentIndex] = { ...updated[currentIndex], status: 'completed' }
          return updated
        })
        currentIndex++
      } else {
        clearInterval(interval)
        setAllCompleted(true)
        onComplete(true)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Screening Your Transaction</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;re performing mandatory AML, sanctions, and risk checks before processing your payment.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-card p-6">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center gap-4 rounded-lg bg-background p-3">
            <div className="flex-shrink-0">
              {check.status === 'pending' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
              {check.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              {check.status === 'failed' && <XCircle className="h-5 w-5 text-red-600" />}
            </div>
            <span className="flex-1 text-left text-sm font-medium text-foreground">{check.label}</span>
            {check.status === 'completed' && <span className="text-xs font-semibold text-emerald-600">✓</span>}
          </div>
        ))}
      </div>

      {allCompleted && (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">
            ✓ All compliance checks passed. Your transaction is approved.
          </p>
        </div>
      )}
    </div>
  )
}
