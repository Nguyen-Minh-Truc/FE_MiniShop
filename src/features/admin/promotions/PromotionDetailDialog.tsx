"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { PromotionItem } from "./types";

interface PromotionDetailDialogProps {
  open: boolean;
  promotion: PromotionItem | null;
  onOpenChange: (open: boolean) => void;
}

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
};

export const PromotionDetailDialog = ({
  open,
  promotion,
  onOpenChange,
}: PromotionDetailDialogProps) => {
  if (!promotion) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promotion Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected promotion.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">ID</span>
            <span className="text-sm font-medium text-foreground">
              {promotion.id}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium text-foreground text-right">
              {promotion.name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Code</span>
            <span className="text-sm font-medium text-foreground">
              {promotion.code ?? "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm font-medium text-foreground">
              {promotion.type}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">
              Discount Value
            </span>
            <span className="text-sm font-medium text-foreground">
              {promotion.discountValue.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant="outline">{promotion.status}</Badge>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Product</span>
            <span className="text-sm font-medium text-foreground text-right">
              {promotion.product?.name ?? "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Start At</span>
            <span className="text-sm font-medium text-foreground text-right">
              {formatDateTime(promotion.startAt)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pb-1">
            <span className="text-sm text-muted-foreground">End At</span>
            <span className="text-sm font-medium text-foreground text-right">
              {formatDateTime(promotion.endAt)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
