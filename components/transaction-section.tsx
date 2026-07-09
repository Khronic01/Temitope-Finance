interface Transaction {
  id: number
  name: string
  date: string
  amount: string
  icon: string
  color: string
}

interface TransactionSectionProps {
  title: string
  transactions: Transaction[]
}

export default function TransactionSection({
  title,
  transactions,
}: TransactionSectionProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
          See all transactions →
        </a>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${transaction.color}`}>
                {transaction.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{transaction.name}</p>
                <p className="text-xs text-slate-400">{transaction.date}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-300">{transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
