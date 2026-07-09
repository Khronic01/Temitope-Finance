'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import KPICard from '@/components/dashboard/kpi-card'
import PaymentVolumeChart from '@/components/dashboard/payment-volume-chart'
import PaymentStatusChart from '@/components/dashboard/payment-status-chart'
import RecentTransactions from '@/components/dashboard/recent-transactions'
import ActivityTimeline from '@/components/dashboard/activity-timeline'
import ComplianceAlerts from '@/components/dashboard/compliance-alerts'
import QuickActions from '@/components/dashboard/quick-actions'
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  PiggyBank,
} from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FinTechTopNav />
        <MainContent />
      </div>
    </div>
  )
}

function MainContent() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back to Temitop Finance</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* KPI Cards - 6 Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="NGN Wallet Balance"
            value="NGN 5,420,000"
            change={12.5}
            changeType="positive"
            icon={DollarSign}
          />
          <KPICard
            title="Monthly Payment Volume"
            value="NGN 8.4M"
            change={8.2}
            changeType="positive"
            icon={TrendingUp}
          />
          <KPICard
            title="Successful Transactions"
            value="127"
            change={4.8}
            changeType="positive"
            icon={CheckCircle2}
            currency={false}
          />
          <KPICard
            title="Pending Payments"
            value="NGN 1.2M"
            change={-2.3}
            changeType="negative"
            icon={Clock}
          />
          <KPICard
            title="Average Settlement Time"
            value="2.4 hours"
            change={5.1}
            changeType="positive"
            icon={Zap}
            currency={false}
          />
          <KPICard
            title="FX Savings"
            value="NGN 234,500"
            change={18.7}
            changeType="positive"
            icon={PiggyBank}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PaymentVolumeChart />
          <PaymentStatusChart />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Transactions and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <RecentTransactions />
            <ActivityTimeline />
          </div>

          {/* Right Column - Compliance */}
          <div>
            <ComplianceAlerts />
          </div>
        </div>
      </div>
    </div>
  )
}
