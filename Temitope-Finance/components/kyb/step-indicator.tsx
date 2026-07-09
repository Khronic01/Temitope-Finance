interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="mb-6 rounded-[20px] border border-border/70 bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-sm font-medium text-foreground">
          {steps[currentStep - 1]}
        </p>
      </div>

      <div className="mb-5 h-2 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div
              className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                index + 1 < currentStep
                  ? "bg-green-100 text-green-600"
                  : index + 1 === currentStep
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <p
              className={`text-xs font-medium ${index + 1 <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
