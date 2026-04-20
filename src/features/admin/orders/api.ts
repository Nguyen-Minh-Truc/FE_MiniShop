import type {
  ApiResponse,
  CheckoutOrderRequest,
  Order,
  OrderListResponse,
  OrderStatus,
} from "@/types";

import type { OrderItem } from "./types";

type UpdateOrderRequest = Partial<CheckoutOrderRequest> & {
  status?: OrderStatus;
  paymentMethod?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(buildUrl(path), {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${raw}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error("Server not running or returned HTML instead of JSON");
    }

    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      throw new Error("Cannot connect to server (server may be down)");
    }

    throw err;
  }
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const normalizeOrder = (order: Order): OrderItem => ({
  ...order,
  methodPayment: order.methodPayment,
});

const buildPayload = (
  payload: CheckoutOrderRequest | UpdateOrderRequest,
): CheckoutOrderRequest | UpdateOrderRequest => {
  const source = payload as UpdateOrderRequest;

  return {
    ...source,
    methodPayment: source.methodPayment ?? source.paymentMethod ?? "",
    paymentMethod: source.paymentMethod ?? source.methodPayment,
  };
};

export const ordersApi = {
  async getOrders(): Promise<OrderItem[]> {
    const response = await requestJson<OrderListResponse>("/orders");
    return unwrapApiData(response).result.map(normalizeOrder);
  },

  async createOrder(payload: CheckoutOrderRequest): Promise<OrderItem> {
    const response = await requestJson<ApiResponse<Order>>("/orders", {
      method: "POST",
      body: JSON.stringify(buildPayload(payload)),
    });

    return normalizeOrder(unwrapApiData(response));
  },

  async updateOrder(
    id: number,
    payload: UpdateOrderRequest,
  ): Promise<OrderItem> {
    const response = await requestJson<ApiResponse<Order>>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(buildPayload(payload)),
    });

    return normalizeOrder(unwrapApiData(response));
  },

  async deleteOrder(id: number): Promise<void> {
    await requestJson<ApiResponse<null>>(`/orders/${id}`, {
      method: "DELETE",
    });
  },
};
