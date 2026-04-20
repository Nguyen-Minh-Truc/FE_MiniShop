import type { Supplier } from "@/types";

export type SupplierItem = Supplier;

export interface SupplierFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}
