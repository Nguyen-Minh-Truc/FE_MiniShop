"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { InventoryItem } from "./types";

interface InventoryDetailDialogProps {
  open: boolean;
  inventory: InventoryItem | null;
  onOpenChange: (open: boolean) => void;
}

export const InventoryDetailDialog = ({
  open,
  inventory,
  onOpenChange,
}: InventoryDetailDialogProps) => {
  if (!inventory) {
    return null;
  }

  const availableStock = inventory.stock - inventory.reservedStock;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inventory Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected inventory record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">ID</span>
            <span className="text-sm font-medium text-foreground">
              {inventory.id}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Product ID</span>
            <span className="text-sm font-medium text-foreground">
              {inventory.product?.id ?? "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Product Name</span>
            <span className="text-sm font-medium text-foreground text-right">
              {inventory.product?.name ?? "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Stock</span>
            <span className="text-sm font-medium text-foreground">
              {inventory.stock}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">
              Reserved Stock
            </span>
            <span className="text-sm font-medium text-foreground">
              {inventory.reservedStock}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pb-1">
            <span className="text-sm text-muted-foreground">
              Available Stock
            </span>
            <span className="text-sm font-semibold text-foreground">
              {availableStock}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
