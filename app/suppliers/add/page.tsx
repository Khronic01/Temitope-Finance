'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import SupplierForm from '@/components/suppliers/supplier-form'

export default function AddSupplierPage() {
  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <SupplierForm mode="add" />
          </div>
        </main>
      </div>
    </div>
  )
}
