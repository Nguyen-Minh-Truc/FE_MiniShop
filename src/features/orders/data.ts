import type { OrderFormValues, OrderItem } from "./types";

export const initialOrders: OrderItem[] = [];

export const defaultOrderFormValues: OrderFormValues = {
  shippingAddress: "",
  shippingPhone: "",
  methodPayment: "COD",
  status: "PENDING",
};
