import { User, DashboardMetric, ChartData } from '@/types'

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'AJ',
  role: 'admin',
  joinDate: new Date('2023-01-15'),
}

export const mockMetrics: DashboardMetric[] = [
  {
    id: '1',
    label: 'Total Revenue',
    value: '$45,231.89',
    change: 12.5,
    changeType: 'increase',
    icon: 'TrendingUp',
  },
  {
    id: '2',
    label: 'Active Users',
    value: '8,234',
    change: 8.2,
    changeType: 'increase',
    icon: 'Users',
  },
  {
    id: '3',
    label: 'Conversion Rate',
    value: '3.24%',
    change: -2.3,
    changeType: 'decrease',
    icon: 'Target',
  },
  {
    id: '4',
    label: 'Avg Order Value',
    value: '$124.50',
    change: 5.1,
    changeType: 'increase',
    icon: 'ShoppingCart',
  },
]

export const mockChartData: ChartData[] = [
  { name: 'Mon', value: 4000, date: '2024-01-01' },
  { name: 'Tue', value: 3000, date: '2024-01-02' },
  { name: 'Wed', value: 2000, date: '2024-01-03' },
  { name: 'Thu', value: 2780, date: '2024-01-04' },
  { name: 'Fri', value: 1890, date: '2024-01-05' },
  { name: 'Sat', value: 2390, date: '2024-01-06' },
  { name: 'Sun', value: 3490, date: '2024-01-07' },
]

export const mockTableData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    joins: '2024-01-15',
    revenue: '$1,234.50',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Active',
    joins: '2024-01-10',
    revenue: '$2,456.80',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    status: 'Inactive',
    joins: '2023-12-20',
    revenue: '$890.30',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    status: 'Active',
    joins: '2024-01-05',
    revenue: '$3,567.90',
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    status: 'Pending',
    joins: '2024-01-12',
    revenue: '$456.20',
  },
]
