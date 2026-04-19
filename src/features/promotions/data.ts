import type { PromotionFormValues, PromotionItem } from "./types";

export const initialPromotions: PromotionItem[] = [];

export const defaultPromotionFormValues: PromotionFormValues = {
  name: "",
  code: "",
  type: "PERCENTAGE",
  discountValue: "0",
  status: "CREATED",
  startAt: "",
  endAt: "",
  productId: "",
};
