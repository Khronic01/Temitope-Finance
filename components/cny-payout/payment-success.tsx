'use client'

import Link from 'next/link'
import { CheckCircle2, Download, Truck, RotateCcw } from 'lucide-react'
import type { PaymentMethod } from './payment-methods'
import type { RecipientData } from './recipient-form'

interface PaymentSuccessProps {
  reference: string
  recipient: RecipientData
  paymentMethod: PaymentMethod
  amountNGN: number
  amountCNY: number
  exchangeRate: number
  totalFees: number
  isNewRecipient: boolean
  onNewPayment?: () => void
}

const formatNGN = (value: number) => `NGN ${value.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
const formatCNY = (value: number) => `CNY ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export default function PaymentSuccess({
  reference,
  recipient,
  paymentMethod,
  amountNGN,
  amountCNY,
  exchangeRate,
  totalFees,
  isNewRecipient,
  onNewPayment,
}: PaymentSuccessProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-9 w-9" />
      </div>

      <h2 className="text-3xl font-bold text-foreground">Payment Successful</h2>
      <p className="mt-2 text-sm text-muted-foreground">Your CNY payout has been submitted for settlement.</p>

      <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-border bg-card p-6 text-left">
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Payment Reference</p>
          <p className="mt-1 font-mono text-lg font-bold text-foreground">{reference}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Recipient</p>
            <p className="mt-1 font-semibold text-foreground">{recipient.name}</p>
            {recipient.company && <p className="text-xs text-muted-foreground">{recipient.company}</p>}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Payment Method</p>
            <p className="mt-1 font-semibold text-foreground">
              {paymentMethod === 'bank' && 'Chinese Bank Transfer'}
              {paymentMethod === 'alipay' && 'Alipay'}
              {paymentMethod === 'wechat' && 'WeChat Pay'}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Amount Sent</p>
            <p className="mt-1 font-semibold text-foreground">{formatNGN(amountNGN)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Recipient Receives</p>
            <p className="mt-1 font-bold text-emerald-600">{formatCNY(amountCNY)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Exchange Rate</p>
            <p className="mt-1 font-semibold text-foreground">1 NGN = {exchangeRate.toFixed(5)} CNY</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Total Fees</p>
            <p className="mt-1 font-semibold text-foreground">{formatNGN(totalFees)}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Estimated Settlement</p>
          <p className="mt-1 font-semibold text-foreground">2-6 business hours</p>
        </div>
      </div>

      {isNewRecipient && (
        <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">
            ✓ Recipient has been saved to your Previous Recipients list for faster future CNY Payouts.
          </p>
        </div>
      )}

      <div className="mx-auto mt-8 max-w-2xl grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <Truck className="h-4 w-4" />
          Track Payment
        </Link>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" />
          Download Receipt
        </button>
        {onNewPayment && (
          <button
            onClick={onNewPayment}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:opacity-90 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            New CNY Payout
          </button>
        )}
      </div>
    </div>
  )
}
