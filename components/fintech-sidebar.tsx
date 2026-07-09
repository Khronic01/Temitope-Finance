'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  History,
  CheckSquare,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Wallet', icon: Wallet, href: '/wallet' },
  { name: 'CNY Payout', icon: TrendingUp, href: '/cny-payout' },
  { name: 'Transactions', icon: History, href: '/transactions' },
  { name: 'Audit Reports & Compliance', icon: CheckSquare, href: '/audit-reports' },
]

const bottomItems = [
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

export default function FinTechSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
          <span className="font-semibold text-foreground">Temitop Finance</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border p-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors text-left">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
