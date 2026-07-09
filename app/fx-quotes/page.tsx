'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import { ArrowRight, Clock3, ShieldCheck, TrendingDown, Zap } from 'lucide-react'

const EXCHANGE_RATE = 0.00482
const PLATFORM_FEE_RATE = 0.012
const BANK_RATE = 0.00458
const BANK_FEE_RATE = 0.035

const formatNGN = (value: number) => `NGN ${value.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
const formatCNY = (value: number) => `CNY ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export default function FXQuotePage() {
  const [amount, setAmount] = useState(2500000)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 60))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const quote = useMemo(() => {
    const platformFee = amount * PLATFORM_FEE_RATE
    const supplierReceives = (amount - platformFee) * EXCHANGE_RATE
    const bankFee = amount * BANK_FEE_RATE
    const bankReceives = (amount - bankFee) * BANK_RATE
    const savings = supplierReceives - bankReceives

    return { platformFee, supplierReceives, bankFee, bankReceives, savings }
  }, [amount])

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">FX Quote</p>
                <h1 className="mt-1 text-3xl font-bold text-foreground">NGN to CNY supplier quote</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Lock a transparent exchange rate for your China supplier payment before continuing to checkout.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
                <Clock3 className="h-4 w-4" />
                Quote refreshes in {countdown}s
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <section className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-3">
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">Amount in NGN</label>
                  <div className="flex rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary">
                    <span className="border-r border-border px-4 py-4 text-sm font-semibold text-muted-foreground">NGN</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(event) => setAmount(Number(event.target.value || 0))}
                      className="w-full bg-transparent px-4 py-4 text-3xl font-bold text-foreground outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <QuoteMetric label="Exchange Rate" value={`1 NGN = ${EXCHANGE_RATE.toFixed(5)} CNY`} />
                  <QuoteMetric label="Supplier Receives (CNY)" value={formatCNY(quote.supplierReceives)} strong />
                  <QuoteMetric label="Platform Fee" value={formatNGN(quote.platformFee)} />
                  <QuoteMetric label="Estimated Settlement Time" value="2-6 business hours" />
                </div>

                <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">Rate locked for this quote window</p>
                      <p className="text-sm text-emerald-700">No hidden correspondent bank charges. Fees are shown before you continue.</p>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
                <h2 className="text-lg font-semibold text-foreground">Comparison</h2>
                <p className="mt-1 text-sm text-muted-foreground">See what the supplier receives after fees.</p>

                <div className="mt-5 space-y-3">
                  <ComparisonRow title="Traditional Bank" subtitle="Rate 0.00458, 3.5% fee" value={formatCNY(quote.bankReceives)} muted />
                  <ComparisonRow title="Temitop Finance" subtitle="Rate 0.00482, 1.2% fee" value={formatCNY(quote.supplierReceives)} />
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-emerald-700">Savings</p>
                        <p className="mt-1 text-xs text-emerald-700">More value delivered to your supplier</p>
                      </div>
                      <p className="text-xl font-bold text-emerald-700">{formatCNY(quote.savings)}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/send-money"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-4 text-base font-bold text-white transition hover:opacity-90"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function QuoteMetric({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-2 ${strong ? 'text-2xl font-bold text-emerald-600' : 'text-lg font-semibold text-foreground'}`}>{value}</p>
    </div>
  )
}

function ComparisonRow({ title, subtitle, value, muted = false }: { title: string; subtitle: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <p className={`text-lg font-bold ${muted ? 'text-muted-foreground' : 'text-foreground'}`}>{value}</p>
      </div>
    </div>
  )
}
