export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'manager' | 'user'
  joinDate: Date
}

export interface DashboardMetric {
  id: string
  label: string
  value: number | string
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
}

export interface ChartData {
  name: string
  value: number
  date: string
}

export interface TableRow {
  id: string
  [key: string]: any
}
