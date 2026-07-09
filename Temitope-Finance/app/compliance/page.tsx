"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
  ArrowUpRight,
  FileText,
  FileSpreadsheet,
  FileJson,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";

// Compliance KPI data
const complianceKpis = [
  {
    name: "AML Screening Status",
    value: "100%",
    change: "+2.1%",
    status: "success",
    icon: ShieldCheck,
  },
  {
    name: "Sanctions Screening",
    value: "99.8%",
    change: "-0.1%",
    status: "warning",
    icon: Users,
  },
  {
    name: "Flagged Transactions",
    value: "12",
    change: "+3",
    status: "alert",
    icon: AlertTriangle,
  },
  {
    name: "Manual Reviews",
    value: "8",
    change: "-2",
    status: "success",
    icon: Activity,
  },
];

// Risk Score distribution
const riskScoreData = [
  { name: "Low", value: 68, color: "#10b981" },
  { name: "Medium", value: 25, color: "#f59e0b" },
  { name: "High", value: 5, color: "#ef4444" },
  { name: "Critical", value: 2, color: "#991b1b" },
];

// Compliance timeline data
const timelineData = [
  { date: "Jul 1", screening: 98, sanctions: 97, flagged: 5 },
  { date: "Jul 2", screening: 99, sanctions: 98, flagged: 4 },
  { date: "Jul 3", screening: 99, sanctions: 99, flagged: 6 },
  { date: "Jul 4", screening: 100, sanctions: 99, flagged: 3 },
  { date: "Jul 5", screening: 100, sanctions: 100, flagged: 5 },
  { date: "Jul 6", screening: 100, sanctions: 99, flagged: 7 },
  { date: "Jul 7", screening: 100, sanctions: 100, flagged: 12 },
];

// Flagged transactions table
const flaggedTransactions = [
  {
    id: "TXN-20240707-001",
    supplier: "Shanghai Electronics Ltd",
    amount: "NGN 4,850,000",
    currency: "CNY",
    riskScore: 78,
    status: "pending",
    flaggedBy: "System - High value",
    date: "2024-07-07 10:15",
  },
  {
    id: "TXN-20240707-002",
    supplier: "Beijing Tech Solutions",
    amount: "NGN 8,200,000",
    currency: "CNY",
    riskScore: 62,
    status: "reviewed",
    flaggedBy: "System - Unusual pattern",
    date: "2024-07-07 09:32",
  },
  {
    id: "TXN-20240706-005",
    supplier: "Hangzhou Supplier Inc",
    amount: "NGN 2,100,000",
    currency: "CNY",
    riskScore: 85,
    status: "pending",
    flaggedBy: "System - New supplier",
    date: "2024-07-06 16:45",
  },
  {
    id: "TXN-20240706-003",
    supplier: "Guangzhou Trading Co",
    amount: "NGN 1,500,000",
    currency: "CNY",
    riskScore: 45,
    status: "cleared",
    flaggedBy: "Sanctions list match",
    date: "2024-07-06 14:20",
  },
];

