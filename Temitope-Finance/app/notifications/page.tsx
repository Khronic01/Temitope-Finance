"use client";

import { useState } from "react";
import {
  Bell,
  Wallet,
  CheckCircle,
  ShieldCheck,
  Clock,
  AlertTriangle,
  XCircle,
  Archive,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";

interface Notification {
  id: string;
  type: "wallet" | "payment" | "kyb" | "quote" | "compliance" | "settlement";
  title: string;
  message: string;
  time: string;
  date: "today" | "yesterday" | "earlier";
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

const notifications: Notification[] = [
  // Today's notifications
  {
    id: "1",
    type: "wallet",
    title: "Wallet Funded",
    message: "Your wallet has been funded with ₦5,000,000.00",
    time: "10:30 AM",
    date: "today",
    read: false
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Completed",
    message: "Payment to Shanghai Electronics Ltd has been completed. ¥24,100.00 sent successfully.",
    time: "09:15 AM",
    date: "today",
    read: false,
    actionLabel: "View Receipt",
    actionUrl: "/transactions"
  },
  {
    id: "3",
    type: "kyb",
    title: "KYB Approved",
    message: "Your business verification has been approved. You can now start using all payment features!",
    time: "08:45 AM",
    date: "today",
    read: true
  },
  // Yesterday's notifications
  {
    id: "4",
    type: "quote",
    title: "Quote Expiring",
    message: "Your NGN to CNY quote for ₦3,000,000.00 expires in 30 minutes. Lock it now before it expires!",
    time: "11:00 AM",
    date: "yesterday",
    read: true,
    actionLabel: "Lock Quote",
    actionUrl: "/fx-quotes"
  },
  {
    id: "5",
    type: "compliance",
    title: "Compliance Review",
    message: "A transaction has been flagged for compliance review. Please review it at your earliest convenience.",
    time: "10:15 AM",
    date: "yesterday",
    read: true,
    actionLabel: "Review",
    actionUrl: "/compliance"
  },
  // Earlier notifications
  {
    id: "6",
    type: "settlement",
    title: "Settlement Delayed",
    message: "Your settlement to Beijing Tech Solutions may be delayed due to banking processing times. It should arrive within 24 hours.",
    time: "04:30 PM",
    date: "earlier",
    read: true
  }
];

const getIconForType = (type: Notification["type"]) => {
  switch (type) {
    case "wallet":
      return Wallet;
    case "payment":
      return CheckCircle;
    case "kyb":
      return ShieldCheck;
    case "quote":
      return Clock;
    case "compliance":
      return AlertTriangle;
    case "settlement":
      return XCircle;
    default:
      return Bell;
  }
};

const getIconColorForType = (type: Notification["type"]) => {
  switch (type) {
    case "wallet":
      return "text-green-600 bg-green-50";
    case "payment":
      return "text-blue-600 bg-blue-50";
    case "kyb":
      return "text-green-600 bg-green-50";
    case "quote":
      return "text-amber-600 bg-amber-50";
    case "compliance":
      return "text-amber-600 bg-amber-50";
    case "settlement":
      return "text-red-600 bg-red-50";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const toggleRead = (id: string) => {
    setNotifs(prev =>
      prev.map(n => n.id === id ? { ...n, read: !n.read } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = filter === "unread" ? notifs.filter(n => !n.read) : notifs;

  const groupedNotifs = {
    today: filteredNotifs.filter(n => n.date === "today"),
    yesterday: filteredNotifs.filter(n => n.date === "yesterday"),
    earlier: filteredNotifs.filter(n => n.date === "earlier")
  };

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Stay updated with your account activity
              </p>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | "unread")}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
              </select>
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              >
                <EyeOff className="h-4 w-4" />
                Mark all as read
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-8">
            {Object.entries(groupedNotifs).map(([dateGroup, items]) =>
              items.length > 0 ? (
                <div key={dateGroup}>
                  <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {dateGroup.charAt(0).toUpperCase() + dateGroup.slice(1)}
                  </h2>
                  <div className="space-y-3">
                    {items.map((notification) => {
                      const Icon = getIconForType(notification.type);
                      const iconColor = getIconColorForType(notification.type);
                      return (
                        <div
                          key={notification.id}
                          className={`rounded-lg border border-border bg-card p-4 transition-all ${
                            !notification.read ? "bg-blue-50/50 border-blue-200" : ""
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground">
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    {notification.time}
                                  </p>
                                  {notification.actionLabel && (
                                    <button className="mt-3 text-sm font-semibold text-primary hover:opacity-80">
                                      {notification.actionLabel}
                                    </button>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => toggleRead(notification.id)}
                                    className="p-1.5 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                                    title={notification.read ? "Mark as unread" : "Mark as read"}
                                  >
                                    {notification.read ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                  </button>
                                  <button
                                    className="p-1.5 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                                    title="Archive"
                                  >
                                    <Archive className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}

            {filteredNotifs.length === 0 && (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No notifications</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filter === "unread" ? "You have no unread notifications" : "You have no notifications yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </FinTechSidebar>
  );
}
