interface WalletCardProps {
  wallet: {
    id: number
    bank: string
    accountNumber: string
    currency: string
    flag: string
    balance: string
  }
}

export default function WalletCard({ wallet }: WalletCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-slate-600 hover:bg-slate-750">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">{wallet.bank}</p>
          <p className="text-sm text-slate-300">{wallet.accountNumber}</p>
        </div>
        <button className="text-slate-400 hover:text-slate-300">⚙️</button>
      </div>

      <a href="#" className="mb-6 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
        Transactions
        <span>→</span>
      </a>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">{wallet.flag}</span>
        <span className="text-sm font-semibold text-slate-300">{wallet.currency}</span>
      </div>

      <p className="text-2xl font-bold text-white">{wallet.balance}</p>
    </div>
  )
}
