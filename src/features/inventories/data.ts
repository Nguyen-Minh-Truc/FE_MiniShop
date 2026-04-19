import type { InventoryFormValues, InventoryItem } from "./types";

export const initialInventories: InventoryItem[] = [];

export const defaultInventoryFormValues: InventoryFormValues = {
  productId: "",
  stock: "0",
  reservedStock: "0",
};
