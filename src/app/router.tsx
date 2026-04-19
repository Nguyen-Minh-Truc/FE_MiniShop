"use client";

export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  analytics: "/analytics",
  categories: "/categories",
  importReceipts: "/import-receipts",
  inventories: "/inventories",
  orders: "/orders",
  products: "/products",
  promotions: "/promotions",
  roles: "/roles",
  suppliers: "/suppliers",
  users: "/users",
  settings: "/settings",
  profile: "/profile",
};

export const navigationItems = [
  {
    title: "Overview",
    href: routes.dashboard,
    icon: "LayoutDashboard",
  },
  {
    title: "Analytics",
    href: routes.analytics,
    icon: "BarChart3",
  },
  {
    title: "Categories",
    href: routes.categories,
    icon: "Tags",
  },
  {
    title: "Import Receipts",
    href: routes.importReceipts,
    icon: "FileDown",
  },
  {
    title: "Inventories",
    href: routes.inventories,
    icon: "Boxes",
  },
  {
    title: "Products",
    href: routes.products,
    icon: "Package",
  },
  {
    title: "Promotions",
    href: routes.promotions,
    icon: "TicketPercent",
  },
  {
    title: "Orders",
    href: routes.orders,
    icon: "ShoppingCart",
  },
  {
    title: "Roles",
    href: routes.roles,
    icon: "Shield",
  },
  {
    title: "Suppliers",
    href: routes.suppliers,
    icon: "Truck",
  },
  {
    title: "Users",
    href: routes.users,
    icon: "Users",
  },
  {
    title: "Settings",
    href: routes.settings,
    icon: "Settings",
  },
];
