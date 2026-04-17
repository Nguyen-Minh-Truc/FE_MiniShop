"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Header, Sidebar } from "@/features/shared-layout";

import { ChartComponent } from "./components/ChartComponent";
import { getAnalyticsSeries } from "./services";
import { AnalyticsPoint } from "./types";

export const AnalyticsPage = () => {
  const [series, setSeries] = useState<AnalyticsPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSeries = async () => {
      const response = await getAnalyticsSeries();
      if (isMounted) {
        setSeries(response);
        setIsLoading(false);
      }
    };

    loadSeries();

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
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your key metrics and performance indicators.
            </p>
          </div>

          {isLoading && (
            <Card className="p-4 border border-border bg-card text-sm text-muted-foreground">
              Loading analytics data...
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartComponent title="Traffic Trends" data={series} />
            <ChartComponent title="Conversion Trends" data={series} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Bounce Rate
              </h3>
              <p className="text-3xl font-bold text-primary">--</p>
              <p className="text-sm text-muted-foreground mt-2">
                Awaiting API data
              </p>
            </Card>
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Page Views
              </h3>
              <p className="text-3xl font-bold text-primary">--</p>
              <p className="text-sm text-muted-foreground mt-2">
                Awaiting API data
              </p>
            </Card>
            <Card className="p-6 border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Avg Session
              </h3>
              <p className="text-3xl font-bold text-primary">--</p>
              <p className="text-sm text-muted-foreground mt-2">
                Awaiting API data
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