// Report categories
const reportCategories = [
  {
    name: "Transaction Reports",
    icon: FileText,
    description: "Full audit trail of all payment transactions",
    reports: [
      {
        name: "Daily Transaction Summary",
        lastRun: "2024-07-07 00:05",
        status: "completed",
      },
      {
        name: "Weekly Payment Overview",
        lastRun: "2024-07-01 00:10",
        status: "completed",
      },
      {
        name: "Monthly Financial Report",
        lastRun: "2024-06-30 00:15",
        status: "completed",
      },
    ],
  },
  {
    name: "FX Reports",
    icon: TrendingUp,
    description: "Exchange rate and currency conversion history",
    reports: [
      {
        name: "Daily FX Rates",
        lastRun: "2024-07-07 00:00",
        status: "completed",
      },
      {
        name: "FX Savings Analysis",
        lastRun: "2024-07-01 00:00",
        status: "completed",
      },
      {
        name: "Currency Exposure Report",
        lastRun: "2024-06-15 00:00",
        status: "completed",
      },
    ],
  },
  {
    name: "Settlement Reports",
    icon: Clock,
    description: "Settlement timing and completion status",
    reports: [
      {
        name: "Settlement Timeline",
        lastRun: "2024-07-07 00:02",
        status: "completed",
      },
      {
        name: "Pending Settlements",
        lastRun: "2024-07-07 01:00",
        status: "completed",
      },
      {
        name: "Failed Settlements Report",
        lastRun: "2024-06-28 00:00",
        status: "completed",
      },
    ],
  },
  {
    name: "Compliance Logs",
    icon: ShieldCheck,
    description: "AML, sanctions, and compliance audit history",
    reports: [
      {
        name: "AML Screening Logs",
        lastRun: "2024-07-07 00:03",
        status: "completed",
      },
      {
        name: "Sanctions Screening Report",
        lastRun: "2024-07-07 00:04",
        status: "completed",
      },
      {
        name: "Compliance Audit Trail",
        lastRun: "2024-07-01 00:00",
        status: "completed",
      },
    ],
  },
];

// Report generation volume data
const reportVolumeData = [
  { month: "Jan", transaction: 120, fx: 80, settlement: 95, compliance: 72 },
  { month: "Feb", transaction: 145, fx: 92, settlement: 105, compliance: 85 },
  { month: "Mar", transaction: 132, fx: 88, settlement: 98, compliance: 78 },
  { month: "Apr", transaction: 160, fx: 110, settlement: 125, compliance: 95 },
  { month: "May", transaction: 155, fx: 105, settlement: 118, compliance: 92 },
  { month: "Jun", transaction: 175, fx: 120, settlement: 135, compliance: 105 },
  { month: "Jul", transaction: 190, fx: 135, settlement: 148, compliance: 118 },
];

// Recent activity log
const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Generated Daily Transaction Summary",
    timestamp: "2024-07-07 09:15",
    status: "success",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Exported FX Savings Analysis",
    timestamp: "2024-07-07 08:45",
    status: "success",
  },
  {
    id: 3,
    user: "System",
    action: "Automated Compliance Audit",
    timestamp: "2024-07-07 00:04",
    status: "success",
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "Downloaded Monthly Financial Report",
    timestamp: "2024-07-06 16:30",
    status: "success",
  },
  {
    id: 5,
    user: "Sarah Williams",
    action: "Scheduled Weekly Payment Overview",
    timestamp: "2024-07-06 14:20",
    status: "scheduled",
  },
];

