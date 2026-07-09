'use client'

import { CreditCard, Smartphone, Wallet } from 'lucide-react'

export type PaymentMethod = 'bank' | 'alipay' | 'wechat'

interface PaymentMethodsProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
}

const methods = [
  {
    id: 'bank' as PaymentMethod,
    title: 'Chinese Bank Transfer',
    description: 'Direct bank account transfer',
    icon: CreditCard,
  },
  {
    id: 'alipay' as PaymentMethod,
    title: 'Alipay',
    description: 'Alipay account transfer',
    icon: Wallet,
  },
  {
    id: 'wechat' as PaymentMethod,
    title: 'WeChat Pay',
    description: 'WeChat Pay account transfer',
    icon: Smartphone,
  },
]

export default function PaymentMethods({ selected, onSelect }: PaymentMethodsProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const Icon = method.icon
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`w-full rounded-lg border p-4 text-left transition-all ${
              selected === method.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`rounded-lg p-3 ${
                  selected === method.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{method.title}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
