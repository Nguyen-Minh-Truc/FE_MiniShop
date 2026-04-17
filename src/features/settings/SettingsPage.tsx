"use client";

import { Header, Sidebar } from "@/features/shared-layout";

import { AccountSettings } from "./components/AccountSettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { SecuritySettings } from "./components/SecuritySettings";

export const SettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account and application settings.
            </p>
          </div>

          <AccountSettings />
          <NotificationSettings />
          <SecuritySettings />
        </main>
      </div>
    </div>
  );
};
