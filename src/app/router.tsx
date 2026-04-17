"use client";

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  analytics: "/analytics",
  categories: "/categories",
  products: "/products",
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
    title: "Products",
    href: routes.products,
    icon: "Package",
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
