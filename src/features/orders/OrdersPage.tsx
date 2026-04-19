"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/features/shared-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { defaultOrderFormValues, initialOrders } from "./data";
import { DeleteOrderDialog } from "./DeleteOrderDialog";
import { OrderDetailDialog } from "./OrderDetailDialog";
import { OrderFormDialog } from "./OrderFormDialog";
import { OrdersTable } from "./OrdersTable";
import {
  createOrder,
  deleteOrder,
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersStatus,
  updateOrder,
} from "./store";
import type { OrderFormValues, OrderItem } from "./types";

const mapOrderToFormValues = (order: OrderItem): OrderFormValues => ({
  shippingAddress: order.shippingAddress ?? "",
  shippingPhone: order.shippingPhone ?? "",
  methodPayment: order.methodPayment ?? "",
  status: order.status,
});

export const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedOrder) {
      return mapOrderToFormValues(selectedOrder);
    }

    return defaultOrderFormValues;
  }, [formMode, selectedOrder]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedOrder(null);
    setIsFormOpen(true);
  };

  const handleViewOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleEditOrder = (order: OrderItem) => {
    setFormMode("edit");
    setSelectedOrder(order);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (order: OrderItem) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  const handleUpsertOrder = async (values: OrderFormValues) => {
    const payload = {
      shippingAddress: values.shippingAddress.trim(),
      shippingPhone: values.shippingPhone.trim(),
      methodPayment: values.methodPayment.trim(),
    };

    if (formMode === "edit" && selectedOrder) {
      await dispatch(
        updateOrder({
          id: selectedOrder.id,
          values: {
            ...payload,
            status: values.status,
          },
        }),
      ).unwrap();
      return;
    }

    await dispatch(createOrder(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) {
      return;
    }

    await dispatch(deleteOrder(selectedOrder.id)).unwrap();
    setSelectedOrder(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Order Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage customer orders, shipping details, and status.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Order
            </Button>
          </div>

          <OrdersTable
            orders={orders.length > 0 ? orders : initialOrders}
            onView={handleViewOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading orders from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <OrderFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertOrder}
          />

          <OrderDetailDialog
            open={isDetailOpen}
            order={selectedOrder}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteOrderDialog
            open={isDeleteOpen}
            order={selectedOrder}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
