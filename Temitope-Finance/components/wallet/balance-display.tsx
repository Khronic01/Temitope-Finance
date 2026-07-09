'use client'

import { Banknote, CircleDollarSign, Clock3, TrendingUp } from 'lucide-react'

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
    title: 'CNY Wallet Balance',
    value: 'CNY 128,450.25',
    detail: 'Held for upcoming supplier payouts',
    meta: '+2.8% this week',
    icon: CircleDollarSign,
    style: 'bg-card text-foreground border-blue-200',
    iconStyle: 'bg-blue-50 text-blue-600',
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
  {
    title: 'CNY Total Volume',
    value: 'CNY 2,184,300.80',
    detail: 'Converted and settled to suppliers',
    meta: 'CNY 192.4K in July',
    icon: TrendingUp,
    style: 'bg-card text-foreground border-indigo-200',
    iconStyle: 'bg-indigo-50 text-indigo-600',
  },
]

export default function BalanceDisplay() {
  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {balances.map((balance) => {
        const Icon = balance.icon
        return (
          <div
            key={balance.title}
            className={`rounded-lg border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${balance.style}`}
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium opacity-70">{balance.title}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">{balance.value}</p>
              </div>
              <div
                className={`rounded-lg p-3 transition-transform duration-200 hover:scale-105 ${balance.iconStyle}`}
              >
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
