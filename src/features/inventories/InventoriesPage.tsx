"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/features/shared-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { defaultInventoryFormValues, initialInventories } from "./data";
import { DeleteInventoryDialog } from "./DeleteInventoryDialog";
import { InventoriesTable } from "./InventoriesTable";
import { InventoryDetailDialog } from "./InventoryDetailDialog";
import { InventoryFormDialog } from "./InventoryFormDialog";
import {
  createInventory,
  deleteInventory,
  fetchInventories,
  selectInventories,
  selectInventoriesError,
  selectInventoriesStatus,
  updateInventory,
} from "./store";
import type { InventoryFormValues, InventoryItem } from "./types";

const mapInventoryToFormValues = (
  inventory: InventoryItem,
): InventoryFormValues => ({
  productId: String(inventory.product?.id ?? ""),
  stock: String(inventory.stock),
  reservedStock: String(inventory.reservedStock),
});

export const InventoriesPage = () => {
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const dispatch = useAppDispatch();
  const inventories = useAppSelector(selectInventories);
  const status = useAppSelector(selectInventoriesStatus);
  const error = useAppSelector(selectInventoriesError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchInventories());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedInventory) {
      return mapInventoryToFormValues(selectedInventory);
    }

    return defaultInventoryFormValues;
  }, [formMode, selectedInventory]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedInventory(null);
    setIsFormOpen(true);
  };

  const handleViewInventory = (inventory: InventoryItem) => {
    setSelectedInventory(inventory);
    setIsDetailOpen(true);
  };

  const handleEditInventory = (inventory: InventoryItem) => {
    setFormMode("edit");
    setSelectedInventory(inventory);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (inventory: InventoryItem) => {
    setSelectedInventory(inventory);
    setIsDeleteOpen(true);
  };

  const handleUpsertInventory = async (values: InventoryFormValues) => {
    const payload = {
      productId: Number(values.productId),
      stock: Number(values.stock),
      reservedStock: Number(values.reservedStock || "0"),
    };

    if (formMode === "edit" && selectedInventory) {
      await dispatch(
        updateInventory({
          id: selectedInventory.id,
          values: {
            stock: payload.stock,
            reservedStock: payload.reservedStock,
          },
        }),
      ).unwrap();
      return;
    }

    await dispatch(createInventory(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedInventory) {
      return;
    }

    await dispatch(deleteInventory(selectedInventory.id)).unwrap();
    setSelectedInventory(null);
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
                Inventory Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage stock and reserved quantity for each product.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Inventory
            </Button>
          </div>

          <InventoriesTable
            inventories={
              inventories.length > 0 ? inventories : initialInventories
            }
            onView={handleViewInventory}
            onEdit={handleEditInventory}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading inventories from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <InventoryFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertInventory}
          />

          <InventoryDetailDialog
            open={isDetailOpen}
            inventory={selectedInventory}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteInventoryDialog
            open={isDeleteOpen}
            inventory={selectedInventory}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
