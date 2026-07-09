"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock3, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export default function KYBPendingPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("24-48 hours");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft("24-48 hours");
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#f4f7fb_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-border/70 bg-card shadow-[0_24px_90px_-32px_rgba(15,23,42,0.28)] overflow-hidden">
        <div className="border-b border-border/70 bg-gradient-to-r from-amber-50 to-blue-50 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
              <div className="absolute inset-2 rounded-full border border-amber-200" />
              <Clock3 className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">
            Application under review
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your KYB application is being reviewed by our compliance team.
          </p>
        </div>

        <div className="p-8">
          <div className="mb-8 rounded-2xl border border-border/70 bg-background p-6">
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
                  Application Date
                </p>
                <p className="font-semibold text-foreground">15 Dec, 2024</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Estimated Review Time
                </p>
                <p className="font-semibold text-foreground">{timeLeft}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              What happens next
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-background p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-foreground">
                    Document verification
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We are verifying each submitted document against your
                    business records.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-background p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-foreground">
                    AML and compliance screening
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We are running the required compliance checks before
                    approval.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-background p-4">
                <Clock3 className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-foreground">Final review</p>
                  <p className="text-sm text-muted-foreground">
                    Our team will confirm everything before your account is
                    fully enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-medium">Tip</p>
            <p className="mt-1">
              Keep your phone and email close by. We may reach out if we need a
              quick clarification.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Check status <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/support"
              className="rounded-xl border border-border/70 px-4 py-3 text-center font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
