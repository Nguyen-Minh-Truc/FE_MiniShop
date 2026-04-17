import { configureStore } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/features/categories/store";
import { productsReducer } from "@/features/products/store";
import { rolesReducer } from "@/features/roles/store";
import { suppliersReducer } from "@/features/suppliers/store";
import { usersReducer } from "@/features/users/store";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    roles: rolesReducer,
    suppliers: suppliersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
