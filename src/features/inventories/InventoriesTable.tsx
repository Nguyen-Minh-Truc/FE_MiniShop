"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";

import type { InventoryItem } from "./types";

interface InventoriesTableProps {
  inventories: InventoryItem[];
  onView: (inventory: InventoryItem) => void;
  onEdit: (inventory: InventoryItem) => void;
  onDelete: (inventory: InventoryItem) => void;
}

export const InventoriesTable = ({
  inventories,
  onView,
  onEdit,
  onDelete,
}: InventoriesTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          All Inventories
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
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Reserved
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Available
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {inventories.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No inventory records available.
                </td>
              </tr>
            )}

            {inventories.map((inventory) => {
              const available = inventory.stock - inventory.reservedStock;

              return (
                <tr
                  key={inventory.id}
                  className="hover:bg-muted/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-foreground">
                    {inventory.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {inventory.product?.id ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {inventory.product?.name ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {inventory.stock}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {inventory.reservedStock}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {available}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(inventory)}
                        aria-label={`View inventory ${inventory.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(inventory)}
                        aria-label={`Edit inventory ${inventory.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(inventory)}
                        aria-label={`Delete inventory ${inventory.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