export default function CompliancePage() {
  const [selectedTab, setSelectedTab] = useState("compliance");
  const [complianceSubTab, setComplianceSubTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Compliance & Audit
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Monitor compliance status, risk assessments, and audit reports
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>

          {/* Main Tabs */}
          <div className="mb-6 flex gap-1 border-b border-border">
            <button
              onClick={() => setSelectedTab("compliance")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                selectedTab === "compliance"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Compliance Dashboard
            </button>
            <button
              onClick={() => setSelectedTab("audit")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                selectedTab === "audit"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Audit Reports
            </button>
          </div>

          {/* Compliance Dashboard Content */}
          {selectedTab === "compliance" && (
            <div className="space-y-6">
              {/* Compliance Sub-tabs */}
              <div className="mb-6 flex gap-1 border-b border-border">
                <button
                  onClick={() => setComplianceSubTab("dashboard")}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    complianceSubTab === "dashboard"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setComplianceSubTab("flagged")}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    complianceSubTab === "flagged"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Flagged Transactions
                </button>
                <button
                  onClick={() => setComplianceSubTab("reviews")}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    complianceSubTab === "reviews"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Manual Reviews
                </button>
              </div>

              {complianceSubTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Compliance KPIs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {complianceKpis.map((kpi) => {
                      const Icon = kpi.icon;
                      const statusColors = {
                        success: "text-green-600 bg-green-50",
                        warning: "text-amber-600 bg-amber-50",
                        alert: "text-red-600 bg-red-50",
                      };

                      return (
                        <div
                          key={kpi.name}
                          className="rounded-lg border border-border bg-card p-6"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {kpi.name}
                              </p>
                              <p className="mt-2 text-3xl font-bold text-foreground">
                                {kpi.value}
                              </p>
                              <p
                                className={`mt-1 text-xs font-semibold ${
                                  kpi.change.startsWith("+")
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {kpi.change} from last week
                              </p>
                            </div>
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                                statusColors[
                                  kpi.status as keyof typeof statusColors
                                ]
                              }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Risk Score Distribution */}
                    <div className="rounded-lg border border-border bg-card p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground">
                          Risk Score Distribution
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Current transaction risk level breakdown
                        </p>
                      </div>
                      <div className="relative">
                        <ResponsiveContainer width="100%" height={280}>
                          <PieChart>
                            <Pie
                              data={riskScoreData}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={110}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {riskScoreData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                              }}
                              formatter={(value) => [`${value}%`, "Risk Level"]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-foreground">
                              45
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Avg Risk Score
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {riskScoreData.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-muted-foreground">
                              {item.name}
                            </span>
                            <span className="ml-auto font-medium text-foreground">
                              {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compliance Timeline */}
                    <div className="rounded-lg border border-border bg-card p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground">
                          Compliance Timeline
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          7-day screening performance trends
                        </p>
                      </div>
                      <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={timelineData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            stroke="#6b7280"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend wrapperStyle={{ paddingTop: "12px" }} />
                          <Line
                            type="monotone"
                            dataKey="screening"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="AML Screening %"
                          />
                          <Line
                            type="monotone"
                            dataKey="sanctions"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Sanctions Screening %"
                          />
                          <Line
                            type="monotone"
                            dataKey="flagged"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Flagged Count"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent Flagged Transactions */}
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        Recent Flagged Transactions
                      </h3>
                      <button
                        onClick={() => setComplianceSubTab("flagged")}
                        className="text-sm font-semibold text-primary hover:opacity-80 flex items-center gap-1"
                      >
                        View all <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Transaction
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Supplier
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Risk Score
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {flaggedTransactions.slice(0, 3).map((tx) => (
                            <tr
                              key={tx.id}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <td className="px-4 py-3">
                                <code className="text-xs text-foreground font-mono">
                                  {tx.id}
                                </code>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {tx.date}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <p className="font-medium text-foreground">
                                  {tx.supplier}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <p className="font-semibold text-foreground">
                                  {tx.amount}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <div
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                                    tx.riskScore > 70
                                      ? "bg-red-50 text-red-700"
                                      : tx.riskScore > 50
                                        ? "bg-amber-50 text-amber-700"
                                        : "bg-green-50 text-green-700"
                                  }`}
                                >
                                  {tx.riskScore}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold capitalize ${
                                    tx.status === "pending"
                                      ? "border-amber-200 bg-amber-50 text-amber-700"
                                      : tx.status === "reviewed"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-green-200 bg-green-50 text-green-700"
                                  }`}
                                >
                                  {tx.status === "pending" && (
                                    <Clock className="h-3 w-3" />
                                  )}
                                  {tx.status === "cleared" && (
                                    <CheckCircle2 className="h-3 w-3" />
                                  )}
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {complianceSubTab === "flagged" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="relative lg:col-span-2">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search by supplier, transaction ID, or reason..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending Review</option>
                        <option value="reviewed">Under Review</option>
                        <option value="cleared">Cleared</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="rounded-lg border border-border bg-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Transaction
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Supplier
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Amount
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Risk Score
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Flagged By
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Status
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Date
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase text-muted-foreground">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {flaggedTransactions.map((tx) => (
                            <tr
                              key={tx.id}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <code className="text-xs text-foreground font-mono">
                                  {tx.id}
                                </code>
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-foreground">
                                  {tx.supplier}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-semibold text-foreground">
                                  {tx.amount}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <div
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                                    tx.riskScore > 70
                                      ? "bg-red-50 text-red-700"
                                      : tx.riskScore > 50
                                        ? "bg-amber-50 text-amber-700"
                                        : "bg-green-50 text-green-700"
                                  }`}
                                >
                                  {tx.riskScore}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {tx.flaggedBy}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold capitalize ${
                                    tx.status === "pending"
                                      ? "border-amber-200 bg-amber-50 text-amber-700"
                                      : tx.status === "reviewed"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-green-200 bg-green-50 text-green-700"
                                  }`}
                                >
                                  {tx.status === "pending" && (
                                    <Clock className="h-3 w-3" />
                                  )}
                                  {tx.status === "cleared" && (
                                    <CheckCircle2 className="h-3 w-3" />
                                  )}
                                  {tx.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {tx.date}
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-sm font-semibold text-primary hover:opacity-80">
                                  Review
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {complianceSubTab === "reviews" && (
                <div className="rounded-lg border border-border bg-card p-8 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Manual Reviews Queue
                  </h3>
                  <p className="text-muted-foreground">
                    8 transactions awaiting compliance review
                  </p>
                  <button className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                    Start Reviewing
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Audit Reports Content */}
          {selectedTab === "audit" && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search reports by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="transaction">Transaction Reports</option>
                    <option value="fx">FX Reports</option>
                    <option value="settlement">Settlement Reports</option>
                    <option value="compliance">Compliance Logs</option>
                  </select>
                </div>
              </div>

              {/* Report Volume Chart */}
              <div className="mb-6 rounded-lg border border-border bg-card p-6">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Report Generation Volume
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly report generation trends by category
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportVolumeData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#6b7280"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "16px" }} />
                    <Bar
                      dataKey="transaction"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                      name="Transaction Reports"
                    />
                    <Bar
                      dataKey="fx"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                      name="FX Reports"
                    />
                    <Bar
                      dataKey="settlement"
                      fill="#f59e0b"
                      radius={[6, 6, 0, 0]}
                      name="Settlement Reports"
                    />
                    <Bar
                      dataKey="compliance"
                      fill="#7c3aed"
                      radius={[6, 6, 0, 0]}
                      name="Compliance Logs"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Report Categories */}
                <div className="lg:col-span-2 space-y-4">
                  {reportCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={category.name}
                        className="rounded-lg border border-border bg-card p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {category.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <button className="text-sm font-semibold text-primary hover:opacity-80 flex items-center gap-1">
                            View all <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          {category.reports.map((report) => (
                            <div
                              key={report.name}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {report.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Last run: {report.lastRun}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold capitalize ${
                                    report.status === "completed"
                                      ? "border-green-200 bg-green-50 text-green-700"
                                      : report.status === "scheduled"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-amber-200 bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {report.status === "completed" && (
                                    <CheckCircle2 className="h-3 w-3" />
                                  )}
                                  {report.status}
                                </span>
                                <button className="p-2 rounded-lg hover:bg-background transition-colors">
                                  <Download className="h-4 w-4 text-muted-foreground" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                            <FileText className="h-4 w-4" />
                            Generate New Report
                          </button>
                          <div className="flex gap-1">
                            <button className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                              <FileJson className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity Sidebar */}
                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                        >
                          <div className="flex-shrink-0">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                activity.status === "success"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {activity.status === "success" ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {activity.user}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full text-sm font-semibold text-primary hover:opacity-80">
                      View full audit log
                    </button>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Quick Export
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Last 7 Days</p>
                          <p className="text-xs text-muted-foreground">
                            All reports
                          </p>
                        </div>
                        <Download className="h-4 w-4 ml-auto text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Last 30 Days</p>
                          <p className="text-xs text-muted-foreground">
                            All reports
                          </p>
                        </div>
                        <Download className="h-4 w-4 ml-auto text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Custom Date Range</p>
                          <p className="text-xs text-muted-foreground">
                            Select dates
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FinTechSidebar>
  );
}
