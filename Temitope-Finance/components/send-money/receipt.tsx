'use client'

interface ReceiptProps {
  transactionData: {
    transactionId: string
    date: string
    fromAmount: string
    toAmount: string
    fromCurrency: string
    toCurrency: string
    exchangeRate: string
    fee: string
    receiverBank: string
    receiverAccount: string
    supplierName: string
    status: string
  }
  onDownload: () => void
  onArchive: () => void
}

export default function Receipt({
  transactionData,
  onDownload,
  onArchive,
}: ReceiptProps) {
  return (
    <div className="rounded-lg bg-slate-800 p-8">
      <div className="mb-6 text-center">
        <div className="mb-2 text-5xl">✓</div>
        <h2 className="text-2xl font-bold text-cyan-400">
          Transaction Successful
        </h2>
        <p className="mt-2 text-slate-400">
          Your money transfer has been completed
        </p>
      </div>

      <div className="mb-6 space-y-4 rounded-lg bg-slate-700 p-4">
        <div className="flex items-center justify-between border-b border-slate-600 pb-3">
          <span className="text-slate-400">Transaction ID</span>
          <span className="font-mono font-semibold text-white">
            {transactionData.transactionId}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-600 pb-3">
          <span className="text-slate-400">Date & Time</span>
          <span className="font-semibold text-white">
            {transactionData.date}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-600 pb-3">
          <span className="text-slate-400">You Sent</span>
          <span className="font-semibold text-white">
            {transactionData.fromAmount} {transactionData.fromCurrency}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-600 pb-3">
          <span className="text-slate-400">Exchange Rate</span>
          <span className="font-semibold text-white">
            {transactionData.exchangeRate}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-600 pb-3">
          <span className="text-slate-400">Transaction Fee (2%)</span>
          <span className="font-semibold text-red-400">
            -{transactionData.fee}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Recipient Receives</span>
          <span className="text-lg font-bold text-cyan-400">
            {transactionData.toAmount} {transactionData.toCurrency}
          </span>
        </div>
      </div>

      <div className="mb-6 space-y-3 rounded-lg bg-slate-700 p-4">
        <h3 className="font-semibold text-white">Recipient Bank Details</h3>
        <div className="text-sm text-slate-300">
          <p>Bank: {transactionData.receiverBank}</p>
          <p>Account: {transactionData.receiverAccount}</p>
        </div>
        <h3 className="mt-3 font-semibold text-white">Processing</h3>
        <div className="text-sm text-slate-300">
          <p>Supplier: {transactionData.supplierName}</p>
          <p>Status: {transactionData.status}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onDownload}
          className="flex-1 rounded-lg border border-cyan-500 px-4 py-3 font-semibold text-cyan-400 hover:bg-cyan-500/10 transition"
        >
          Download Receipt
        </button>
        <button
          onClick={onArchive}
          className="flex-1 rounded-lg bg-slate-700 px-4 py-3 font-semibold text-white hover:bg-slate-600 transition"
        >
          Archive Transaction
        </button>
      </div>
    </div>
  )
}
