import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { CreateRoleRequest, Permission, UpdateRoleRequest } from "@/types";

import { rolesApi } from "./api";
import type { RoleItem } from "./types";

export type RolesStatus = "idle" | "loading" | "succeeded" | "failed";

export interface RolesState {
  items: RoleItem[];
  permissions: Permission[];
  status: RolesStatus;
  permissionsStatus: RolesStatus;
  error: string | null;
}

const initialState: RolesState = {
  items: [],
  permissions: [],
  status: "idle",
  permissionsStatus: "idle",
  error: null,
};

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  return await rolesApi.getRoles();
});

export const fetchPermissions = createAsyncThunk(
  "roles/fetchPermissions",
  async () => {
    return await rolesApi.getPermissions();
  },
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (values: CreateRoleRequest) => {
    return await rolesApi.createRole(values);
  },
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, values }: { id: number; values: UpdateRoleRequest }) => {
    return await rolesApi.updateRole(id, values);
  },
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id: number) => {
    await rolesApi.deleteRole(id);
    return id;
  },
);

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch roles.";
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.permissionsStatus = "loading";
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissionsStatus = "succeeded";
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.permissionsStatus = "failed";
        state.error = action.error.message ?? "Failed to fetch permissions.";
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.items = state.items.map((role) =>
          role.id === action.payload.id ? action.payload : role,
        );
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.items = state.items.filter((role) => role.id !== action.payload);
      });
  },
});

export const rolesReducer = rolesSlice.reducer;

export const selectRoles = (state: { roles: RolesState }) => state.roles.items;
export const selectRolesStatus = (state: { roles: RolesState }) =>
  state.roles.status;
export const selectPermissions = (state: { roles: RolesState }) =>
  state.roles.permissions;
export const selectPermissionsStatus = (state: { roles: RolesState }) =>
  state.roles.permissionsStatus;
export const selectRolesError = (state: { roles: RolesState }) =>
  state.roles.error;
