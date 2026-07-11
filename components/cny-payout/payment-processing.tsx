'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PaymentProcessingProps {
  estimatedSettlement: string
  onComplete: () => void
}

export default function PaymentProcessing({ estimatedSettlement, onComplete }: PaymentProcessingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          onComplete()
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 400)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mb-8">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Processing Payment</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment is being processed. Please do not close this page.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-muted-foreground">Processing</p>
            <p className="text-lg font-bold text-foreground">{Math.floor(progress)}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Est. time remaining</p>
            <p className="text-sm font-semibold text-foreground">{estimatedSettlement}</p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
