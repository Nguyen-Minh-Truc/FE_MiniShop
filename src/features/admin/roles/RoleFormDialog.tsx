"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Permission } from "@/types";

import { defaultRoleFormValues } from "./data";
import type { RoleFormValues } from "./types";

interface RoleFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: RoleFormValues;
  permissions: Permission[];
  permissionsStatus: "idle" | "loading" | "succeeded" | "failed";
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: RoleFormValues) => Promise<void> | void;
}

export const RoleFormDialog = ({
  mode,
  open,
  initialValues,
  permissions,
  permissionsStatus,
  onOpenChange,
  onSubmit,
}: RoleFormDialogProps) => {
  const [formValues, setFormValues] = useState<RoleFormValues>(
    defaultRoleFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultRoleFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const permissionGroups = useMemo(() => {
    return permissions.reduce<Record<string, Permission[]>>(
      (acc, permission) => {
        const moduleName = permission.module || "GENERAL";
        if (!acc[moduleName]) {
          acc[moduleName] = [];
        }
        acc[moduleName].push(permission);
        return acc;
      },
      {},
    );
  }, [permissions]);

  const togglePermission = (
    permissionId: number,
    checked: boolean | string,
  ) => {
    setFormValues((prev) => {
      const selected = new Set(prev.permissionIds);

      if (checked === true) {
        selected.add(permissionId);
      } else {
        selected.delete(permissionId);
      }

      return {
        ...prev,
        permissionIds: Array.from(selected),
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setError("Role name is required.");
      return;
    }

    if (formValues.permissionIds.length === 0) {
      setError("Please select at least one permission.");
      return;
    }

    try {
      await onSubmit({
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        permissionIds: formValues.permissionIds,
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save role.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Role" : "Edit Role"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new role and assign permissions."
              : "Update role information and assigned permissions."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input
              id="role-name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="MANAGER"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-description">Description</Label>
            <Textarea
              id="role-description"
              value={formValues.description}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Role can manage products and inventory."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="max-h-72 overflow-y-auto rounded-md border border-border p-3 space-y-3">
              {permissionsStatus === "loading" && (
                <p className="text-sm text-muted-foreground">
                  Loading permissions...
                </p>
              )}

              {permissionsStatus !== "loading" && permissions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No permissions found from API.
                </p>
              )}

              {Object.entries(permissionGroups).map(
                ([moduleName, modulePermissions]) => (
                  <div key={moduleName} className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {moduleName}
                    </p>
                    <div className="space-y-2">
                      {modulePermissions.map((permission) => {
                        const checked = formValues.permissionIds.includes(
                          permission.id,
                        );

                        return (
                          <label
                            key={permission.id}
                            className="flex items-start gap-2 rounded-md border border-border p-2"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) =>
                                togglePermission(permission.id, value)
                              }
                            />
                            <span className="space-y-1">
                              <span className="block text-sm font-medium text-foreground">
                                {permission.name}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                {permission.method} {permission.apiPath}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create Role" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
