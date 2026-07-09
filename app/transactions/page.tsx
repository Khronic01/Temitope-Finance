'use client'

import { useState, useEffect } from 'react'
import { getTransactions, Transaction } from '@/lib/transaction-storage'
import { TransactionFilters } from '@/components/transactions/transaction-filters'
import { TransactionList } from '@/components/transactions/transaction-list'
import { ArrowUpRight } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [selectedType, setSelectedType] = useState<'all' | 'payout' | 'funding'>('all')
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'completed' | 'pending' | 'processing' | 'failed'
  >('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const txns = getTransactions()
    setTransactions(txns)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = transactions

    if (selectedType !== 'all') {
      filtered = filtered.filter(t => t.type === selectedType)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === selectedStatus)
    }

    setFilteredTransactions(filtered)
  }, [selectedType, selectedStatus, transactions])

  if (isLoading) {
    return (
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ArrowUpRight className="w-8 h-8 text-foreground" />
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          </div>
          <p className="text-muted-foreground">
            View and manage all your payment and funding transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Transactions</p>
            <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Completed Payouts
            </p>
            <p className="text-2xl font-bold text-foreground">
              {transactions.filter(t => t.type === 'payout' && t.status === 'completed').length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Funded</p>
            <p className="text-2xl font-bold text-foreground">
              ₦
              {transactions
                .filter(t => t.type === 'funding' && t.status === 'completed')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <TransactionFilters
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />

        {/* Transaction List */}
        <TransactionList transactions={filteredTransactions} />
      </div>
    </main>
  )
}
