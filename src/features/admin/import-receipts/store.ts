import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { CreateImportReceiptRequest, ImportReceiptStatus } from "@/types";

import { importReceiptsApi } from "./api";
import type { ImportReceiptItemModel } from "./types";

type UpdateImportReceiptRequest = Partial<CreateImportReceiptRequest> & {
  status?: ImportReceiptStatus;
};

export type ImportReceiptsStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ImportReceiptsState {
  items: ImportReceiptItemModel[];
  status: ImportReceiptsStatus;
  error: string | null;
}

const initialState: ImportReceiptsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchImportReceipts = createAsyncThunk(
  "importReceipts/fetchImportReceipts",
  async () => {
    return await importReceiptsApi.getImportReceipts();
  },
);

export const createImportReceipt = createAsyncThunk(
  "importReceipts/createImportReceipt",
  async (values: CreateImportReceiptRequest) => {
    return await importReceiptsApi.createImportReceipt(values);
  },
);

export const updateImportReceipt = createAsyncThunk(
  "importReceipts/updateImportReceipt",
  async ({
    id,
    values,
  }: {
    id: number;
    values: UpdateImportReceiptRequest;
  }) => {
    return await importReceiptsApi.updateImportReceipt(id, values);
  },
);

export const deleteImportReceipt = createAsyncThunk(
  "importReceipts/deleteImportReceipt",
  async (id: number) => {
    await importReceiptsApi.deleteImportReceipt(id);
    return id;
  },
);

const importReceiptsSlice = createSlice({
  name: "importReceipts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportReceipts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchImportReceipts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchImportReceipts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Failed to fetch import receipts.";
      })
      .addCase(createImportReceipt.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateImportReceipt.fulfilled, (state, action) => {
        state.items = state.items.map((receipt) =>
          receipt.id === action.payload.id ? action.payload : receipt,
        );
      })
      .addCase(deleteImportReceipt.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (receipt) => receipt.id !== action.payload,
        );
      });
  },
});

export const importReceiptsReducer = importReceiptsSlice.reducer;

export const selectImportReceipts = (state: {
  importReceipts: ImportReceiptsState;
}) => state.importReceipts.items;

export const selectImportReceiptsStatus = (state: {
  importReceipts: ImportReceiptsState;
}) => state.importReceipts.status;

export const selectImportReceiptsError = (state: {
  importReceipts: ImportReceiptsState;
}) => state.importReceipts.error;
