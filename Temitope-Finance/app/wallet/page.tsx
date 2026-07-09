"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import CurrencyConverter from "@/components/currency-converter";
import BalanceDisplay from "@/components/wallet/balance-display";
import FundingHistory from "@/components/wallet/funding-history";
import StatementExport from "@/components/wallet/statement-export";
import TransactionHistory from "@/components/wallet/transaction-history";
import { Download, Plus, ReceiptText, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function WalletPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isFundOpen, setIsFundOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFunding, setIsFunding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setIsAllowed(true);
  }, [router]);

  const stripNonDigits = (str: string) => str.replace(/[^\d]/g, "");
  const formatNumberWithCommas = (value: string) => {
    const num = Number(stripNonDigits(value));
    if (isNaN(num)) return "";
    return num.toLocaleString("en-NG");
  };

  const [fundAmount, setFundAmount] = useState<number>(2500000);
  const [fundDisplayAmount, setFundDisplayAmount] =
    useState<string>("2,500,000");
  const [fundSource, setFundSource] = useState<
    "Zenith Bank" | "GTBank" | "Access Bank" | "Providus Bank"
  >("Zenith Bank");
  const [fundMethod, setFundMethod] = useState<
    "NIP Transfer" | "Treasury Sweep"
  >("NIP Transfer");

  const fundSummary = useMemo(() => {
    return {
      amountLabel: `NGN ${fundAmount.toLocaleString("en-NG")}`,
      source: fundSource,
      method: fundMethod,
      reference: `FND-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`,
    };
  }, [fundAmount, fundMethod, fundSource]);

  const closeFund = () => {
    setIsFundOpen(false);
    setIsConfirmOpen(false);
    setIsFunding(false);
  };

  if (!isAllowed) return null;

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <section className="mb-6 overflow-hidden rounded-lg border border-border bg-card">
            <div className="bg-gradient-to-br from-neutral-950 via-neutral-950 to-blue-950 px-6 py-7 text-white sm:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                    <WalletCards className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-emerald-200">
                    Temitop Finance Wallet
                  </p>
                  <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    NGN Treasury Wallet
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-neutral-300">
                    Manage available funds, pending settlements, supplier
                    payouts, and wallet reporting from one secure workspace.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[520px]">
                  <Button
                    className="h-11 bg-white text-neutral-950 hover:bg-neutral-100"
                    onClick={() => setIsFundOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Fund Wallet
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 border-white/25 bg-transparent text-white hover:bg-white/10"
                  >
                    <ReceiptText className="h-4 w-4" />
                    Statement
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 border-white/25 bg-transparent text-white hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y divide-border px-6 py-4 text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
              <div className="py-3 sm:pr-6">
                <p className="text-muted-foreground">Wallet ID</p>
                <p className="mt-1 font-semibold text-foreground">
                  TMP-NGN-8842
                </p>
              </div>
              <div className="py-3 sm:px-6">
                <p className="text-muted-foreground">Settlement bank</p>
                <p className="mt-1 font-semibold text-foreground">
                  Providus Bank NGN Collection
                </p>
              </div>
              <div className="py-3 sm:pl-6">
                <p className="text-muted-foreground">Last reconciled</p>
                <p className="mt-1 font-semibold text-foreground">
                  Jul 6, 2026 at 10:42 AM
                </p>
              </div>
            </div>
          </section>

          <BalanceDisplay />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <div className="xl:col-span-2 space-y-6">
              <CurrencyConverter />
              <FundingHistory />
            </div>
            <div className="xl:col-span-3">
              <TransactionHistory />
            </div>
          </div>

          <StatementExport />
        </div>
      </main>

      {isFundOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  Wallet Funding
                </p>
                <h2 className="text-lg font-semibold text-foreground">
                  Fund your NGN wallet
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add funds to enable faster supplier payouts and smoother
                  settlements.
                </p>
              </div>
              <Button variant="outline" onClick={closeFund}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Amount (NGN)
                </label>
                <input
                  inputMode="numeric"
                  value={fundDisplayAmount}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const stripped = stripNonDigits(raw);
                    const numericValue = Number(stripped) || 0;
                    setFundAmount(numericValue);
                    setFundDisplayAmount(formatNumberWithCommas(raw));
                  }}
                  placeholder="0"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base font-semibold text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                />

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[500000, 1500000, 2500000, 5000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setFundAmount(preset);
                        setFundDisplayAmount(preset.toLocaleString("en-NG"));
                      }}
                      className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      NGN {preset.toLocaleString("en-NG")}
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Source bank
                    </label>
                    <select
                      value={fundSource}
                      onChange={(e) =>
                        setFundSource(e.target.value as typeof fundSource)
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    >
                      <option value="Zenith Bank">Zenith Bank</option>
                      <option value="GTBank">GTBank</option>
                      <option value="Access Bank">Access Bank</option>
                      <option value="Providus Bank">Providus Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Method
                    </label>
                    <select
                      value={fundMethod}
                      onChange={(e) =>
                        setFundMethod(e.target.value as typeof fundMethod)
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    >
                      <option value="NIP Transfer">NIP Transfer</option>
                      <option value="Treasury Sweep">Treasury Sweep</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-neutral-950 p-4 text-white">
                <p className="text-sm font-semibold text-white">Summary</p>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Amount</span>
                    <span className="font-semibold">
                      {fundSummary.amountLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Source</span>
                    <span className="font-semibold">{fundSummary.source}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Method</span>
                    <span className="font-semibold">{fundSummary.method}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Reference</span>
                    <span className="font-semibold">
                      {fundSummary.reference}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white/10 px-4 py-3">
                  <p className="text-xs text-white/70">
                    This is a UI prototype. Funding is simulated and does not
                    move real money.
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={fundAmount <= 0}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm wallet funding"
        description={`Fund your NGN wallet with ${fundSummary.amountLabel} from ${fundSummary.source} via ${fundSummary.method}?`}
        confirmText="Confirm funding"
        cancelText="Cancel"
        isLoading={isFunding}
        onConfirm={async () => {
          setIsFunding(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (typeof window !== "undefined") {
            localStorage.setItem("temitopeWalletFunded", "true");
          }
          addToast({
            type: "success",
            message: `Funding initiated: ${fundSummary.amountLabel} • Ref ${fundSummary.reference}`,
          });
          closeFund();
        }}
      />
    </FinTechSidebar>
  );
}
