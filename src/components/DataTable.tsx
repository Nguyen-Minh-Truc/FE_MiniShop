"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/Button";
import { Edit2, Trash2 } from "lucide-react";

interface DataTableProps {
  title?: string;
  columns?: string[];
  data: any[];
}

export const DataTable = ({ title, columns, data }: DataTableProps) => {
  const resolvedColumns = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns;
    }

    const firstRow = data[0];
    if (!firstRow || typeof firstRow !== "object") {
      return [];
    }

    return Object.keys(firstRow)
      .filter((key) => key !== "id")
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1));
  }, [columns, data]);

  return (
    <Card className="border border-border bg-card overflow-hidden">
      {title && (
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {resolvedColumns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                >
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={resolvedColumns.length + 1}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No data available.
                </td>
              </tr>
            )}
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                {resolvedColumns.map((column) => (
                  <td
                    key={`${idx}-${column}`}
                    className="px-6 py-4 text-sm text-foreground"
                  >
                    {typeof row[column.toLowerCase()] === "string" &&
                    row[column.toLowerCase()].startsWith("$") ? (
                      <span className="font-medium text-primary">
                        {row[column.toLowerCase()]}
                      </span>
                    ) : (
                      row[column.toLowerCase()]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
