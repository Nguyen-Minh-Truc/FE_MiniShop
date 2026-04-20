import type { ProductFormValues, ProductItem, ProductCategory } from "./types";

export const productCategoryOptions: ProductCategory[] = [
  {
    id: 1,
    name: "Fashion",
    description: "Clothing, footwear, and accessories",
    active: true,
  },
  {
    id: 2,
    name: "Electronics",
    description: "Phones, laptops, and smart devices",
    active: true,
  },
  {
    id: 3,
    name: "Home",
    description: "Furniture, decor, and household items",
    active: true,
  },
  {
    id: 4,
    name: "Beauty",
    description: "Skincare, cosmetics, and personal care",
    active: true,
  },
];

export const defaultProductFormValues: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  categoryId: String(productCategoryOptions[0]?.id ?? 1),
  active: true,
};

export const initialProducts: ProductItem[] = [];
