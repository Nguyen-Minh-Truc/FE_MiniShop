import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  CreateSupplierRequest,
  Supplier,
  UpdateSupplierRequest,
} from "@/types";

import { suppliersApi } from "./api";

export type SuppliersStatus = "idle" | "loading" | "succeeded" | "failed";

export interface SuppliersState {
  items: Supplier[];
  status: SuppliersStatus;
  error: string | null;
}

const initialState: SuppliersState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async () => {
    return await suppliersApi.getSuppliers();
  },
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (values: CreateSupplierRequest) => {
    return await suppliersApi.createSupplier(values);
  },
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, values }: { id: number; values: UpdateSupplierRequest }) => {
    return await suppliersApi.updateSupplier(id, values);
  },
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id: number) => {
    await suppliersApi.deleteSupplier(id);
    return id;
  },
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch suppliers.";
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.items = state.items.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier,
        );
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (supplier) => supplier.id !== action.payload,
        );
      });
  },
});

export const suppliersReducer = suppliersSlice.reducer;

export const selectSuppliers = (state: { suppliers: SuppliersState }) =>
  state.suppliers.items;
export const selectSuppliersStatus = (state: { suppliers: SuppliersState }) =>
  state.suppliers.status;
export const selectSuppliersError = (state: { suppliers: SuppliersState }) =>
  state.suppliers.error;
