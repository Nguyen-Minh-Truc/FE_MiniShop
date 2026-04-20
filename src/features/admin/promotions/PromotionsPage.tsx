"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { defaultPromotionFormValues, initialPromotions } from "./data";
import { DeletePromotionDialog } from "./DeletePromotionDialog";
import { PromotionDetailDialog } from "./PromotionDetailDialog";
import { PromotionFormDialog } from "./PromotionFormDialog";
import { PromotionsTable } from "./PromotionsTable";
import {
  createPromotion,
  deletePromotion,
  fetchPromotions,
  selectPromotions,
  selectPromotionsError,
  selectPromotionsStatus,
  updatePromotion,
} from "./store";
import type { PromotionFormValues, PromotionItem } from "./types";

const toLocalDatetimeInput = (value: string | null) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const mapPromotionToFormValues = (
  promotion: PromotionItem,
): PromotionFormValues => ({
  name: promotion.name,
  code: promotion.code ?? "",
  type: promotion.type,
  discountValue: String(promotion.discountValue),
  status: promotion.status,
  startAt: toLocalDatetimeInput(promotion.startAt),
  endAt: toLocalDatetimeInput(promotion.endAt),
  productId: promotion.product?.id ? String(promotion.product.id) : "",
});

export const PromotionsPage = () => {
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const dispatch = useAppDispatch();
  const promotions = useAppSelector(selectPromotions);
  const status = useAppSelector(selectPromotionsStatus);
  const error = useAppSelector(selectPromotionsError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchPromotions());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedPromotion) {
      return mapPromotionToFormValues(selectedPromotion);
    }

    return defaultPromotionFormValues;
  }, [formMode, selectedPromotion]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedPromotion(null);
    setIsFormOpen(true);
  };

  const handleViewPromotion = (promotion: PromotionItem) => {
    setSelectedPromotion(promotion);
    setIsDetailOpen(true);
  };

  const handleEditPromotion = (promotion: PromotionItem) => {
    setFormMode("edit");
    setSelectedPromotion(promotion);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (promotion: PromotionItem) => {
    setSelectedPromotion(promotion);
    setIsDeleteOpen(true);
  };

  const handleUpsertPromotion = async (values: PromotionFormValues) => {
    const payload = {
      name: values.name.trim(),
      code: values.code.trim() || undefined,
      type: values.type,
      discountValue: Number(values.discountValue),
      status: values.status,
      startAt: values.startAt
        ? new Date(values.startAt).toISOString()
        : undefined,
      endAt: values.endAt ? new Date(values.endAt).toISOString() : undefined,
      productId: values.productId ? Number(values.productId) : undefined,
    };

    if (formMode === "edit" && selectedPromotion) {
      await dispatch(
        updatePromotion({
          id: selectedPromotion.id,
          values: payload,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createPromotion(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedPromotion) {
      return;
    }

    await dispatch(deletePromotion(selectedPromotion.id)).unwrap();
    setSelectedPromotion(null);
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
                Promotion Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage discounts, time range, and product promotions.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Promotion
            </Button>
          </div>

          <PromotionsTable
            promotions={promotions.length > 0 ? promotions : initialPromotions}
            onView={handleViewPromotion}
            onEdit={handleEditPromotion}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading promotions from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <PromotionFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertPromotion}
          />

          <PromotionDetailDialog
            open={isDetailOpen}
            promotion={selectedPromotion}
            onOpenChange={setIsDetailOpen}
          />

          <DeletePromotionDialog
            open={isDeleteOpen}
            promotion={selectedPromotion}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
