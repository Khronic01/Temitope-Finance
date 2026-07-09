import React from "react";
import { ArrowRight, Building2, ShieldCheck, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const trustPoints = [
  "Instant NGN → CNY supplier payouts",
  "Built-in compliance and KYB workflows",
  "Real-time FX quotes with transparent fees",
];

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#f4f7fb_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-border/70 bg-white/90 shadow-[0_24px_90px_-32px_rgba(15,23,42,0.35)] backdrop-blur lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_30%)]" />
            <div className="relative">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/90">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">
                    Enterprise finance
                  </p>
                  <p className="text-lg font-semibold">Temitop Finance</p>
                </div>
              </div>

              <div className="mb-8 max-w-md space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-blue-100">
                  <Sparkles className="h-4 w-4" />
                  Secure onboarding for modern B2B teams
                </div>
                <h2 className="text-3xl font-semibold leading-tight">
                  Move money across borders with confidence.
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  Power fast, compliant NGN → CNY payments to suppliers in China
                  with clear controls, real-time visibility, and expert support.
                </p>
              </div>

              <div className="space-y-3">
                {trustPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100"
                  >
                    <ShieldCheck className="h-4 w-4 text-green-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
              <p className="font-medium text-white">
                Trusted by growth-stage importers and distributors
              </p>
              <p className="mt-1 text-slate-300">
                Average settlement time: under 3 hours for verified accounts.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 sm:p-10 lg:p-10">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Secure account access
              </div>
              <h1 className="text-3xl font-semibold text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            {children}

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Need help getting started?</span>
              <a
                href="/support"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                Contact support <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
