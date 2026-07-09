'use client'

import FinTechSidebar from '@/components/fintech-sidebar'
import FinTechTopNav from '@/components/fintech-topnav'
import { CheckCircle2, AlertCircle, Clock, FileText, Download, TrendingUp } from 'lucide-react'

export default function AuditReportsPage() {
  const complianceStatus = [
    {
      title: 'AML Verification',
      status: 'Passed',
      date: '2024-01-15',
      color: 'bg-green-50 text-green-700',
      icon: CheckCircle2,
    },
    {
      title: 'KYB Verification',
      status: 'Passed',
      date: '2024-01-10',
      color: 'bg-green-50 text-green-700',
      icon: CheckCircle2,
    },
    {
      title: 'Sanctions Screening',
      status: 'Passed',
      date: '2024-01-12',
      color: 'bg-green-50 text-green-700',
      icon: CheckCircle2,
    },
    {
      title: 'Risk Assessment',
      status: 'In Progress',
      date: '2024-01-20',
      color: 'bg-blue-50 text-blue-700',
      icon: Clock,
    },
  ]

  const auditReports = [
    {
      id: 1,
      title: 'Monthly Compliance Report',
      month: 'January 2024',
      date: '2024-02-01',
      transactions: 24,
      amount: '₦125,500,000',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Transaction Audit Report',
      month: 'December 2023',
      date: '2024-01-02',
      transactions: 18,
      amount: '₦98,750,000',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Risk Assessment Report',
      month: 'November 2023',
      date: '2023-12-05',
      transactions: 15,
      amount: '₦72,300,000',
      status: 'Completed',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <FinTechSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <FinTechTopNav />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Audit Reports & Compliance</h1>
              <p className="mt-2 text-muted-foreground">
                View compliance status and download audit reports for your organization
              </p>
            </div>

            {/* Compliance Status Overview */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Compliance Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complianceStatus.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <div className={`inline-flex p-2 rounded-lg mb-3 ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {item.title}
                      </p>
                      <p className="text-base font-semibold text-foreground mb-2">
                        {item.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Compliance Score */}
            <section className="mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Overall Compliance Score</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your organization&apos;s compliance rating
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-8">
                      <p className="text-4xl font-bold text-primary">94</p>
                      <p className="text-sm text-muted-foreground">/100</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <p className="mt-4 text-sm text-green-600 font-medium">
                  ✓ Compliant with all regulations
                </p>
              </div>
            </section>

            {/* Audit Reports */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Audit Reports</h2>
              <div className="space-y-3">
                {auditReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-muted rounded-lg">
                          <FileText className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {report.month} • {report.transactions} transactions • {report.amount}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Generated on {new Date(report.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {report.status}
                        </span>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Download className="w-5 h-5 text-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
