"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Printer,
  Activity,
  Users,
} from "lucide-react";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";

interface Transaction {
  id: string;
  date: string;
  reference: string;
  supplier: string;
  amount: number;
  currency: string;
  fxRate: number;
  status: "pending" | "processing" | "completed" | "failed";
  settlementTime: string;
  supplierReceives: number;
  supplierBank: string;
  supplierAccount: string;
  supplierContact: string;
  invoiceNumber: string;
  platformFee: number;
  bankFee: number;
  timeline: {
    step: string;
    time: string;
    completed: boolean;
  }[];
  auditTrail: {
    action: string;
    user: string;
    time: string;
  }[];
}

const transactions: Transaction[] = [
  {
    id: "txn-001",
    date: "2026-07-07 10:18",
    reference: "TMP-CNY-20260707-8842",
    supplier: "Shanghai Electronics Ltd",
    amount: 4850000,
    currency: "NGN",
    fxRate: 0.0048,
    status: "completed",
    settlementTime: "Completed",
    supplierReceives: 23280,
    supplierBank: "Bank of China",
    supplierAccount: "6222 0212 8840 1902",
    supplierContact: "finance@shanghai-electronics.cn",
    invoiceNumber: "INV-2026-0707-001",
    platformFee: 58200,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-07 10:15", completed: true },
      { step: "OTP Verified", time: "2026-07-07 10:16", completed: true },
      { step: "Compliance Review", time: "2026-07-07 10:17", completed: true },
      { step: "Settlement", time: "2026-07-07 10:18", completed: true },
      { step: "Completed", time: "2026-07-07 10:18", completed: true },
    ],
    auditTrail: [
      { action: "Quote requested", user: "John Doe", time: "2026-07-07 10:15" },
      { action: "OTP verified", user: "System", time: "2026-07-07 10:16" },
      {
        action: "Compliance check passed",
        user: "Compliance Bot",
        time: "2026-07-07 10:17",
      },
      {
        action: "Payment initiated",
        user: "John Doe",
        time: "2026-07-07 10:17",
      },
      { action: "Payment completed", user: "System", time: "2026-07-07 10:18" },
    ],
  },
  {
    id: "txn-002",
    date: "2026-07-07 08:42",
    reference: "TMP-CNY-20260707-8817",
    supplier: "Guangzhou Trading Co",
    amount: 2760000,
    currency: "NGN",
    fxRate: 0.0048,
    status: "processing",
    settlementTime: "2-6 business hours",
    supplierReceives: 13248,
    supplierBank: "ICBC",
    supplierAccount: "6215 5888 4003 2190",
    supplierContact: "accounts@gztrading.cn",
    invoiceNumber: "INV-2026-0707-002",
    platformFee: 33120,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-07 08:40", completed: true },
      { step: "OTP Verified", time: "2026-07-07 08:41", completed: true },
      { step: "Compliance Review", time: "2026-07-07 08:42", completed: true },
      { step: "Settlement", time: "In Progress", completed: false },
      { step: "Completed", time: "Pending", completed: false },
    ],
    auditTrail: [
      {
        action: "Quote requested",
        user: "Jane Smith",
        time: "2026-07-07 08:40",
      },
      { action: "OTP verified", user: "System", time: "2026-07-07 08:41" },
      {
        action: "Compliance check passed",
        user: "Compliance Bot",
        time: "2026-07-07 08:42",
      },
      {
        action: "Payment initiated",
        user: "Jane Smith",
        time: "2026-07-07 08:42",
      },
    ],
  },
  {
    id: "txn-003",
    date: "2026-07-06 16:06",
    reference: "TMP-CNY-20260706-8775",
    supplier: "Beijing Tech Solutions",
    amount: 6420000,
    currency: "NGN",
    fxRate: 0.00479,
    status: "completed",
    settlementTime: "Completed",
    supplierReceives: 30751.8,
    supplierBank: "China Construction Bank",
    supplierAccount: "6217 0009 6621 4473",
    supplierContact: "settlements@bjtech.cn",
    invoiceNumber: "INV-2026-0706-001",
    platformFee: 77040,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-06 16:03", completed: true },
      { step: "OTP Verified", time: "2026-07-06 16:04", completed: true },
      { step: "Compliance Review", time: "2026-07-06 16:05", completed: true },
      { step: "Settlement", time: "2026-07-06 16:06", completed: true },
      { step: "Completed", time: "2026-07-06 16:06", completed: true },
    ],
    auditTrail: [
      {
        action: "Quote requested",
        user: "Mike Johnson",
        time: "2026-07-06 16:03",
      },
      { action: "OTP verified", user: "System", time: "2026-07-06 16:04" },
      {
        action: "Compliance check passed",
        user: "Compliance Bot",
        time: "2026-07-06 16:05",
      },
      {
        action: "Payment initiated",
        user: "Mike Johnson",
        time: "2026-07-06 16:05",
      },
      { action: "Payment completed", user: "System", time: "2026-07-06 16:06" },
    ],
  },
  {
    id: "txn-004",
    date: "2026-07-06 13:25",
    reference: "TMP-CNY-20260706-8762",
    supplier: "Shenzhen Manufacturing",
    amount: 3150000,
    currency: "NGN",
    fxRate: 0.0048,
    status: "pending",
    settlementTime: "2-6 business hours",
    supplierReceives: 15120,
    supplierBank: "Agricultural Bank of China",
    supplierAccount: "6228 4802 0031 1120",
    supplierContact: "billing@szmanufacturing.cn",
    invoiceNumber: "INV-2026-0706-002",
    platformFee: 37800,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-06 13:23", completed: true },
      { step: "OTP Verified", time: "2026-07-06 13:24", completed: true },
      { step: "Compliance Review", time: "Pending", completed: false },
      { step: "Settlement", time: "Pending", completed: false },
      { step: "Completed", time: "Pending", completed: false },
    ],
    auditTrail: [
      {
        action: "Quote requested",
        user: "Sarah Williams",
        time: "2026-07-06 13:23",
      },
      { action: "OTP verified", user: "System", time: "2026-07-06 13:24" },
    ],
  },
  {
    id: "txn-005",
    date: "2026-07-05 11:20",
    reference: "TMP-CNY-20260705-8704",
    supplier: "Hangzhou Supplier Inc",
    amount: 1980000,
    currency: "NGN",
    fxRate: 0.0048,
    status: "completed",
    settlementTime: "Completed",
    supplierReceives: 9504,
    supplierBank: "China Merchants Bank",
    supplierAccount: "6214 8388 2200 8731",
    supplierContact: "ops@hzsupplier.cn",
    invoiceNumber: "INV-2026-0705-001",
    platformFee: 23760,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-05 11:17", completed: true },
      { step: "OTP Verified", time: "2026-07-05 11:18", completed: true },
      { step: "Compliance Review", time: "2026-07-05 11:19", completed: true },
      { step: "Settlement", time: "2026-07-05 11:20", completed: true },
      { step: "Completed", time: "2026-07-05 11:20", completed: true },
    ],
    auditTrail: [
      {
        action: "Quote requested",
        user: "Tom Brown",
        time: "2026-07-05 11:17",
      },
      { action: "OTP verified", user: "System", time: "2026-07-05 11:18" },
      {
        action: "Compliance check passed",
        user: "Compliance Bot",
        time: "2026-07-05 11:19",
      },
      {
        action: "Payment initiated",
        user: "Tom Brown",
        time: "2026-07-05 11:19",
      },
      { action: "Payment completed", user: "System", time: "2026-07-05 11:20" },
    ],
  },
  {
    id: "txn-006",
    date: "2026-07-04 09:33",
    reference: "TMP-CNY-20260704-8658",
    supplier: "Ningbo Logistics Group",
    amount: 1500000,
    currency: "NGN",
    fxRate: 0.00478,
    status: "failed",
    settlementTime: "Failed",
    supplierReceives: 7170,
    supplierBank: "Bank of Communications",
    supplierAccount: "6222 6021 7783 9091",
    supplierContact: "trade@ningbologistics.cn",
    invoiceNumber: "INV-2026-0704-001",
    platformFee: 18000,
    bankFee: 3500,
    timeline: [
      { step: "Quote Generated", time: "2026-07-04 09:30", completed: true },
      { step: "OTP Verified", time: "2026-07-04 09:31", completed: true },
      { step: "Compliance Review", time: "2026-07-04 09:32", completed: true },
      { step: "Settlement", time: "Failed", completed: false },
      { step: "Completed", time: "Failed", completed: false },
    ],
    auditTrail: [
      {
        action: "Quote requested",
        user: "Lisa Anderson",
        time: "2026-07-04 09:30",
      },
      { action: "OTP verified", user: "System", time: "2026-07-04 09:31" },
      {
        action: "Compliance check passed",
        user: "Compliance Bot",
        time: "2026-07-04 09:32",
      },
      {
        action: "Payment initiated",
        user: "Lisa Anderson",
        time: "2026-07-04 09:32",
      },
      {
        action: "Payment failed - Insufficient funds",
        user: "System",
        time: "2026-07-04 09:33",
      },
    ],
  },
];

