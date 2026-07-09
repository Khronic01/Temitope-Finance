'use client'

import { useState } from 'react'

interface CurrencyConverterProps {
  isOpen: boolean
  onClose: () => void
}

export default function CurrencyConverter({
  isOpen,
  onClose,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('NGN')
  const [toCurrency, setToCurrency] = useState('CNY')

  const exchangeRates: Record<string, Record<string, number>> = {
    NGN: { USD: 0.0064, GBP: 0.0051, EUR: 0.0059, CAD: 0.0088, CNY: 0.045 },
    USD: { NGN: 156.25, GBP: 0.79, EUR: 0.92, CAD: 1.37, CNY: 7.03 },
    GBP: { NGN: 196.08, USD: 1.27, EUR: 1.16, CAD: 1.73, CNY: 8.89 },
    EUR: { NGN: 169.49, USD: 1.09, GBP: 0.86, CAD: 1.49, CNY: 7.65 },
    CAD: { NGN: 113.64, USD: 0.73, GBP: 0.58, EUR: 0.67, CNY: 5.13 },
    CNY: { NGN: 22.22, USD: 0.142, GBP: 0.112, EUR: 0.131, CAD: 0.195 },
  }

  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  ]

  const getConvertedAmount = () => {
    if (!amount || isNaN(parseFloat(amount))) return 0
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
    return parseFloat(amount) * rate
  }

  const getTransactionFee = () => {
    return getConvertedAmount() * 0.02
  }

  const getFinalAmount = () => {
    return getConvertedAmount() - getTransactionFee()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Currency Converter</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Amount to Convert
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conversion Details */}
        <div className="mb-6 rounded-lg bg-slate-800 p-4">
          <div className="mb-3 flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-sm text-slate-400">Exchange Rate</span>
            <span className="font-semibold text-white">
              1 {fromCurrency} ={' '}
              {(
                exchangeRates[fromCurrency]?.[toCurrency] || 1
              ).toFixed(6)}{' '}
              {toCurrency}
            </span>
          </div>
          <div className="mb-3 flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-sm text-slate-400">Converted Amount</span>
            <span className="font-semibold text-white">
              {getConvertedAmount().toFixed(2)} {toCurrency}
            </span>
          </div>
          <div className="mb-3 flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-sm text-slate-400">Transaction Fee (2%)</span>
            <span className="font-semibold text-red-400">
              -{getTransactionFee().toFixed(2)} {toCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">
              You Receive
            </span>
            <span className="text-lg font-bold text-cyan-400">
              {getFinalAmount().toFixed(2)} {toCurrency}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          Proceed to Transfer
        </button>
      </div>
    </div>
  )
}
