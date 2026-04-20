"use client";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/Button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RoleName } from "@/types";

import { defaultUserFormValues } from "./data";
import { UserFormValues } from "./types";

const roleOptions: Array<{ value: RoleName; label: string }> = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "SELLER", label: "Seller" },
  { value: "ADMIN_SYSTEM", label: "Admin System" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];

interface UserFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: UserFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
}

export const UserFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: UserFormDialogProps) => {
  const [formValues, setFormValues] = useState<UserFormValues>(
    defaultUserFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultUserFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!formValues.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (mode === "create" && !formValues.password.trim()) {
      setError("Password is required.");
      return;
    }

    if (!formValues.roleName) {
      setError("Role is required.");
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        password: formValues.password.trim(),
        phone: formValues.phone.trim(),
        address: formValues.address.trim(),
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save user.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add User" : "Edit User"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the information below to create a new user."
              : "Update user information and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="user-username">Username</Label>
            <Input
              id="user-username"
              value={formValues.username}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              placeholder="john.doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              type="email"
              value={formValues.email}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-password">
              {mode === "create" ? "Password" : "New Password"}
            </Label>
            <Input
              id="user-password"
              type="password"
              value={formValues.password}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              placeholder={
                mode === "create"
                  ? "••••••••"
                  : "Leave blank to keep current password"
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-active">Active</Label>
              <Select
                value={String(formValues.active)}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    active: value === "true",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formValues.roleName}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    roleName: value as UserFormValues["roleName"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-phone">Phone</Label>
              <Input
                id="user-phone"
                type="tel"
                value={formValues.phone}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
                placeholder="0901234567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-address">Address</Label>
              <Input
                id="user-address"
                value={formValues.address}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }))
                }
                placeholder="123 Main Street"
              />
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
              {mode === "create" ? "Create User" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
