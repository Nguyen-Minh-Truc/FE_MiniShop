import type { Inventory } from "@/types";

export type InventoryItem = Inventory;

export interface InventoryFormValues {
  productId: string;
  stock: string;
  reservedStock: string;
}
