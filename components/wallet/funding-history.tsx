'use client'

import { ArrowDownToLine } from 'lucide-react'

const fundingData = [
  { id: 1, date: '2026-07-06', source: 'Zenith Bank', amount: 'NGN 8,500,000', method: 'NIP Transfer', status: 'completed', reference: 'FND-2026-1842' },
  { id: 2, date: '2026-07-04', source: 'GTBank', amount: 'NGN 5,250,000', method: 'Bank Transfer', status: 'completed', reference: 'FND-2026-1819' },
  { id: 3, date: '2026-07-03', source: 'Access Bank', amount: 'NGN 3,900,000', method: 'NIP Transfer', status: 'pending', reference: 'FND-2026-1806' },
  { id: 4, date: '2026-06-29', source: 'Providus Bank', amount: 'NGN 12,000,000', method: 'Treasury Sweep', status: 'completed', reference: 'FND-2026-1768' },
]

const statusClasses: Record<string, string> = {
  completed: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
}

export default function FundingHistory() {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Wallet Funding History</h2>
          <p className="text-sm text-muted-foreground">Recent NGN deposits and treasury sweeps</p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted-foreground">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Source</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {fundingData.map((record) => (
              <tr key={record.id} className="hover:bg-muted/50">
                <td className="py-4 font-medium text-foreground">{record.date}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <ArrowDownToLine className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{record.source}</span>
                  </div>
                </td>
                <td className="py-4 font-semibold text-foreground">{record.amount}</td>
                <td className="py-4 text-muted-foreground">{record.method}</td>
                <td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses[record.status]}`}>{record.status}</span></td>
                <td className="py-4"><code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{record.reference}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
