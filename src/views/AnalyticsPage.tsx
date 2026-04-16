'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { ChartComponent } from '@/components/ChartComponent'
import { Card } from '@/components/ui/card'
import { mockChartData } from '@/services/mockData'

export const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your key metrics and performance indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartComponent title="Traffic Trends" data={mockChartData} />
            <ChartComponent title="Conversion Trends" data={mockChartData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Bounce Rate</h3>
              <p className="text-3xl font-bold text-primary">42.3%</p>
              <p className="text-sm text-muted-foreground mt-2">↓ 5.2% from last week</p>
            </Card>
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Page Views</h3>
              <p className="text-3xl font-bold text-primary">125.4K</p>
              <p className="text-sm text-muted-foreground mt-2">↑ 12.5% from last week</p>
            </Card>
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Avg Session</h3>
              <p className="text-3xl font-bold text-primary">4m 23s</p>
              <p className="text-sm text-muted-foreground mt-2">↑ 2.1% from last week</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
