import type { Order, OrderStatus } from "@/types";

export type OrderItem = Order;

export interface OrderFormValues {
  shippingAddress: string;
  shippingPhone: string;
  methodPayment: string;
  status: OrderStatus;
}
