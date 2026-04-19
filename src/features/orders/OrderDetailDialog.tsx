"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { OrderItem } from "./types";

interface OrderDetailDialogProps {
  open: boolean;
  order: OrderItem | null;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailDialog = ({
  open,
  order,
  onOpenChange,
}: OrderDetailDialogProps) => {
  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Detailed information for order #{order.id}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">ID</span>
              <span className="text-sm font-medium text-foreground">
                {order.id}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="outline">{order.status}</Badge>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Customer</span>
              <span className="text-sm font-medium text-foreground">
                {order.user?.username ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">Payment</span>
              <span className="text-sm font-medium text-foreground">
                {order.methodPayment ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">
                Shipping Address
              </span>
              <span className="text-sm font-medium text-foreground text-right">
                {order.shippingAddress ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <span className="text-sm text-muted-foreground">
                Shipping Phone
              </span>
              <span className="text-sm font-medium text-foreground">
                {order.shippingPhone ?? "-"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">
              Order Items
            </h4>
            <div className="overflow-x-auto border border-border rounded-md">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-xs text-muted-foreground">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {order.details.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-sm text-muted-foreground text-center"
                      >
                        No items in this order.
                      </td>
                    </tr>
                  )}

                  {order.details.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.productName || item.product?.name || "-"}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground">
                        {item.totalPrice.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total Price</span>
            <span className="text-sm font-semibold text-foreground">
              {order.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
