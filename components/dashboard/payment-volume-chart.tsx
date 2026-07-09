'use client'

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { month: 'Jan', volume: 24.8, settled: 23.9, savings: 0.54 },
  { month: 'Feb', volume: 29.6, settled: 28.7, savings: 0.67 },
  { month: 'Mar', volume: 27.2, settled: 26.4, savings: 0.61 },
  { month: 'Apr', volume: 34.9, settled: 33.8, savings: 0.82 },
  { month: 'May', volume: 31.5, settled: 30.8, savings: 0.76 },
  { month: 'Jun', volume: 38.4, settled: 37.1, savings: 1.04 },
  { month: 'Jul', volume: 42.9, settled: 41.6, savings: 1.28 },
]

const currencyFormatter = (value: number) => `NGN ${value.toFixed(1)}M`

export default function PaymentVolumeChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Payment Volume Chart</h3>
          <p className="text-sm text-muted-foreground">Monthly initiated and settled supplier payments</p>
        </div>
        <div className="text-sm font-medium text-green-600">+14.8% MoM</div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#6b7280" tickLine={false} axisLine={false} />
          <YAxis
            stroke="#6b7280"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
            }}
            formatter={(value, name) => {
              const numericValue = Number(value)
              const label =
                name === 'volume'
                  ? 'Initiated volume'
                  : name === 'settled'
                    ? 'Settled volume'
                    : 'FX savings'

              return [currencyFormatter(numericValue), label]
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '18px' }} />
          <Bar
            dataKey="volume"
            fill="#2563eb"
            name="Initiated"
            radius={[6, 6, 0, 0]}
            maxBarSize={42}
          />
          <Area
            type="monotone"
            dataKey="settled"
            fill="#10b981"
            fillOpacity={0.12}
            stroke="#10b981"
            strokeWidth={2}
            name="Settled"
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 4 }}
            name="FX savings"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
