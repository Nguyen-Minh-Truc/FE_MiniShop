import type {
  ApiResponse,
  CreateImportReceiptRequest,
  ImportReceipt,
  ImportReceiptListResponse,
  ImportReceiptStatus,
} from "@/types";

import type { ImportReceiptItem, ImportReceiptItemModel } from "./types";

type UpdateImportReceiptRequest = Partial<CreateImportReceiptRequest> & {
  status?: ImportReceiptStatus;
};

type RawImportReceipt = ImportReceipt & {
  import_riept_item?: ImportReceiptItem[];
  import_receipt_item?: ImportReceiptItem[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const RESOURCE_PATHS = ["/import-receipts", "/purchase-orders"] as const;

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${raw}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Server returned non-JSON response.");
  }

  return JSON.parse(raw) as T;
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
    : new Error("Failed to call import receipt API.");
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const normalizeItem = (item: any): ImportReceiptItem => ({
  id: item.id,
  productId: Number(item.productId ?? item.product?.id ?? 0),
  quantity: Number(item.quantity ?? 0),
  costPrice: Number(item.costPrice ?? 0),
  productName: item.product?.name,
});

const normalizeImportReceipt = (
  raw: RawImportReceipt,
): ImportReceiptItemModel => {
  const sourceItems =
    raw.items ?? raw.import_riept_item ?? raw.import_receipt_item ?? [];

  return {
    ...raw,
    items: sourceItems.map(normalizeItem),
  };
};

const buildPayload = (
  payload: CreateImportReceiptRequest | UpdateImportReceiptRequest,
) => {
  const items = payload.items ?? [];

  return {
    ...payload,
    items,
    // Backend yêu cầu trường này theo naming hiện tại.
    import_riept_item: items,
  };
};

export const importReceiptsApi = {
  async getImportReceipts(): Promise<ImportReceiptItemModel[]> {
    const response = await requestWithFallback((basePath) =>
      requestJson<ImportReceiptListResponse>(basePath),
    );

    return unwrapApiData(response).result.map((receipt) =>
      normalizeImportReceipt(receipt as RawImportReceipt),
    );
  },

  async createImportReceipt(
    payload: CreateImportReceiptRequest,
  ): Promise<ImportReceiptItemModel> {
    const response = await requestWithFallback((basePath) =>
      requestJson<ApiResponse<ImportReceipt>>(basePath, {
        method: "POST",
        body: JSON.stringify(buildPayload(payload)),
      }),
    );

    return normalizeImportReceipt(unwrapApiData(response) as RawImportReceipt);
  },

  async updateImportReceipt(
    id: number,
    payload: UpdateImportReceiptRequest,
  ): Promise<ImportReceiptItemModel> {
    const response = await requestWithFallback((basePath) =>
      requestJson<ApiResponse<ImportReceipt>>(`${basePath}/${id}`, {
        method: "PUT",
        body: JSON.stringify(buildPayload(payload)),
      }),
    );

    return normalizeImportReceipt(unwrapApiData(response) as RawImportReceipt);
  },

  async deleteImportReceipt(id: number): Promise<void> {
    await requestWithFallback((basePath) =>
      requestJson<ApiResponse<null>>(`${basePath}/${id}`, {
        method: "DELETE",
      }),
    );
  },
};
