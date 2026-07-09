'use client'

import Link from 'next/link'
import { ArrowLeft, Building2, Save, ShieldCheck } from 'lucide-react'
import { Supplier } from '@/lib/suppliers/data'

interface SupplierFormProps {
  mode: 'add' | 'edit'
  supplier?: Supplier
}

export default function SupplierForm({ mode, supplier }: SupplierFormProps) {
  const isEdit = mode === 'edit'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/suppliers" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to suppliers
          </Link>
          <p className="text-sm font-medium text-primary">Supplier Management</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">
            {isEdit ? 'Edit Supplier' : 'Add Supplier'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isEdit
              ? 'Update bank, contact, and compliance details for this supplier.'
              : 'Create a verified Chinese supplier profile for future CNY payments.'}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
          <Save className="h-4 w-4" />
          {isEdit ? 'Save Changes' : 'Create Supplier'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Supplier Profile</h2>
              <p className="text-sm text-muted-foreground">Legal name, company, location, and contact data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Supplier Name" defaultValue={supplier?.supplierName} placeholder="Li Wei" />
            <Field label="Company" defaultValue={supplier?.company} placeholder="Shanghai Electronics Ltd" />
            <Field label="Contact Email" defaultValue={supplier?.contactEmail} placeholder="finance@supplier.cn" type="email" />
            <Field label="Phone Number" defaultValue={supplier?.phone} placeholder="+86 21 0000 0000" />
            <Field label="Province" defaultValue={supplier?.province} placeholder="Guangdong" />
            <Field label="Business Category" defaultValue={supplier?.category} placeholder="Electronics" />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-foreground">Address</label>
              <textarea
                defaultValue={supplier?.address}
                placeholder="Supplier registered address in China"
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Compliance Status</h2>
              <p className="text-sm text-muted-foreground">Internal review settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Status</label>
              <select
                defaultValue={supplier?.status ?? 'pending'}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="review">In review</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Risk Rating</label>
              <select
                defaultValue={supplier?.riskRating ?? 'Low'}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Bank account and supplier ownership details will be checked before the first payout.
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 font-semibold text-foreground">Chinese Bank Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Chinese Bank" defaultValue={supplier?.chineseBank} placeholder="Bank of China" />
          <Field label="Bank Account" defaultValue={supplier?.bankAccount} placeholder="6222 0000 0000 0000" />
          <Field label="SWIFT Code" defaultValue={supplier?.swiftCode} placeholder="BKCHCNBJ300" />
          <Field label="Last Payment" defaultValue={supplier?.lastPayment} placeholder="NGN 0" />
        </div>
      </section>
    </div>
  )
}

function Field({
  label,
  defaultValue,
  placeholder,
  type = 'text',
}: {
  label: string
  defaultValue?: string
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
