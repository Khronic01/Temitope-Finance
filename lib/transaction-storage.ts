export interface Transaction {
  id: string
  type: 'payout' | 'funding'
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  recipientName?: string
  recipientBank?: string
  accountNumber?: string
  paymentMethod?: string
  exchangeRate?: number
  fees?: number
  timestamp: number
  date: string
  description: string
  reference?: string
}

const STORAGE_KEY = 'temitope_transactions'

export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('[v0] Failed to retrieve transactions:', error)
    return []
  }
}

export function addTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
  const newTransaction: Transaction = {
    ...transaction,
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }

  try {
    const transactions = getTransactions()
    transactions.unshift(newTransaction)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    return newTransaction
  } catch (error) {
    console.error('[v0] Failed to add transaction:', error)
    return newTransaction
  }
}

export function updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
  try {
    const transactions = getTransactions()
    const index = transactions.findIndex(t => t.id === id)
    
    if (index === -1) return null
    
    transactions[index] = { ...transactions[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    return transactions[index]
  } catch (error) {
    console.error('[v0] Failed to update transaction:', error)
    return null
  }
}

export function getTransaction(id: string): Transaction | null {
  const transactions = getTransactions()
  return transactions.find(t => t.id === id) || null
}

export function getTransactionsByType(type: 'payout' | 'funding'): Transaction[] {
  return getTransactions().filter(t => t.type === type)
}

export function getTotalCNYExecuted(): number {
  const payouts = getTransactionsByType('payout')
  return payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
}

export function getPayoutStats() {
  const payouts = getTransactionsByType('payout')
  const completedPayouts = payouts.filter(p => p.status === 'completed')
  
  const total = completedPayouts.reduce((sum, p) => sum + p.amount, 0)
  const count = completedPayouts.length
  const average = count > 0 ? total / count : 0
  
  return {
    totalCNYExecuted: total,
    payoutCount: count,
    averagePayoutSize: average,
    lastPayout: completedPayouts[0] || null,
  }
}

export function clearAllTransactions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('[v0] Failed to clear transactions:', error)
  }
}
