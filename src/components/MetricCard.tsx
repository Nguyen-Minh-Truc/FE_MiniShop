"use client";

import { DashboardMetric } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  metric: DashboardMetric;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Users,
    Target,
    ShoppingCart,
  };

  const Icon = iconMap[metric.icon];
  const isPositive = metric.changeType === "increase";
  const isNeutral = metric.changeType === "neutral";

  return (
    <Card className="p-6 border border-border bg-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {metric.value}
          </h3>
          <div className="flex items-center gap-2 mt-4">
            {!isNeutral && (
              <>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {metric.change.toFixed(1)}%
                </span>
              </>
            )}
            <span className="text-xs text-muted-foreground">
              from last month
            </span>
          </div>
        </div>
        {Icon && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
