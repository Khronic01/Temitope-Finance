"use client";

import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";

export default function PaymentsPage() {
  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-2">
            Manage your cross-border payments
          </p>
          <div className="mt-8 border border-border rounded-lg p-8 bg-card text-center">
            <p className="text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </div>
    </FinTechSidebar>
  );
}
