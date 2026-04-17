"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { CategoryItem } from "./types";

interface CategoriesTableProps {
  categories: CategoryItem[];
  onView: (category: CategoryItem) => void;
  onEdit: (category: CategoryItem) => void;
  onDelete: (category: CategoryItem) => void;
}

const getActiveVariant = (active: boolean) => (active ? "default" : "outline");

export const CategoriesTable = ({
  categories,
  onView,
  onEdit,
  onDelete,
}: CategoriesTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          All Categories
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
                Description
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
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No categories available.
                </td>
              </tr>
            )}

            {categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  {category.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {category.description}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getActiveVariant(category.active)}>
                    {category.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(category)}
                      aria-label={`View ${category.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(category)}
                      aria-label={`Edit ${category.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(category)}
                      aria-label={`Delete ${category.name}`}
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
