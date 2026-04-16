"use client";

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  analytics: "/analytics",
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
