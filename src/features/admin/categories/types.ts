import type { Category } from "@/types";

export type CategoryItem = Category;

export interface CategoryProductItem {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  active: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  categoryId: number | null;
  categoryName: string | null;
  sellerId: number | null;
  sellerName: string | null;
  imageUrls: string[];
}

export interface CategoryDetailItem extends CategoryItem {
  products?: CategoryProductItem[];
}

export interface CategoryFormValues {
  name: string;
  description: string;
  active: boolean;
}
