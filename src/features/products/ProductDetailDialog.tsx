"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductItem } from "./types";

interface ProductDetailDialogProps {
  open: boolean;
  product: ProductItem | null;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string | null) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const detailRows = (product: ProductItem) => [
  { label: "Name", value: product.name },
  { label: "Description", value: product.description ?? "—" },
  { label: "Price", value: formatCurrency(product.price) },
  { label: "Category", value: product.category?.name ?? "—" },
  { label: "Seller", value: product.seller?.username ?? "—" },
  { label: "Images", value: String(product.images.length) },
  { label: "Created At", value: formatDate(product.createdAt) },
  { label: "Updated At", value: formatDate(product.updatedAt) },
];

export const ProductDetailDialog = ({
  open,
  product,
  onOpenChange,
}: ProductDetailDialogProps) => {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected product.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {detailRows(product).map((item) => (
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
            <Badge variant={product.active ? "default" : "outline"}>
              {product.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
