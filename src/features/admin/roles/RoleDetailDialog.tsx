"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Permission } from "@/types";

import type { RoleItem } from "./types";

interface RoleDetailDialogProps {
  open: boolean;
  role: RoleItem | null;
  permissions: Permission[];
  onOpenChange: (open: boolean) => void;
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

const resolvePermissions = (role: RoleItem, allPermissions: Permission[]) => {
  if (role.permissions && role.permissions.length > 0) {
    return role.permissions;
  }

  const rolePermissionIds = new Set(role.permissionIds ?? []);
  return allPermissions.filter((permission) =>
    rolePermissionIds.has(permission.id),
  );
};

export const RoleDetailDialog = ({
  open,
  role,
  permissions,
  onOpenChange,
}: RoleDetailDialogProps) => {
  if (!role) {
    return null;
  }

  const rolePermissions = resolvePermissions(role, permissions);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">ID</span>
            <span className="text-sm font-medium text-foreground">
              {role.id}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium text-foreground">
              {role.name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm font-medium text-foreground text-right">
              {role.description ?? "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Created At</span>
            <span className="text-sm font-medium text-foreground">
              {formatDate(role.createdAt)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Updated At</span>
            <span className="text-sm font-medium text-foreground">
              {formatDate(role.updatedAt)}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Permissions</p>
            {rolePermissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No permission attached.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {rolePermissions.map((permission) => (
                  <Badge key={permission.id} variant="outline">
                    {permission.method} {permission.apiPath}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
