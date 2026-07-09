'use client'

import { useState } from 'react'
import { ArrowUpRight, Download, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const transactionData = [
  { id: 1, date: '2026-07-06 10:18', recipient: 'Shanghai Electronics Ltd', amount: 'NGN 4,850,000', status: 'completed', reference: 'TXN-2026-8842', currency: 'CNY 23,280' },
  { id: 2, date: '2026-07-06 08:42', recipient: 'Guangzhou Trading Co', amount: 'NGN 2,760,000', status: 'pending', reference: 'TXN-2026-8817', currency: 'CNY 13,248' },
  { id: 3, date: '2026-07-05 16:06', recipient: 'Beijing Tech Solutions', amount: 'NGN 6,420,000', status: 'completed', reference: 'TXN-2026-8775', currency: 'CNY 30,816' },
  { id: 4, date: '2026-07-05 13:25', recipient: 'Shenzhen Manufacturing', amount: 'NGN 3,150,000', status: 'pending', reference: 'TXN-2026-8762', currency: 'CNY 15,120' },
  { id: 5, date: '2026-07-04 11:20', recipient: 'Hangzhou Supplier Inc', amount: 'NGN 1,980,000', status: 'completed', reference: 'TXN-2026-8704', currency: 'CNY 9,504' },
]

const statusClasses: Record<string, string> = {
  completed: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
}

export default function TransactionHistory() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactionData.filter((tx) => {
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter
    const matchesSearch = `${tx.recipient} ${tx.reference}`.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
          <p className="text-sm text-muted-foreground">Wallet debits, FX payouts, and supplier settlements</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search supplier or reference"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'completed', 'pending', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${statusFilter === status ? 'bg-primary text-white' : 'border border-border text-foreground hover:bg-muted'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted-foreground">
              <th className="pb-3 font-medium whitespace-nowrap">Date and Time</th>
              <th className="pb-3 font-medium whitespace-nowrap">Recipient</th>
              <th className="pb-3 font-medium whitespace-nowrap">Amount</th>
              <th className="pb-3 font-medium whitespace-nowrap">Equivalent</th>
              <th className="pb-3 font-medium whitespace-nowrap">Status</th>
              <th className="pb-3 font-medium whitespace-nowrap">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-4 font-medium text-foreground">{tx.date}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{tx.recipient}</span>
                  </div>
                </td>
                <td className="py-4 font-semibold text-foreground">{tx.amount}</td>
                <td className="py-4 text-muted-foreground">{tx.currency}</td>
                <td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses[tx.status]}`}>{tx.status}</span></td>
                <td className="py-4"><code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{tx.reference}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-5 text-sm text-muted-foreground">
        <span>Showing {filteredTransactions.length} of {transactionData.length} transactions</span>
        <span>Updated 2 minutes ago</span>
      </div>
    </section>
  )
}
