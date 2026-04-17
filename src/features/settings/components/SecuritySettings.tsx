"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";

export const SecuritySettings = () => {
  return (
    <Card className="p-6 border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">Security</h3>
      <div className="space-y-4">
        <Button variant="outline" className="w-full" disabled>
          Change Password
        </Button>
        <Button variant="outline" className="w-full" disabled>
          Enable Two-Factor Authentication
        </Button>
        <Button variant="destructive" className="w-full" disabled>
          Delete Account
        </Button>
      </div>
    </Card>
  );
};
