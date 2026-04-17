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

import { defaultProductFormValues, productCategoryOptions } from "./data";
import { ProductFormValues } from "./types";

interface ProductFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: ProductFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
}

const normalizePrice = (value: string) => {
  const numeric = value.replace(/[^\d.]/g, "");

  if (!numeric) {
    return null;
  }

  const parsed = Number(numeric);

  if (Number.isNaN(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
};

export const ProductFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) => {
  const [formValues, setFormValues] = useState<ProductFormValues>(
    defaultProductFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultProductFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setError("Product name is required.");
      return;
    }

    const price = normalizePrice(formValues.price);
    if (price === null) {
      setError("Price must be a valid number.");
      return;
    }

    if (!formValues.categoryId) {
      setError("Category is required.");
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        price: String(price),
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save product.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the product information below to create a new item."
              : "Update product information and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Running Shoes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Input
              id="product-description"
              value={formValues.description}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Short product description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                inputMode="decimal"
                value={formValues.price}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    price: event.target.value,
                  }))
                }
                placeholder="129.99"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formValues.categoryId}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    categoryId: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategoryOptions.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              {mode === "create" ? "Create Product" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
