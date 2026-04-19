"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/features/shared-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { DeleteImportReceiptDialog } from "./DeleteImportReceiptDialog";
import { ImportReceiptDetailDialog } from "./ImportReceiptDetailDialog";
import { ImportReceiptFormDialog } from "./ImportReceiptFormDialog";
import { ImportReceiptsTable } from "./ImportReceiptsTable";
import {
  createImportReceipt,
  deleteImportReceipt,
  fetchImportReceipts,
  selectImportReceipts,
  selectImportReceiptsError,
  selectImportReceiptsStatus,
  updateImportReceipt,
} from "./store";
import type { ImportReceiptFormValues, ImportReceiptItemModel } from "./types";

const mapReceiptToFormValues = (
  receipt: ImportReceiptItemModel,
): ImportReceiptFormValues => ({
  supplierId: String(receipt.supplier?.id ?? ""),
  status: receipt.status,
  items:
    receipt.items.length > 0
      ? receipt.items.map((item) => ({
          productId: String(item.productId),
          quantity: String(item.quantity),
          costPrice: String(item.costPrice),
        }))
      : [
          {
            productId: "",
            quantity: "1",
            costPrice: "",
          },
        ],
});

export const ImportReceiptsPage = () => {
  const [selectedReceipt, setSelectedReceipt] =
    useState<ImportReceiptItemModel | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const dispatch = useAppDispatch();
  const importReceipts = useAppSelector(selectImportReceipts);
  const status = useAppSelector(selectImportReceiptsStatus);
  const error = useAppSelector(selectImportReceiptsError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchImportReceipts());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedReceipt) {
      return mapReceiptToFormValues(selectedReceipt);
    }

    return undefined;
  }, [formMode, selectedReceipt]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedReceipt(null);
    setIsFormOpen(true);
  };

  const handleViewReceipt = (receipt: ImportReceiptItemModel) => {
    setSelectedReceipt(receipt);
    setIsDetailOpen(true);
  };

  const handleEditReceipt = (receipt: ImportReceiptItemModel) => {
    setFormMode("edit");
    setSelectedReceipt(receipt);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (receipt: ImportReceiptItemModel) => {
    setSelectedReceipt(receipt);
    setIsDeleteOpen(true);
  };

  const handleUpsertReceipt = async (values: ImportReceiptFormValues) => {
    const normalizedItems = values.items
      .map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        costPrice: Number(item.costPrice),
      }))
      .filter(
        (item) =>
          item.productId > 0 &&
          item.quantity > 0 &&
          Number.isFinite(item.costPrice),
      );

    const payload = {
      supplierId: Number(values.supplierId),
      items: normalizedItems,
    };

    if (formMode === "edit" && selectedReceipt) {
      await dispatch(
        updateImportReceipt({
          id: selectedReceipt.id,
          values: {
            ...payload,
            status: values.status,
          },
        }),
      ).unwrap();

      return;
    }

    await dispatch(createImportReceipt(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedReceipt) {
      return;
    }

    await dispatch(deleteImportReceipt(selectedReceipt.id)).unwrap();
    setSelectedReceipt(null);
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
                Import Receipt Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage import receipts and include import_riept_item in API
                payloads.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Import Receipt
            </Button>
          </div>

          <ImportReceiptsTable
            importReceipts={importReceipts}
            onView={handleViewReceipt}
            onEdit={handleEditReceipt}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading import receipts from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <ImportReceiptFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertReceipt}
          />

          <ImportReceiptDetailDialog
            open={isDetailOpen}
            importReceipt={selectedReceipt}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteImportReceiptDialog
            open={isDeleteOpen}
            importReceipt={selectedReceipt}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
