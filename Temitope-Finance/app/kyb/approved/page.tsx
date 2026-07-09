"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function KYBApprovedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#f4f7fb_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-[0_24px_90px_-32px_rgba(15,23,42,0.28)]">
        <div className="border-b border-border/70 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">
            You are all set
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your business has been verified and approved for full account
            access.
          </p>
        </div>

        <div className="p-8">
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">
                  Application approved
                </p>
                <p className="text-sm text-green-800">
                  Tech Solutions Ltd is now verified on 15 Dec, 2024 and can
                  start sending payments immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-border/70 bg-background p-6">
            <h2 className="mb-4 font-semibold text-foreground">
              Approval details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Company Name
                </p>
                <p className="font-semibold text-foreground">
                  Tech Solutions Ltd
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Registration Number
                </p>
                <p className="font-semibold text-foreground">RC12345678</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Approval Date
                </p>
                <p className="font-semibold text-foreground">15 Dec, 2024</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">KYB Status</p>
                <p className="font-semibold text-green-600">Verified</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              What you can do now
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-background p-4">
                <Zap className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Send payments</p>
                  <p className="text-sm text-muted-foreground">
                    Send fast and transparent NGN → CNY payments to suppliers in
                    China.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-background p-4">
                <TrendingUp className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Access all features
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Get real-time FX quotes and manage transactions from one
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Go to dashboard <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/wallet"
              className="rounded-xl border border-border/70 px-4 py-3 text-center font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Fund your wallet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
