'use client'

import { useRouter } from 'next/navigation'
import { Banknote, Send, TrendingUp, UserPlus } from 'lucide-react'

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
      title: 'New Payment',
      description: 'Send money to Chinese suppliers',
      icon: Send,
      color: 'bg-green-50 text-green-600',
      onClick: () => router.push('/send-money'),
    },
    {
      id: 3,
      title: 'Generate FX Quote',
      description: 'Get current exchange rate quote',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
      onClick: () => {
        console.log('[v0] Generate FX Quote clicked')
      },
    },
    {
      id: 4,
      title: 'Add Supplier',
      description: 'Register a new payment recipient',
      icon: UserPlus,
      color: 'bg-purple-50 text-purple-600',
      onClick: () => {
        console.log('[v0] Add Supplier clicked')
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
