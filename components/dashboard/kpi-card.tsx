'use client'

import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  caption?: string
  currency?: boolean
}

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  caption,
  currency,
}: KPICardProps) {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600'
    if (changeType === 'negative') return 'text-red-600'
    return 'text-blue-600'
  }

  const getBackgroundColor = () => {
    if (changeType === 'positive') return 'bg-green-50'
    if (changeType === 'negative') return 'bg-red-50'
    return 'bg-blue-50'
  }

  const getIconColor = () => {
    if (changeType === 'positive') return 'text-green-600'
    if (changeType === 'negative') return 'text-red-600'
    return 'text-blue-600'
  }

  const changeLabel =
    changeType === 'positive'
      ? `Up ${Math.abs(change)}%`
      : changeType === 'negative'
        ? `Down ${Math.abs(change)}%`
        : `${Math.abs(change)}% in review`

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${getBackgroundColor()} flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${getIconColor()}`} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`text-sm font-semibold ${getChangeColor()}`}>
          {changeLabel}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
      {caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}
