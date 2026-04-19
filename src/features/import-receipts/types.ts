import type { ImportReceipt, ImportReceiptStatus } from "@/types";

export type ImportReceiptItem = {
  id?: number;
  productId: number;
  quantity: number;
  costPrice: number;
  productName?: string;
};

export type ImportReceiptItemFormValue = {
  productId: string;
  quantity: string;
  costPrice: string;
};

export type ImportReceiptItemModel = Omit<ImportReceipt, "items"> & {
  items: ImportReceiptItem[];
};

export type ImportReceiptFormValues = {
  supplierId: string;
  status: ImportReceiptStatus;
  items: ImportReceiptItemFormValue[];
};
