"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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

import { defaultImportReceiptFormValues } from "./data";
import type {
  ImportReceiptFormValues,
  ImportReceiptItemFormValue,
} from "./types";

interface ImportReceiptFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: ImportReceiptFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ImportReceiptFormValues) => Promise<void> | void;
}

const createEmptyItem = (): ImportReceiptItemFormValue => ({
  productId: "",
  quantity: "1",
  costPrice: "",
});

export const ImportReceiptFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: ImportReceiptFormDialogProps) => {
  const [formValues, setFormValues] = useState<ImportReceiptFormValues>(
    defaultImportReceiptFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultImportReceiptFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const updateItem = (
    index: number,
    field: keyof ImportReceiptItemFormValue,
    value: string,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      items: prev.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setFormValues((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
  };

  const removeItem = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      items:
        prev.items.length === 1
          ? prev.items
          : prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supplierId = Number(formValues.supplierId);
    if (!supplierId || supplierId < 1) {
      setError("Supplier ID is required.");
      return;
    }

    const hasInvalidItem = formValues.items.some((item) => {
      const productId = Number(item.productId);
      const quantity = Number(item.quantity);
      const costPrice = Number(item.costPrice);

      return !productId || quantity < 1 || costPrice <= 0;
    });

    if (hasInvalidItem) {
      setError("Each item needs valid productId, quantity, and cost price.");
      return;
    }

    try {
      await onSubmit(formValues);
      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save import receipt.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Import Receipt" : "Edit Import Receipt"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new import receipt with item rows."
              : "Update receipt information and line items."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="import-receipt-supplier-id">Supplier ID</Label>
              <Input
                id="import-receipt-supplier-id"
                type="number"
                min={1}
                value={formValues.supplierId}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    supplierId: event.target.value,
                  }))
                }
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formValues.status}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    status: value as ImportReceiptFormValues["status"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                  <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                  <SelectItem value="CANCELED">CANCELED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Import Receipt Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>

            {formValues.items.map((item, index) => (
              <div
                key={`${index}-${item.productId}`}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 border border-border rounded-md p-3"
              >
                <Input
                  type="number"
                  min={1}
                  value={item.productId}
                  onChange={(event) =>
                    updateItem(index, "productId", event.target.value)
                  }
                  placeholder="Product ID"
                />
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateItem(index, "quantity", event.target.value)
                  }
                  placeholder="Quantity"
                />
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.costPrice}
                  onChange={(event) =>
                    updateItem(index, "costPrice", event.target.value)
                  }
                  placeholder="Cost Price"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
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
              {mode === "create" ? "Create Receipt" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
