import type { SupplierFormValues, SupplierItem } from "./types";

export const defaultSupplierFormValues: SupplierFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  active: true,
};

export const initialSuppliers: SupplierItem[] = [];
