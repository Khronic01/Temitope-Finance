'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type CheckStatus = 'pending' | 'completed'

interface ComplianceCheck {
  id: string
  label: string
}

interface ComplianceScreeningProps {
  onComplete: (approved: boolean) => void
}

const COMPLIANCE_CHECKS: ComplianceCheck[] = [
  { id: 'identity', label: 'Identity Verification' },
  { id: 'aml', label: 'AML Screening' },
  { id: 'sanctions', label: 'Sanctions Screening' },
  { id: 'risk', label: 'Risk Assessment' },
  { id: 'beneficiary', label: 'Beneficiary Validation' },
]

export default function ComplianceScreening({ onComplete }: ComplianceScreeningProps) {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (completedCount === COMPLIANCE_CHECKS.length) {
      const timeout = window.setTimeout(() => {
        onComplete(true)
      }, 800)

      return () => window.clearTimeout(timeout)
    }

    const timeout = window.setTimeout(() => {
      setCompletedCount((count) => Math.min(count + 1, COMPLIANCE_CHECKS.length))
    }, 800)

    return () => window.clearTimeout(timeout)
  }, [completedCount, onComplete])

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Screening Your Transaction</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;re performing mandatory AML, sanctions, and risk checks before processing your payment.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-card p-6">
        {COMPLIANCE_CHECKS.map((check, index) => {
          const status: CheckStatus = index < completedCount ? 'completed' : 'pending'
          const isActive = index === completedCount

          return (
            <div key={check.id} className="flex items-center gap-4 rounded-lg bg-background p-3">
              <div className="flex-shrink-0">
                {status === 'pending' && isActive && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                {status === 'pending' && !isActive && <Loader2 className="h-5 w-5 text-muted-foreground/40" />}
                {status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              </div>
              <span className="flex-1 text-left text-sm font-medium text-foreground">{check.label}</span>
              {status === 'completed' && <span className="text-xs font-semibold text-emerald-600">Passed</span>}
            </div>
          )
        })}
      </div>

      {completedCount === COMPLIANCE_CHECKS.length && (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">
            ✓ All compliance checks passed. Your transaction is approved.
          </p>
        </div>
      )}
    </div>
  )
}
