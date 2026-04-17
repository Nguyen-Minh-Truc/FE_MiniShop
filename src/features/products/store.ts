import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@/types";

import { productsApi } from "./api";

export type ProductsStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProductsState {
  items: Product[];
  status: ProductsStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

type ProductFormRequest = CreateProductRequest;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await productsApi.getProducts();
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values: ProductFormRequest) => {
    return await productsApi.createProduct(values);
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, values }: { id: number; values: ProductFormRequest }) => {
    const payload: UpdateProductRequest = values;
    return await productsApi.updateProduct(id, payload);
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await productsApi.deleteProduct(id);
    return id;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products.";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload,
        );
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.items;
export const selectProductsStatus = (state: { products: ProductsState }) =>
  state.products.status;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;
