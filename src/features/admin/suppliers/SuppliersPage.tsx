"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { initialSuppliers } from "./data";
import { DeleteSupplierDialog } from "./DeleteSupplierDialog";
import { SupplierDetailDialog } from "./SupplierDetailDialog";
import { SupplierFormDialog } from "./SupplierFormDialog";
import { SupplierFormValues, SupplierItem } from "./types";
import { SuppliersTable } from "./SuppliersTable";
import {
  createSupplier,
  deleteSupplier,
  fetchSuppliers,
  selectSuppliers,
  selectSuppliersError,
  selectSuppliersStatus,
  updateSupplier,
} from "./store";

const mapSupplierToFormValues = (
  supplier: SupplierItem,
): SupplierFormValues => ({
  name: supplier.name,
  email: supplier.email ?? "",
  phone: supplier.phone ?? "",
  address: supplier.address ?? "",
  active: supplier.active,
});

export const SuppliersPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierItem | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector(selectSuppliers);
  const status = useAppSelector(selectSuppliersStatus);
  const error = useAppSelector(selectSuppliersError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchSuppliers());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedSupplier) {
      return mapSupplierToFormValues(selectedSupplier);
    }

    return undefined;
  }, [formMode, selectedSupplier]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedSupplier(null);
    setIsFormOpen(true);
  };

  const handleViewSupplier = (supplier: SupplierItem) => {
    setSelectedSupplier(supplier);
    setIsDetailOpen(true);
  };

  const handleEditSupplier = (supplier: SupplierItem) => {
    setFormMode("edit");
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (supplier: SupplierItem) => {
    setSelectedSupplier(supplier);
    setIsDeleteOpen(true);
  };

  const handleUpsertSupplier = async (values: SupplierFormValues) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim() ? values.email.trim() : undefined,
      phone: values.phone.trim() ? values.phone.trim() : undefined,
      address: values.address.trim() ? values.address.trim() : undefined,
      active: values.active,
    };

    if (formMode === "edit" && selectedSupplier) {
      await dispatch(
        updateSupplier({
          id: selectedSupplier.id,
          values: payload,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createSupplier(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedSupplier) {
      return;
    }

    await dispatch(deleteSupplier(selectedSupplier.id)).unwrap();
    setSelectedSupplier(null);
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
                Supplier Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage supplier profiles and contact information.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Supplier
            </Button>
          </div>

          <SuppliersTable
            suppliers={suppliers.length > 0 ? suppliers : initialSuppliers}
            onView={handleViewSupplier}
            onEdit={handleEditSupplier}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading suppliers from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <SupplierFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertSupplier}
          />

          <SupplierDetailDialog
            open={isDetailOpen}
            supplier={selectedSupplier}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteSupplierDialog
            open={isDeleteOpen}
            supplier={selectedSupplier}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
