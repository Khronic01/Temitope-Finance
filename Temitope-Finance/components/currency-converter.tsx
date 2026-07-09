'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface CurrencyConverterProps {
  variant?: 'inline' | 'modal'
  isOpen?: boolean
  onClose?: () => void
  defaultAmount?: number
  lockPair?: boolean
}

export default function CurrencyConverter({
  variant = 'inline',
  isOpen,
  onClose,
  defaultAmount = 2500000,
  lockPair = true,
}: CurrencyConverterProps) {
  const router = useRouter()
  const [fromCurrency, setFromCurrency] = useState('NGN')
  const [toCurrency, setToCurrency] = useState('CNY')
  const [amount, setAmount] = useState<number>(defaultAmount)
  const [displayAmount, setDisplayAmount] = useState<string>(
    defaultAmount.toLocaleString('en-NG'),
  )

  const EXCHANGE_RATE = 0.00482
  const PLATFORM_FEE_RATE = 0.012
  const BANK_FEE = 3500

  const stripNonDigits = (str: string) => str.replace(/[^\d]/g, '')
  const formatNumberWithCommas = (value: string) => {
    const num = Number(stripNonDigits(value))
    if (isNaN(num)) return ''
    return num.toLocaleString('en-NG')
  }

  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  ]

  const quote = useMemo(() => {
    const rate = fromCurrency === 'NGN' && toCurrency === 'CNY' ? EXCHANGE_RATE : 1
    const platformFee = amount * PLATFORM_FEE_RATE
    const transferFee = BANK_FEE
    const supplierReceives = (amount - platformFee) * rate
    const totalDebit = amount + transferFee
    return { rate, platformFee, transferFee, supplierReceives, totalDebit }
  }, [amount, fromCurrency, toCurrency])

  if (variant === 'modal' && !isOpen) return null

  const Container: React.ComponentType<{ children: React.ReactNode }> =
    variant === 'modal'
      ? ({ children }) => (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {children}
          </div>
        )
      : ({ children }) => <>{children}</>

  return (
    <Container>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Calculator</p>
            <h2 className="text-lg font-semibold text-foreground">
              NGN → CNY payout estimate
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preview rates, fees, and how much your supplier receives.
            </p>
          </div>
          {variant === 'modal' && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl border border-border bg-background p-4">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Amount (NGN)
            </label>
            <input
              inputMode="numeric"
              value={displayAmount}
              onChange={(e) => {
                const rawValue = e.target.value
                const stripped = stripNonDigits(rawValue)
                const numericValue = Number(stripped) || 0
                setAmount(numericValue)
                setDisplayAmount(formatNumberWithCommas(rawValue))
              }}
              placeholder="0"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base font-semibold text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
            />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  From
                </p>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  disabled={lockPair}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary disabled:opacity-70"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  To
                </p>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  disabled={lockPair}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary disabled:opacity-70"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[500000, 1500000, 2500000, 5000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset)
                    setDisplayAmount(preset.toLocaleString('en-NG'))
                  }}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  NGN {preset.toLocaleString('en-NG')}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-neutral-950 p-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
              <span className="text-white/70">Exchange rate</span>
              <span className="font-semibold">
                1 NGN = {quote.rate.toFixed(5)} CNY
              </span>
            </div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Supplier receives</span>
                <span className="font-semibold">
                  CNY{' '}
                  {quote.supplierReceives.toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Platform fee (1.2%)</span>
                <span className="font-semibold text-amber-200">
                  NGN{' '}
                  {quote.platformFee.toLocaleString('en-NG', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Bank transfer fee</span>
                <span className="font-semibold text-amber-200">
                  NGN {quote.transferFee.toLocaleString('en-NG')}
                </span>
              </div>
              <div className="mt-4 rounded-lg bg-white/10 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Total debit</span>
                  <span className="text-lg font-bold">
                    NGN{' '}
                    {quote.totalDebit.toLocaleString('en-NG', {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/60">
                  Settlement estimate: within 3 hours for verified accounts.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Button
                className="w-full"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem(
                      'sendMoneyDraft',
                      JSON.stringify({ amount }),
                    )
                  }
                  router.push('/send-money')
                  onClose?.()
                }}
              >
                Continue to CNY payout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
