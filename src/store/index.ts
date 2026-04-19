import { configureStore } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/features/categories/store";
import { inventoriesReducer } from "@/features/inventories/store";
import { importReceiptsReducer } from "@/features/import-receipts/store";
import { ordersReducer } from "@/features/orders/store";
import { productsReducer } from "@/features/products/store";
import { promotionsReducer } from "@/features/promotions/store";
import { rolesReducer } from "@/features/roles/store";
import { suppliersReducer } from "@/features/suppliers/store";
import { usersReducer } from "@/features/users/store";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    inventories: inventoriesReducer,
    importReceipts: importReceiptsReducer,
    orders: ordersReducer,
    products: productsReducer,
    promotions: promotionsReducer,
    roles: rolesReducer,
    suppliers: suppliersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
