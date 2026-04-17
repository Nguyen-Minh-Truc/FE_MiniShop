"use client";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SupplierItem } from "./types";

interface DeleteSupplierDialogProps {
  open: boolean;
  supplier: SupplierItem | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export const DeleteSupplierDialog = ({
  open,
  supplier,
  onOpenChange,
  onConfirm,
}: DeleteSupplierDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Supplier</DialogTitle>
          <DialogDescription>
            {supplier
              ? `Are you sure you want to delete ${supplier.name}? This action cannot be undone.`
              : "Are you sure you want to delete this supplier?"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              try {
                await onConfirm();
                onOpenChange(false);
              } catch {
                // Errors are handled by the suppliers page store.
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
