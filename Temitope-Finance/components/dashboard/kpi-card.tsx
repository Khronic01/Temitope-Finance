'use client'

import { LucideIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface KPICardProps {
  title: string
  value: string
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  caption?: string
  currency?: boolean
  loading?: boolean
}

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  caption,
  currency,
  loading = false,
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

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-28 mb-2" />
        {caption && <Skeleton className="h-3 w-48" />}
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${getBackgroundColor()} flex-shrink-0 transition-transform duration-200 hover:scale-105`}>
          <Icon className={`w-6 h-6 ${getIconColor()}`} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`text-sm font-semibold ${getChangeColor()} transition-colors duration-200`}>
          {changeLabel}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
      {caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}
