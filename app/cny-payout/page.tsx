'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import StepIndicator from '@/components/cny-payout/step-indicator'
import PaymentMethods from '@/components/cny-payout/payment-methods'
import RecipientForm, { type RecipientData } from '@/components/cny-payout/recipient-form'
import ComplianceScreening from '@/components/cny-payout/compliance-screening'
import PaymentProcessing from '@/components/cny-payout/payment-processing'
import PaymentSuccess from '@/components/cny-payout/payment-success'
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import type { PaymentMethod } from '@/components/cny-payout/payment-methods'

const STEPS = [
  'Payment Method',
  'Recipient Details',
  'Enter Amount',
  'Review Payment',
  'OTP Verification',
  'Compliance Check',
  'Processing',
  'Success',
]

const EXCHANGE_RATE = 0.00482
const PLATFORM_FEE_RATE = 0.012
const BANK_FEE = 3500

// Mock saved recipients
const SAVED_RECIPIENTS = [
  {
    name: 'Zhang Wei',
    company: 'Shanghai Manufacturing Ltd',
    bankName: 'ICBC',
    accountNumber: '6217000010011234567',
    province: 'Shanghai',
    city: 'Shanghai',
    lastPaid: 'Jul 2, 2026',
  },
  {
    name: 'Li Ming',
    company: 'Beijing Tech Co.',
    alipayAccount: 'li.ming@example.com',
    lastPaid: 'Jun 28, 2026',
  },
]

