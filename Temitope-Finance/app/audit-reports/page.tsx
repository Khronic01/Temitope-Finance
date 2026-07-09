"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";

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

export default function AuditReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
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
                Audit Reports
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate and download comprehensive audit reports and logs
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                <Calendar className="h-4 w-4" />
                Schedule Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
      </div>
    </FinTechSidebar>
  );
}
