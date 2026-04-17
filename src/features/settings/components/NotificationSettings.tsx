"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const items = [
  { label: "Email Notifications", desc: "Receive email updates" },
  { label: "Push Notifications", desc: "Receive push alerts" },
  { label: "Weekly Summary", desc: "Get weekly summary emails" },
];

export const NotificationSettings = () => {
  return (
    <Card className="p-6 border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Notifications
      </h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <Switch disabled />
          </div>
        ))}
      </div>
    </Card>
  );
};
