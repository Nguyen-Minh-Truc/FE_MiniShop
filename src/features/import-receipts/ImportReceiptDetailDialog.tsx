"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ImportReceiptItemModel } from "./types";

interface ImportReceiptDetailDialogProps {
  open: boolean;
  importReceipt: ImportReceiptItemModel | null;
  onOpenChange: (open: boolean) => void;
}

export const ImportReceiptDetailDialog = ({
  open,
  importReceipt,
  onOpenChange,
}: ImportReceiptDetailDialogProps) => {
  if (!importReceipt) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Receipt Details</DialogTitle>
          <DialogDescription>
            Detailed information for import receipt #{importReceipt.id}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">ID</span>
              <span className="text-sm font-medium text-foreground">
                {importReceipt.id}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Supplier</span>
              <span className="text-sm font-medium text-foreground">
                {importReceipt.supplier?.name ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Created At</span>
              <span className="text-sm font-medium text-foreground">
                {importReceipt.createdAt ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="outline">{importReceipt.status}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Items</h4>
            <div className="overflow-x-auto border border-border rounded-md">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Product ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Cost Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {importReceipt.items.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-sm text-muted-foreground text-center"
                      >
                        No items in this receipt.
                      </td>
                    </tr>
                  )}

                  {importReceipt.items.map((item, index) => (
                    <tr key={`${item.id ?? "new"}-${item.productId}-${index}`}>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.productName ?? "-"}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.productId}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.costPrice.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total Price</span>
            <span className="text-sm font-semibold text-foreground">
              {importReceipt.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
