'use client'

import {
  Banknote,
  CircleDollarSign,
  Clock3,
  Hourglass,
  PiggyBank,
  ShieldCheck,
} from 'lucide-react'
import ActivityTimeline from '@/components/dashboard/activity-timeline'
import ComplianceAlerts from '@/components/dashboard/compliance-alerts'
import KPICard from '@/components/dashboard/kpi-card'
import PaymentStatusChart from '@/components/dashboard/payment-status-chart'
import PaymentVolumeChart from '@/components/dashboard/payment-volume-chart'
import QuickActions from '@/components/dashboard/quick-actions'
import RecentTransactions from '@/components/dashboard/recent-transactions'

const kpis = [
  {
    title: 'NGN Wallet Balance',
    value: 'NGN 18.74M',
    change: 9.4,
    changeType: 'positive' as const,
    icon: Banknote,
    caption: 'Available for supplier payments',
  },
  {
    title: 'Monthly Payment Volume',
    value: 'NGN 42.86M',
    change: 14.8,
    changeType: 'positive' as const,
    icon: CircleDollarSign,
    caption: 'July cross-border volume',
  },
  {
    title: 'Successful Transactions',
    value: '184',
    change: 6.2,
    changeType: 'positive' as const,
    icon: ShieldCheck,
    caption: '98.4% completion rate',
  },
  {
    title: 'Pending Payments',
    value: '12',
    change: 3.1,
    changeType: 'neutral' as const,
    icon: Hourglass,
    caption: 'NGN 5.92M awaiting settlement',
  },
  {
    title: 'Average Settlement Time',
    value: '3h 24m',
    change: 18.5,
    changeType: 'positive' as const,
    icon: Clock3,
    caption: 'Down from 4h 10m last month',
  },
  {
    title: 'FX Savings',
    value: 'NGN 1.28M',
    change: 11.7,
    changeType: 'positive' as const,
    icon: PiggyBank,
    caption: 'Versus bank transfer quotes',
  },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Temitop Finance</p>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Treasury Dashboard
            </h1>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Live rates: 1 NGN = CNY 0.0048 | GBP 0.00047
          </div>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </section>

        <section className="mb-6">
          <QuickActions />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PaymentVolumeChart />
          </div>
          <PaymentStatusChart />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentTransactions />
          </div>
          <ActivityTimeline />
        </section>

        <section className="mt-6">
          <ComplianceAlerts />
        </section>
      </div>
    </main>
  )
}
