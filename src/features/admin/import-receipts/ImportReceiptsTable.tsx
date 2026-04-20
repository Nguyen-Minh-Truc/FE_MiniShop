"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { ImportReceiptItemModel } from "./types";

interface ImportReceiptsTableProps {
  importReceipts: ImportReceiptItemModel[];
  onView: (receipt: ImportReceiptItemModel) => void;
  onEdit: (receipt: ImportReceiptItemModel) => void;
  onDelete: (receipt: ImportReceiptItemModel) => void;
}

const getStatusVariant = (status: ImportReceiptItemModel["status"]) => {
  if (status === "SUCCESS") {
    return "default" as const;
  }

  if (status === "CANCELED") {
    return "destructive" as const;
  }

  if (status === "CONFIRMED") {
    return "secondary" as const;
  }

  return "outline" as const;
};

export const ImportReceiptsTable = ({
  importReceipts,
  onView,
  onEdit,
  onDelete,
}: ImportReceiptsTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          All Import Receipts
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Item Count
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {importReceipts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No import receipts available.
                </td>
              </tr>
            )}

            {importReceipts.map((receipt) => (
              <tr
                key={receipt.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  {receipt.id}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {receipt.supplier?.name ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getStatusVariant(receipt.status)}>
                    {receipt.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {receipt.items.length}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {receipt.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(receipt)}
                      aria-label={`View receipt ${receipt.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(receipt)}
                      aria-label={`Edit receipt ${receipt.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(receipt)}
                      aria-label={`Delete receipt ${receipt.id}`}
                    >
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
