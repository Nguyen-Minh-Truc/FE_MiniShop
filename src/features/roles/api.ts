import type {
  ApiResponse,
  CreateRoleRequest,
  Permission,
  PermissionListResponse,
  Role,
  RoleListResponse,
  UpdateRoleRequest,
} from "@/types";

import type { RoleItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(buildUrl(path), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${raw}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error("Server not running or returned HTML instead of JSON");
    }

    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      throw new Error("Cannot connect to server (server may be down)");
    }

    throw err;
  }
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const normalizeRole = (role: Role): RoleItem => {
  const source = role as Role & {
    permissions?: Permission[];
    permissionIds?: number[];
  };

  return {
    ...role,
    permissions: source.permissions ?? [],
    permissionIds:
      source.permissionIds ??
      source.permissions?.map((permission) => permission.id) ??
      [],
  };
};

export const rolesApi = {
  async getRoles(): Promise<RoleItem[]> {
    const response = await requestJson<RoleListResponse>("/roles");
    return unwrapApiData(response).result.map(normalizeRole);
  },

  async getPermissions(): Promise<Permission[]> {
    const response = await requestJson<PermissionListResponse>("/permissions");
    return unwrapApiData(response).result;
  },

  async createRole(payload: CreateRoleRequest): Promise<RoleItem> {
    const response = await requestJson<ApiResponse<Role>>("/roles", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizeRole(unwrapApiData(response));
  },

  async updateRole(id: number, payload: UpdateRoleRequest): Promise<RoleItem> {
    const response = await requestJson<ApiResponse<Role>>(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return normalizeRole(unwrapApiData(response));
  },

  async deleteRole(id: number): Promise<void> {
    await requestJson<ApiResponse<null>>(`/roles/${id}`, {
      method: "DELETE",
    });
  },
};
