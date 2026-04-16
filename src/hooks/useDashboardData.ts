'use client'

import { useCallback, useEffect, useState } from 'react'
import { mockMetrics, mockChartData, mockTableData } from '@/services/mockData'
import { DashboardMetric, ChartData } from '@/types'

interface DashboardData {
  metrics: DashboardMetric[]
  chartData: ChartData[]
  tableData: any[]
  isLoading: boolean
  error: string | null
}

export const useDashboardData = (): DashboardData => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    metrics: mockMetrics,
    chartData: mockChartData,
    tableData: mockTableData,
    isLoading,
    error,
  }
}
