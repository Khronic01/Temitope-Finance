"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import { Supplier } from "@/lib/suppliers/data";
import { getStoredSupplier } from "@/lib/suppliers/storage";
import {
  ArrowLeft,
  Banknote,
  Building2,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const statusStyles = {
  active: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  review: "bg-blue-50 text-blue-700",
  paused: "bg-red-50 text-red-700",
};

const recentPayments = [
  {
    reference: "TMP-CNY-8842",
    date: "Jul 6, 2026",
    amount: "NGN 4,850,000",
    status: "Settled",
  },
  {
    reference: "TMP-CNY-8618",
    date: "Jun 28, 2026",
    amount: "NGN 3,210,000",
    status: "Settled",
  },
  {
    reference: "TMP-CNY-8420",
    date: "Jun 14, 2026",
    amount: "NGN 2,975,000",
    status: "Settled",
  },
];

export default function SupplierDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isAllowed, setIsAllowed] = useState(false);
  const [supplier, setSupplier] = useState<Supplier | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setSupplier(getStoredSupplier(params.id) ?? null);
    setIsAllowed(true);
  }, [params.id, router]);

  if (!isAllowed || supplier === undefined) {
    return null;
  }

  if (!supplier) {
    notFound();
  }

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link
                href="/suppliers"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to suppliers
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {supplier.company}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {supplier.supplierName} - {supplier.category}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <span
                className={`flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold capitalize ${statusStyles[supplier.status]}`}
              >
                {supplier.status === "review" ? "In review" : supplier.status}
              </span>
              <Link
                href={`/suppliers/${supplier.id}/edit`}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <Pencil className="h-4 w-4" />
                Edit Supplier
              </Link>
            </div>
          </div>

          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricCard
              title="Lifetime Volume"
              value={supplier.lifetimeVolume}
              icon={TrendingUp}
            />
            <MetricCard
              title="Payments Sent"
              value={`${supplier.paymentCount}`}
              icon={Banknote}
            />
            <MetricCard
              title="Risk Rating"
              value={supplier.riskRating}
              icon={ShieldCheck}
            />
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-lg border border-border bg-card p-6 shadow-sm xl:col-span-2">
              <h2 className="mb-5 text-lg font-semibold text-foreground">
                Supplier Details
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={supplier.contactEmail}
                />
                <DetailItem icon={Phone} label="Phone" value={supplier.phone} />
                <DetailItem
                  icon={MapPin}
                  label="Province"
                  value={supplier.province}
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Onboarding Date"
                  value={supplier.onboardingDate}
                />
                <DetailItem
                  icon={Building2}
                  label="Address"
                  value={supplier.address}
                  wide
                />
              </div>
            </section>

            <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-foreground">
                Chinese Bank
              </h2>
              <div className="space-y-4">
                <DetailItem
                  icon={CreditCard}
                  label="Bank"
                  value={supplier.chineseBank}
                />
                <DetailItem
                  icon={CreditCard}
                  label="Account Number"
                  value={supplier.bankAccount}
                />
                <DetailItem
                  icon={CreditCard}
                  label="SWIFT Code"
                  value={supplier.swiftCode}
                />
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  Bank account ownership verified against supplier profile.
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-6 rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Payments
                </h2>
                <p className="text-sm text-muted-foreground">
                  Latest settlement activity for this supplier
                </p>
              </div>
              <Link
                href="/send-money"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                New Payment
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                    <th className="pb-3 font-medium">Reference</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentPayments.map((payment) => (
                    <tr key={payment.reference} className="hover:bg-muted/40">
                      <td className="py-4 font-mono text-xs text-muted-foreground">
                        {payment.reference}
                      </td>
                      <td className="py-4 text-foreground">{payment.date}</td>
                      <td className="py-4 font-semibold text-foreground">
                        {payment.amount}
                      </td>
                      <td className="py-4">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </FinTechSidebar>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: typeof TrendingUp;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  wide = false,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-background p-4 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 break-words font-semibold text-foreground">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
