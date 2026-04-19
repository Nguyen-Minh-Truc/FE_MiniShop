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

import { defaultInventoryFormValues } from "./data";
import type { InventoryFormValues } from "./types";

interface InventoryFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: InventoryFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InventoryFormValues) => Promise<void> | void;
}

export const InventoryFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: InventoryFormDialogProps) => {
  const [formValues, setFormValues] = useState<InventoryFormValues>(
    defaultInventoryFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultInventoryFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productId = Number(formValues.productId);
    const stock = Number(formValues.stock);
    const reservedStock = Number(formValues.reservedStock || "0");

    if (!productId || productId < 1) {
      setError("Product ID is required.");
      return;
    }

    if (stock < 0 || !Number.isFinite(stock)) {
      setError("Stock must be a non-negative number.");
      return;
    }

    if (reservedStock < 0 || !Number.isFinite(reservedStock)) {
      setError("Reserved stock must be a non-negative number.");
      return;
    }

    if (reservedStock > stock) {
      setError("Reserved stock cannot be greater than stock.");
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        productId: String(productId),
        stock: String(stock),
        reservedStock: String(reservedStock),
      });
      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save inventory.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Inventory" : "Edit Inventory"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new inventory record for product stock tracking."
              : "Update stock and reserved quantity for this inventory item."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="inventory-product-id">Product ID</Label>
            <Input
              id="inventory-product-id"
              type="number"
              min={1}
              value={formValues.productId}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  productId: event.target.value,
                }))
              }
              placeholder="1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inventory-stock">Stock</Label>
              <Input
                id="inventory-stock"
                type="number"
                min={0}
                value={formValues.stock}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    stock: event.target.value,
                  }))
                }
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory-reserved-stock">Reserved Stock</Label>
              <Input
                id="inventory-reserved-stock"
                type="number"
                min={0}
                value={formValues.reservedStock}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    reservedStock: event.target.value,
                  }))
                }
                placeholder="10"
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
              {mode === "create" ? "Create Inventory" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
