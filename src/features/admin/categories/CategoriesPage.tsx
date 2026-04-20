"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
  selectCategoriesMeta,
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const meta = useAppSelector(selectCategoriesMeta);
  const status = useAppSelector(selectCategoriesStatus);
  const error = useAppSelector(selectCategoriesError);

  const activeFilterValue = useMemo(() => {
    if (activeFilter === "active") {
      return true;
    }

    if (activeFilter === "inactive") {
      return false;
    }

    return undefined;
  }, [activeFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  const queryParams = useMemo(
    () => ({
      page,
      pageSize,
      search: debouncedSearchValue || undefined,
      active: activeFilterValue,
    }),
    [activeFilterValue, debouncedSearchValue, page, pageSize],
  );

  const visibleCategories = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesKeyword =
        keyword.length === 0 ||
        [
          String(category.id),
          category.name,
          category.description,
          category.active ? "active" : "inactive",
        ].some((value) => value.toLowerCase().includes(keyword));

      const matchesActive =
        activeFilterValue === undefined ||
        category.active === activeFilterValue;

      return matchesKeyword && matchesActive;
    });
  }, [activeFilterValue, categories, searchValue]);

  useEffect(() => {
    void dispatch(fetchCategories(queryParams));
  }, [dispatch, queryParams]);

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

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleActiveFilterChange = (value: "all" | "active" | "inactive") => {
    setActiveFilter(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setPage((currentPage) => Math.min(meta.pages, currentPage + 1));
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

      void dispatch(fetchCategories(queryParams));
      return;
    }

    await dispatch(createCategory(payload)).unwrap();
    void dispatch(fetchCategories(queryParams));
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) {
      return;
    }

    await dispatch(deleteCategory(selectedCategory.id)).unwrap();
    setSelectedCategory(null);
    void dispatch(fetchCategories(queryParams));
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

          <Card className="border border-border bg-card p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_160px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search by id, name, description, or status"
                  className="pl-9"
                />
              </div>

              <Select
                value={activeFilter}
                onValueChange={handleActiveFilterChange}
              >
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={String(pageSize)}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 / page</SelectItem>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="20">20 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <CategoriesTable
            categories={visibleCategories}
            onView={handleViewCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeletePrompt}
            emptyMessage={
              searchValue.trim() || activeFilter !== "all"
                ? "No categories match your current filters."
                : "No categories available."
            }
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading categories from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {visibleCategories.length} of {meta.total} categories
            </p>

            {meta.pages > 1 && (
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className={
                        meta.pageCurrent <= 1
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        handlePreviousPage();
                      }}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <Button variant="outline" size="sm" disabled>
                      Page {meta.pageCurrent} of {meta.pages}
                    </Button>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className={
                        meta.pageCurrent >= meta.pages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        handleNextPage();
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

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
