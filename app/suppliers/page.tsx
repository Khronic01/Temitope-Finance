'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import { suppliers } from '@/lib/suppliers/data'
import {
  Building2,
  ChevronRight,
  Filter,
  LucideIcon,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react'

const statusStyles = {
  active: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  review: 'bg-blue-50 text-blue-700',
  paused: 'bg-red-50 text-red-700',
}

export default function SupplierDirectoryPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [province, setProvince] = useState('all')

  const provinces = Array.from(new Set(suppliers.map((supplier) => supplier.province)))

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesQuery = `${supplier.supplierName} ${supplier.company} ${supplier.chineseBank}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesStatus = status === 'all' || supplier.status === status
      const matchesProvince = province === 'all' || supplier.province === province

      return matchesQuery && matchesStatus && matchesProvince
    })
  }, [query, province, status])

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Supplier Management</p>
                <h1 className="mt-1 text-3xl font-bold text-foreground">Supplier Directory</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage approved Chinese suppliers, payment rails, and verification status.
                </p>
              </div>
              <Link
                href="/suppliers/add"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add Supplier
              </Link>
            </div>

            <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricCard title="Active Suppliers" value="3" icon={Users} tone="green" />
              <MetricCard title="Verified Bank Accounts" value="6" icon={ShieldCheck} tone="blue" />
              <MetricCard title="Monthly Supplier Volume" value="NGN 19.16M" icon={Building2} tone="slate" />
            </section>

            <section className="rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search supplier, company, or Chinese bank"
                      className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="bg-transparent text-sm text-foreground outline-none"
                      >
                        <option value="all">All statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="review">In review</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                      <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                      <select
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                        className="bg-transparent text-sm text-foreground outline-none"
                      >
                        <option value="all">All provinces</option>
                        {provinces.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Supplier Name</th>
                      <th className="px-5 py-3 font-medium">Company</th>
                      <th className="px-5 py-3 font-medium">Chinese Bank</th>
                      <th className="px-5 py-3 font-medium">Province</th>
                      <th className="px-5 py-3 font-medium">Last Payment</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSuppliers.map((supplier) => (
                      <tr key={supplier.id} className="hover:bg-muted/40">
                        <td className="px-5 py-4 font-semibold text-foreground">{supplier.supplierName}</td>
                        <td className="px-5 py-4 text-foreground">{supplier.company}</td>
                        <td className="px-5 py-4 text-muted-foreground">{supplier.chineseBank}</td>
                        <td className="px-5 py-4 text-muted-foreground">{supplier.province}</td>
                        <td className="px-5 py-4 font-semibold text-foreground">{supplier.lastPayment}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[supplier.status]}`}>
                            {supplier.status === 'review' ? 'In review' : supplier.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/suppliers/${supplier.id}`} className="font-medium text-primary hover:underline">
                              View
                            </Link>
                            <span className="text-border">/</span>
                            <Link href={`/suppliers/${supplier.id}/edit`} className="font-medium text-primary hover:underline">
                              Edit
                            </Link>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-border px-5 py-4 text-sm text-muted-foreground">
                <span>Showing {filteredSuppliers.length} of {suppliers.length} suppliers</span>
                <span>Bank verification synced today</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string
  value: string
  icon: LucideIcon
  tone: 'green' | 'blue' | 'slate'
}) {
  const tones = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    slate: 'bg-neutral-100 text-neutral-700',
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
