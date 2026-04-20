export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  date: string;
}

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  status: string;
  joins: string;
  revenue: string;
}

export interface DashboardOverview {
  metrics: DashboardMetric[];
  chart: ChartData[];
  customers: CustomerRow[];
}
