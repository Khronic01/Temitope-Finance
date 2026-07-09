'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import { useState } from 'react'
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, Clock } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Payment Completed',
      message: 'Your CNY payout to Shanghai Tech Ltd has been completed successfully.',
      time: '2 hours ago',
      icon: CheckCircle2,
      read: false,
    },
    {
      id: 2,
      type: 'alert',
      title: 'Compliance Check Required',
      message: 'Please complete your quarterly compliance check to maintain your account status.',
      time: '1 day ago',
      icon: AlertCircle,
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Bulk payment processing is now available for your account. Start scheduling multiple payouts at once.',
      time: '3 days ago',
      icon: Info,
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Wallet Funded',
      message: 'Your wallet has been successfully funded with ₦5,000,000.',
      time: '5 days ago',
      icon: CheckCircle2,
      read: true,
    },
    {
      id: 5,
      type: 'alert',
      title: 'Unusual Activity Detected',
      message: 'We detected unusual login activity from a new device. Please verify your account.',
      time: '1 week ago',
      icon: AlertCircle,
      read: true,
    },
    {
      id: 6,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance will occur on Saturday 9 PM - 11 PM. Services may be temporarily unavailable.',
      time: '1 week ago',
      icon: Info,
      read: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-700'
      case 'alert':
        return 'bg-red-50 text-red-700'
      case 'info':
        return 'bg-blue-50 text-blue-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-8 h-8 text-foreground" />
                  <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                </div>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`border border-border rounded-lg p-4 transition-all ${
                        notification.read
                          ? 'bg-card'
                          : 'bg-primary/5 border-primary'
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {notification.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="ml-auto p-1 hover:bg-muted rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
