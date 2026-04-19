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

import { defaultPromotionFormValues } from "./data";
import type { PromotionFormValues } from "./types";

interface PromotionFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: PromotionFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PromotionFormValues) => Promise<void> | void;
}

export const PromotionFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: PromotionFormDialogProps) => {
  const [formValues, setFormValues] = useState<PromotionFormValues>(
    defaultPromotionFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultPromotionFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setError("Promotion name is required.");
      return;
    }

    const discountValue = Number(formValues.discountValue);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      setError("Discount value must be a non-negative number.");
      return;
    }

    const productId = formValues.productId
      ? Number(formValues.productId)
      : undefined;
    if (formValues.productId && (!productId || productId < 1)) {
      setError("Product ID must be greater than 0.");
      return;
    }

    if (formValues.startAt && formValues.endAt) {
      const start = new Date(formValues.startAt);
      const end = new Date(formValues.endAt);
      if (start.getTime() > end.getTime()) {
        setError("Start time must be before end time.");
        return;
      }
    }

    try {
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        code: formValues.code.trim(),
        discountValue: String(discountValue),
        productId: productId ? String(productId) : "",
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save promotion.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Promotion" : "Edit Promotion"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a promotion for selected products."
              : "Update promotion information and status."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="promotion-name">Promotion Name</Label>
            <Input
              id="promotion-name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Summer Sale"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="promotion-code">Code</Label>
              <Input
                id="promotion-code"
                value={formValues.code}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    code: event.target.value,
                  }))
                }
                placeholder="SUMMER2026"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotion-discount-value">Discount Value</Label>
              <Input
                id="promotion-discount-value"
                type="number"
                min={0}
                step="0.01"
                value={formValues.discountValue}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    discountValue: event.target.value,
                  }))
                }
                placeholder="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formValues.type}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    type: value as PromotionFormValues["type"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">PERCENTAGE</SelectItem>
                  <SelectItem value="FIXED_AMOUNT">FIXED_AMOUNT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formValues.status}
                onValueChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    status: value as PromotionFormValues["status"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CREATED">CREATED</SelectItem>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotion-product-id">Product ID</Label>
              <Input
                id="promotion-product-id"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="promotion-start-at">Start At</Label>
              <Input
                id="promotion-start-at"
                type="datetime-local"
                value={formValues.startAt}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    startAt: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotion-end-at">End At</Label>
              <Input
                id="promotion-end-at"
                type="datetime-local"
                value={formValues.endAt}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    endAt: event.target.value,
                  }))
                }
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
              {mode === "create" ? "Create Promotion" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
