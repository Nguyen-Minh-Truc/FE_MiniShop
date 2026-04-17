import type { Category, Product } from "@/types";

export type ProductItem = Product;

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  active: boolean;
}

export type ProductCategory = Category;
