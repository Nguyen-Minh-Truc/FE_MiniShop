'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { MetricCard } from '@/components/MetricCard'
import { ChartComponent } from '@/components/ChartComponent'
import { DataTable } from '@/components/DataTable'
import { mockMetrics, mockChartData, mockTableData } from '@/services/mockData'
import { Card } from '@/components/ui/card'

export const DashboardPage = () => {
  const tableColumns = ['Name', 'Email', 'Status', 'Joins', 'Revenue']

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="pt-20 p-6 space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-2">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts and Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Chart */}
            <div className="lg:col-span-2">
              <ChartComponent
                title="Revenue Overview"
                data={mockChartData}
              />
            </div>

            {/* Side Card */}
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">3.24%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                  <p className="text-2xl font-bold text-foreground">4m 23s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold text-foreground">42.3%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Data Table */}
          <DataTable
            title="Recent Customers"
            columns={tableColumns}
            data={mockTableData}
          />
        </main>
      </div>
    </div>
  )
}
