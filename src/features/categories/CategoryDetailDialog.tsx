"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CategoryItem } from "./types";

interface CategoryDetailDialogProps {
  open: boolean;
  category: CategoryItem | null;
  onOpenChange: (open: boolean) => void;
}

const detailRows = (category: CategoryItem) => [
  { label: "ID", value: String(category.id) },
  { label: "Name", value: category.name },
  { label: "Description", value: category.description },
];

export const CategoryDetailDialog = ({
  open,
  category,
  onOpenChange,
}: CategoryDetailDialogProps) => {
  if (!category) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {detailRows(category).map((item) => (
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
            <Badge variant={category.active ? "default" : "outline"}>
              {category.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
