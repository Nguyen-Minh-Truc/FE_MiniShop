import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { CreatePromotionRequest, UpdatePromotionRequest } from "@/types";

import { promotionsApi } from "./api";
import type { PromotionItem } from "./types";

export type PromotionsStatus = "idle" | "loading" | "succeeded" | "failed";

export interface PromotionsState {
  items: PromotionItem[];
  status: PromotionsStatus;
  error: string | null;
}

const initialState: PromotionsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchPromotions = createAsyncThunk(
  "promotions/fetchPromotions",
  async () => {
    return await promotionsApi.getPromotions();
  },
);

export const createPromotion = createAsyncThunk(
  "promotions/createPromotion",
  async (values: CreatePromotionRequest) => {
    return await promotionsApi.createPromotion(values);
  },
);

export const updatePromotion = createAsyncThunk(
  "promotions/updatePromotion",
  async ({ id, values }: { id: number; values: UpdatePromotionRequest }) => {
    return await promotionsApi.updatePromotion(id, values);
  },
);

export const deletePromotion = createAsyncThunk(
  "promotions/deletePromotion",
  async (id: number) => {
    await promotionsApi.deletePromotion(id);
    return id;
  },
);

const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch promotions.";
      })
      .addCase(createPromotion.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.items = state.items.map((promotion) =>
          promotion.id === action.payload.id ? action.payload : promotion,
        );
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (promotion) => promotion.id !== action.payload,
        );
      });
  },
});

export const promotionsReducer = promotionsSlice.reducer;

export const selectPromotions = (state: { promotions: PromotionsState }) =>
  state.promotions.items;
export const selectPromotionsStatus = (state: {
  promotions: PromotionsState;
}) => state.promotions.status;
export const selectPromotionsError = (state: { promotions: PromotionsState }) =>
  state.promotions.error;
