'use client'

import { useState } from 'react'
import { X, ArrowRight, CheckCircle } from 'lucide-react'
import { addTransaction } from '@/lib/transaction-storage'

interface FundWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onFunded?: () => void
}

const PRESETS = [
  { label: '₦1M', value: 1000000 },
  { label: '₦2.5M', value: 2500000 },
  { label: '₦5M', value: 5000000 },
  { label: '₦10M', value: 10000000 },
]

export default function FundWalletModal({ isOpen, onClose, onFunded }: FundWalletModalProps) {
  const [step, setStep] = useState<'amount' | 'review' | 'processing' | 'success'>('amount')
  const [amount, setAmount] = useState<number | string>('')
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [processingMessage, setProcessingMessage] = useState('Initiating transfer...')

  const handlePresetSelect = (value: number) => {
    setAmount(value)
    setSelectedPreset(value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value ? parseInt(value) : '')
    setSelectedPreset(null)
  }

  const handleContinue = () => {
    if (!amount || (typeof amount === 'number' && amount <= 0)) return
    setStep('review')
  }

  const handleSubmit = () => {
    setStep('processing')
    setProcessingMessage('Crediting wallet instantly...')

    // Add transaction to storage
    const fundingAmount = typeof amount === 'string' ? parseInt(amount) : amount
    addTransaction({
      type: 'funding',
      amount: fundingAmount,
      currency: 'NGN',
      status: 'completed',
      timestamp: Date.now(),
      date: new Date().toLocaleDateString(),
      description: `Wallet funding - ₦${fundingAmount.toLocaleString()}`,
      paymentMethod: 'Bank Transfer',
    })

    onFunded?.()
    setStep('success')
  }

  const handleClose = () => {
    setStep('amount')
    setAmount('')
    setSelectedPreset(null)
    onClose()
  }

  const fundingAmount = typeof amount === 'string' ? parseInt(amount) : amount
  const processingFee = Math.ceil(fundingAmount * 0.005) // 0.5% fee
  const totalAmount = fundingAmount + processingFee

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Fund Your Wallet</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {step === 'amount' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {PRESETS.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => handlePresetSelect(preset.value)}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${
                        selectedPreset === preset.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!amount || (typeof amount === 'number' && amount <= 0)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-foreground">
                    ₦{fundingAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee (0.5%)</span>
                  <span className="font-semibold text-foreground">₦{processingFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="text-lg font-bold text-primary">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  Funds are credited to your wallet instantly and your available balance updates
                  immediately after confirmation.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('amount')}
                  className="flex-1 px-4 py-2 border border-input rounded-lg text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Confirm & Transfer
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="space-y-6 text-center py-6">
              <div className="flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground animate-pulse">{processingMessage}</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 text-center py-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Wallet Funded Successfully
                </h3>
                <p className="text-sm text-muted-foreground">
                  ₦{fundingAmount.toLocaleString()} has been credited to your available balance instantly.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
