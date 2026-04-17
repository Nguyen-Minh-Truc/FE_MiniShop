"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { UserItem } from "./types";

interface UsersTableProps {
  users: UserItem[];
  onView: (user: UserItem) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
}

const getActiveVariant = (active: boolean) => (active ? "default" : "outline");

const formatRole = (roleName: string | undefined) => {
  if (!roleName) {
    return "—";
  }

  return roleName.replaceAll("_", " ");
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
  }).format(date);
};

export const UsersTable = ({
  users,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">All Users</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Username
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
                Role
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
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No users available.
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {user.phone ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {user.address ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatRole(user.role?.name)}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getActiveVariant(user.active)}>
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(user)}
                      aria-label={`View ${user.username}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      aria-label={`Edit ${user.username}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user)}
                      aria-label={`Delete ${user.username}`}
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
