'use client'

import { useState } from 'react'
import { Search, Bell, User, ChevronDown, X, Menu } from 'lucide-react'
import Link from 'next/link'

export default function FinTechTopNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="border-b border-border bg-card sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
          <Search className="w-5 h-5 text-foreground" />
        </button>

        {/* Right Side Items - Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
          {/* Wallet Balance */}
          <div className="text-right hidden lg:block">
            <div className="text-xs text-muted-foreground">Wallet</div>
            <div className="font-semibold text-foreground text-sm">NGN 5.4M</div>
          </div>

          {/* KYB Status */}
          <div className="text-right hidden lg:block">
            <div className="text-xs text-muted-foreground">Status</div>
            <div className="flex items-center gap-1 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-semibold text-foreground text-sm">Verified</span>
            </div>
          </div>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1.5 hover:bg-muted rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden xl:block">
              <span className="text-sm font-medium text-foreground block">Temitope</span>
              <span className="text-xs text-muted-foreground block">Admin</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden xl:block" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors ml-auto"
        >
          {showMobileMenu ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">Temitope Finance</div>
              <div className="text-xs text-muted-foreground">Admin Account</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-muted rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Wallet</div>
              <div className="font-semibold text-foreground">NGN 5.4M</div>
            </div>
            <div className="p-2 bg-muted rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Status</div>
              <div className="flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-semibold text-foreground">Verified</span>
              </div>
            </div>
          </div>

          <Link
            href="/notifications"
            className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setShowMobileMenu(false)}
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="text-sm font-medium text-foreground">Notifications</span>
          </Link>
        </div>
      )}
    </div>
  )
}
