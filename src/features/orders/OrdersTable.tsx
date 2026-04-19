"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { OrderItem } from "./types";

interface OrdersTableProps {
  orders: OrderItem[];
  onView: (order: OrderItem) => void;
  onEdit: (order: OrderItem) => void;
  onDelete: (order: OrderItem) => void;
}

const getStatusVariant = (status: OrderItem["status"]) => {
  if (status === "SUCCESS") {
    return "default" as const;
  }

  if (status === "CANCELLED") {
    return "destructive" as const;
  }

  if (status === "PAID" || status === "SHIPPING") {
    return "secondary" as const;
  }

  return "outline" as const;
};

export const OrdersTable = ({
  orders,
  onView,
  onEdit,
  onDelete,
}: OrdersTableProps) => {
  return (
    <Card className="border border-border bg-card overflow-hidden py-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">All Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No orders available.
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {order.user?.username ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {order.methodPayment ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {order.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {order.createdAt ?? "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(order)}
                      aria-label={`View order ${order.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(order)}
                      aria-label={`Edit order ${order.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(order)}
                      aria-label={`Delete order ${order.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
