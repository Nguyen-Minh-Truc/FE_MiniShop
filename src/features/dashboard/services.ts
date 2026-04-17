import { DashboardOverview } from "./types";

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  return {
    metrics: [],
    chart: [],
    customers: [],
  };
};
