"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/features/shared-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { initialCategories } from "./data";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryDetailDialog } from "./CategoryDetailDialog";
import { CategoryFormDialog } from "./CategoryFormDialog";
import { CategoryFormValues, CategoryItem } from "./types";
import { CategoriesTable } from "./CategoriesTable";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
  updateCategory,
} from "./store";

const mapCategoryToFormValues = (
  category: CategoryItem,
): CategoryFormValues => ({
  name: category.name,
  description: category.description,
  active: category.active,
});

export const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const error = useAppSelector(selectCategoriesError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedCategory) {
      return mapCategoryToFormValues(selectedCategory);
    }

    return undefined;
  }, [formMode, selectedCategory]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleViewCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDetailOpen(true);
  };

  const handleEditCategory = (category: CategoryItem) => {
    setFormMode("edit");
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleUpsertCategory = async (values: CategoryFormValues) => {
    const payload = {
      name: values.name.trim(),
      description: values.description.trim(),
      active: values.active,
    };

    if (formMode === "edit" && selectedCategory) {
      await dispatch(
        updateCategory({
          id: selectedCategory.id,
          values: payload,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createCategory(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) {
      return;
    }

    await dispatch(deleteCategory(selectedCategory.id)).unwrap();
    setSelectedCategory(null);
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
                Category Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage product categories and their visibility.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>

          <CategoriesTable
            categories={categories.length > 0 ? categories : initialCategories}
            onView={handleViewCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading categories from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <CategoryFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertCategory}
          />

          <CategoryDetailDialog
            open={isDetailOpen}
            category={selectedCategory}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteCategoryDialog
            open={isDeleteOpen}
            category={selectedCategory}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
