"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { SupplierItem } from "./types";

interface SuppliersTableProps {
  suppliers: SupplierItem[];
  onView: (supplier: SupplierItem) => void;
  onEdit: (supplier: SupplierItem) => void;
  onDelete: (supplier: SupplierItem) => void;
}

const getActiveVariant = (active: boolean) => (active ? "default" : "outline");

export const SuppliersTable = ({
  suppliers,
  onView,
  onEdit,
  onDelete,
}: SuppliersTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">All Suppliers</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Active
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {suppliers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No suppliers available.
                </td>
              </tr>
            )}

            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {supplier.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {supplier.email ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {supplier.phone ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {supplier.address ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getActiveVariant(supplier.active)}>
                    {supplier.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(supplier)}
                      aria-label={`View ${supplier.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(supplier)}
                      aria-label={`Edit ${supplier.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(supplier)}
                      aria-label={`Delete ${supplier.name}`}
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
