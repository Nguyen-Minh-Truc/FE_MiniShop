import { UserItem, UserFormValues } from "./types";

export const defaultUserFormValues: UserFormValues = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  active: true,
  roleName: "CUSTOMER",
};

export const initialUsers: UserItem[] = [];
