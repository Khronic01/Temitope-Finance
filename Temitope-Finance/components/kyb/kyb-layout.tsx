import React from "react";
import { ShieldCheck, Clock3, BadgeCheck } from "lucide-react";
import StepIndicator from "./step-indicator";

interface KYBLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function KYBLayout({
  children,
  currentStep,
  totalSteps,
  steps,
}: KYBLayoutProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#f3f7fb_100%)]">
      <div className="sticky top-0 z-10 border-b border-border/70 bg-white/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Secure business verification
              </div>
              <h1 className="text-2xl font-semibold text-foreground">
                Complete your business verification
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                A fast, compliant onboarding flow for your Temitop Finance
                account.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm shadow-sm">
              <div className="flex items-center gap-2 text-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                Usually takes less than 5 minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="mb-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
              <BadgeCheck className="h-4 w-4" />
              Why we need this
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-semibold">✓</span>
                <span>Regulatory compliance for international transfers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">✓</span>
                <span>Fraud prevention and secure account access</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">✓</span>
                <span>Faster payment limits and better support coverage</span>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-medium">Tip</p>
              <p className="mt-1">
                Keep your business documents ready so you can finish the
                verification in one sitting.
              </p>
            </div>
          </div>

          <div>
            <StepIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              steps={steps}
            />
            <div className="rounded-[24px] border border-border/70 bg-card p-6 shadow-sm sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
