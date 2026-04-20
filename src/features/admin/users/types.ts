import type { RoleName, User } from "@/types";

export type UserItem = User;

export interface UserFormValues {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  active: boolean;
  roleName: RoleName | "";
}
