import type { Promotion, PromotionStatus, PromotionType } from "@/types";

export type PromotionItem = Promotion;

export interface PromotionFormValues {
  name: string;
  code: string;
  type: PromotionType;
  discountValue: string;
  status: PromotionStatus;
  startAt: string;
  endAt: string;
  productId: string;
}
