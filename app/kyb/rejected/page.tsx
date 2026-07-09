"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  XCircle,
  AlertCircle,
  RefreshCw,
  MessageCircle,
  Download,
} from "lucide-react";

export default function KYBRejectedPage() {
  const router = useRouter();

  const rejectionReasons = [
    "Certificate of Incorporation could not be verified",
    "Director identity document appears to be expired",
    "Bank statement does not match company name",
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.12),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#f4f7fb_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-[0_24px_90px_-32px_rgba(15,23,42,0.28)]">
        <div className="border-b border-border/70 bg-gradient-to-r from-red-50 to-rose-50 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">
            Application needs attention
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your KYB application could not be approved at this time, but it can
            be corrected and resubmitted.
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
                  Application Date
                </p>
                <p className="font-semibold text-foreground">15 Dec, 2024</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Rejection reasons
            </h2>
            <div className="space-y-3">
              {rejectionReasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-700">
                    {index + 1}
                  </div>
                  <p className="text-sm text-red-900">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="font-semibold text-foreground">What to do next</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Review the issues above and resubmit with corrected information.
              Clear scans and matching records will help accelerate the review.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-3">
            <button
              onClick={() => router.push("/kyb/step-1")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Reapply with corrections
            </button>
            <Link
              href="/support"
              className="flex items-center justify-center gap-2 rounded-xl border border-border/70 px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" />
              Contact support
            </Link>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">
                  Download rejection details
                </p>
                <p className="text-sm text-muted-foreground">
                  Review the full report and make your updates.
                </p>
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-primary">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