const formatNGN = (value: number) => `NGN ${value.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
const formatCNY = (value: number) => `CNY ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export default function CNYPayoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank')
  const [recipientData, setRecipientData] = useState<RecipientData>({
    name: '',
    company: '',
  })
  const [amount, setAmount] = useState(2500000)
  const [otp, setOtp] = useState('')
  const [complianceApproved, setComplianceApproved] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const quote = useMemo(() => {
    const platformFee = amount * PLATFORM_FEE_RATE
    const transferFee = BANK_FEE
    const totalFees = platformFee + transferFee
    const recipientReceives = (amount - platformFee) * EXCHANGE_RATE
    const totalDebit = amount + transferFee

    return { platformFee, transferFee, totalFees, recipientReceives, totalDebit }
  }, [amount])

  const reference = `TMP-CNY-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString().slice(2, 6)}`

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return true // Payment method always selected
      case 2:
        return recipientData.name.trim().length > 0
      case 3:
        return amount > 0
      case 4:
        return true
      case 5:
        return otp.length === 6
      case 6:
        return complianceApproved
      case 7:
        return isProcessing
      default:
        return false
    }
  }

  const next = () => {
    if (currentStep < STEPS.length && canGoNext()) {
      if (currentStep === 5) {
        setCurrentStep(6)
      } else if (currentStep === 6) {
        setCurrentStep(7)
        setTimeout(() => setCurrentStep(8), 3000)
      } else {
        setCurrentStep((step) => step + 1)
      }
    }
  }

  const previous = () => {
    if (currentStep > 1) setCurrentStep((step) => step - 1)
  }

  const resetFlow = () => {
    setCurrentStep(1)
    setRecipientData({ name: '', company: '' })
    setAmount(2500000)
    setOtp('')
    setComplianceApproved(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary">New Payment</p>
              <h1 className="mt-1 text-3xl font-bold text-foreground">CNY Payout</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Send Chinese Yuan (CNY) to your suppliers through your preferred payout method.
              </p>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} stepLabels={STEPS} />

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              {currentStep === 1 && (
                <div>
                  <SectionHeading
                    title="Select Payment Method"
                    subtitle="Choose how you want to send CNY to your supplier."
                  />
                  <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <SectionHeading
                    title="Recipient Information"
                    subtitle="Enter the recipient's payment details based on your selected payout method."
                  />
                  <RecipientForm
                    paymentMethod={paymentMethod}
                    data={recipientData}
                    onChange={setRecipientData}
                    savedRecipients={SAVED_RECIPIENTS as any}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <SectionHeading
                    title="Enter Payment Amount"
                    subtitle="Specify the NGN amount to convert and send to your supplier."
                  />
                  <label className="mb-2 block text-sm font-medium text-foreground">Amount in NGN</label>
                  <div className="flex rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary">
                    <span className="border-r border-border px-4 py-4 text-sm font-semibold text-muted-foreground">
                      NGN
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(event) => setAmount(Number(event.target.value || 0))}
                      className="w-full bg-transparent px-4 py-4 text-3xl font-bold text-foreground outline-none"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[1000000, 2500000, 5000000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className="rounded-lg border border-border px-4 py-3 text-sm font-semibold hover:bg-muted transition-colors"
                      >
                        {formatNGN(preset)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <SectionHeading
                    title="Review Payment"
                    subtitle="Confirm all payment details before proceeding with OTP verification."
                  />
                  <div className="space-y-4 rounded-lg border border-border bg-background p-4">
                    <ReviewRow label="Recipient" value={recipientData.name} />
                    <ReviewRow
                      label="Payment Method"
                      value={
                        paymentMethod === 'bank'
                          ? 'Chinese Bank Transfer'
                          : paymentMethod === 'alipay'
                            ? 'Alipay'
                            : 'WeChat Pay'
                      }
                    />
                    <ReviewRow label="Amount (NGN)" value={formatNGN(amount)} />
                    <ReviewRow label="Platform Fee" value={formatNGN(quote.platformFee)} />
                    <ReviewRow label="Transfer Fee" value={formatNGN(quote.transferFee)} />
                    <ReviewRow label="Total Debit" value={formatNGN(quote.totalDebit)} strong />
                    <ReviewRow label="Recipient Receives (CNY)" value={formatCNY(quote.recipientReceives)} highlight />
                    <ReviewRow label="Exchange Rate" value={`1 NGN = ${EXCHANGE_RATE.toFixed(5)} CNY`} />
                    <ReviewRow label="Estimated Settlement" value="2-6 business hours" />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <SectionHeading
                    title="OTP Verification"
                    subtitle="Enter the 6-digit code sent to the account administrator to authorize this payment."
                  />
                  <div className="mx-auto max-w-md text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <LockKeyhole className="h-6 w-6" />
                    </div>
                    <input
                      type="text"
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
                <ComplianceScreening
                  onComplete={(approved) => {
                    setComplianceApproved(approved)
                    setTimeout(() => next(), 1000)
                  }}
                />
              )}

              {currentStep === 7 && (
                <PaymentProcessing
                  onComplete={() => {
                    setIsProcessing(true)
                  }}
                />
              )}

              {currentStep === 8 && (
                <PaymentSuccess
                  reference={reference}
                  recipient={recipientData}
                  paymentMethod={paymentMethod}
                  amountNGN={amount}
                  amountCNY={quote.recipientReceives}
                  exchangeRate={EXCHANGE_RATE}
                  totalFees={quote.totalFees}
                  isNewRecipient={true}
                  onNewPayment={resetFlow}
                />
              )}
            </div>

            {currentStep < 8 && (
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  onClick={previous}
                  disabled={currentStep === 1}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={next}
                  disabled={!canGoNext() || (currentStep === 6 && !complianceApproved) || (currentStep === 7 && !isProcessing)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {currentStep === 7 ? 'Processing...' : currentStep === STEPS.length - 1 ? 'Complete' : 'Continue'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {currentStep === 8 && (
              <div className="mt-6 flex justify-between">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-4 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            )}
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

function ReviewRow({
  label,
  value,
  strong = false,
  highlight = false,
}: {
  label: string
  value: string
  strong?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`${
          strong ? 'font-bold text-foreground' : 'font-semibold text-foreground'
        } ${highlight ? 'text-emerald-600 text-lg' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}
