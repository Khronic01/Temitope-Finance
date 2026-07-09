'use client'

import { notFound, useParams } from 'next/navigation'
import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import SupplierForm from '@/components/suppliers/supplier-form'
import { getSupplier } from '@/lib/suppliers/data'

export default function EditSupplierPage() {
  const params = useParams<{ id: string }>()
  const supplier = getSupplier(params.id)

  if (!supplier) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <SupplierForm mode="edit" supplier={supplier} />
          </div>
        </main>
      </div>
    </div>
  )
}
