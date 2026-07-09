'use client'

import { ArrowUpRight } from 'lucide-react'

const transactions = [
  {
    id: 'TMP-240706-1842',
    recipient: 'Shanghai Electronics Ltd',
    amount: 'NGN 4,850,000',
    equivalent: 'CNY 23,280',
    status: 'completed',
    date: 'Today, 10:18 AM',
  },
  {
    id: 'TMP-240706-1817',
    recipient: 'Guangzhou Trading Co',
    amount: 'NGN 2,760,000',
    equivalent: 'CNY 13,248',
    status: 'pending',
    date: 'Today, 8:42 AM',
  },
  {
    id: 'TMP-240705-1775',
    recipient: 'Beijing Tech Solutions',
    amount: 'NGN 6,420,000',
    equivalent: 'CNY 30,816',
    status: 'completed',
    date: 'Yesterday, 4:06 PM',
  },
  {
    id: 'TMP-240705-1762',
    recipient: 'Shenzhen Manufacturing',
    amount: 'NGN 3,150,000',
    equivalent: 'CNY 15,120',
    status: 'processing',
    date: 'Yesterday, 1:25 PM',
  },
  {
    id: 'TMP-240704-1704',
    recipient: 'Hangzhou Supplier Inc',
    amount: 'NGN 1,980,000',
    equivalent: 'CNY 9,504',
    status: 'completed',
    date: 'Jul 4, 2026',
  },
]

export default function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700'
      case 'pending':
        return 'bg-amber-50 text-amber-700'
      case 'processing':
        return 'bg-blue-50 text-blue-700'
      case 'failed':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Latest supplier payments and FX settlements</p>
        </div>
        <button className="text-primary text-sm font-medium hover:underline">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted-foreground">
              <th className="pb-3 font-medium">Supplier</th>
              <th className="pb-3 font-medium">Reference</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Equivalent</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-muted/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{tx.recipient}</span>
                  </div>
                </td>
                <td className="py-4 text-muted-foreground">{tx.id}</td>
                <td className="py-4 font-semibold text-foreground">{tx.amount}</td>
                <td className="py-4 text-muted-foreground">{tx.equivalent}</td>
                <td className="py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 text-muted-foreground">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
