import type { ImportReceiptFormValues } from "./types";

export const defaultImportReceiptFormValues: ImportReceiptFormValues = {
  supplierId: "",
  status: "PENDING",
  items: [
    {
      productId: "",
      quantity: "1",
      costPrice: "",
    },
  ],
};
