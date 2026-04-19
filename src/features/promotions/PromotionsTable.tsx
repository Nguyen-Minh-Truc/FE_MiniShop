"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { PromotionItem } from "./types";

interface PromotionsTableProps {
  promotions: PromotionItem[];
  onView: (promotion: PromotionItem) => void;
  onEdit: (promotion: PromotionItem) => void;
  onDelete: (promotion: PromotionItem) => void;
}

const getStatusVariant = (status: PromotionItem["status"]) => {
  if (status === "ACTIVE") {
    return "default" as const;
  }

  if (status === "CANCELLED") {
    return "destructive" as const;
  }

  return "outline" as const;
};

export const PromotionsTable = ({
  promotions,
  onView,
  onEdit,
  onDelete,
}: PromotionsTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          All Promotions
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {promotions.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No promotions available.
                </td>
              </tr>
            )}

            {promotions.map((promotion) => (
              <tr
                key={promotion.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  {promotion.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {promotion.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {promotion.code ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {promotion.type}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {promotion.discountValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getStatusVariant(promotion.status)}>
                    {promotion.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {promotion.product?.name ?? "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(promotion)}
                      aria-label={`View promotion ${promotion.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(promotion)}
                      aria-label={`Edit promotion ${promotion.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(promotion)}
                      aria-label={`Delete promotion ${promotion.id}`}
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
