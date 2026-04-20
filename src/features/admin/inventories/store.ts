import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { CreateInventoryRequest, UpdateInventoryRequest } from "@/types";

import { inventoriesApi } from "./api";
import type { InventoryItem } from "./types";

export type InventoriesStatus = "idle" | "loading" | "succeeded" | "failed";

export interface InventoriesState {
  items: InventoryItem[];
  status: InventoriesStatus;
  error: string | null;
}

const initialState: InventoriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchInventories = createAsyncThunk(
  "inventories/fetchInventories",
  async () => {
    return await inventoriesApi.getInventories();
  },
);

export const createInventory = createAsyncThunk(
  "inventories/createInventory",
  async (values: CreateInventoryRequest) => {
    return await inventoriesApi.createInventory(values);
  },
);

export const updateInventory = createAsyncThunk(
  "inventories/updateInventory",
  async ({ id, values }: { id: number; values: UpdateInventoryRequest }) => {
    return await inventoriesApi.updateInventory(id, values);
  },
);

export const deleteInventory = createAsyncThunk(
  "inventories/deleteInventory",
  async (id: number) => {
    await inventoriesApi.deleteInventory(id);
    return id;
  },
);

const inventoriesSlice = createSlice({
  name: "inventories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch inventories.";
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.items = state.items.map((inventory) =>
          inventory.id === action.payload.id ? action.payload : inventory,
        );
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (inventory) => inventory.id !== action.payload,
        );
      });
  },
});

export const inventoriesReducer = inventoriesSlice.reducer;

export const selectInventories = (state: { inventories: InventoriesState }) =>
  state.inventories.items;
export const selectInventoriesStatus = (state: {
  inventories: InventoriesState;
}) => state.inventories.status;
export const selectInventoriesError = (state: {
  inventories: InventoriesState;
}) => state.inventories.error;
