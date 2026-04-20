import type { Permission, Role } from "@/types";

export interface RoleItem extends Role {
  permissions?: Permission[];
  permissionIds?: number[];
}

export interface RoleFormValues {
  name: string;
  description: string;
  permissionIds: number[];
}
