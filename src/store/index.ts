import { configureStore } from "@reduxjs/toolkit";

import { categoriesReducer } from "@/src/features/admin/categories/store";
import { inventoriesReducer } from "@/src/features/admin/inventories/store";
import { importReceiptsReducer } from "@/src/features/admin/import-receipts/store";
import { ordersReducer } from "@/src/features/admin/orders/store";
import { productsReducer } from "@/src/features/admin/products/store";
import { promotionsReducer } from "@/src/features/admin/promotions/store";
import { rolesReducer } from "@/src/features/admin/roles/store";
import { suppliersReducer } from "@/src/features/admin/suppliers/store";
import { usersReducer } from "@/src/features/admin/users/store";

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
