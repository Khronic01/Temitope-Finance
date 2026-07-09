"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  Users,
  TrendingUp,
  History,
  CheckSquare,
  Lock,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

const baseMenuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Wallet", icon: Wallet, href: "/wallet" },
  { name: "CNY Payout", icon: TrendingUp, href: "/cny-payout" },
  { name: "Transactions", icon: History, href: "/transactions" },
  { name: "Compliance & Audit", icon: Lock, href: "/compliance" },
];

const adminMenuItem = {
  name: "Admin - Account Reviews",
  icon: ShieldCheck,
  href: "/admin/accounts",
};

const bottomItems = [
  { name: "Notifications", icon: Bell, href: "/notifications" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function FinTechSidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [walletFunded, setWalletFunded] = useState(false);

  const handleLogout = () => {
    setIsMobileMenuOpen(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem("temitopeAdmin");
      localStorage.removeItem("temitopeLoggedIn");
      localStorage.removeItem("temitopeKybStatus");
      localStorage.removeItem("temitopeWalletFunded");

      sessionStorage.removeItem("pendingAccount");
      sessionStorage.removeItem("kybFormData");
      sessionStorage.removeItem("sendMoneyDraft");
    }

    router.push("/auth/login");
  };

  // Check admin status from localStorage and listen for changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkFlags = () => {
      const adminFlag = localStorage.getItem("temitopeAdmin");
      setIsAdmin(adminFlag === "true");
      setWalletFunded(localStorage.getItem("temitopeWalletFunded") === "true");
    };

    checkFlags();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "temitopeAdmin" || e.key === "temitopeWalletFunded") {
        checkFlags();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events from the same tab
    const handleCustomStorageChange = () => checkFlags();
    window.addEventListener("temitopeAdminChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "temitopeAdminChange",
        handleCustomStorageChange,
      );
    };
  }, []);

  const gatedMenuItems = baseMenuItems.filter((item) => {
    if (item.href === "/fx-quotes") return walletFunded;
    return true;
  });

  return (
    <div className="flex h-screen bg-background relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-border rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 w-64 border-r border-border bg-sidebar flex flex-col h-full transition-transform duration-300 ${isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="font-semibold text-foreground">
              Temitop Finance
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {[...gatedMenuItems, ...(isAdmin ? [adminMenuItem] : [])].map(
            (item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-muted"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            },
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border p-3 space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
