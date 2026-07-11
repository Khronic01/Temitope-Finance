'use client'

import { useEffect, useState } from 'react'
import { Banknote, Clock3, TrendingUp } from 'lucide-react'
import { getTransactions } from '@/lib/transaction-storage'

const BASE_AVAILABLE_BALANCE = 18740500
const BASE_PENDING_BALANCE = 5920000
const BASE_LIFETIME_VOLUME = 486320000
const BASE_MOVEMENT_COUNT = 1284
const BASE_JULY_VOLUME = 42860000

const formatNGN = (value: number) => `NGN ${value.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`

interface BalanceDisplayProps {
  refreshKey?: number
}

export default function BalanceDisplay({ refreshKey = 0 }: BalanceDisplayProps) {
  const [metrics, setMetrics] = useState({
    availableBalance: BASE_AVAILABLE_BALANCE,
    pendingBalance: BASE_PENDING_BALANCE,
    lifetimeVolume: BASE_LIFETIME_VOLUME,
    movementCount: BASE_MOVEMENT_COUNT,
    julyVolume: BASE_JULY_VOLUME,
  })

  useEffect(() => {
    const transactions = getTransactions()
    const completedFunding = transactions
      .filter((transaction) => transaction.type === 'funding' && transaction.status === 'completed')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
    const completedPayouts = transactions
      .filter((transaction) => transaction.type === 'payout' && transaction.status === 'completed')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
    const pendingTransactions = transactions
      .filter((transaction) => transaction.status === 'pending' || transaction.status === 'processing')
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    setMetrics({
      availableBalance: BASE_AVAILABLE_BALANCE + completedFunding - completedPayouts,
      pendingBalance: BASE_PENDING_BALANCE + pendingTransactions,
      lifetimeVolume: BASE_LIFETIME_VOLUME + completedFunding + completedPayouts,
      movementCount: BASE_MOVEMENT_COUNT + transactions.length,
      julyVolume: BASE_JULY_VOLUME + completedFunding + completedPayouts,
    })
  }, [refreshKey])

  const balances = [
    {
      title: 'Available Balance',
      value: formatNGN(metrics.availableBalance),
      detail: 'Ready for supplier payouts',
      meta: '+9.4% this month',
      icon: Banknote,
      style: 'bg-neutral-950 text-white border-neutral-900',
      iconStyle: 'bg-white/10 text-emerald-300',
    },
    {
      title: 'Pending Balance',
      value: formatNGN(metrics.pendingBalance),
      detail: '12 payments awaiting settlement',
      meta: 'Avg release: 3h 24m',
      icon: Clock3,
      style: 'bg-card text-foreground border-amber-200',
      iconStyle: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Lifetime Volume',
      value: formatNGN(metrics.lifetimeVolume),
      detail: `${metrics.movementCount.toLocaleString()} wallet movements`,
      meta: `${formatNGN(metrics.julyVolume)} in July`,
      icon: TrendingUp,
      style: 'bg-card text-foreground border-emerald-200',
      iconStyle: 'bg-emerald-50 text-emerald-600',
    },
  ]

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {balances.map((balance) => {
        const Icon = balance.icon
        return (
          <div key={balance.title} className={`rounded-lg border p-6 shadow-sm ${balance.style}`}>
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium opacity-70">{balance.title}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">{balance.value}</p>
              </div>
              <div className={`rounded-lg p-3 ${balance.iconStyle}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-current/10 pt-4 text-sm">
              <span className="opacity-70">{balance.detail}</span>
              <span className="font-semibold">{balance.meta}</span>
            </div>
          </div>
        )
      })}
    </section>
  )
}
