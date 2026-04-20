"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { productCategoryOptions } from "./data";
import { DeleteProductDialog } from "./DeleteProductDialog";
import { ProductDetailDialog } from "./ProductDetailDialog";
import { ProductFormDialog } from "./ProductFormDialog";
import { ProductFormValues, ProductItem } from "./types";
import { ProductsTable } from "./ProductsTable";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  updateProduct,
} from "./store";

const mapProductToFormValues = (product: ProductItem): ProductFormValues => ({
  name: product.name,
  description: product.description ?? "",
  price: String(product.price),
  categoryId: String(
    product.category?.id ?? productCategoryOptions[0]?.id ?? 1,
  ),
  active: product.active,
});

export const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedProduct) {
      return mapProductToFormValues(selectedProduct);
    }

    return undefined;
  }, [formMode, selectedProduct]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleViewProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleEditProduct = (product: ProductItem) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleUpsertProduct = async (values: ProductFormValues) => {
    const payload = {
      name: values.name.trim(),
      description: values.description.trim()
        ? values.description.trim()
        : undefined,
      price: Number(values.price),
      categoryId: Number(values.categoryId),
      active: values.active,
    };

    if (formMode === "edit" && selectedProduct) {
      await dispatch(
        updateProduct({
          id: selectedProduct.id,
          values: payload,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createProduct(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    await dispatch(deleteProduct(selectedProduct.id)).unwrap();
    setSelectedProduct(null);
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
                Product Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage product information, categories, pricing, and visibility.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <ProductsTable
            products={products}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading products from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <ProductFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertProduct}
          />

          <ProductDetailDialog
            open={isDetailOpen}
            product={selectedProduct}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteProductDialog
            open={isDeleteOpen}
            product={selectedProduct}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
