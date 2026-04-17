"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Header, Sidebar } from "@/features/shared-layout";

import { ChartComponent } from "./components/ChartComponent";
import { CustomersTable } from "./components/CustomersTable";
import { MetricCard } from "./components/MetricCard";
import { getDashboardOverview } from "./services";
import { DashboardOverview } from "./types";

const initialState: DashboardOverview = {
  metrics: [],
  chart: [],
  customers: [],
};

export const DashboardPage = () => {
  const [overview, setOverview] = useState<DashboardOverview>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      const response = await getDashboardOverview();
      if (isMounted) {
        setOverview(response);
        setIsLoading(false);
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          {isLoading && (
            <Card className="p-4 border border-border bg-card text-sm text-muted-foreground">
              Loading dashboard data...
            </Card>
          )}

          {!isLoading && overview.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {overview.metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          )}

          {!isLoading && overview.metrics.length === 0 && (
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground">
                No metrics data
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Dashboard metrics will appear after the API is connected.
              </p>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartComponent title="Revenue Overview" data={overview.chart} />
            </div>

            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-foreground">--</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg Session Duration
                  </p>
                  <p className="text-2xl font-bold text-foreground">--</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold text-foreground">--</p>
                </div>
              </div>
            </Card>
          </div>

          <CustomersTable title="Recent Customers" data={overview.customers} />
        </main>
      </div>
    </div>
  );
};
