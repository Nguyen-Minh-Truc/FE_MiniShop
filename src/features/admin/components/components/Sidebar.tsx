"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

import { navigationItems, routes } from "@/app/router";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <Link href={routes.dashboard} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">
              DB
            </span>
          </div>
          <span className="text-sidebar-foreground font-bold text-lg">
            Dashboard
          </span>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as
            | LucideIcon
            | undefined;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {Icon ? <Icon className="w-5 h-5" /> : null}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
        <div className="text-xs text-sidebar-foreground/60">
          <p>© 2024 Dashboard</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </aside>
  );
};
