'use client'

import { CheckCircle2, Clock, FileText, ShieldCheck } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'payment',
    title: 'Payment settled',
    description: 'NGN 4.85M to Shanghai Electronics cleared in 2h 52m',
    timestamp: '18 minutes ago',
  },
  {
    id: 2,
    type: 'quote',
    title: 'FX quote locked',
    description: 'CNY 0.0048 rate locked for Guangzhou Trading Co',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    type: 'compliance',
    title: 'AML screening passed',
    description: 'Beijing Tech Solutions payment released to settlement queue',
    timestamp: '3 hours ago',
  },
  {
    id: 4,
    type: 'document',
    title: 'Statement generated',
    description: 'July wallet and supplier payment statement exported',
    timestamp: 'Yesterday',
  },
]

export default function ActivityTimeline() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CheckCircle2 className="w-5 h-5" />
      case 'quote':
        return <Clock className="w-5 h-5" />
      case 'compliance':
        return <ShieldCheck className="w-5 h-5" />
      case 'document':
        return <FileText className="w-5 h-5" />
      default:
        return <CheckCircle2 className="w-5 h-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-green-50 text-green-600'
      case 'quote':
        return 'bg-blue-50 text-blue-600'
      case 'compliance':
        return 'bg-amber-50 text-amber-600'
      case 'document':
        return 'bg-violet-50 text-violet-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity Timeline</h3>
        <p className="text-sm text-muted-foreground">Operational events from today</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              {index < activities.length - 1 && (
                <div className="mt-2 h-12 w-0.5 bg-border" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
