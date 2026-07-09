'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import { useState } from 'react'
import { Settings, Bell, Lock, User, Building2, Save, X } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile')
  const [profileData, setProfileData] = useState({
    companyName: 'Temitope Finance',
    email: 'contact@temitopefinance.com',
    phone: '+234 800 000 0000',
    industry: 'Import/Export',
    country: 'Nigeria',
  })

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: '2024-01-15',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    paymentAlerts: true,
    complianceUpdates: true,
    weeklyReports: false,
    maintenanceAlerts: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-8 h-8 text-foreground" />
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              </div>
              <p className="text-muted-foreground">
                Manage your account, security, and notification preferences
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-border">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'security', label: 'Security', icon: Lock },
                { id: 'notifications', label: 'Notifications', icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Success Message */}
            {saved && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-green-700">Settings saved successfully</p>
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Company Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={profileData.companyName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, companyName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          value={profileData.industry}
                          onChange={(e) =>
                            setProfileData({ ...profileData, industry: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={profileData.country}
                          onChange={(e) =>
                            setProfileData({ ...profileData, country: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Security Options</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Enabled</p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                        Manage
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Last Password Change</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(securityData.lastPasswordChange).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                        Change Password
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Session Management</p>
                        <p className="text-sm text-muted-foreground">View active sessions</p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'paymentAlerts', label: 'Payment Alerts', description: 'Get notified for payment events' },
                      { key: 'complianceUpdates', label: 'Compliance Updates', description: 'Important compliance information' },
                      { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary reports every Monday' },
                      { key: 'maintenanceAlerts', label: 'Maintenance Alerts', description: 'System maintenance notifications' },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{setting.label}</p>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: e.target.checked,
                            })
                          }
                          className="w-5 h-5 accent-primary cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
