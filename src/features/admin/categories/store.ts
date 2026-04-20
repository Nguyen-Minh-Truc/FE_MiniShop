import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
  CategoryQueryParams,
  PaginationMeta,
} from "@/types";

import { categoriesApi } from "./api";

export type CategoriesStatus = "idle" | "loading" | "succeeded" | "failed";

export interface CategoriesState {
  items: Category[];
  meta: PaginationMeta;
  status: CategoriesStatus;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  meta: {
    pageCurrent: 1,
    pageSize: 10,
    pages: 1,
    total: 0,
  },
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params?: CategoryQueryParams) => {
    return await categoriesApi.getCategories(params);
  },
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (values: CreateCategoryRequest) => {
    return await categoriesApi.createCategory(values);
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, values }: { id: number; values: UpdateCategoryRequest }) => {
    return await categoriesApi.updateCategory(id, values);
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    await categoriesApi.deleteCategory(id);
    return id;
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result;
        state.meta = action.payload.meta;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch categories.";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.items = state.items.map((category) =>
          category.id === action.payload.id ? action.payload : category,
        );
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (category) => category.id !== action.payload,
        );
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: { categories: CategoriesState }) =>
  state.categories.items;
export const selectCategoriesMeta = (state: { categories: CategoriesState }) =>
  state.categories.meta;
export const selectCategoriesStatus = (state: {
  categories: CategoriesState;
}) => state.categories.status;
export const selectCategoriesError = (state: { categories: CategoriesState }) =>
  state.categories.error;
