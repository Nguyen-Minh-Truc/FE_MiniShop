"use client";

import { Card } from "@/components/ui/card";

import { CustomerRow } from "../types";

interface CustomersTableProps {
  title: string;
  data: CustomerRow[];
}

export const CustomersTable = ({ title, data }: CustomersTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Joins
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No customer data yet. Connect dashboard APIs to render live
                  records.
                </td>
              </tr>
            )}

            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {row.email}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {row.status}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {row.joins}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-primary">
                  {row.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
