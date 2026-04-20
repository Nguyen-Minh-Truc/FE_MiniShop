import type { Category } from "@/types";

export type CategoryItem = Category;

export interface CategoryFormValues {
  name: string;
  description: string;
  active: boolean;
}
