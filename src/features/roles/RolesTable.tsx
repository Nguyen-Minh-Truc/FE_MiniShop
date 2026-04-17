"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";

import type { RoleItem } from "./types";

interface RolesTableProps {
  roles: RoleItem[];
  onView: (role: RoleItem) => void;
  onEdit: (role: RoleItem) => void;
  onDelete: (role: RoleItem) => void;
}

const formatDate = (value: string | null) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
};

const getPermissionCount = (role: RoleItem) => {
  if (role.permissions && role.permissions.length > 0) {
    return role.permissions.length;
  }

  return role.permissionIds?.length ?? 0;
};

export const RolesTable = ({
  roles,
  onView,
  onEdit,
  onDelete,
}: RolesTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">All Roles</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Permissions
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
            {roles.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No roles available.
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {role.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {role.description ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {getPermissionCount(role)}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(role.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(role)}
                      aria-label={`View ${role.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(role)}
                      aria-label={`Edit ${role.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(role)}
                      aria-label={`Delete ${role.name}`}
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
