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

import type { InventoryItem } from "./types";

interface DeleteInventoryDialogProps {
  open: boolean;
  inventory: InventoryItem | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export const DeleteInventoryDialog = ({
  open,
  inventory,
  onOpenChange,
  onConfirm,
}: DeleteInventoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Inventory</DialogTitle>
          <DialogDescription>
            {inventory
              ? `Are you sure you want to delete inventory #${inventory.id}? This action cannot be undone.`
              : "Are you sure you want to delete this inventory record?"}
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
                // Errors are surfaced in page-level state.
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
