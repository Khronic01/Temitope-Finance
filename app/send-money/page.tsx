'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import StepIndicator from '@/components/send-money/step-indicator'
import { suppliers } from '@/lib/suppliers/data'
import { ArrowLeft, ArrowRight, CheckCircle2, Download, LockKeyhole, ReceiptText, Search, ShieldCheck, Truck } from 'lucide-react'

const STEPS = [
  'Choose Supplier',
  'Enter Amount',
  'Review FX Quote',
  'Review Fees',
  'OTP Verification',
  'Payment Success',
]

const EXCHANGE_RATE = 0.00482
const PLATFORM_FEE_RATE = 0.012
const BANK_FEE = 3500
const reference = 'TMP-CNY-20260706-8842'

const formatNGN = (value: number) => `NGN ${value.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
const formatCNY = (value: number) => `CNY ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export default function SendMoneyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id ?? '')
  const [amount, setAmount] = useState(2500000)
  const [otp, setOtp] = useState('')
  const [query, setQuery] = useState('')

  const selectedSupplier = suppliers.find((supplier) => supplier.id === selectedSupplierId) ?? suppliers[0]
  const filteredSuppliers = suppliers.filter((supplier) =>
    `${supplier.company} ${supplier.supplierName} ${supplier.province}`.toLowerCase().includes(query.toLowerCase()),
  )

  const quote = useMemo(() => {
    const platformFee = amount * PLATFORM_FEE_RATE
    const transferFee = BANK_FEE
    const totalFees = platformFee + transferFee
    const supplierReceives = (amount - platformFee) * EXCHANGE_RATE
    const totalDebit = amount + transferFee

    return { platformFee, transferFee, totalFees, supplierReceives, totalDebit }
  }, [amount])

  const canGoNext = currentStep !== 5 || otp.length === 6

  const next = () => {
    if (currentStep < STEPS.length && canGoNext) setCurrentStep((step) => step + 1)
  }

  const previous = () => {
    if (currentStep > 1) setCurrentStep((step) => step - 1)
  }

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">New Payment</p>
                <h1 className="mt-1 text-3xl font-bold text-foreground">Send CNY to a supplier</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Complete a guided payment with transparent FX, fees, OTP approval, and settlement tracking.
                </p>
              </div>
              <Link href="/fx-quotes" className="text-sm font-semibold text-primary hover:underline">
                Open FX quote screen
              </Link>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} stepLabels={STEPS} />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <section className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
                {currentStep === 1 && (
                  <div>
                    <SectionHeading title="Choose Supplier" subtitle="Select a verified Chinese supplier for this payment." />
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search supplier, company, or province"
                        className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-3">
                      {filteredSuppliers.map((supplier) => (
                        <button
                          key={supplier.id}
                          onClick={() => setSelectedSupplierId(supplier.id)}
                          className={`w-full rounded-lg border p-4 text-left transition-colors ${selectedSupplierId === supplier.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-foreground">{supplier.company}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{supplier.supplierName} - {supplier.chineseBank} - {supplier.province}</p>
                            </div>
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Verified</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <SectionHeading title="Enter Payment Amount" subtitle="Enter the NGN amount to convert and send." />
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
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {[1000000, 2500000, 5000000].map((preset) => (
                        <button key={preset} onClick={() => setAmount(preset)} className="rounded-lg border border-border px-4 py-3 text-sm font-semibold hover:bg-muted">
                          {formatNGN(preset)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <SectionHeading title="Review FX Quote" subtitle="Your exchange rate is locked for 60 seconds." />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SummaryCard label="Amount in NGN" value={formatNGN(amount)} />
                      <SummaryCard label="Exchange Rate" value={`1 NGN = ${EXCHANGE_RATE.toFixed(5)} CNY`} />
                      <SummaryCard label="Supplier Receives" value={formatCNY(quote.supplierReceives)} highlight />
                      <SummaryCard label="Settlement Estimate" value="2-6 business hours" />
                    </div>
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
                      60-second quote countdown: 00:42 remaining
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <SectionHeading title="Review Fees" subtitle="Confirm the full debit and delivery amount before OTP approval." />
                    <div className="space-y-3 rounded-lg border border-border bg-background p-4">
                      <FeeRow label="Payment amount" value={formatNGN(amount)} />
                      <FeeRow label="Platform fee" value={formatNGN(quote.platformFee)} />
                      <FeeRow label="Transfer fee" value={formatNGN(quote.transferFee)} />
                      <FeeRow label="Total wallet debit" value={formatNGN(quote.totalDebit)} strong />
                      <FeeRow label="Supplier receives" value={formatCNY(quote.supplierReceives)} strong />
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div>
                    <SectionHeading title="OTP Verification" subtitle="Enter the 6-digit code sent to the account administrator." />
                    <div className="mx-auto max-w-md text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <LockKeyhole className="h-6 w-6" />
                      </div>
                      <input
                        value={otp}
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                        placeholder="000000"
                        className="w-full rounded-lg border border-border bg-background px-4 py-4 text-center text-3xl font-bold tracking-[0.45em] text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="mt-3 text-sm text-muted-foreground">Code sent to finance@temitop.com</p>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Payment Success</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Your supplier payment has been submitted for settlement.</p>
                    <div className="mx-auto mt-6 max-w-xl rounded-lg border border-border bg-background p-5 text-left">
                      <FeeRow label="Payment Reference" value={reference} strong />
                      <FeeRow label="Supplier" value={selectedSupplier.company} />
                      <FeeRow label="Supplier receives" value={formatCNY(quote.supplierReceives)} />
                      <FeeRow label="Settlement Estimate" value="Today, 2-6 business hours" strong />
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted">
                        <Download className="h-4 w-4" />
                        Download Receipt
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:opacity-90">
                        <Truck className="h-4 w-4" />
                        Track Payment
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">Payment Summary</h2>
                <div className="mt-5 space-y-4">
                  <SummaryCard label="Supplier" value={selectedSupplier.company} />
                  <SummaryCard label="Chinese Bank" value={selectedSupplier.chineseBank} />
                  <SummaryCard label="Amount" value={formatNGN(amount)} />
                  <SummaryCard label="Supplier Receives" value={formatCNY(quote.supplierReceives)} highlight />
                  <SummaryCard label="Payment Reference" value={reference} />
                </div>
                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">Compliance ready</p>
                      <p className="text-sm text-emerald-700">Supplier bank and AML checks are verified for this payment.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={previous}
                disabled={currentStep === 1}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              {currentStep < STEPS.length ? (
                <button
                  onClick={next}
                  disabled={!canGoNext}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <Link href="/dashboard" className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white hover:opacity-90">
                  Back to Dashboard
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function SummaryCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-2 font-semibold ${highlight ? 'text-xl text-emerald-600' : 'text-foreground'}`}>{value}</p>
    </div>
  )
}

function FeeRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`${strong ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>{value}</span>
    </div>
  )
}
