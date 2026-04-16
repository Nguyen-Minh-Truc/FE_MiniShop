"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const MetricCardSkeleton = () => (
  <div className="p-6 border border-border bg-card rounded-lg space-y-3">
    <Skeleton className="h-4 w-24 bg-muted" />
    <Skeleton className="h-8 w-32 bg-muted" />
    <Skeleton className="h-4 w-40 bg-muted" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="p-6 border border-border bg-card rounded-lg space-y-4">
    <Skeleton className="h-6 w-32 bg-muted" />
    <Skeleton className="h-64 w-full bg-muted" />
  </div>
);

interface LoadingSkeletonProps {
  count?: number;
}

// Backward-compatible generic loader used by dashboard pages.
export const LoadingSkeleton = ({ count = 1 }: LoadingSkeletonProps) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="p-6 border border-border bg-card rounded-lg space-y-3"
      >
        <Skeleton className="h-4 w-24 bg-muted" />
        <Skeleton className="h-6 w-48 bg-muted" />
        <Skeleton className="h-4 w-full bg-muted" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = () => (
  <div className="border border-border bg-card rounded-lg overflow-hidden">
    <div className="p-6 border-b border-border">
      <Skeleton className="h-6 w-24 bg-muted" />
    </div>
    <div className="divide-y divide-border">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 flex gap-4">
          <Skeleton className="h-4 flex-1 bg-muted" />
          <Skeleton className="h-4 flex-1 bg-muted" />
          <Skeleton className="h-4 flex-1 bg-muted" />
          <Skeleton className="h-4 flex-1 bg-muted" />
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48 bg-muted" />
      <Skeleton className="h-4 w-64 bg-muted" />
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ChartSkeleton />
      </div>
      <div className="bg-card border border-border rounded-lg p-6 h-96">
        <Skeleton className="h-full w-full bg-muted" />
      </div>
    </div>

    {/* Table */}
    <TableSkeleton />
  </div>
);
