'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import type { PaymentMethod } from './payment-methods'

export interface RecipientData {
  name: string
  email?: string
  phone?: string
  company?: string
  bankName?: string
  accountNumber?: string
  province?: string
  city?: string
  branch?: string
  swiftCode?: string
  alipayAccount?: string
  wechatId?: string
}

interface RecipientFormProps {
  paymentMethod: PaymentMethod
  data: RecipientData
  onChange: (data: RecipientData) => void
  onSelectPrevious?: () => void
  savedRecipients?: Array<RecipientData & { lastPaid: string }>
}

export default function RecipientForm({
  paymentMethod,
  data,
  onChange,
  onSelectPrevious,
  savedRecipients,
}: RecipientFormProps) {
  const [showPrevious, setShowPrevious] = useState(false)

  const updateField = (field: keyof RecipientData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  if (showPrevious && savedRecipients && savedRecipients.length > 0) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowPrevious(false)}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Back to enter new recipient
        </button>
        <div className="space-y-3">
          {savedRecipients.map((recipient, idx) => (
            <button
              key={idx}
              onClick={() => {
                onChange(recipient)
                setShowPrevious(false)
              }}
              className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{recipient.name}</p>
                  {recipient.company && <p className="text-sm text-muted-foreground">{recipient.company}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {paymentMethod === 'bank' && recipient.bankName && `${recipient.bankName} ••••${recipient.accountNumber?.slice(-4)}`}
                    {paymentMethod === 'alipay' && recipient.alipayAccount && `Alipay ••••${recipient.alipayAccount.slice(-4)}`}
                    {paymentMethod === 'wechat' && recipient.wechatId && `WeChat ••••${recipient.wechatId.slice(-4)}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-muted-foreground">Last paid</p>
                  <p className="text-sm font-semibold text-foreground">{recipient.lastPaid}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {savedRecipients && savedRecipients.length > 0 && (
        <button
          onClick={() => setShowPrevious(true)}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Choose from Previous Recipients
        </button>
      )}

      {/* Recipient Name */}
      <div>
        <label className="block text-sm font-medium text-foreground">Recipient Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Enter recipient name"
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-foreground">Company Name</label>
        <input
          type="text"
          value={data.company || ''}
          onChange={(e) => updateField('company', e.target.value)}
          placeholder="Optional"
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Chinese Bank Transfer Fields */}
      {paymentMethod === 'bank' && (
        <>
          <div>
            <label className="block text-sm font-medium text-foreground">Bank Name *</label>
            <input
              type="text"
              value={data.bankName || ''}
              onChange={(e) => updateField('bankName', e.target.value)}
              placeholder="e.g., ICBC, CCB, ABC"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Account Number *</label>
            <input
              type="text"
              value={data.accountNumber || ''}
              onChange={(e) => updateField('accountNumber', e.target.value)}
              placeholder="Enter bank account number"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Province *</label>
              <input
                type="text"
                value={data.province || ''}
                onChange={(e) => updateField('province', e.target.value)}
                placeholder="e.g., Beijing"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">City *</label>
              <input
                type="text"
                value={data.city || ''}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="e.g., Beijing"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Branch</label>
            <input
              type="text"
              value={data.branch || ''}
              onChange={(e) => updateField('branch', e.target.value)}
              placeholder="Optional"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">SWIFT/CNAPS Code</label>
            <input
              type="text"
              value={data.swiftCode || ''}
              onChange={(e) => updateField('swiftCode', e.target.value)}
              placeholder="If required"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </>
      )}

      {/* Alipay Fields */}
      {paymentMethod === 'alipay' && (
        <div>
          <label className="block text-sm font-medium text-foreground">Alipay Account (Email or Phone) *</label>
          <input
            type="text"
            value={data.alipayAccount || ''}
            onChange={(e) => updateField('alipayAccount', e.target.value)}
            placeholder="Enter Alipay email or phone number"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* WeChat Pay Fields */}
      {paymentMethod === 'wechat' && (
        <div>
          <label className="block text-sm font-medium text-foreground">WeChat ID / Linked Phone Number *</label>
          <input
            type="text"
            value={data.wechatId || ''}
            onChange={(e) => updateField('wechatId', e.target.value)}
            placeholder="Enter WeChat ID or linked phone number"
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* Save Recipient Checkbox */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
        <input
          type="checkbox"
          id="save-recipient"
          defaultChecked
          className="h-4 w-4 cursor-pointer"
        />
        <label htmlFor="save-recipient" className="cursor-pointer text-sm font-medium text-foreground">
          Save this recipient for future CNY Payouts
        </label>
      </div>
    </div>
  )
}
