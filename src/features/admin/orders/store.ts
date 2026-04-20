import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { CheckoutOrderRequest, OrderStatus } from "@/types";

import { ordersApi } from "./api";
import type { OrderItem } from "./types";

type UpdateOrderRequest = Partial<CheckoutOrderRequest> & {
  status?: OrderStatus;
  paymentMethod?: string;
};

export type OrdersStatus = "idle" | "loading" | "succeeded" | "failed";

export interface OrdersState {
  items: OrderItem[];
  status: OrdersStatus;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  return await ordersApi.getOrders();
});

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (values: CheckoutOrderRequest) => {
    return await ordersApi.createOrder(values);
  },
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, values }: { id: number; values: UpdateOrderRequest }) => {
    return await ordersApi.updateOrder(id, values);
  },
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: number) => {
    await ordersApi.deleteOrder(id);
    return id;
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch orders.";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.items = state.items.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        );
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (order) => order.id !== action.payload,
        );
      });
  },
});

export const ordersReducer = ordersSlice.reducer;

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;
export const selectOrdersStatus = (state: { orders: OrdersState }) =>
  state.orders.status;
export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;
