"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import { CheckCircle2, XCircle, Eye, Clock } from "lucide-react";

interface PendingAccount {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  registrationNumber?: string;
  industry?: string;
  submissionDate: string;
  directorName?: string;
  status: "pending" | "approved" | "rejected";
}

const initialMockAccounts: PendingAccount[] = [
  {
    id: "1",
    companyName: "Temitope CNY",
    email: "contact@temitopecny.com",
    phone: "+234 801 234 5678",
    registrationNumber: "RC1234567",
    industry: "Retail & E-commerce",
    submissionDate: "2026-07-06 14:30",
    directorName: "Temitope Ogun",
    status: "pending",
  },
];

export default function AdminAccountsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [accounts, setAccounts] = useState<PendingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(
    null,
  );
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  // Allow prototype admin access from a direct live URL.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const adminUnlock = new URLSearchParams(window.location.search).get(
      "admin",
    );
    if (adminUnlock === "temitope") {
      localStorage.setItem("temitopeAdmin", "true");
      window.dispatchEvent(new Event("temitopeAdminChange"));
      setIsAdmin(true);
      router.replace("/admin/accounts");
      return;
    }

    const adminFlag = localStorage.getItem("temitopeAdmin");
    if (adminFlag !== "true") {
      router.push("/dashboard");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  // Load accounts from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedAccounts = localStorage.getItem("temitopeAccounts");
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts(initialMockAccounts);
    }
  }, []);

  // Save accounts to localStorage whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (accounts.length > 0) {
      localStorage.setItem("temitopeAccounts", JSON.stringify(accounts));
    }
  }, [accounts]);

  const filteredAccounts =
    filter === "all"
      ? accounts
      : accounts.filter((acc) => acc.status === filter);

  const handleApprove = (id: string) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, status: "approved" } : acc,
    );
    setAccounts(updatedAccounts);
    if (selectedAccount?.id === id) {
      setSelectedAccount((prev) =>
        prev ? { ...prev, status: "approved" } : null,
      );
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("temitopeKybStatus", "approved");
    }
  };

  const handleReject = (id: string) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, status: "rejected" } : acc,
    );
    setAccounts(updatedAccounts);
    if (selectedAccount?.id === id) {
      setSelectedAccount((prev) =>
        prev ? { ...prev, status: "rejected" } : null,
      );
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("temitopeKybStatus", "rejected");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Admin - Account Reviews
            </h1>
            <p className="text-muted-foreground mt-2">
              Review and verify new user accounts
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "pending"
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "approved"
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "rejected"
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              Rejected
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Accounts List */}
            <div className="lg:col-span-2">
              <div className="border border-border rounded-lg bg-card">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold text-foreground">Accounts</h2>
                </div>
                <div className="divide-y divide-border">
                  {filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedAccount?.id === account.id
                          ? "bg-blue-50"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">
                            {account.companyName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {account.email}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {account.status === "pending" && (
                            <div className="flex items-center gap-1 text-yellow-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Pending
                              </span>
                            </div>
                          )}
                          {account.status === "approved" && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Approved
                              </span>
                            </div>
                          )}
                          {account.status === "rejected" && (
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Rejected
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Submitted {account.submissionDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="lg:col-span-1">
              {selectedAccount ? (
                <div className="border border-border rounded-lg bg-card">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-foreground">
                        Account Details
                      </h2>
                      <div className="flex items-center gap-2">
                        {selectedAccount.status === "pending" && (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">Pending</span>
                          </div>
                        )}
                        {selectedAccount.status === "approved" && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Approved
                            </span>
                          </div>
                        )}
                        {selectedAccount.status === "rejected" && (
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Rejected
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Company Name
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.companyName}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Registration Number
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.registrationNumber || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Industry
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.industry || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Director Name
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.directorName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Email
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.email}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Phone
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.phone}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Submission Date
                      </label>
                      <div className="font-medium text-foreground">
                        {selectedAccount.submissionDate}
                      </div>
                    </div>
                  </div>
                  {selectedAccount.status === "pending" && (
                    <div className="p-4 border-t border-border space-y-3">
                      <button
                        onClick={() => handleApprove(selectedAccount.id)}
                        className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve Account
                      </button>
                      <button
                        onClick={() => handleReject(selectedAccount.id)}
                        className="w-full border border-red-200 text-red-700 font-semibold py-2.5 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Account
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-border rounded-lg bg-card p-8 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select an account to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FinTechSidebar>
  );
}
