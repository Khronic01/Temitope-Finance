'use client'

import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep

          return (
            <div key={index} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : isActive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </div>
                <p
                  className={`text-center text-xs font-medium ${
                    isActive ? 'text-foreground' : isCompleted ? 'text-emerald-600' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </p>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`mb-8 h-1 flex-1 rounded-full transition-colors ${
                    isCompleted ? 'bg-emerald-500' : 'bg-border'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
