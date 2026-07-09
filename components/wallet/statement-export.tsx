'use client'

import { useState } from 'react'
import { Calendar, Download, FileSpreadsheet, FileText } from 'lucide-react'

export default function StatementExport() {
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year' | 'custom'>('month')
  const [format, setFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf')

  return (
    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Download Statement</h3>
            <p className="text-sm text-muted-foreground">Generate an auditable NGN wallet statement</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Statement period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="month">Current month</option>
              <option value="quarter">Current quarter</option>
              <option value="year">Year to date</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input type="date" className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
              <input type="date" className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
          )}

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90">
            <Download className="h-4 w-4" />
            Download Statement
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Export Wallet Data</h3>
            <p className="text-sm text-muted-foreground">Prepare transaction files for accounting teams</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">File format</label>
            <div className="grid grid-cols-3 gap-2">
              {['pdf', 'csv', 'excel'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt as typeof format)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium uppercase ${format === fmt ? 'bg-neutral-950 text-white' : 'border border-border text-foreground hover:bg-muted'}`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Jul 1, 2026 - Jul 6, 2026
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            <Download className="h-4 w-4" />
            Export {format.toUpperCase()}
          </button>
        </div>
      </div>
    </section>
  )
}
