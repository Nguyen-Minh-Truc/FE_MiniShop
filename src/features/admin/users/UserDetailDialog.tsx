"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { UserItem } from "./types";

interface UserDetailDialogProps {
  open: boolean;
  user: UserItem | null;
  onOpenChange: (open: boolean) => void;
}

const formatRole = (roleName: string | undefined) => {
  if (!roleName) {
    return "—";
  }

  return roleName.replaceAll("_", " ");
};

const formatDate = (value: string | null) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const detailRows = (user: UserItem) => [
  { label: "Username", value: user.username },
  { label: "Email", value: user.email },
  { label: "Phone", value: user.phone ?? "—" },
  { label: "Address", value: user.address ?? "—" },
  { label: "Role", value: formatRole(user.role?.name) },
  { label: "Created At", value: formatDate(user.createdAt) },
];

export const UserDetailDialog = ({
  open,
  user,
  onOpenChange,
}: UserDetailDialogProps) => {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information for the selected user.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {detailRows(user).map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-border pb-3"
            >
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground">
                {item.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 pb-1">
            <span className="text-sm text-muted-foreground">Active</span>
            <Badge variant={user.active ? "default" : "outline"}>
              {user.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
