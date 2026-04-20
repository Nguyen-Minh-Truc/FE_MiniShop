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

import { defaultSupplierFormValues } from "./data";
import { SupplierFormValues } from "./types";

interface SupplierFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: SupplierFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SupplierFormValues) => Promise<void> | void;
}

export const SupplierFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: SupplierFormDialogProps) => {
  const [formValues, setFormValues] = useState<SupplierFormValues>(
    defaultSupplierFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultSupplierFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setError("Supplier name is required.");
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        phone: formValues.phone.trim(),
        address: formValues.address.trim(),
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save supplier.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Supplier" : "Edit Supplier"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the supplier information below to create a new item."
              : "Update supplier information and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="supplier-name">Supplier Name</Label>
            <Input
              id="supplier-name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="ABC Trading Co."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier-email">Email</Label>
              <Input
                id="supplier-email"
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                placeholder="contact@supplier.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier-phone">Phone</Label>
              <Input
                id="supplier-phone"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier-address">Address</Label>
            <Input
              id="supplier-address"
              value={formValues.address}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
              placeholder="123 Supplier Street"
            />
          </div>

          <div className="space-y-2">
            <Label>Active</Label>
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
              {mode === "create" ? "Create Supplier" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
