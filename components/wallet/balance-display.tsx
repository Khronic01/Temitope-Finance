'use client'

import { Banknote, Clock3, TrendingUp } from 'lucide-react'

const balances = [
  {
    title: 'Available Balance',
    value: 'NGN 18,740,500',
    detail: 'Ready for supplier payouts',
    meta: '+9.4% this month',
    icon: Banknote,
    style: 'bg-neutral-950 text-white border-neutral-900',
    iconStyle: 'bg-white/10 text-emerald-300',
  },
  {
    title: 'Pending Balance',
    value: 'NGN 5,920,000',
    detail: '12 payments awaiting settlement',
    meta: 'Avg release: 3h 24m',
    icon: Clock3,
    style: 'bg-card text-foreground border-amber-200',
    iconStyle: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Lifetime Volume',
    value: 'NGN 486,320,000',
    detail: '1,284 wallet movements',
    meta: 'NGN 42.86M in July',
    icon: TrendingUp,
    style: 'bg-card text-foreground border-emerald-200',
    iconStyle: 'bg-emerald-50 text-emerald-600',
  },
]

export default function BalanceDisplay() {
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
