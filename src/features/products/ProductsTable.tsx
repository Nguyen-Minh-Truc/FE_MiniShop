"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { ProductItem } from "./types";

interface ProductsTableProps {
  products: ProductItem[];
  onView: (product: ProductItem) => void;
  onEdit: (product: ProductItem) => void;
  onDelete: (product: ProductItem) => void;
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
  }).format(date);
};

const getActiveVariant = (active: boolean) => (active ? "default" : "outline");

export const ProductsTable = ({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductsTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">All Products</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Images
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Active
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No products available.
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {product.category?.name ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {product.seller?.username ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {product.images.length}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getActiveVariant(product.active)}>
                    {product.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(product.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(product)}
                      aria-label={`View ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
