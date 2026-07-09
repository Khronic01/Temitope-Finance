'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex min-w-0 items-start">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep

          return (
            <div key={step} className="flex flex-1 items-start">
              <div className="flex min-w-[72px] flex-col items-center text-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    isCurrent
                      ? 'bg-primary text-white'
                      : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '?' : step}
                </div>
                <span className={`mt-2 max-w-[96px] text-xs ${isCurrent ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {stepLabels[index]}
                </span>
              </div>
              {step < totalSteps && (
                <div className="mt-4 h-0.5 flex-1 rounded bg-muted">
                  <div className={`h-full rounded ${isCompleted ? 'bg-emerald-600' : 'bg-transparent'}`} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
