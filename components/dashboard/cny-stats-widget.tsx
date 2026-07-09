'use client'

import { useEffect, useState } from 'react'
import { getPayoutStats } from '@/lib/transaction-storage'
import { TrendingUp, Send, Target, Clock } from 'lucide-react'

interface PayoutStats {
  totalCNYExecuted: number
  payoutCount: number
  averagePayoutSize: number
  lastPayout: any
}

export function CNYStatsWidget() {
  const [stats, setStats] = useState<PayoutStats>({
    totalCNYExecuted: 0,
    payoutCount: 0,
    averagePayoutSize: 0,
    lastPayout: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const payoutStats = getPayoutStats()
    setStats(payoutStats)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total CNY Executed */}
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total CNY Executed</h3>
          <div className="p-2 bg-emerald-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">
          ¥{(stats.totalCNYExecuted * 7).toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {stats.payoutCount} payouts completed
        </p>
      </div>

      {/* Payout Count */}
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Payout Count</h3>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Send className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{stats.payoutCount}</p>
        <p className="text-xs text-muted-foreground mt-2">transactions this month</p>
      </div>

      {/* Average Payout Size */}
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Average Size</h3>
          <div className="p-2 bg-purple-50 rounded-lg">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">
          ₦{Math.round(stats.averagePayoutSize).toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">per transaction</p>
      </div>

      {/* Last Payout */}
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Last Payout</h3>
          <div className="p-2 bg-amber-50 rounded-lg">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        {stats.lastPayout ? (
          <>
            <p className="text-2xl font-bold text-foreground">
              ₦{stats.lastPayout.amount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(stats.lastPayout.timestamp).toLocaleDateString()}
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-muted-foreground">—</p>
            <p className="text-xs text-muted-foreground mt-2">No payouts yet</p>
          </>
        )}
      </div>
    </div>
  )
}
