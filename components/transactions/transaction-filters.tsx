'use client'

import { Filter } from 'lucide-react'

interface TransactionFiltersProps {
  selectedType: 'all' | 'payout' | 'funding'
  selectedStatus: 'all' | 'completed' | 'pending' | 'processing' | 'failed'
  onTypeChange: (type: 'all' | 'payout' | 'funding') => void
  onStatusChange: (status: 'all' | 'completed' | 'pending' | 'processing' | 'failed') => void
}

export function TransactionFilters({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}: TransactionFiltersProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-foreground" />
        <h3 className="font-semibold text-foreground">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Transaction Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as 'all' | 'payout' | 'funding')}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground"
          >
            <option value="all">All Types</option>
            <option value="payout">CNY Payouts</option>
            <option value="funding">Funding</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) =>
              onStatusChange(
                e.target.value as 'all' | 'completed' | 'pending' | 'processing' | 'failed'
              )
            }
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
    </div>
  )
}
