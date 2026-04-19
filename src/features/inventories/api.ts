import type {
  ApiResponse,
  CreateInventoryRequest,
  Inventory,
  InventoryListResponse,
  UpdateInventoryRequest,
} from "@/types";

import type { InventoryItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const RESOURCE_PATHS = ["/inventories", "/inventory"] as const;

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

const requestWithFallback = async <T>(
  execute: (basePath: (typeof RESOURCE_PATHS)[number]) => Promise<T>,
): Promise<T> => {
  let lastError: unknown;

  for (const basePath of RESOURCE_PATHS) {
    try {
      return await execute(basePath);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to call inventory API.");
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const normalizeInventory = (inventory: Inventory): InventoryItem => ({
  ...inventory,
  stock: Number(inventory.stock ?? 0),
  reservedStock: Number(inventory.reservedStock ?? 0),
});

export const inventoriesApi = {
  async getInventories(): Promise<InventoryItem[]> {
    const response = await requestWithFallback((basePath) =>
      requestJson<InventoryListResponse>(basePath),
    );

    return unwrapApiData(response).result.map(normalizeInventory);
  },

  async createInventory(payload: CreateInventoryRequest): Promise<InventoryItem> {
    const response = await requestWithFallback((basePath) =>
      requestJson<ApiResponse<Inventory>>(basePath, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );

    return normalizeInventory(unwrapApiData(response));
  },

  async updateInventory(
    id: number,
    payload: UpdateInventoryRequest,
  ): Promise<InventoryItem> {
    const response = await requestWithFallback((basePath) =>
      requestJson<ApiResponse<Inventory>>(`${basePath}/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    );

    return normalizeInventory(unwrapApiData(response));
  },

  async deleteInventory(id: number): Promise<void> {
    await requestWithFallback((basePath) =>
      requestJson<ApiResponse<null>>(`${basePath}/${id}`, {
        method: "DELETE",
      }),
    );
  },
};
