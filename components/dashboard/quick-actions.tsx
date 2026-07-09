'use client'

import { useRouter } from 'next/navigation'
import { Banknote, Send, ClipboardCheck } from 'lucide-react'

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      id: 1,
      title: 'Fund Wallet',
      description: 'Add funds to your NGN wallet',
      icon: Banknote,
      color: 'bg-blue-50 text-blue-600',
      onClick: () => router.push('/wallet'),
    },
    {
      id: 2,
      title: 'CNY Payout',
      description: 'Send Chinese Yuan to suppliers',
      icon: Send,
      color: 'bg-emerald-50 text-emerald-600',
      onClick: () => router.push('/cny-payout'),
    },
    {
      id: 3,
      title: 'CNY Payout',
      description: 'Get exchange rates and quotes',
      icon: Send,
      color: 'bg-amber-50 text-amber-600',
      onClick: () => router.push('/cny-payout'),
    },
    {
      id: 4,
      title: 'Audit Reports & Compliance',
      description: 'View compliance status and reports',
      icon: ClipboardCheck,
      color: 'bg-indigo-50 text-indigo-600',
      onClick: () => {
        console.log('[v0] Audit Reports & Compliance clicked')
      },
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary transition-all text-left group"
          >
            <div className={`p-3 rounded-lg ${action.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {action.title}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
          </button>
        )
      })}
    </div>
  )
}
