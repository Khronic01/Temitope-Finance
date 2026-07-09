'use client'

import { Search, Bell, User, ChevronDown } from 'lucide-react'

export default function FinTechTopNav() {
  return (
    <div className="border-b border-border bg-card">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search payments, suppliers..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-6 ml-8">
          {/* Wallet Balance */}
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Wallet Balance</div>
            <div className="font-semibold text-foreground">NGN 5,420,000</div>
          </div>

          {/* KYB Status */}
          <div className="text-right">
            <div className="text-xs text-muted-foreground">KYB Status</div>
            <div className="flex items-center gap-1 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-semibold text-foreground">Verified</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Temitope Finance</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
