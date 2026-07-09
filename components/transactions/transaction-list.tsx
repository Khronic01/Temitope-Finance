'use client'

import { Transaction } from '@/lib/transaction-storage'
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        )
      case 'processing':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            <Clock className="w-4 h-4" />
            Processing
          </div>
        )
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
            <Clock className="w-4 h-4" />
            Pending
          </div>
        )
      case 'failed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-4 h-4" />
            Failed
          </div>
        )
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-foreground">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={txn.id}
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  index === transactions.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-6 py-4 text-sm text-foreground">{txn.date}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {txn.type === 'payout' ? (
                      <ArrowUpRight className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-green-500" />
                    )}
                    <span className="capitalize text-foreground">
                      {txn.type === 'payout' ? 'CNY Payout' : 'Funding'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {txn.description}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-right text-foreground">
                  {txn.type === 'payout' ? '-' : '+'}₦{txn.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(txn.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
