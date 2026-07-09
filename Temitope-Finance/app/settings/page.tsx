"use client";

import { useState, useEffect } from "react";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import {
  Building,
  Users,
  ShieldCheck,
  Bell,
  Landmark,
  Key,
  AlertTriangle,
  ArrowRight,
  Save,
  Plus,
  Copy,
  Trash2,
} from "lucide-react";

type SettingsTab =
  | "profile"
  | "users"
  | "security"
  | "notifications"
  | "bank"
  | "api"
  | "danger";

export default function SettingsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Check current admin status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminFlag = localStorage.getItem("temitopeAdmin");
      setIsAdmin(adminFlag === "true");
    }
  }, []);

  // Handle triple click
  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimer) clearTimeout(clickTimer);

    if (newCount >= 3) {
      // Toggle admin status
      const newAdminStatus = !isAdmin;
      setIsAdmin(newAdminStatus);
      localStorage.setItem("temitopeAdmin", newAdminStatus ? "true" : "false");
      setClickCount(0);
      // Dispatch custom event to update sidebar in real-time
      window.dispatchEvent(new Event("temitopeAdminChange"));
    } else {
      // Reset count after 1 second
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 1000);
      setClickTimer(timer);
    }
  };

  const tabs = [
    { id: "profile", label: "Business Profile", icon: Building },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "bank", label: "Linked Bank Accounts", icon: Landmark },
    { id: "api", label: "API Keys", icon: Key },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ] as const;

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-foreground cursor-pointer select-none"
              onClick={handleTitleClick}
              title="Triple-click to toggle admin mode"
            >
              Settings
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your business account settings and preferences
            </p>
            {isAdmin && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">Admin mode enabled</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="rounded-lg border border-border bg-card">
                {/* Business Profile */}
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Business Profile
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Temitope Finance Ltd"
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Registration Number
                        </label>
                        <input
                          type="text"
                          defaultValue="RC12345678"
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="finance@temitope.com"
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+234 801 234 5678"
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Business Address
                        </label>
                        <textarea
                          defaultValue="123 Business District, Lagos, Nigeria"
                          rows={3}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Users & Roles */}
                {activeTab === "users" && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">
                        Users & Roles
                      </h2>
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        <Plus className="h-4 w-4" />
                        Invite User
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              User
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Email
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Role
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Status
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {[
                            {
                              name: "Temitope Ogun",
                              email: "temitope@temitope.com",
                              role: "Admin",
                              status: "Active",
                            },
                            {
                              name: "John Doe",
                              email: "john@temitope.com",
                              role: "Finance",
                              status: "Active",
                            },
                            {
                              name: "Jane Smith",
                              email: "jane@temitope.com",
                              role: "Viewer",
                              status: "Pending",
                            },
                          ].map((user, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <td className="px-4 py-3 font-medium text-foreground">
                                {user.name}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {user.email}
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium capitalize ${
                                    user.status === "Active"
                                      ? "border-green-200 bg-green-50 text-green-700"
                                      : "border-amber-200 bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button className="text-sm font-semibold text-primary hover:opacity-80 mr-3">
                                  Edit
                                </button>
                                <button className="text-sm font-semibold text-red-600 hover:opacity-80">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeTab === "security" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Security
                    </h2>
                    <div className="space-y-6">
                      <div className="rounded-lg border border-border bg-background p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              Change Password
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Update your password to keep your account secure
                            </p>
                          </div>
                          <button className="text-sm font-semibold text-primary hover:opacity-80">
                            Change
                          </button>
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-background p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <button className="text-sm font-semibold text-primary hover:opacity-80">
                            Enable
                          </button>
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-background p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              Sessions
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Manage all your active sessions
                            </p>
                          </div>
                          <button className="text-sm font-semibold text-primary hover:opacity-80">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Preferences */}
                {activeTab === "notifications" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Notification Preferences
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Wallet Funded",
                          desc: "Get notified when your wallet is funded",
                        },
                        {
                          title: "Payment Completed",
                          desc: "Get notified when a payment is completed",
                        },
                        {
                          title: "KYB Approved",
                          desc: "Get notified when your KYB is approved",
                        },
                        {
                          title: "Quote Expiring",
                          desc: "Get notified when a quote is about to expire",
                        },
                        {
                          title: "Compliance Review",
                          desc: "Get notified when a transaction needs compliance review",
                        },
                        {
                          title: "Settlement Delayed",
                          desc: "Get notified when a settlement is delayed",
                        },
                      ].map((pref, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                        >
                          <div>
                            <h3 className="font-medium text-foreground">
                              {pref.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {pref.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                              <input
                                type="checkbox"
                                className="rounded border-border"
                                defaultChecked
                              />
                              Email
                            </label>
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                              <input
                                type="checkbox"
                                className="rounded border-border"
                                defaultChecked
                              />
                              In-app
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        <Save className="h-4 w-4" />
                        Save Preferences
                      </button>
                    </div>
                  </div>
                )}

                {/* Linked Bank Accounts */}
                {activeTab === "bank" && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">
                        Linked Bank Accounts
                      </h2>
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        <Plus className="h-4 w-4" />
                        Link Account
                      </button>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Guaranty Trust Bank",
                          account: "0123456789",
                          status: "Active",
                        },
                        {
                          name: "Zenith Bank",
                          account: "9876543210",
                          status: "Active",
                        },
                      ].map((account, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Landmark className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">
                                {account.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {account.account}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                              {account.status}
                            </span>
                            <button className="text-sm font-semibold text-red-600 hover:opacity-80">
                              Unlink
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* API Keys */}
                {activeTab === "api" && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">
                        API Keys
                      </h2>
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                        <Plus className="h-4 w-4" />
                        Generate New Key
                      </button>
                    </div>
                    <div className="rounded-lg border border-border bg-amber-50 p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800">
                            Keep your API keys secure
                          </h3>
                          <p className="text-sm text-amber-700 mt-1">
                            Never share your API keys in public places like
                            GitHub, client-side code, or emails.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Production Key",
                          key: "sk_live_xxxxxx",
                          created: "Jul 01, 2026",
                        },
                        {
                          name: "Test Key",
                          key: "sk_test_xxxxxx",
                          created: "Jun 15, 2026",
                        },
                      ].map((apiKey, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-border bg-background p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-foreground">
                                {apiKey.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                Created: {apiKey.created}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                                <Copy className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3">
                            <code className="block rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono text-muted-foreground">
                              {apiKey.key}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Danger Zone */}
                {activeTab === "danger" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Danger Zone
                    </h2>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-red-800">
                              Close Account
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                              Once you close your account, there is no going
                              back. Please be certain.
                            </p>
                          </div>
                          <button className="rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors">
                            Close Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FinTechSidebar>
  );
}
