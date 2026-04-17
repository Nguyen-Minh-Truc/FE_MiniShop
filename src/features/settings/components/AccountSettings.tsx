"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";

export const AccountSettings = () => {
  return (
    <Card className="p-6 border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Account Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value="alex@example.com"
            readOnly
            className="mt-2 w-full px-4 py-2 bg-muted text-foreground rounded-lg border border-border"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Display Name
          </label>
          <input
            type="text"
            value="Alex Johnson"
            className="mt-2 w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border"
            readOnly
          />
        </div>
      </div>
      <Button variant="default" className="mt-6" disabled>
        Save Changes
      </Button>
    </Card>
  );
};
