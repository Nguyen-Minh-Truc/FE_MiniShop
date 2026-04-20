"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SupplierItem } from "./types";

interface SupplierDetailDialogProps {
  open: boolean;
  supplier: SupplierItem | null;
  onOpenChange: (open: boolean) => void;
}

const detailRows = (supplier: SupplierItem) => [
  { label: "ID", value: String(supplier.id) },
  { label: "Name", value: supplier.name },
  { label: "Email", value: supplier.email ?? "—" },
  { label: "Phone", value: supplier.phone ?? "—" },
  { label: "Address", value: supplier.address ?? "—" },
];

export const SupplierDetailDialog = ({
  open,
  supplier,
  onOpenChange,
}: SupplierDetailDialogProps) => {
  if (!supplier) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supplier Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected supplier.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {detailRows(supplier).map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-border pb-3"
            >
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground text-right">
                {item.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 pb-1">
            <span className="text-sm text-muted-foreground">Active</span>
            <Badge variant={supplier.active ? "default" : "outline"}>
              {supplier.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
