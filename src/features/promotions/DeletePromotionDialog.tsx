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

import type { PromotionItem } from "./types";

interface DeletePromotionDialogProps {
  open: boolean;
  promotion: PromotionItem | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export const DeletePromotionDialog = ({
  open,
  promotion,
  onOpenChange,
  onConfirm,
}: DeletePromotionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Promotion</DialogTitle>
          <DialogDescription>
            {promotion
              ? `Are you sure you want to delete ${promotion.name}? This action cannot be undone.`
              : "Are you sure you want to delete this promotion?"}
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
