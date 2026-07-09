'use client'

import { AlertCircle, CheckCircle2, ChevronRight, Clock } from 'lucide-react'

const alerts = [
  {
    id: 1,
    type: 'success',
    title: 'KYB verification active',
    description: 'Business profile, directors, and ownership records are verified.',
    timestamp: 'Updated today',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Monthly limit threshold',
    description: 'You have used 78% of your NGN 55M July payment limit.',
    timestamp: 'Review before next large payment',
  },
  {
    id: 3,
    type: 'info',
    title: 'Supplier document review',
    description: 'Shenzhen Manufacturing invoice proof is awaiting finance approval.',
    timestamp: 'Due in 22 hours',
  },
]

export default function ComplianceAlerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />
      case 'info':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-amber-50 border-amber-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Compliance Alerts</h3>
          <p className="text-sm text-muted-foreground">Risk, limits, and verification updates</p>
        </div>
        <button className="text-primary text-sm font-medium hover:underline">View all</button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            className={`flex gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-background ${getAlertColor(alert.type)}`}
          >
            <div className="flex-shrink-0 pt-0.5">{getAlertIcon(alert.type)}</div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{alert.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{alert.timestamp}</p>
            </div>
            <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
