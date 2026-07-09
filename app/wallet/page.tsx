'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import BalanceDisplay from '@/components/wallet/balance-display'
import FundingHistory from '@/components/wallet/funding-history'
import StatementExport from '@/components/wallet/statement-export'
import TransactionHistory from '@/components/wallet/transaction-history'
import { Download, Plus, ReceiptText, WalletCards } from 'lucide-react'

export default function WalletPage() {
  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <section className="mb-6 overflow-hidden rounded-lg border border-border bg-card">
              <div className="bg-neutral-950 px-6 py-7 text-white sm:px-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                      <WalletCards className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-emerald-300">Temitop Finance Wallet</p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">NGN Treasury Wallet</h1>
                    <p className="mt-2 max-w-2xl text-sm text-neutral-300">
                      Manage available funds, pending settlements, supplier payouts, and wallet reporting from one secure workspace.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[520px]">
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-100">
                      <Plus className="h-4 w-4" />
                      Fund Wallet
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                      <ReceiptText className="h-4 w-4" />
                      Download Statement
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-border px-6 py-4 text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
                <div className="py-3 sm:pr-6">
                  <p className="text-muted-foreground">Wallet ID</p>
                  <p className="mt-1 font-semibold text-foreground">TMP-NGN-8842</p>
                </div>
                <div className="py-3 sm:px-6">
                  <p className="text-muted-foreground">Settlement bank</p>
                  <p className="mt-1 font-semibold text-foreground">Providus Bank NGN Collection</p>
                </div>
                <div className="py-3 sm:pl-6">
                  <p className="text-muted-foreground">Last reconciled</p>
                  <p className="mt-1 font-semibold text-foreground">Jul 6, 2026 at 10:42 AM</p>
                </div>
              </div>
            </section>

            <BalanceDisplay />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
              <div className="xl:col-span-2">
                <FundingHistory />
              </div>
              <div className="xl:col-span-3">
                <TransactionHistory />
              </div>
            </div>

            <StatementExport />
          </div>
        </main>
      </div>
    </div>
  )
}
