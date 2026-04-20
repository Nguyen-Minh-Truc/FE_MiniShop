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

import { defaultOrderFormValues } from "./data";
import type { OrderFormValues } from "./types";

interface OrderFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: OrderFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: OrderFormValues) => Promise<void> | void;
}

export const OrderFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: OrderFormDialogProps) => {
  const [formValues, setFormValues] = useState<OrderFormValues>(
    defaultOrderFormValues,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultOrderFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.shippingAddress.trim()) {
      setError("Shipping address is required.");
      return;
    }

    if (!formValues.shippingPhone.trim()) {
      setError("Shipping phone is required.");
      return;
    }

    if (!formValues.methodPayment.trim()) {
      setError("Payment method is required.");
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        shippingAddress: formValues.shippingAddress.trim(),
        shippingPhone: formValues.shippingPhone.trim(),
        methodPayment: formValues.methodPayment.trim(),
      });

      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save order.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Order" : "Edit Order"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new order with shipping and payment info."
              : "Update order shipping, payment, and status."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="order-shipping-address">Shipping Address</Label>
            <Input
              id="order-shipping-address"
              value={formValues.shippingAddress}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  shippingAddress: event.target.value,
                }))
              }
              placeholder="123 Nguyen Trai, District 1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order-shipping-phone">Shipping Phone</Label>
              <Input
                id="order-shipping-phone"
                value={formValues.shippingPhone}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    shippingPhone: event.target.value,
                  }))
                }
                placeholder="0901234567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order-method-payment">Payment Method</Label>
              <Input
                id="order-method-payment"
                value={formValues.methodPayment}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    methodPayment: event.target.value,
                  }))
                }
                placeholder="COD"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formValues.status}
              onValueChange={(value) =>
                setFormValues((prev) => ({
                  ...prev,
                  status: value as OrderFormValues["status"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="PAID">PAID</SelectItem>
                <SelectItem value="SHIPPING">SHIPPING</SelectItem>
                <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
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
              {mode === "create" ? "Create Order" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
