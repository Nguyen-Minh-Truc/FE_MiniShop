"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { categoriesApi } from "./api";
import { CategoryDetailItem } from "./types";

interface CategoryDetailDialogProps {
  open: boolean;
  category: CategoryDetailItem | null;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (value: number | null) => {
  if (value === null || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

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

const detailRows = (category: CategoryDetailItem) => [
  { label: "ID", value: String(category.id) },
  { label: "Name", value: category.name },
  { label: "Description", value: category.description },
  { label: "Products", value: String(category.products?.length ?? 0) },
];

export const CategoryDetailDialog = ({
  open,
  category,
  onOpenChange,
}: CategoryDetailDialogProps) => {
  const [detail, setDetail] = useState<CategoryDetailItem | null>(category);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !category) {
      return;
    }

    let isMounted = true;
    const loadingToastId = toast.loading("Loading category detail...");

    const loadCategoryDetail = async () => {
      try {
        setLoading(true);
        const response = await categoriesApi.getCategoryById(category.id);

        if (isMounted) {
          setDetail(response);
        }
      } catch {
        if (isMounted) {
          setDetail(category);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }

        toast.dismiss(loadingToastId);
      }
    };

    void loadCategoryDetail();

    return () => {
      isMounted = false;
    };
  }, [category, open]);

  if (!category) {
    return null;
  }

  const currentDetail = detail ?? category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected category and its products.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {detailRows(currentDetail).map((item) => (
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

          <Card className="border border-border bg-muted/20 p-4 shadow-none">
            <div className="flex items-center justify-between gap-4 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Products in category
                </h3>
                <p className="text-xs text-muted-foreground">
                  Products returned by the category detail API.
                </p>
              </div>
              <Badge variant="outline">
                {currentDetail.products?.length ?? 0}
              </Badge>
            </div>

            {loading && (
              <p className="pb-3 text-sm text-muted-foreground">
                Loading category detail...
              </p>
            )}

            <div className="space-y-3">
              {(!currentDetail.products ||
                currentDetail.products.length === 0) && (
                <p className="text-sm text-muted-foreground">
                  No products found for this category.
                </p>
              )}

              {currentDetail.products?.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          {product.name}
                        </h4>
                        <Badge variant={product.active ? "default" : "outline"}>
                          {product.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.description ?? "—"}
                      </p>
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground lg:min-w-72">
                      <div className="flex items-center justify-between gap-4">
                        <span>Price</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Seller</span>
                        <span className="font-medium text-foreground">
                          {product.sellerName ?? "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Images</span>
                        <span className="font-medium text-foreground">
                          {product.imageUrls.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Created</span>
                        <span className="font-medium text-foreground">
                          {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {product.imageUrls.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.imageUrls.map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-border bg-muted px-3 py-1 text-xs text-foreground transition-colors hover:bg-muted/70"
                        >
                          View image
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