const statusClasses: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

const formatNGN = (value: number) =>
  `NGN ${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
const formatCNY = (value: number) =>
  `CNY ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const ITEMS_PER_PAGE = 5;

export default function TransactionsPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [allTransactions, setAllTransactions] =
    useState<Transaction[]>(transactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setIsAllowed(true);
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("temitopeTransactions");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Transaction[];
      setAllTransactions([...parsed, ...transactions]);
    } catch {}
  }, []);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((tx) => {
      const matchesSearch = `${tx.supplier} ${tx.reference} ${tx.date}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [allTransactions, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (!isAllowed) return null;

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Transactions
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                View and manage all your supplier payment transactions
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by supplier, reference, or date..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Currency
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      FX Rate
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                      Settlement Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTransaction(tx)}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground">{tx.date}</td>
                      <td className="px-6 py-4">
                        <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground font-mono">
                          {tx.reference}
                        </code>
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {tx.supplier}
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {formatNGN(tx.amount)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">CNY</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {tx.fxRate.toFixed(5)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClasses[tx.status]}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {tx.settlementTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredTransactions.length,
                )}{" "}
                of {filteredTransactions.length} transactions
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "border border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4">
          <div className="min-h-full flex items-start justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSelectedTransaction(null)}
            />
            <div className="relative w-full max-w-5xl my-8 rounded-lg border border-border bg-card shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4 sticky top-0 bg-card z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      Transaction Details
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransaction.reference}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Timeline */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="rounded-lg border border-border bg-background p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Payment Timeline
                      </h3>
                      <div className="space-y-4">
                        {selectedTransaction.timeline.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                  item.completed
                                    ? "bg-green-500 text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {item.completed ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <Clock className="h-4 w-4" />
                                )}
                              </div>
                              {index <
                                selectedTransaction.timeline.length - 1 && (
                                <div
                                  className={`w-0.5 flex-1 ${
                                    item.completed ? "bg-green-500" : "bg-muted"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="pb-6">
                              <p
                                className={`text-sm font-medium ${
                                  item.completed
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {item.step}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                        <Download className="h-4 w-4" />
                        Download Receipt
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                        <FileText className="h-4 w-4" />
                        Export PDF
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                        <Printer className="h-4 w-4" />
                        Print
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClasses[selectedTransaction.status]}`}
                      >
                        {selectedTransaction.status}
                      </span>
                    </div>

                    {/* Supplier Information */}
                    <div className="rounded-lg border border-border bg-background p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Supplier Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Company Name
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {selectedTransaction.supplier}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Bank
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {selectedTransaction.supplierBank}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Account Number
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {selectedTransaction.supplierAccount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Contact Email
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {selectedTransaction.supplierContact}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Invoice & Payment Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border border-border bg-background p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Invoice
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Invoice Number
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {selectedTransaction.invoiceNumber}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Issue Date
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {selectedTransaction.date.split(" ")[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-background p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Payment Breakdown
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Amount Sent
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {formatNGN(selectedTransaction.amount)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              FX Rate
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              1 NGN = {selectedTransaction.fxRate.toFixed(5)}{" "}
                              CNY
                            </span>
                          </div>
                          <div className="flex items-center justify-between border-t border-border pt-3">
                            <span className="text-sm font-semibold text-foreground">
                              Supplier Receives
                            </span>
                            <span className="text-lg font-bold text-emerald-600">
                              {formatCNY(selectedTransaction.supplierReceives)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fees */}
                    <div className="rounded-lg border border-border bg-background p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-4">
                        Fees
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Platform Fee
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {formatNGN(selectedTransaction.platformFee)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Bank Fee
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {formatNGN(selectedTransaction.bankFee)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-border pt-3">
                          <span className="text-sm font-semibold text-foreground">
                            Total Fees
                          </span>
                          <span className="text-sm font-bold text-foreground">
                            {formatNGN(
                              selectedTransaction.platformFee +
                                selectedTransaction.bankFee,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="rounded-lg border border-border bg-background p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Audit Trail
                      </h3>
                      <div className="space-y-3">
                        {selectedTransaction.auditTrail.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start justify-between py-2 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {item.action}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.user}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FinTechSidebar>
  );
}
