"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { defaultCategoryFormValues } from "./data";
import { CategoryFormValues } from "./types";

interface CategoryFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: CategoryFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CategoryFormValues) => Promise<void> | void;
}

export const CategoryFormDialog = ({
  mode,
  open,
  initialValues,
  onOpenChange,
  onSubmit,
}: CategoryFormDialogProps) => {
  const [formValues, setFormValues] = useState<CategoryFormValues>(
    defaultCategoryFormValues,
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultCategoryFormValues);
      setError("");
    }
  }, [initialValues, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim()) {
      setError("Category name is required.");
      return;
    }

    const loadingToastId = toast.loading(
      mode === "create" ? "Creating category..." : "Saving category...",
    );

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        description: formValues.description.trim(),
      });

      toast.success(
        mode === "create"
          ? "Category created successfully."
          : "Category updated successfully.",
      );
      onOpenChange(false);
    } catch (submitError) {
      toast.error(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save category.",
      );
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save category.",
      );
    } finally {
      setIsSubmitting(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the category information below to create a new item."
              : "Update category information and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Electronics"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Input
              id="category-description"
              value={formValues.description}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Category description"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {mode === "create" ? "Create Category" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
