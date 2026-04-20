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

import type { ImportReceiptItemModel } from "./types";

interface DeleteImportReceiptDialogProps {
  open: boolean;
  importReceipt: ImportReceiptItemModel | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export const DeleteImportReceiptDialog = ({
  open,
  importReceipt,
  onOpenChange,
  onConfirm,
}: DeleteImportReceiptDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Import Receipt</DialogTitle>
          <DialogDescription>
            {importReceipt
              ? `Are you sure you want to delete receipt #${importReceipt.id}? This action cannot be undone.`
              : "Are you sure you want to delete this import receipt?"}
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
