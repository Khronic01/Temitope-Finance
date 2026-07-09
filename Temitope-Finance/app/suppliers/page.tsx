"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import { Supplier, suppliers as defaultSuppliers } from "@/lib/suppliers/data";
import { getStoredSuppliers } from "@/lib/suppliers/storage";
import {
  Building2,
  ChevronRight,
  Filter,
  LucideIcon,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles = {
  active: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  review: "bg-blue-50 text-blue-700",
  paused: "bg-red-50 text-red-700",
};

export default function SupplierDirectoryPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [supplierList, setSupplierList] = useState<Supplier[]>(defaultSuppliers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [province, setProvince] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setIsAllowed(true);
    setSupplierList(getStoredSuppliers());
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAllowed) return null;

  const provinces = Array.from(
    new Set(supplierList.map((supplier) => supplier.province)),
  );

  const filteredSuppliers = useMemo(() => {
    return supplierList.filter((supplier) => {
      const matchesQuery =
        `${supplier.supplierName} ${supplier.company} ${supplier.chineseBank}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus = status === "all" || supplier.status === status;
      const matchesProvince =
        province === "all" || supplier.province === province;

      return matchesQuery && matchesStatus && matchesProvince;
    });
  }, [query, province, status, supplierList]);

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                Supplier Management
              </p>
              <h1 className="mt-1 text-3xl font-bold text-foreground">
                Supplier Directory
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage approved Chinese suppliers, payment rails, and
                verification status.
              </p>
            </div>
            <Link
              href="/suppliers/add"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200"
            >
              <Plus className="h-4 w-4" />
              Create New Supplier
            </Link>
          </div>

          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Skeleton className="h-4 w-28 mb-2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-lg" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <MetricCard
                  title="Active Suppliers"
                  value="3"
                  icon={Users}
                  tone="green"
                />
                <MetricCard
                  title="Verified Bank Accounts"
                  value="6"
                  icon={ShieldCheck}
                  tone="blue"
                />
                <MetricCard
                  title="Monthly Supplier Volume"
                  value="NGN 19.16M"
                  icon={Building2}
                  tone="slate"
                />
              </>
            )}
          </section>

          <section className="rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search supplier, company, or Chinese bank"
                    className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-all duration-200 hover:border-primary/50">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="bg-transparent text-sm text-foreground outline-none"
                    >
                      <option value="all">All statuses</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="review">In review</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-all duration-200 hover:border-primary/50">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={province}
                      onChange={(event) => setProvince(event.target.value)}
                      className="bg-transparent text-sm text-foreground outline-none"
                    >
                      <option value="all">All provinces</option>
                      {provinces.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Supplier Name</th>
                      <th className="px-5 py-3 font-medium">Company</th>
                      <th className="px-5 py-3 font-medium">Chinese Bank</th>
                      <th className="px-5 py-3 font-medium">Province</th>
                      <th className="px-5 py-3 font-medium">Last Payment</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-32" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-40" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-36" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-28" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                        <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : filteredSuppliers.length === 0 ? (
              <div className="p-12">
                <EmptyState
                  icon={Users}
                  title="No suppliers found"
                  description={
                    query || status !== "all" || province !== "all"
                      ? "Try adjusting your search or filters to find suppliers"
                      : "Get started by adding your first Chinese supplier"
                  }
                  actionLabel="Create New Supplier"
                  onAction={() => router.push("/suppliers/add")}
                />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground">
                        <th className="px-5 py-3 font-medium">Supplier Name</th>
                        <th className="px-5 py-3 font-medium">Company</th>
                        <th className="px-5 py-3 font-medium">Chinese Bank</th>
                        <th className="px-5 py-3 font-medium">Province</th>
                        <th className="px-5 py-3 font-medium">Last Payment</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredSuppliers.map((supplier) => (
                        <tr key={supplier.id} className="hover:bg-muted/40 transition-colors duration-200">
                          <td className="px-5 py-4 font-semibold text-foreground">
                            {supplier.supplierName}
                          </td>
                          <td className="px-5 py-4 text-foreground">
                            {supplier.company}
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">
                            {supplier.chineseBank}
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">
                            {supplier.province}
                          </td>
                          <td className="px-5 py-4 font-semibold text-foreground">
                            {supplier.lastPayment}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[supplier.status]}`}
                            >
                              {supplier.status === "review"
                                ? "In review"
                                : supplier.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/suppliers/${supplier.id}`}
                                className="font-medium text-primary hover:underline transition-colors duration-200"
                              >
                                View
                              </Link>
                              <span className="text-border">/</span>
                              <Link
                                href={`/suppliers/${supplier.id}/edit`}
                                className="font-medium text-primary hover:underline transition-colors duration-200"
                              >
                                Edit
                              </Link>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-border px-5 py-4 text-sm text-muted-foreground">
                  <span>
                    Showing {filteredSuppliers.length} of {supplierList.length}{" "}
                    suppliers
                  </span>
                  <span>Bank verification synced today</span>
                </div>
              </>
            )}
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
  tone,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  tone: "green" | "blue" | "slate";
}) {
  const tones = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    slate: "bg-neutral-100 text-neutral-700",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${tones[tone]} transition-transform duration-200 hover:scale-105`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
