import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  CreateUserRequest,
  RoleName,
  UpdateUserRequest,
  User,
} from "@/types";

import { usersApi } from "./api";

export type UsersStatus = "idle" | "loading" | "succeeded" | "failed";

export interface UsersState {
  items: User[];
  status: UsersStatus;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
};

const roleToIdMap: Record<RoleName, number> = {
  CUSTOMER: 1,
  SELLER: 2,
  ADMIN_SYSTEM: 3,
  SUPER_ADMIN: 4,
};

const toCreateRequest = (values: {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  active: boolean;
  roleName: RoleName | "";
}): CreateUserRequest => ({
  username: values.username,
  email: values.email,
  password: values.password,
  phone: values.phone,
  address: values.address,
  roleId: values.roleName ? roleToIdMap[values.roleName] : roleToIdMap.CUSTOMER,
});

const toUpdateRequest = (values: {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  active: boolean;
  roleName: RoleName | "";
}): UpdateUserRequest => ({
  username: values.username,
  email: values.email,
  password: values.password.trim() ? values.password.trim() : undefined,
  phone: values.phone,
  address: values.address,
  active: values.active,
  roleId: values.roleName ? roleToIdMap[values.roleName] : undefined,
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await usersApi.getUsers();
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (values: {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    active: boolean;
    roleName: RoleName | "";
  }) => {
    return await usersApi.createUser(toCreateRequest(values));
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    id,
    values,
  }: {
    id: number;
    values: {
      username: string;
      email: string;
      password: string;
      phone: string;
      address: string;
      active: boolean;
      roleName: RoleName | "";
    };
  }) => {
    return await usersApi.updateUser(id, toUpdateRequest(values));
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    await usersApi.deleteUser(id);
    return id;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users.";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.items = state.items.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user.id !== action.payload);
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const selectUsers = (state: { users: UsersState }) => state.users.items;
export const selectUsersStatus = (state: { users: UsersState }) =>
  state.users.status;
export const selectUsersError = (state: { users: UsersState }) =>
  state.users.error;
